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

    // TOC scrollspy - consumed by Post page (Task 10)
    Alpine.data("tocSpy", () => ({
        activeId: "",
        init(el) {
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
});

// ---- copy-code buttons + KaTeX rendering - consumed by Post page (Task 10)
function initProse(root) {
    root.querySelectorAll("pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code || pre.querySelector("[data-copy-code]")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "db-button db-button--sm db-post__copy";
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
        pre.classList.add("db-post__codeblock");
        pre.appendChild(btn);
    });
    // Render math: pandoc --katex keeps raw TeX in `math inline` spans,
    // so client-side auto-render is required (verified in Task 5).
    if (window.renderMathInElement) {
        renderMathInElement(root, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "\\(", right: "\\)", display: false },
            ],
        });
    }
}
