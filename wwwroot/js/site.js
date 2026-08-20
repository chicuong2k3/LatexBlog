// ---- theme ----
function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "default";
}
function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("db-theme", t);
}
document.addEventListener("alpine:init", () => {
    Alpine.data("themeToggle", () => ({
        dark: getTheme() === "dark",
        toggle() {
            setTheme(this.dark ? "default" : "dark");
            this.dark = !this.dark;
        },
    }));

    // TOC scrollspy - consumed by Post page
    Alpine.data("tocSpy", () => ({
        activeId: "",
        init() {
            const el = this.$el;
            const links = el.querySelectorAll('a[href^="#"]');
            const headings = [...links]
                .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
                .filter(Boolean);
            if (!headings.length) return;
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) this.activeId = entry.target.id;
                });
            }, { rootMargin: "-80px 0px -70% 0px" });
            headings.forEach((h) => io.observe(h));
        },
    }));

    // nav (mobile menu + search popup) - consumed by MainLayout
    Alpine.data("navBox", () => ({
        menuOpen: false,
        searchOpen: false,
        mode: "posts",
        cq: "",
        cresults: [],
        openSearch() {
            this.searchOpen = true;
            this.$nextTick(() => { if (this.$refs.q) this.$refs.q.focus(); });
        },
        closeSearch() {
            this.searchOpen = false;
            if (this.$refs.results) this.$refs.results.innerHTML = "";
            this.cresults = [];
            this.cq = "";
        },
        setMode(m) { this.mode = m; },
        searchComments() {
            var self = this;
            var q = this.cq.trim();
            if (!q) { this.cresults = []; return; }
            if (typeof window.lbLoadSupabase !== "function") return;
            window.lbLoadSupabase().then(function (sb) {
                return sb.from("comments").select("id, post_slug, author_name, body, created_at")
                    .ilike("body", "%" + q + "%").order("created_at", { ascending: false }).limit(20);
            }).then(function (res) { self.cresults = res.data || []; }).catch(function () {});
        },
    }));
});

// ---- back to top ----
(function () {
    var btn = document.getElementById("lb-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
        btn.classList.toggle("is-visible", window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();

// ---- reading progress ----
(function () {
    var bar = document.getElementById("lb-progress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }, { passive: true });
})();

// ---- reading position bookmark ----
(function () {
    if (!document.querySelector(".lb-post-page")) return;
    var key = "lb-pos:" + location.pathname.split("/").pop();

    // ponytail: save scroll % (not px) so KaTeX/image reflow doesn't break the position
    var save = document.createElement("button");
    save.type = "button";
    save.className = "lb-bookmark";
    save.title = "Đánh dấu vị trí đang đọc";
    save.setAttribute("aria-label", "Đánh dấu vị trí đang đọc");
    save.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';
    save.addEventListener("click", function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        localStorage.setItem(key, (h > 0 ? window.scrollY / h : 0).toFixed(4));
        if (typeof Toastify !== "undefined") Toastify({
            text: "Đã lưu vị trí đọc", duration: 2600, gravity: "bottom", position: "right",
            className: "lb-toast",
            style: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--neon)", borderRadius: "8px" },
        }).showToast();
    });
    document.body.appendChild(save);

    var saved = parseFloat(localStorage.getItem(key));
    if (!(saved > 0)) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lb-resume";
    btn.textContent = "Tiếp tục đọc (" + Math.round(saved * 100) + "%)";
    btn.addEventListener("click", function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: saved * h, behavior: "smooth" });
        btn.remove();
    });
    document.body.appendChild(btn);
    setTimeout(function () { btn.remove(); }, 12000);
})();

// ---- lightbox ----
(function () {
    document.addEventListener("click", function (e) {
        var img = e.target.closest(".lb-prose img");
        if (!img || img.closest("a")) return;
        var ov = document.createElement("div");
        ov.className = "lb-lightbox";
        var im = document.createElement("img");
        im.src = img.currentSrc || img.src;
        im.alt = img.alt || "";
        ov.appendChild(im);
        ov.addEventListener("click", function () { ov.remove(); });
        document.addEventListener("keydown", function h(ev) {
            if (ev.key === "Escape") { ov.remove(); document.removeEventListener("keydown", h); }
        });
        document.body.appendChild(ov);
    });
})();

// ---- keyboard shortcuts ----
(function () {
    document.addEventListener("keydown", function (e) {
        if (e.target && e.target.matches && e.target.matches("input, textarea, select, [contenteditable]")) return;
        if (e.key === "/") {
            var b = document.querySelector(".lb-nav-right .lb-nav-icon");
            if (b) { b.click(); e.preventDefault(); }
        } else if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
})();

// ---- db-backed post prose (markdown -> html) ----
function initDbProse(el, md) {
    if (typeof window.lbRenderComment === "function") el.innerHTML = window.lbRenderComment(md);
    else el.textContent = md;
}

// ---- copy-code buttons + KaTeX rendering - consumed by Post page
function initProse(root) {
    root.querySelectorAll("pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code || pre.querySelector("[data-copy-code]")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lb-copy";
        btn.setAttribute("data-copy-code", "");
        btn.textContent = "Sao chép";
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(code.innerText);
                btn.textContent = "Đã chép!";
            } catch {
                btn.textContent = "Lỗi!";
            }
            setTimeout(() => (btn.textContent = "Sao chép"), 1500);
        });
        pre.classList.add("lb-codeblock");
        pre.appendChild(btn);
    });
    // Render math: pandoc --katex keeps raw TeX in `math inline`/`math display`
    // spans WITHOUT \( \) delimiters, so auto-render's delimiter scanner can't
    // see it. Replicate pandoc's own standalone bootstrap: katex.render() on
    // every .math element.
    if (window.katex) {
        root.querySelectorAll(".math").forEach((el) => {
            if (el.tagName !== "SPAN" || !el.firstChild) return;
            katex.render(el.firstChild.data, el, {
                displayMode: el.classList.contains("display"),
                throwOnError: false,
            });
        });
    }
}
