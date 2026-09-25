"""Multi-provider API abstraction for book translation.

Supports Gemini (API + CLI fallback), OpenAI, Anthropic, and Google Translate.
Uses only stdlib — zero SDK dependencies.
"""

from __future__ import annotations

import html
import json
import os
import shlex
import signal
import subprocess
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass


# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------

DEFAULT_MODELS: dict[str, str] = {
    "gemini": "gemini-2.5-flash-lite",
    "openai": "gpt-4.1-nano",
    "anthropic": "claude-haiku-4-5",
    "google-translate": "",
}

DEFAULT_ENV_VARS: dict[str, list[str]] = {
    "gemini": ["GEMINI_API_KEY", "GOOGLE_API_KEY"],
    "openai": ["OPENAI_API_KEY"],
    "anthropic": ["ANTHROPIC_API_KEY"],
    "google-translate": ["GOOGLE_TRANSLATE_API_KEY", "GOOGLE_API_KEY"],
}


# ---------------------------------------------------------------------------
# Exceptions
# ---------------------------------------------------------------------------

class ProviderError(RuntimeError):
    """Raised when a provider call fails."""


# ---------------------------------------------------------------------------
# Secret resolution
# ---------------------------------------------------------------------------

@dataclass
class SecretConfig:
    """Flexible API-key resolution: env var, file, or shell command.

    Resolution order:
    1. Explicit env var (``api_key_env``)
    2. File path       (``api_key_file``)
    3. Shell command    (``api_key_command``)
    4. Default env vars for the provider (``DEFAULT_ENV_VARS``)
    """

    provider: str
    api_key_env: str | None = None
    api_key_file: str | None = None
    api_key_command: str | None = None


def resolve_api_key(secret: SecretConfig) -> str | None:
    """Return an API key string, or *None* if nothing is configured."""

    if secret.api_key_env:
        value = os.environ.get(secret.api_key_env)
        if not value:
            raise ProviderError(
                f"Environment variable {secret.api_key_env} is not set."
            )
        return value.strip()

    if secret.api_key_file:
        with open(secret.api_key_file, "r", encoding="utf-8") as fh:
            return fh.read().strip()

    if secret.api_key_command:
        result = subprocess.run(
            ["zsh", "-lc", secret.api_key_command],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise ProviderError(
                f"Secret command failed: "
                f"{result.stderr.strip() or result.stdout.strip()}"
            )
        return result.stdout.strip()

    # Fall back to well-known env vars for the provider.
    for env_name in DEFAULT_ENV_VARS.get(secret.provider, []):
        value = os.environ.get(env_name)
        if value:
            return value.strip()

    return None


# ---------------------------------------------------------------------------
# Low-level HTTP helper
# ---------------------------------------------------------------------------

def post_json(
    url: str,
    payload: dict,
    headers: dict[str, str],
    timeout: int,
) -> dict:
    """POST *payload* as JSON and return the decoded response body."""

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", **headers},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise ProviderError(f"HTTP {exc.code} from {url}: {body}") from exc


# ---------------------------------------------------------------------------
# Provider-specific callers
# ---------------------------------------------------------------------------

def call_gemini(prompt: str, model: str, api_key: str, timeout: int) -> str:
    """Call the Gemini REST API (``generateContent``)."""

    model_name = urllib.parse.quote(model, safe="")
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}"
        f":generateContent?key={urllib.parse.quote(api_key, safe='')}"
    )
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"},
    }
    data = post_json(url, payload, {}, timeout)
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError) as exc:
        raise ProviderError(
            f"Unexpected Gemini response: {json.dumps(data)[:1500]}"
        ) from exc


def _call_gemini_cli(prompt: str, model: str, timeout: int) -> str:
    """Fallback: pipe *prompt* through the ``gemini`` CLI."""

    command = (
        f"gemini -m {shlex.quote(model)} "
        f'"Follow the prompt on stdin exactly and output only the requested content."'
    )
    proc = subprocess.Popen(
        ["zsh", "-lc", command],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        start_new_session=True,
    )
    try:
        stdout, stderr = proc.communicate(input=prompt, timeout=timeout)
    except subprocess.TimeoutExpired:
        os.killpg(proc.pid, signal.SIGTERM)
        try:
            stdout, stderr = proc.communicate(timeout=5)
        except subprocess.TimeoutExpired:
            os.killpg(proc.pid, signal.SIGKILL)
            stdout, stderr = proc.communicate()
        raise ProviderError(
            f"Gemini CLI timed out after {timeout}s: "
            f"{(stderr or stdout or '').strip()}"
        )

    if proc.returncode != 0:
        raise ProviderError(stderr.strip() or stdout.strip())

    output = stdout.strip()
    if not output:
        raise ProviderError("Gemini CLI returned empty output.")
    return output


def call_openai(prompt: str, model: str, api_key: str, timeout: int) -> str:
    """Call the OpenAI Responses API."""

    url = "https://api.openai.com/v1/responses"
    payload = {"model": model, "input": prompt}
    data = post_json(url, payload, {"Authorization": f"Bearer {api_key}"}, timeout)

    # The Responses API may return ``output_text`` directly or nested output.
    if isinstance(data.get("output_text"), str) and data["output_text"].strip():
        return data["output_text"]

    output = data.get("output")
    if isinstance(output, list):
        texts: list[str] = []
        for item in output:
            content = item.get("content")
            if not isinstance(content, list):
                continue
            for part in content:
                text = part.get("text")
                if isinstance(text, str):
                    texts.append(text)
        if texts:
            return "\n".join(texts)

    raise ProviderError(
        f"Unexpected OpenAI response: {json.dumps(data)[:1500]}"
    )


def call_anthropic(prompt: str, model: str, api_key: str, timeout: int) -> str:
    """Call the Anthropic Messages API."""

    url = "https://api.anthropic.com/v1/messages"
    payload = {
        "model": model,
        "max_tokens": 8192,
        "messages": [{"role": "user", "content": prompt}],
    }
    data = post_json(
        url,
        payload,
        {"x-api-key": api_key, "anthropic-version": "2023-06-01"},
        timeout,
    )
    try:
        texts = [
            p["text"]
            for p in data["content"]
            if p.get("type") == "text" and isinstance(p.get("text"), str)
        ]
        if texts:
            return "\n".join(texts)
    except (KeyError, TypeError):
        pass

    raise ProviderError(
        f"Unexpected Anthropic response: {json.dumps(data)[:1500]}"
    )


# ---------------------------------------------------------------------------
# Google Translate markup helpers
# ---------------------------------------------------------------------------

def encode_google_markup(markup: str) -> str:
    """Replace XML-like tags with bracket tokens that survive translation."""

    text = markup
    text = text.replace("</g>", "[[[G_END]]]")
    text = text.replace("<g id=\"", "[[[G_")
    text = text.replace("\">", "_START]]]")
    text = text.replace("<ph id=\"", "[[[PH_")
    text = text.replace("\"/>", "]]]")
    return text


def decode_google_markup(text: str) -> str:
    """Restore bracket tokens back to XML-like tags."""

    out = text
    out = out.replace("[[[G_END]]]", "</g>")
    out = out.replace("[[[PH_", "<ph id=\"")
    out = out.replace("[[[G_", "<g id=\"")
    out = out.replace("_START]]]", "\">")
    out = out.replace("]]]", "\"/>")
    return out


# ---------------------------------------------------------------------------
# Google Translate caller
# ---------------------------------------------------------------------------

def call_google_translate(
    texts: list[str],
    source_lang: str | None,
    target_lang: str,
    api_key: str,
    timeout: int,
) -> list[str]:
    """Translate *texts* via the Google Cloud Translation v2 API."""

    url = (
        f"https://translation.googleapis.com/language/translate/v2"
        f"?key={urllib.parse.quote(api_key, safe='')}"
    )
    payload: dict[str, object] = {
        "q": texts,
        "target": target_lang,
        "format": "text",
        "model": "nmt",
    }
    if source_lang:
        payload["source"] = source_lang

    data = post_json(url, payload, {}, timeout)
    try:
        translations = data["data"]["translations"]
        return [html.unescape(item["translatedText"]) for item in translations]
    except (KeyError, TypeError) as exc:
        raise ProviderError(
            f"Unexpected Google Translate response: {json.dumps(data)[:1500]}"
        ) from exc


# ---------------------------------------------------------------------------
# Unified dispatcher
# ---------------------------------------------------------------------------

def call_provider(
    provider: str,
    prompt: str,
    model: str,
    secret: SecretConfig,
    timeout: int,
) -> str:
    """Dispatch *prompt* to the requested provider and return the response text.

    For ``gemini``, falls back to the CLI when no API key is available.
    ``google-translate`` is not routed through here — use
    :func:`call_google_translate` directly.
    """

    if provider == "gemini":
        api_key = resolve_api_key(secret)
        if api_key:
            return call_gemini(prompt, model, api_key, timeout)
        return _call_gemini_cli(prompt, model, timeout)

    api_key = resolve_api_key(secret)
    if not api_key:
        raise ProviderError(f"No API key available for provider '{provider}'.")

    if provider == "openai":
        return call_openai(prompt, model, api_key, timeout)
    if provider == "anthropic":
        return call_anthropic(prompt, model, api_key, timeout)

    raise ProviderError(f"Unsupported provider: {provider}")
