// Vanilla + Unpoly compilers (no Alpine). Every component is an up.compiler so it binds on
// first load AND on every fragment Unpoly swaps in; each returns a destructor.

// ---- tiny DOM helpers, shared with comments.js ----
window.lbShow = function (el, on) { if (el) el.hidden = !on; };
window.lbDebounce = function (fn, ms) {
    var t; return function () { var a = arguments, s = this; clearTimeout(t); t = setTimeout(function () { fn.apply(s, a); }, ms); };
};
// Clone <template data-tpl="name"> inside root; returns its first element.
window.lbTpl = function (root, name) {
    var t = root.querySelector('template[data-tpl="' + name + '"]');
    return t.content.firstElementChild.cloneNode(true);
};

// ---- TOC scrollspy (Post page) ----
up.compiler(".lb-toc", function (el) {
    var links = [].slice.call(el.querySelectorAll('a[href^="#"]'));
    var headings = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
    if (!headings.length) return;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id); });
        });
    }, { rootMargin: "-80px 0px -70% 0px" });
    headings.forEach(function (h) { io.observe(h); });
    return function () { io.disconnect(); };
});

// ---- nav: mobile menu + search popup (MainLayout) ----
up.compiler(".lb-nav", function (nav) {
    var panel = nav.querySelector(".lb-nav-panel");
    var menuBtn = nav.querySelector("[data-lb-menu-toggle]");
    var modal = nav.querySelector(".lb-searchmodal");
    var openBtn = nav.querySelector("[data-lb-search-open]");
    var q = modal.querySelector('input[name="q"]');
    var postResults = modal.querySelector("#lb-search-results");
    var cq = modal.querySelector("[data-lb-cq]");
    var cresults = modal.querySelector("[data-lb-cresults]");

    function toggleMenu() {
        var open = !panel.classList.contains("open");
        panel.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
    }
    function setMode(m) {
        modal.querySelectorAll("[data-lb-search-mode]").forEach(function (b) {
            var on = b.getAttribute("data-lb-search-mode") === m;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-selected", String(on));
        });
        modal.querySelectorAll("[data-lb-search-pane]").forEach(function (p) {
            lbShow(p, p.getAttribute("data-lb-search-pane") === m);
        });
    }
    function openSearch() {
        lbShow(modal, true);
        openBtn.setAttribute("aria-expanded", "true");
        if (q) q.focus();
    }
    function closeSearch() {
        lbShow(modal, false);
        openBtn.setAttribute("aria-expanded", "false");
        if (postResults) postResults.innerHTML = "";
        cresults.innerHTML = "";
        cq.value = "";
    }
    var searchComments = lbDebounce(function () {
        var text = cq.value.trim();
        if (!text) { cresults.innerHTML = ""; return; }
        if (typeof window.lbLoadSupabase !== "function") return;
        window.lbLoadSupabase().then(function (sb) {
            return sb.from("comments").select("id, post_slug, author_name, body, created_at")
                .ilike("body", "%" + text + "%").order("created_at", { ascending: false }).limit(20);
        }).then(function (res) {
            cresults.innerHTML = "";
            (res.data || []).forEach(function (r) {
                var a = lbTpl(modal, "cresult");
                a.href = "/posts/" + r.post_slug;
                a.querySelector("[data-f=body]").textContent = r.body.length > 120 ? r.body.slice(0, 120) + "…" : r.body;
                a.querySelector("[data-f=meta]").textContent = r.author_name + " · " + r.post_slug;
                cresults.appendChild(a);
            });
        }).catch(function () {});
    }, 500);

    function onClick(e) {
        var t = e.target;
        if (t.closest("[data-lb-menu-toggle]")) toggleMenu();
        else if (t.closest("[data-lb-search-open]")) openSearch();
        else if (t.closest("[data-lb-search-close]")) closeSearch();
        else if (t.closest("[data-lb-search-mode]")) setMode(t.closest("[data-lb-search-mode]").getAttribute("data-lb-search-mode"));
        else if (t === modal) closeSearch(); // backdrop
    }
    function onKey(e) { if (e.key === "Escape" && !modal.hidden) closeSearch(); }
    function onSubmit() { closeSearch(); }

    nav.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    cq.addEventListener("input", searchComments);
    modal.querySelector("form").addEventListener("submit", onSubmit);
    return function () {
        nav.removeEventListener("click", onClick);
        document.removeEventListener("keydown", onKey);
    };
});

// ---- prose: copy-code buttons + KaTeX (Post page, home formula) ----
up.compiler(".lb-prose, .lb-matrix", function (el) {
    var md = el.getAttribute("data-md");
    if (md !== null) initDbProse(el, JSON.parse(md));
    else initProse(el);
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
