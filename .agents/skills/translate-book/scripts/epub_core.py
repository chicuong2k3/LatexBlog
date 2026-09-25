"""EPUB XML utilities shared across handlers and QA tools.

Merges the old skill's epub_core.py with the v2 engine's XML functions:
segment extraction, placeholder serialization, validation, reconstruction,
and EPUB ZIP writing.
"""
from __future__ import annotations

import copy
import re
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Any, Iterable
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile, ZipInfo

from lxml import etree

from engine import Segment, TranslationError

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

BLOCK_TAGS = {
    "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "li", "blockquote", "figcaption", "caption",
    "td", "th", "dt", "dd",
}
SKIP_TAGS = {"script", "style", "svg", "math", "pre", "code"}


# ---------------------------------------------------------------------------
# Placeholder dataclass
# ---------------------------------------------------------------------------

@dataclass
class Placeholder:
    token_id: str
    kind: str  # "g" or "ph"
    element: etree._Element


# ---------------------------------------------------------------------------
# Low-level helpers
# ---------------------------------------------------------------------------

def local_name(tag: str | None) -> str:
    if not tag:
        return ""
    if tag.startswith("{"):
        return tag.split("}", 1)[1]
    return tag


def normalize_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def xml_escape(text: str | None) -> str:
    if not text:
        return ""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def normalize_glossary_mapping(raw: Any) -> dict[str, str]:
    """Accept dict or list-of-dicts glossary format."""
    if isinstance(raw, dict):
        return {str(k): str(v) for k, v in raw.items() if v}
    if isinstance(raw, list):
        result: dict[str, str] = {}
        for item in raw:
            src = item.get("source", "")
            tgt = item.get("target", "")
            if src and tgt:
                result[str(src)] = str(tgt)
        return result
    return {}


# ---------------------------------------------------------------------------
# EPUB package reading
# ---------------------------------------------------------------------------

def read_container_opf(zf: ZipFile) -> str:
    root = etree.fromstring(zf.read("META-INF/container.xml"))
    ns = {"c": "urn:oasis:names:tc:opendocument:xmlns:container"}
    node = root.find(".//c:rootfile", namespaces=ns)
    if node is None:
        raise TranslationError("Unable to locate OPF path in META-INF/container.xml")
    return node.attrib["full-path"]


def get_spine_documents(zf: ZipFile, opf_path: str) -> list[str]:
    opf = etree.fromstring(zf.read(opf_path))
    ns = {"opf": "http://www.idpf.org/2007/opf"}
    manifest: dict[str, tuple[str, str]] = {}
    for item in opf.findall(".//opf:manifest/opf:item", namespaces=ns):
        manifest[item.attrib["id"]] = (
            item.attrib.get("href", ""),
            item.attrib.get("media-type", ""),
        )
    opf_dir = PurePosixPath(opf_path).parent
    spine_docs: list[str] = []
    for itemref in opf.findall(".//opf:spine/opf:itemref", namespaces=ns):
        href, media_type = manifest.get(itemref.attrib["idref"], ("", ""))
        if media_type in {"application/xhtml+xml", "text/html"} and href:
            resolved = str((opf_dir / href).as_posix())
            spine_docs.append(resolved)
    return spine_docs


# ---------------------------------------------------------------------------
# Block collection
# ---------------------------------------------------------------------------

def has_descendant_block(el: etree._Element) -> bool:
    for child in el.iterdescendants():
        if local_name(child.tag) in BLOCK_TAGS:
            return True
    return False


def iter_non_note_text(el: etree._Element) -> Iterable[str]:
    if el.text:
        yield el.text
    for child in el:
        child_name = local_name(child.tag)
        if child_name in SKIP_TAGS:
            if child.tail:
                yield child.tail
            continue
        if child.attrib.get("{http://www.idpf.org/2007/ops}type") == "noteref" or child.attrib.get("epub:type") == "noteref":
            if child.tail:
                yield child.tail
            continue
        if child_name == "a" and normalize_whitespace("".join(child.itertext())).isdigit():
            if child.tail:
                yield child.tail
            continue
        yield from iter_non_note_text(child)
        if child.tail:
            yield child.tail


def text_is_translatable(text: str) -> bool:
    stripped = normalize_whitespace(text)
    if not stripped:
        return False
    if stripped.isdigit():
        return False
    return bool(re.search(r"[A-Za-z\u00C0-\u024F]", stripped))


def collect_leaf_blocks(root: etree._Element) -> list[etree._Element]:
    blocks: list[etree._Element] = []
    for el in root.iter():
        if not isinstance(el.tag, str):
            continue
        tag_name = local_name(el.tag)
        if tag_name not in BLOCK_TAGS:
            continue
        if has_descendant_block(el):
            continue
        source_text = normalize_whitespace("".join(iter_non_note_text(el)))
        if not text_is_translatable(source_text):
            continue
        blocks.append(el)
    return blocks


# ---------------------------------------------------------------------------
# Placeholder serialization
# ---------------------------------------------------------------------------

def deep_copy_without_tail(el: etree._Element) -> etree._Element:
    cloned = copy.deepcopy(el)
    cloned.tail = None
    return cloned


def shallow_clone(el: etree._Element) -> etree._Element:
    cloned = etree.Element(el.tag, nsmap=el.nsmap)
    for key, value in el.attrib.items():
        cloned.set(key, value)
    return cloned


def placeholder_kind(el: etree._Element) -> str:
    tag_name = local_name(el.tag)
    if tag_name in SKIP_TAGS:
        return "ph"
    if el.attrib.get("{http://www.idpf.org/2007/ops}type") == "noteref" or el.attrib.get("epub:type") == "noteref":
        return "ph"
    visible = normalize_whitespace("".join(el.itertext()))
    if not visible or visible.isdigit():
        return "ph"
    return "g"


def serialize_children_with_placeholders(
    parent: etree._Element,
    placeholders: dict[str, Placeholder],
    counter: list[int],
) -> str:
    parts: list[str] = []
    if parent.text:
        parts.append(xml_escape(parent.text))
    for child in parent:
        token_id = f"t{counter[0]:04d}"
        counter[0] += 1
        kind = placeholder_kind(child)
        if kind == "ph":
            placeholders[token_id] = Placeholder(token_id, "ph", deep_copy_without_tail(child))
            parts.append(f'<ph id="{token_id}"/>')
        else:
            placeholders[token_id] = Placeholder(token_id, "g", shallow_clone(child))
            inner = serialize_children_with_placeholders(child, placeholders, counter)
            parts.append(f'<g id="{token_id}">{inner}</g>')
        if child.tail:
            parts.append(xml_escape(child.tail))
    return "".join(parts)


# ---------------------------------------------------------------------------
# Segment creation
# ---------------------------------------------------------------------------

def make_segment(file_path: str, block_index: int, block: etree._Element, sequence: int) -> Segment:
    placeholders: dict[str, Placeholder] = {}
    markup = serialize_children_with_placeholders(block, placeholders, [1])
    source_text = normalize_whitespace("".join(iter_non_note_text(block)))
    return Segment(
        segment_id=f"s{sequence:05d}",
        file_path=file_path,
        block_index=block_index,
        source_markup=markup,
        source_text=source_text,
        placeholders=placeholders,
        block=block,
    )


def iter_segments_for_tree(
    file_path: str, root: etree._Element, start_sequence: int
) -> tuple[list[Segment], int]:
    blocks = collect_leaf_blocks(root)
    segments: list[Segment] = []
    sequence = start_sequence
    for idx, block in enumerate(blocks, start=1):
        segments.append(make_segment(file_path, idx, block, sequence))
        sequence += 1
    return segments, sequence


# ---------------------------------------------------------------------------
# XML reconstruction (apply translations back to EPUB tree)
# ---------------------------------------------------------------------------

def reconstruct_node(node: etree._Element, placeholders: dict[str, Placeholder]) -> etree._Element:
    tag_name = local_name(node.tag)
    token_id = node.attrib["id"]
    stored = placeholders[token_id]
    if tag_name == "ph":
        cloned = deep_copy_without_tail(stored.element)
        cloned.tail = None
        return cloned
    cloned = shallow_clone(stored.element)
    cloned.text = node.text
    for child in node:
        rebuilt = reconstruct_node(child, placeholders)
        rebuilt.tail = child.tail
        cloned.append(rebuilt)
    cloned.tail = None
    return cloned


def apply_translated_markup(segment: Segment, markup: str) -> None:
    """Replace a block element's children with translated markup."""
    wrapper = etree.fromstring(f"<root>{markup}</root>".encode("utf-8"))
    block = segment.block
    block.text = wrapper.text
    for child in list(block):
        block.remove(child)
    for child in wrapper:
        rebuilt = reconstruct_node(child, segment.placeholders)
        rebuilt.tail = child.tail
        block.append(rebuilt)


# ---------------------------------------------------------------------------
# EPUB writing
# ---------------------------------------------------------------------------

def write_epub(output_path: Path, source_path: Path, updated_files: dict[str, bytes]) -> None:
    with ZipFile(source_path, "r") as src, ZipFile(output_path, "w") as dst:
        names = src.namelist()
        if "mimetype" in names:
            data = src.read("mimetype")
            info = ZipInfo("mimetype")
            info.compress_type = ZIP_STORED
            dst.writestr(info, data)
        for name in names:
            if name == "mimetype":
                continue
            data = updated_files.get(name, src.read(name))
            info = src.getinfo(name)
            cloned = ZipInfo(filename=info.filename, date_time=info.date_time)
            cloned.comment = info.comment
            cloned.extra = info.extra
            cloned.internal_attr = info.internal_attr
            cloned.external_attr = info.external_attr
            cloned.create_system = info.create_system
            cloned.flag_bits = info.flag_bits
            cloned.compress_type = ZIP_DEFLATED
            dst.writestr(cloned, data)
