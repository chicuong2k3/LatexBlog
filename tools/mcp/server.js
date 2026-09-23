// MCP server: AI viết/sửa/đăng bài cho LatexBlog.
// Tools: list_posts, read_post, write_post (validate + pandoc build), publish (git push).
//
// Chạy HTTP (mặc định): MCP_TOKEN=<secret> node server.js  → http://localhost:3999/mcp
//   Bắt buộc có MCP_TOKEN; mọi request phải kèm "Authorization: Bearer <token>".
//   Đổi port bằng MCP_PORT.
// Chạy stdio (cho client spawn trực tiếp): node server.js --stdio
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
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
  // LaTeX: %--- comment block. Markdown: standard YAML ---...--- block.
  let m = text.match(/^%\s*---\s*\n([\s\S]*?)^%\s*---\s*$/m);
  if (!m) m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  const meta = {};
  if (m) for (const line of m[1].split("\n")) {
    const mm = line.trim().replace(/^%\s*/, "").match(/^([a-z]+):\s*(.+)$/);
    if (mm) meta[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
  }
  return meta;
}

const text = (s) => ({ content: [{ type: "text", text: s }] });

function buildServer() {
  const server = new McpServer({ name: "latexblog", version: "1.1.0" });

  server.tool("list_posts", "Liệt kê tất cả bài viết (.tex/.md) của blog kèm frontmatter.", {}, async () => {
    const items = fs.readdirSync(POSTS).filter((f) => f.endsWith(".tex") || f.endsWith(".md")).map((f) => {
      const meta = frontmatter(fs.readFileSync(path.join(POSTS, f), "utf8"));
      const slug = f.replace(/\.(tex|md)$/, "");
      return { file: f, slug, title: meta.title, date: meta.date, tags: meta.tags, hasTldr: !!meta.tldr };
    });
    return text(JSON.stringify(items, null, 2));
  });

  server.tool("read_post", "Đọc nguồn bài viết (.tex hoặc .md) theo slug (tên file không có đuôi).",
    { slug: z.string().regex(/^[a-z0-9-]+$/) }, async ({ slug }) => {
      const pt = path.join(POSTS, slug + ".tex");
      const pm = path.join(POSTS, slug + ".md");
      const p = fs.existsSync(pt) ? pt : fs.existsSync(pm) ? pm : null;
      if (!p) return text("ERROR: không có bài " + slug);
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

  return server;
}

if (process.argv.includes("--stdio")) {
  await buildServer().connect(new StdioServerTransport());
} else {
  const TOKEN = process.env.MCP_TOKEN;
  if (!TOKEN) {
    console.error("MCP_TOKEN env var is required in HTTP mode (or run with --stdio).");
    process.exit(1);
  }
  const PORT = Number(process.env.MCP_PORT || 3999);

  function authorized(req) {
    const got = Buffer.from(req.headers.authorization || "");
    const want = Buffer.from("Bearer " + TOKEN);
    return got.length === want.length && crypto.timingSafeEqual(got, want);
  }

  http.createServer(async (req, res) => {
    try {
      if (new URL(req.url, "http://x").pathname !== "/mcp") { res.writeHead(404); res.end(); return; }
      if (!authorized(req)) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end('{"error":"unauthorized"}');
        return;
      }
      let raw = "";
      for await (const chunk of req) raw += chunk;
      let body;
      try { body = raw ? JSON.parse(raw) : undefined; }
      catch { res.writeHead(400); res.end('{"error":"bad json"}'); return; }
      // ponytail: stateless mode — server+transport mới mỗi request, khỏi quản lý session
      const server = buildServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
      res.on("close", () => { transport.close(); server.close(); });
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
    } catch (e) {
      if (!res.headersSent) { res.writeHead(500); res.end('{"error":"internal"}'); }
      console.error(e);
    }
  }).listen(PORT, () => console.error(`latexblog MCP listening on http://localhost:${PORT}/mcp`));
}
