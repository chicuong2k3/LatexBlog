// MCP server: AI viết/sửa/đăng bài cho LatexBlog qua Claude Code / Claude Desktop.
// Tools: list_posts, read_post, write_post (validate + pandoc build), publish (git push).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const POSTS = path.join(ROOT, "posts");

function run(cmd, args, opts = {}) {
  try {
    return { ok: true, out: execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8", ...opts }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || "") + (e.stderr || e.message) };
  }
}

function frontmatter(text) {
  const m = text.match(/^%\s*---\s*\n([\s\S]*?)^%\s*---\s*$/m);
  const meta = {};
  if (m) for (const line of m[1].split("\n")) {
    const mm = line.trim().replace(/^%\s*/, "").match(/^([a-z]+):\s*(.+)$/);
    if (mm) meta[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
  }
  return meta;
}

const text = (s) => ({ content: [{ type: "text", text: s }] });

const server = new McpServer({ name: "latexblog", version: "1.0.0" });

server.tool("list_posts", "Liệt kê tất cả bài viết (.tex) của blog kèm frontmatter.", {}, async () => {
  const items = fs.readdirSync(POSTS).filter((f) => f.endsWith(".tex")).map((f) => {
    const meta = frontmatter(fs.readFileSync(path.join(POSTS, f), "utf8"));
    return { file: f, slug: f.replace(/\.tex$/, ""), title: meta.title, date: meta.date, tags: meta.tags, hasTldr: !!meta.tldr };
  });
  return text(JSON.stringify(items, null, 2));
});

server.tool("read_post", "Đọc nguồn LaTeX của một bài viết theo slug (tên file không có .tex).",
  { slug: z.string().regex(/^[a-z0-9-]+$/) }, async ({ slug }) => {
    const p = path.join(POSTS, slug + ".tex");
    if (!fs.existsSync(p)) return text("ERROR: không có bài " + slug);
    return text(fs.readFileSync(p, "utf8"));
  });

server.tool("write_post",
  "Ghi một bài viết LaTeX (tạo mới hoặc ghi đè) rồi build toàn bộ blog (pandoc). " +
  "Nội dung PHẢI bắt đầu bằng frontmatter dạng:\n" +
  '%---\n% title: "..."\n% date: YYYY-MM-DD\n% tags: [a, b]\n% summary: "1-2 câu"\n% tldr: "2-3 câu tóm tắt TL;DR hiển thị đầu bài"\n%---\n' +
  "Thân bài là LaTeX (\\section, \\textbf, môi trường toán $...$, lstlisting/verbatim cho code). " +
  "Build sẽ fail nếu thiếu field bắt buộc, sai date, hoặc LaTeX lỗi — đọc output để sửa.",
  { slug: z.string().regex(/^[a-z0-9-]+$/).describe("tên file, kebab-case không dấu"), content: z.string() },
  async ({ slug, content }) => {
    const meta = frontmatter(content);
    for (const f of ["title", "date", "tags", "summary", "tldr"])
      if (!meta[f]) return text(`ERROR: frontmatter thiếu field "${f}" — không ghi file.`);
    fs.writeFileSync(path.join(POSTS, slug + ".tex"), content, "utf8");
    const r = run("python", [path.join("tools", "build_posts.py")]);
    return text((r.ok ? "OK, đã ghi và build xong:\n" : "Đã ghi file nhưng BUILD LỖI (sửa và ghi lại):\n") + r.out);
  });

server.tool("publish",
  "Commit các thay đổi trong posts/ + wwwroot/generated/ và push lên main để deploy.",
  { message: z.string().describe("commit message, vd: post: tiêu đề bài mới") },
  async ({ message }) => {
    const add = run("git", ["add", "posts", "wwwroot/generated"]);
    if (!add.ok) return text("ERROR git add:\n" + add.out);
    const commit = run("git", ["commit", "-m", message]);
    if (!commit.ok) return text("Không có gì để commit hoặc commit lỗi:\n" + commit.out);
    const push = run("git", ["push"]);
    return text((push.ok ? "Đã publish:\n" : "Commit xong nhưng PUSH LỖI:\n") + commit.out + "\n" + push.out);
  });

await server.connect(new StdioServerTransport());
