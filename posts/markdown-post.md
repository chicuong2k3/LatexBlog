---
title: "Viết bài bằng Markdown"
date: 2026-09-23
tags: [meta, markdown]
summary: "Bài mẫu minh hoạ pipeline .md - frontmatter YAML, math, code, quote, table, footnote."
slug: markdown-post
---

# Heading 1

## Heading 2

### Heading 3

Text với inline math $E = mc^2$ và \( \sqrt{x} \).

## Display math

$$
\begin{cases}
x + y = 3 \\
2x - y = 0
\end{cases}
$$

## Code block

```python
def gauss_jordan(matrix):
    """Xóa comment."""
    n = len(matrix)
    for i in range(n):
        # pivot
        ...
    return matrix
```

Inline code: `print("hello")`.

## Quote

> Đây là blockquote.
> 
> - Tác giả

## Lists

- Item 1
- Item 2
  - Nested

1. First
2. Second

## Table

| Cột A | Cột B |
|-------|-------|
| 1     | 2     |

## Footnote

Câu có footnote.[^1]

[^1]: Nội dung footnote.

---

Horizontal rule ở trên.
