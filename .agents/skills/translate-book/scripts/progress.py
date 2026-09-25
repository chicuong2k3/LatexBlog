"""Checkpoint / resume tracker for the translate-book skill.

Saves completed file translations to disk so an interrupted run can pick up
where it left off.  Thread-safe (uses threading.Lock).

Storage layout inside *progress_dir*::

    manifest.json          – config hash + map of completed paths
    <md5-of-path>.xhtml    – translated content for each completed file
"""

from __future__ import annotations

import hashlib
import json
import shutil
import threading
from pathlib import Path


class ProgressTracker:
    """Persist completed file translations to disk for resume."""

    def __init__(self, progress_dir: Path, config_hash: str) -> None:
        self.progress_dir = progress_dir
        self.config_hash = config_hash
        self.manifest_path = progress_dir / "manifest.json"
        self.completed: dict[str, str] = {}  # file_path -> stored_filename
        self._lock = threading.Lock()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def load(self) -> bool:
        """Load existing progress.  Returns True if valid cached files found."""
        if not self.manifest_path.exists():
            return False
        try:
            manifest = json.loads(self.manifest_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return False
        if manifest.get("config_hash") != self.config_hash:
            self.cleanup()
            return False
        self.completed = manifest.get("completed", {})
        # Verify stored files still exist on disk
        for file_path, stored in list(self.completed.items()):
            if not (self.progress_dir / stored).exists():
                del self.completed[file_path]
        return bool(self.completed)

    def is_completed(self, file_path: str) -> bool:
        return file_path in self.completed

    def load_file(self, file_path: str) -> bytes:
        stored = self.completed[file_path]
        return (self.progress_dir / stored).read_bytes()

    def mark_completed(self, file_path: str, data: bytes) -> None:
        with self._lock:
            safe_name = hashlib.md5(file_path.encode()).hexdigest() + ".xhtml"
            self.progress_dir.mkdir(parents=True, exist_ok=True)
            (self.progress_dir / safe_name).write_bytes(data)
            self.completed[file_path] = safe_name
            self._save_manifest()

    def cleanup(self) -> None:
        """Remove the entire progress directory."""
        if self.progress_dir.exists():
            shutil.rmtree(self.progress_dir)

    # ------------------------------------------------------------------
    # Internal
    # ------------------------------------------------------------------

    def _save_manifest(self) -> None:
        self.manifest_path.write_text(
            json.dumps(
                {"config_hash": self.config_hash, "completed": self.completed},
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )


def compute_config_hash(
    provider: str,
    model: str,
    fallback: str,
    target_lang: str,
    style_guide: str,
    glossary: dict,
) -> str:
    """Deterministic short hash of translation config for cache invalidation."""
    data = json.dumps(
        {
            "provider": provider,
            "model": model,
            "fallback": fallback,
            "target_lang": target_lang,
            "style_guide": style_guide,
            "glossary": glossary,
        },
        sort_keys=True,
    )
    return hashlib.sha256(data.encode()).hexdigest()[:16]
