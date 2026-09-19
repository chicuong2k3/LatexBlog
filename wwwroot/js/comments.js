// ---- auth, comments, likes, share, profile: Supabase-backed, vanilla + Unpoly compilers
// Config: window.__SUPABASE__ (appsettings.json via App.razor). Empty => disabled.
(function () {
    var cfg = window.__SUPABASE__ || null;

    function configured() {
        return !!(cfg && cfg.url && cfg.anonKey);
    }

    // Toastify-based success toast (load Toastify via App.razor CDN)
    function lbToast(text) {
        if (typeof Toastify === "undefined") return;
        Toastify({
            text: text,
            duration: 2600,
            gravity: "bottom",
            position: "right",
            className: "lb-toast",
            style: {
                background: "var(--surface)",
                color: "var(--ink)",
                border: "1px solid var(--neon)",
                borderRadius: "8px",
                boxShadow: "0 12px 32px -14px rgba(0,0,0,.55)",
                fontSize: ".92rem",
                fontWeight: 600,
                padding: "10px 18px",
            },
        }).showToast();
    }

    var sbPromise = null;
    function loadSupabase() {
        if (!configured()) return Promise.reject(new Error("supabase not configured"));
        if (sbPromise) return sbPromise;
        sbPromise = new Promise(function (resolve, reject) {
            if (typeof window.supabase !== "undefined") {
                resolve(window.supabase.createClient(cfg.url, cfg.anonKey));
                return;
            }
            var s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
            s.onload = function () { resolve(window.supabase.createClient(cfg.url, cfg.anonKey)); };
            s.onerror = function () { sbPromise = null; reject(new Error("không tải được supabase-js")); };
            document.head.appendChild(s);
        });
        return sbPromise;
    }

    function escapeHtml(s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    // Turn "@Display Name" into a link to that person's profile. Operates on
    // text nodes only so it can never rewrite an attribute or a tag.
    function linkifyMentions(html, people) {
        var names = Object.keys(people || {});
        if (!names.length || !html) return html;
        names.sort(function (a, b) { return b.length - a.length; });  // longest first
        var re = new RegExp("@(" + names.map(function (n) {
            return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }).join("|") + ")", "g");
        var wrap = document.createElement("div");
        wrap.innerHTML = html;
        var walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT);
        var nodes = [], n;
        while ((n = walker.nextNode())) {
            if (n.parentNode.closest("a, code, pre")) continue;
            if (re.test(n.nodeValue)) nodes.push(n);
            re.lastIndex = 0;
        }
        nodes.forEach(function (node) {
            var frag = document.createDocumentFragment();
            var text = node.nodeValue, last = 0, m;
            re.lastIndex = 0;
            while ((m = re.exec(text))) {
                if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
                var a = document.createElement("a");
                a.className = "lb-mention";
                a.href = "/u/" + people[m[1]];
                a.textContent = "@" + m[1];
                frag.appendChild(a);
                last = m.index + m[0].length;
            }
            if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
            node.parentNode.replaceChild(frag, node);
        });
        return wrap.innerHTML;
    }

    function stripHtml(html) {
        return String(html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
    }

    // Optimistic read of supabase-js' persisted session (key: sb-<ref>-auth-token).
    // Only pre-paints the header; init() still verifies via getSession().
    function cachedSessionUser() {
        if (!configured()) return null;
        try {
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (!/^sb-.*-auth-token$/.test(k)) continue;
                var v = JSON.parse(localStorage.getItem(k));
                var u = v && (v.user || (v.currentSession && v.currentSession.user));
                if (u && u.id) return u;
            }
        } catch (e) { /* corrupt or blocked storage: fall back to the async path */ }
        return null;
    }

    // ---- rich text editor (dùng chung cho comment / reply / note) ----
    // Toolbar buttons carry data-rte-cmd / data-rte-val; one delegated listener runs them.
    function rteExec(btn) {
        var cmd = btn.getAttribute("data-rte-cmd"), val = btn.getAttribute("data-rte-val");
        var area = btn.closest(".lb-rte").querySelector(".lb-rte__area");
        if (cmd === "formatBlock" && val) {
            toggleBlock(area, String(val).replace(/[<>]/g, "").toLowerCase());
        } else {
            document.execCommand(cmd, false, val || null);
        }
        if (area) area.focus();
        syncRteToolbar();
    }
    document.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest("[data-rte-cmd]");
        if (btn) rteExec(btn);
    });
    // keep the editor's selection when a toolbar button is pressed
    document.addEventListener("mousedown", function (e) {
        if (e.target.closest && e.target.closest(".lb-rte__toolbar")) e.preventDefault();
    });

    // formatBlock (pre/blockquote) isn't a native toggle like bold/italic —
    // execCommand("formatBlock", false, "<p>") to turn it back off is flaky
    // across browsers, so detect + unwrap it ourselves via the DOM instead.
    function toggleBlock(area, tag) {
        var sel = window.getSelection();
        if (!area || !sel.rangeCount) return;
        var node = sel.anchorNode;
        var el = node && (node.nodeType === 1 ? node : node.parentNode);
        var block = el && el.closest ? el.closest(tag) : null;
        if (block && area.contains(block)) {
            var p = document.createElement("p");
            p.innerHTML = block.innerHTML;
            block.replaceWith(p);
            var range = document.createRange();
            range.selectNodeContents(p);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        } else {
            document.execCommand("formatBlock", false, "<" + tag + ">");
        }
    }

    // Toolbar active state, read back from each button's data-rte-cmd / data-rte-val.
    function rteCmdState(cmd, val) {
        try {
            if (cmd === "formatBlock") {
                var tag = String(val || "").replace(/[<>]/g, "").toLowerCase();
                var sel = window.getSelection();
                var node = sel && sel.anchorNode;
                var el = node && (node.nodeType === 1 ? node : node.parentNode);
                return !!(el && el.closest && el.closest(tag));
            }
            return document.queryCommandState(cmd);
        } catch (err) { return false; }
    }

    function syncRteToolbar() {
        var sel = window.getSelection();
        var node = sel && sel.anchorNode;
        var el = node && (node.nodeType === 1 ? node : node.parentNode);
        var area = el && el.closest && el.closest(".lb-rte__area");
        if (!area) return;
        var btns = area.closest(".lb-rte").querySelectorAll("[data-rte-cmd]");
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle("is-active",
                rteCmdState(btns[i].getAttribute("data-rte-cmd"), btns[i].getAttribute("data-rte-val")));
        }
    }
    document.addEventListener("selectionchange", syncRteToolbar);

    // Render nội dung: rich HTML (mới) hoặc markdown (comment cũ).
    // Rich HTML: sanitize + KaTeX cho marker .lb-math[data-tex].
    function renderComment(body) {
        var s = String(body || "");
        if (/<\w/.test(s)) {
            var html = s;
            if (typeof DOMPurify !== "undefined") html = DOMPurify.sanitize(html);
            if (typeof katex !== "undefined" && /lb-math/.test(html)) {
                var wrap = document.createElement("div");
                wrap.innerHTML = html;
                wrap.querySelectorAll(".lb-math[data-tex]").forEach(function (el) {
                    try {
                        el.outerHTML = katex.renderToString(el.getAttribute("data-tex"), { displayMode: false, throwOnError: false });
                    } catch (e) { el.textContent = "$" + el.getAttribute("data-tex") + "$"; }
                });
                html = wrap.innerHTML;
            }
            return html;
        }
        if (typeof marked === "undefined") return "<p>" + escapeHtml(body) + "</p>";
        var math = [];
        var text = String(body || "").replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, function (m, d, i) {
            var idx = math.length;
            math.push({ tex: d || i, display: !!d });
            return '<span class="lb-math-marker" data-i="' + idx + '"></span>';
        });
        var html;
        try { html = marked.parse(text); }
        catch (e) { return "<p>" + escapeHtml(body) + "</p>"; }
        if (typeof DOMPurify !== "undefined") html = DOMPurify.sanitize(html);
        html = html.replace(/<span class="lb-math-marker" data-i="(\d+)"><\/span>/g, function (m, i) {
            var mth = math[+i];
            if (!mth) return "";
            try { return katex.renderToString(mth.tex, { displayMode: mth.display, throwOnError: false }); }
            catch (e) { return "$" + mth.tex + "$"; }
        });
        return html;
    }

    // flat rows -> tối đa 2 cấp (top-level + reply), kiểu Facebook:
    // reply vào reply sẽ đính vào comment gốc (depth 1). rootId dùng để chèn local.
    function buildThread(rows) {
        var byId = {};
        rows.forEach(function (r) { byId[r.id] = r; });
        var roots = [];
        rows.forEach(function (r) {
            var parent = r.parent_id && byId[r.parent_id] ? byId[r.parent_id] : null;
            if (!parent) { r.depth = 0; roots.push(r); }
            else {
                var root = (!parent.parent_id || !byId[parent.parent_id]) ? parent : byId[parent.parent_id];
                r.depth = 1;
                root.replies = root.replies || [];
                root.replies.push(r);
            }
        });
        var out = [];
        roots.forEach(function (r) {
            r.rootId = r.id;
            out.push(r);
            (r.replies || []).forEach(function (c) { c.rootId = r.id; out.push(c); });
        });
        return out;
    }

    // ============ highlight engine (tìm đoạn text trong bài) ============
    function findTextRange(root, needle) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var nodes = [], full = "";
        while (walker.nextNode()) { nodes.push(walker.currentNode); full += walker.currentNode.textContent; }
        var idx = full.indexOf(needle);
        if (idx === -1) return null;
        var startNode = null, startOff = 0, endNode = null, endOff = 0, acc = 0;
        for (var i = 0; i < nodes.length; i++) {
            var len = nodes[i].textContent.length;
            if (startNode === null && idx < acc + len) { startNode = nodes[i]; startOff = idx - acc; }
            if (idx + needle.length <= acc + len) { endNode = nodes[i]; endOff = idx + needle.length - acc; break; }
            acc += len;
        }
        if (!startNode || !endNode) return null;
        var range = document.createRange();
        range.setStart(startNode, startOff);
        range.setEnd(endNode, endOff);
        return range;
    }

    function applyHighlight(root, h) {
        var range = findTextRange(root, h.quote);
        if (!range) return;
        var mark = document.createElement("mark");
        mark.className = "lb-hl";
        mark.setAttribute("data-id", h.id);
        mark.setAttribute("data-note", h.note || "");
        try {
            var frag = range.extractContents();
            mark.appendChild(frag);
            range.insertNode(mark);
        } catch (e) { /* selection đã thay đổi */ }
    }

    // ================= shared auth store (replaces Alpine.store("auth")) =================
    // Supabase persists the session in localStorage; read it synchronously so the header
    // paints the signed-in state immediately instead of flashing "sign in" until
    // getSession() resolves (~500ms).
    var cached = cachedSessionUser();
    var cachedMd = (cached && cached.user_metadata) || {};
    var readyResolve;
    var auth = {
        enabled: configured(),
        ready: false,
        signedIn: !!cached,
        displayName: cachedMd.full_name || cachedMd.name || (cached && cached.email) || "",
        avatar: cachedMd.avatar_url || "",
        userId: (cached && cached.id) || "",
        email: (cached && cached.email) || "",
        isAdmin: false,
        _started: false,
        _listeners: [],
        _readyPromise: new Promise(function (r) { readyResolve = r; }),
        onChange: function (fn) {
            var l = this._listeners; l.push(fn);
            return function () { var i = l.indexOf(fn); if (i !== -1) l.splice(i, 1); };
        },
        changed: function () {
            paintAuth(document);
            this._listeners.slice().forEach(function (fn) { fn(); });
        },
        markReady: function () { this.ready = true; readyResolve(); this.changed(); },
        init: function () {
            var self = this;
            if (this._started) return;
            this._started = true;
            if (!this.enabled) { this.markReady(); return; }
            loadSupabase()
                .then(function (sb) {
                    return sb.auth.getSession().then(function (res) {
                        // no live session: undo the optimistic localStorage seed
                        if (!(res.data && res.data.session)) { self.clear(); self.markReady(); return; }
                        var user = res.data.session.user;
                        var md = (user && user.user_metadata) || {};
                        var fallbackName = md.full_name || md.name || user.email || "";
                        var fallbackAvatar = md.avatar_url || "";
                        // ensure a profile row exists (users created before the trigger)
                        return sb.from("profiles")
                            .upsert({ id: user.id, display_name: fallbackName, avatar_url: fallbackAvatar },
                                { onConflict: "id", ignoreDuplicates: true })
                            .then(function () {
                                return sb.from("profiles").select("display_name, avatar_url, is_admin").eq("id", user.id).maybeSingle();
                            })
                            .then(function (p) { self.applyUser(user, p.data); self.markReady(); });
                    });
                })
                .catch(function () { self.markReady(); });
        },
        whenReady: function () { return this._readyPromise; },
        applyUser: function (user, profile) {
            this.signedIn = true;
            this.userId = user.id;
            this.email = user.email || "";
            this.isAdmin = !!(profile && profile.is_admin);
            var md = (user && user.user_metadata) || {};
            var id = (user && user.identities && user.identities[0] && user.identities[0].identity_data) || {};
            this.displayName = (profile && profile.display_name) || md.full_name || md.name || user.email || "";
            this.avatar = (profile && profile.avatar_url) || md.avatar_url || id.avatar_url || "";
        },
        signIn: function () {
            loadSupabase()
                .then(function (sb) {
                    return sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.href } });
                })
                .catch(function () {});
        },
        clear: function () {
            this.signedIn = false; this.displayName = ""; this.avatar = ""; this.userId = ""; this.email = ""; this.isAdmin = false;
        },
        signOut: function () {
            var self = this;
            loadSupabase()
                .then(function (sb) { return sb.auth.signOut(); })
                .then(function () { self.clear(); self.changed(); lbToast("Đã đăng xuất."); })
                .catch(function () {});
        },
    };

    // data-auth="in|out|admin" shows an element by auth state; data-auth-text / data-auth-src
    // bind a field of the store. Painted on every auth change and on every swapped fragment.
    function paintOne(el) {
        var want = el.getAttribute("data-auth");
        if (want) {
            var on = want === "in" ? auth.enabled && auth.signedIn
                : want === "out" ? auth.enabled && !auth.signedIn
                : want === "admin" ? auth.enabled && auth.signedIn && auth.isAdmin
                : false;
            el.hidden = !on;
        }
        var f = el.getAttribute("data-auth-text");
        if (f) el.textContent = auth[f] || "";
        f = el.getAttribute("data-auth-src");
        if (f) { if (auth[f]) { el.src = auth[f]; el.style.display = ""; } else el.removeAttribute("src"); }
    }
    function paintAuth(root) {
        root.querySelectorAll("[data-auth], [data-auth-text], [data-auth-src]").forEach(paintOne);
    }
    up.compiler("[data-auth], [data-auth-text], [data-auth-src]", paintOne);
    up.compiler("[data-auth-action]", function (el) {
        function onClick() { el.getAttribute("data-auth-action") === "sign-out" ? auth.signOut() : auth.signIn(); }
        el.addEventListener("click", onClick);
        return function () { el.removeEventListener("click", onClick); };
    });
    auth.init();

    function setDisabled(root, on) {
        root.querySelectorAll("[data-busy-disable]").forEach(function (b) { b.disabled = on; });
    }
    function fmtDate(s) { return new Date(s).toLocaleDateString("vi-VN"); }
    function caretToEnd(area) {
        area.focus();
        var range = document.createRange();
        range.selectNodeContents(area);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // ================= comments (cursor pagination + editor) =================
    up.compiler(".lb-comments[data-slug]", function (root) {
        var slug = root.getAttribute("data-slug");
        var st = {
            posting: false, loadingMore: false, comments: [], topTotal: 0, topLoaded: 0,
            hasMore: false, lastTop: null, replyTarget: null,
            // display_name -> user id, filled by mergeProfiles; used to turn "@Ten Nguoi" in a
            // comment body into a profile link.
            // ponytail: only covers people who appear on this page; a mention of a stranger
            // stays plain text.
            people: {},
        };
        lbShow(root.querySelector("[data-f=off]"), !configured());
        lbShow(root.querySelector("[data-f=on]"), configured());
        if (!configured()) return;

        var list = root.querySelector("[data-f=list]");
        var errorBox = root.querySelector("[data-f=error]");
        var loadingEl = root.querySelector("[data-f=loading]");
        var emptyEl = root.querySelector("[data-f=empty]");
        var moreBtn = root.querySelector("[data-act=more]");
        var mainArea = root.querySelector('.lb-rte__area[data-rte="main"]');

        function setError(msg) {
            errorBox.querySelector("[data-f=error-text]").textContent = msg || "";
            lbShow(errorBox, !!msg);
        }
        function setLoading(on) { lbShow(loadingEl, on); paintFooter(); }
        function paintFooter() {
            lbShow(moreBtn, st.hasMore);
            moreBtn.disabled = st.loadingMore;
            moreBtn.querySelector("[data-f=remaining]").textContent = "(" + (st.topTotal - st.topLoaded) + ")";
            lbShow(emptyEl, loadingEl.hidden && !st.comments.length);
        }
        function renderBody(body) { return linkifyMentions(renderComment(body), st.people); }
        function canEdit(c) {
            if (!c || !auth.signedIn) return false;
            if (c.user_id !== auth.userId) return false;
            var age = Date.now() - new Date(c.created_at).getTime();
            return age >= 0 && age < 5 * 60 * 1000;
        }
        function byId(id) { return st.comments.find(function (x) { return x.id === id; }); }

        function renderItem(c) {
            var li = lbTpl(root, "comment");
            li.id = "comment-" + c.id;
            li.setAttribute("data-id", c.id);
            li.style.marginLeft = (c.depth * 34) + "px";
            var img = li.querySelector("[data-f=avatar]");
            if (c.avatar_url) img.src = c.avatar_url;
            var author = li.querySelector("[data-f=author]");
            author.href = "/u/" + c.user_id;
            author.textContent = c.author_name;
            li.querySelector("[data-f=when]").textContent = fmtDate(c.created_at);
            lbShow(li.querySelector("[data-f=edited]"), !!c.edited_at);
            li.querySelector("[data-f=body]").innerHTML = renderBody(c.body);
            lbShow(li.querySelector("[data-f=actions]"), auth.signedIn);
            lbShow(li.querySelector("[data-act=delete]"), auth.isAdmin);
            lbShow(li.querySelector("[data-act=edit]"), canEdit(c));
            var reply = li.querySelector("[data-act=reply]");
            lbShow(reply, c.user_id !== auth.userId);
            reply.textContent = st.replyTarget === c.id ? "Hủy" : "Trả lời";
            lbShow(li.querySelector("[data-f=replyform]"), st.replyTarget === c.id);
            return li;
        }
        function render() {
            list.innerHTML = "";
            st.comments.forEach(function (c) { list.appendChild(renderItem(c)); });
            paintFooter();
        }

        // Notifications link to /posts/<slug>#comment-<id>. Comments are paginated, so keep
        // pulling pages until the target is loaded, then scroll to it and flash it.
        function jumpToHash() {
            var m = /^#comment-([0-9a-fA-F-]+)$/.exec(location.hash || "");
            if (!m) return;
            var id = m[1];
            if (!byId(id)) {
                if (!st.hasMore || !st.lastTop) return;
                return loadPage(st.lastTop.created_at).then(jumpToHash);
            }
            var el = document.getElementById("comment-" + id);
            if (!el) return;
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("is-target");
            setTimeout(function () { el.classList.remove("is-target"); }, 2500);
        }

        // cursor pagination: top-level mới nhất trước; mỗi trang + toàn bộ reply của chúng
        function loadPage(cursor) {
            var PAGE = 3;
            return loadSupabase().then(function (sb) {
                var q = sb.from("comments")
                    .select("id, user_id, author_name, avatar_url, body, created_at, parent_id")
                    .eq("post_slug", slug)
                    .is("parent_id", null)
                    .order("created_at", { ascending: false })
                    .order("id", { ascending: false })
                    .limit(PAGE);
                if (cursor) q = q.lt("created_at", cursor);
                var countQ = sb.from("comments").select("id", { count: "exact" })
                    .eq("post_slug", slug).is("parent_id", null);
                return Promise.all([q, countQ]);
            }).then(function (res) {
                var topRes = res[0], countRes = res[1];
                st.topTotal = countRes.count || 0;
                if (topRes.error) { setError(topRes.error.message); setLoading(false); return; }
                var tops = topRes.data || [];
                if (!tops.length) { setLoading(false); return; }
                var ids = tops.map(function (t) { return t.id; });
                return loadSupabase().then(function (sb) {
                    return sb.from("comments")
                        .select("id, user_id, author_name, avatar_url, body, created_at, parent_id")
                        .in("parent_id", ids).order("created_at", { ascending: true });
                }).then(function (repRes) {
                    var rows = tops.concat(repRes.data || []);
                    return mergeProfiles(rows).then(function () {
                        var batch = buildThread(rows);
                        st.comments = cursor ? st.comments.concat(batch) : batch;
                        st.lastTop = tops[tops.length - 1];
                        st.topLoaded += tops.length;
                        st.hasMore = st.topLoaded < st.topTotal;
                        lbShow(loadingEl, false);
                        render();
                        if (repRes.error) setError(repRes.error.message);
                    });
                });
            });
        }
        function loadMore() {
            if (!st.hasMore || st.loadingMore || !st.lastTop) return;
            st.loadingMore = true; paintFooter();
            loadPage(st.lastTop.created_at)
                .then(function () { st.loadingMore = false; paintFooter(); })
                .catch(function (e) { st.loadingMore = false; paintFooter(); setError(e.message); });
        }

        // profile hiện tại (tên/avatar đã sửa) đè lên snapshot lúc bình luận
        function mergeProfiles(rows) {
            var uids = [];
            rows.forEach(function (r) { if (r.user_id && uids.indexOf(r.user_id) === -1) uids.push(r.user_id); });
            if (!uids.length) return Promise.resolve();
            return loadSupabase().then(function (sb) {
                return sb.from("profiles").select("id, display_name, avatar_url").in("id", uids);
            }).then(function (pr) {
                var prof = {};
                (pr.data || []).forEach(function (p) {
                    prof[p.id] = p;
                    if (p.display_name) st.people[p.display_name] = p.id;
                });
                rows.forEach(function (r) {
                    var p = prof[r.user_id];
                    if (p) {
                        if (p.display_name) r.author_name = p.display_name;
                        if (p.avatar_url) r.avatar_url = p.avatar_url;
                    }
                });
            });
        }

        function insert(text, parentId) {
            st.posting = true; setDisabled(root, true); setError("");
            loadSupabase()
                .then(function (sb) {
                    var row = { post_slug: slug, body: text };
                    if (parentId) row.parent_id = parentId;
                    return sb.from("comments").insert(row).select();
                })
                .then(function (res) {
                    st.posting = false; setDisabled(root, false);
                    if (res.error) { setError(res.error.message); return; }
                    st.replyTarget = null;
                    if (mainArea) mainArea.innerHTML = "";
                    lbToast("Đã gửi bình luận!");
                    var row = res.data && res.data[0];
                    if (row) insertLocally(row, parentId);
                    else loadPage(null);
                })
                .catch(function (e) { st.posting = false; setDisabled(root, false); setError(e.message); });
        }
        // chèn comment mới vào danh sách đang hiển thị (không cần tải lại)
        function insertLocally(row, parentId) {
            mergeProfiles([row]).then(function () {
                if (!parentId) {
                    row.depth = 0; row.rootId = row.id;
                    st.comments.unshift(row); // mới nhất lên đầu
                    st.topLoaded++; st.topTotal++;
                } else {
                    var parent = byId(parentId);
                    var rootId = parent ? parent.rootId : null;
                    if (rootId) {
                        row.depth = 1; row.rootId = rootId;
                        var idx = -1;
                        st.comments.forEach(function (c, i) { if (c.rootId === rootId) idx = i; });
                        st.comments.splice(idx + 1, 0, row);
                    } else {
                        st.comments.unshift(row);
                    }
                }
                render();
            });
        }
        function openReply(li, c) {
            if (st.replyTarget && st.replyTarget !== c.id) closeReply();
            st.replyTarget = c.id;
            li.querySelector("[data-act=reply]").textContent = "Hủy";
            lbShow(li.querySelector("[data-f=replyform]"), true);
            var ra = li.querySelector("[data-f=replyform] .lb-rte__area");
            ra.innerHTML = c.author_name ? "@" + escapeHtml(c.author_name) + "<br><br>" : "";
            caretToEnd(ra);
        }
        function closeReply() {
            var li = st.replyTarget && list.querySelector('[data-id="' + st.replyTarget + '"]');
            st.replyTarget = null;
            if (!li) return;
            li.querySelector("[data-act=reply]").textContent = "Trả lời";
            lbShow(li.querySelector("[data-f=replyform]"), false);
        }
        function startEdit(li, c) {
            var form = li.querySelector("[data-f=editform]");
            form.querySelector(".lb-rte__area").innerHTML = c.body;
            lbShow(form, true);
        }
        function cancelEdit(li) { lbShow(li.querySelector("[data-f=editform]"), false); }
        function saveEdit(li, c) {
            var body = li.querySelector("[data-f=editform] .lb-rte__area").innerHTML;
            if (!stripHtml(body).trim() || st.posting) return;
            st.posting = true; setDisabled(root, true); setError("");
            loadSupabase()
                .then(function (sb) { return sb.rpc("edit_comment", { p_id: c.id, p_body: body }); })
                .then(function (res) {
                    st.posting = false; setDisabled(root, false);
                    if (res.error) { setError(res.error.message); return; }
                    var row = res.data;
                    if (row) { c.body = row.body; c.edited_at = row.edited_at; }
                    li.replaceWith(renderItem(c));
                    lbToast("Đã sửa bình luận!");
                })
                .catch(function (e) { st.posting = false; setDisabled(root, false); setError(e.message); });
        }
        function adminDelete(c) {
            loadSupabase()
                .then(function (sb) { return sb.rpc("admin_delete_comment", { p_id: c.id }); })
                .then(function (res) {
                    if (res.error) { setError(res.error.message); return; }
                    st.comments = st.comments.filter(function (x) { return x.id !== c.id; });
                    render();
                    lbToast("Đã xóa bình luận!");
                })
                .catch(function (e) { setError(e.message); });
        }

        function onClick(e) {
            var btn = e.target.closest("[data-act]");
            if (!btn || !root.contains(btn)) return;
            var act = btn.getAttribute("data-act");
            if (act === "more") { loadMore(); return; }
            var li = btn.closest(".lb-comment");
            var c = li && byId(li.getAttribute("data-id"));
            if (!c) return;
            if (act === "delete") adminDelete(c);
            else if (act === "edit") startEdit(li, c);
            else if (act === "cancel-edit") cancelEdit(li);
            else if (act === "reply") st.replyTarget === c.id ? closeReply() : openReply(li, c);
        }
        function onSubmit(e) {
            var form = e.target;
            var which = form.getAttribute("data-form");
            if (!which) return;
            e.preventDefault();
            var li = form.closest(".lb-comment");
            if (which === "main") {
                var text = mainArea.innerHTML;
                if (!stripHtml(text).trim() || st.posting) return;
                insert(text, null);
            } else if (which === "reply") {
                var body = form.querySelector(".lb-rte__area").innerHTML;
                if (!stripHtml(body).trim() || st.posting) return;
                insert(body, li.getAttribute("data-id"));
            } else if (which === "edit") {
                saveEdit(li, byId(li.getAttribute("data-id")));
            }
        }
        // signing in/out changes which action buttons each comment shows
        var off = auth.onChange(function () { if (st.comments.length) render(); });

        root.addEventListener("click", onClick);
        // capture phase: Unpoly also listens for submit on every form (submitSelectors = 'form')
        root.addEventListener("submit", onSubmit, true);
        loadSupabase()
            .then(function () { return loadPage(null); })
            .then(jumpToHash)
            .catch(function (e) { setError(e.message); setLoading(false); });
        return function () {
            off();
            root.removeEventListener("click", onClick);
            root.removeEventListener("submit", onSubmit, true);
        };
    });

    // ================= notifications (nav bell) =================
    up.compiler(".lb-notif", function (root) {
        var list = [], unread = 0, timer = null;
        var panel = root.querySelector(".lb-notif__panel");
        var toggleBtn = root.querySelector("[data-act=notif-toggle]");
        var badge = root.querySelector(".lb-notif__badge");
        var items = root.querySelector("[data-f=items]");
        var readAll = root.querySelector("[data-act=read-all]");

        function paint() {
            badge.textContent = unread;
            lbShow(badge, unread > 0);
            lbShow(readAll, unread > 0);
            lbShow(root.querySelector("[data-f=empty]"), !list.length);
            items.innerHTML = "";
            list.forEach(function (n) {
                var a = lbTpl(root, "notif");
                a.href = "/posts/" + n.post_slug + (n.comment_id ? "#comment-" + n.comment_id : "");
                a.classList.toggle("is-unread", !n.read);
                a.setAttribute("data-id", n.id);
                var img = a.querySelector("[data-f=avatar]");
                if (n.actor_avatar) img.src = n.actor_avatar;
                a.querySelector("[data-f=name]").textContent = n.actor_name;
                a.querySelector("[data-f=text]").textContent = n.type === "reply" ? "đã trả lời bình luận của bạn" : "đã nhắc đến bạn";
                a.querySelector("[data-f=when]").textContent = fmtDate(n.created_at);
                items.appendChild(a);
            });
        }
        function load() {
            if (!auth.signedIn) return;
            loadSupabase()
                .then(function (sb) {
                    return sb.from("notifications").select("*")
                        .eq("user_id", auth.userId)
                        .order("created_at", { ascending: false }).limit(20);
                })
                .then(function (res) {
                    if (res.error) return;
                    list = res.data || [];
                    unread = list.filter(function (n) { return !n.read; }).length;
                    paint();
                })
                .catch(function () {});
        }
        function setOpen(open) {
            lbShow(panel, open);
            toggleBtn.setAttribute("aria-expanded", String(open));
            if (open) load();
        }
        // Mark read before following the link: a fire-and-forget update gets cancelled by
        // the navigation, which is why they stayed unread.
        function openItem(a, ev) {
            var n = list.find(function (x) { return String(x.id) === a.getAttribute("data-id"); });
            if (!n || n.read) return;
            ev.preventDefault();
            ev.stopPropagation();
            var href = a.getAttribute("href");
            loadSupabase()
                .then(function (sb) { return sb.from("notifications").update({ read: true }).eq("id", n.id); })
                .catch(function () {})
                .then(function () {
                    n.read = true;
                    unread = Math.max(0, unread - 1);
                    window.location.href = href;
                });
        }
        function markAllRead() {
            loadSupabase()
                .then(function (sb) {
                    return sb.from("notifications").update({ read: true })
                        .eq("user_id", auth.userId).eq("read", false);
                })
                .then(function () {
                    unread = 0;
                    list.forEach(function (n) { n.read = true; });
                    paint();
                })
                .catch(function () {});
        }
        function onClick(e) {
            if (e.target.closest("[data-act=notif-toggle]")) { setOpen(panel.hidden); return; }
            if (e.target.closest("[data-act=read-all]")) { markAllRead(); return; }
            var a = e.target.closest(".lb-notif__item");
            if (a) openItem(a, e);
        }
        function onDocClick(e) { if (!root.contains(e.target) && !panel.hidden) setOpen(false); }

        root.addEventListener("click", onClick, true);
        document.addEventListener("click", onDocClick);
        auth.whenReady().then(function () {
            if (!auth.signedIn) return;
            load();
            timer = setInterval(function () { if (auth.signedIn) load(); }, 90000);
        });
        return function () {
            clearInterval(timer);
            root.removeEventListener("click", onClick, true);
            document.removeEventListener("click", onDocClick);
        };
    });

    // ================= annotations (tô sáng + ghi chú đoạn bài) =================
    up.compiler(".lb-post-page[data-slug]", function (article) {
        if (!configured()) return;
        var slug = article.getAttribute("data-slug");
        var menu = article.querySelector(".lb-hlmenu");
        var noteBox = article.querySelector(".lb-hlnote");
        var noteArea = noteBox.querySelector(".lb-rte__area");
        var view = article.querySelector(".lb-noteview");
        var viewShow = view.querySelector("[data-f=view]");
        var viewEdit = view.querySelector("[data-f=edit]");
        var pendingRange = null, pendingQuote = "", byId = {}, noteView = null;

        function openMenu(x, y) {
            menu.style.left = x + "px";
            menu.style.top = y + "px";
            lbShow(menu, true);
            lbShow(noteBox, false);
        }
        function closeMenu() { lbShow(menu, false); }
        function viewNote(h) {
            noteView = h;
            viewShow.querySelector("[data-f=body]").innerHTML = renderComment(h.note);
            lbShow(viewShow, true);
            lbShow(viewEdit, false);
            lbShow(view, true);
        }
        function closeNoteView() { noteView = null; lbShow(view, false); }
        function startEditNote() {
            viewEdit.querySelector(".lb-rte__area").innerHTML = noteView.note || "";
            lbShow(viewShow, false);
            lbShow(viewEdit, true);
        }
        function saveEditNote() {
            var html = viewEdit.querySelector(".lb-rte__area").innerHTML;
            loadSupabase().then(function (sb) {
                return sb.from("highlights").update({ note: html })
                    .eq("id", noteView.id).eq("user_id", auth.userId);
            }).then(function (res) {
                if (res.error) return;
                noteView.note = html;
                lbToast("Đã lưu ghi chú!");
                var m = document.querySelector('.lb-hl[data-id="' + noteView.id + '"]');
                if (m) m.setAttribute("data-note", html);
                viewNote(noteView);
            }).catch(function () {});
        }
        function load() {
            loadSupabase().then(function (sb) {
                return sb.from("highlights").select("*")
                    .eq("post_slug", slug).eq("user_id", auth.userId);
            }).then(function (res) {
                if (res.error || !res.data) return;
                byId = {};
                res.data.forEach(function (h) {
                    byId[h.id] = h;
                    applyHighlight(article, h);
                });
            }).catch(function () {});
        }
        function save(note) {
            loadSupabase().then(function (sb) {
                return sb.from("highlights").insert({
                    post_slug: slug,
                    user_id: auth.userId,
                    quote: pendingQuote,
                    note: note || "",
                }).select();
            }).then(function (res) {
                if (res.error) return;
                var row = res.data && res.data[0];
                if (row) byId[row.id] = row;
                if (row && pendingRange) {
                    var mark = document.createElement("mark");
                    mark.className = "lb-hl";
                    mark.setAttribute("data-id", row.id);
                    mark.setAttribute("data-note", row.note || "");
                    try {
                        var frag = pendingRange.extractContents();
                        mark.appendChild(frag);
                        pendingRange.insertNode(mark);
                    } catch (e) {}
                }
                closeMenu();
                lbShow(noteBox, false);
                noteArea.innerHTML = "";
                window.getSelection().removeAllRanges();
            }).catch(function () {});
        }
        function shareQuote() {
            var url = window.location.href.split("#")[0] + "#:~:text=" + encodeURIComponent(pendingQuote);
            navigator.clipboard.writeText(url)
                .then(function () { lbToast("Đã chép liên kết đoạn!"); })
                .catch(function () {});
            closeMenu();
        }
        function openNote() {
            closeMenu();
            noteArea.innerHTML = "";
            lbShow(noteBox, true);
        }

        // chuột phải khi có chọn text trong bài -> menu tô sáng / ghi chú
        function onContextMenu(e) {
            var prose = e.target && e.target.closest ? e.target.closest(".lb-prose") : null;
            if (!prose || !article.contains(prose)) return;
            var sel = window.getSelection();
            if (!sel || sel.isCollapsed) return;
            if (!prose.contains(sel.anchorNode) || !prose.contains(sel.focusNode)) return;
            e.preventDefault();
            if (!auth.signedIn) { auth.signIn(); return; }
            var quote = sel.toString().trim().slice(0, 500);
            if (!quote) return;
            pendingQuote = quote;
            pendingRange = sel.getRangeAt(0).cloneRange();
            openMenu(e.clientX, e.clientY);
        }
        function onDocClick(e) {
            var t = e.target;
            var act = t.closest && t.closest("[data-act]");
            if (act && (menu.contains(act) || noteBox.contains(act) || view.contains(act))) {
                switch (act.getAttribute("data-act")) {
                    case "hl-highlight": save(""); return;
                    case "hl-note": openNote(); return;
                    case "hl-share": shareQuote(); return;
                    case "note-save": save(noteArea.innerHTML); return;
                    case "note-cancel": lbShow(noteBox, false); return;
                    case "view-edit": startEditNote(); return;
                    case "view-close": closeNoteView(); return;
                    case "view-save": saveEditNote(); return;
                    case "view-cancel": viewNote(noteView); return;
                }
            }
            if (!menu.contains(t)) closeMenu();
            if (!noteBox.hidden && !noteBox.contains(t)) lbShow(noteBox, false);
            var m = t.closest ? t.closest(".lb-hl") : null;
            if (m && m.getAttribute("data-note")) {
                var h = byId[m.getAttribute("data-id")];
                if (h) { viewNote(h); return; }
            }
            if (!view.hidden && !view.contains(t)) closeNoteView();
        }
        // mobile/touch: there's no right-click, so also open the menu once a selection
        // inside .lb-prose settles (debounced — selectionchange fires continuously while
        // dragging the native selection handles)
        var onSelection = lbDebounce(function () {
            var sel = window.getSelection();
            if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
            var range = sel.getRangeAt(0);
            var anchor = range.commonAncestorContainer;
            var anchorEl = anchor.nodeType === 1 ? anchor : anchor.parentNode;
            var prose = anchorEl && anchorEl.closest ? anchorEl.closest(".lb-prose") : null;
            if (!prose || !article.contains(prose)) return;
            var quote = sel.toString().trim().slice(0, 500);
            if (!quote) return;
            if (!auth.signedIn) return;
            var rect = range.getBoundingClientRect();
            pendingQuote = quote;
            pendingRange = range.cloneRange();
            openMenu(rect.left + rect.width / 2, rect.bottom + 6);
        }, 350);

        auth.whenReady().then(function () { if (auth.signedIn) load(); });
        document.addEventListener("contextmenu", onContextMenu);
        document.addEventListener("click", onDocClick);
        document.addEventListener("selectionchange", onSelection);
        return function () {
            document.removeEventListener("contextmenu", onContextMenu);
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("selectionchange", onSelection);
        };
    });

    // ================= like + share (post page) =================
    up.compiler(".lb-actions[data-slug]", function (root) {
        var slug = root.getAttribute("data-slug");
        var title = root.getAttribute("data-title") || "";
        var likes = 0, liked = false;
        var likeBtn = root.querySelector("[data-act=like]");
        var share = root.querySelector(".lb-share");
        var shareBtn = root.querySelector("[data-act=share]");
        var shareWrap = root.querySelector(".lb-actions__sharewrap");

        function paint() {
            likeBtn.classList.toggle("lb-actions__btn--liked", liked);
            lbShow(likeBtn.querySelector("[data-f=heart-off]"), !liked);
            lbShow(likeBtn.querySelector("[data-f=heart-on]"), liked);
            likeBtn.querySelector("[data-f=likes]").textContent = likes;
        }
        function enc(s) { return encodeURIComponent(s); }
        var here = window.location.href;
        root.querySelector("[data-share=facebook]").href = "https://www.facebook.com/sharer/sharer.php?u=" + enc(here);
        root.querySelector("[data-share=x]").href = "https://twitter.com/intent/tweet?url=" + enc(here) + "&text=" + enc(title);
        root.querySelector("[data-share=whatsapp]").href = "https://api.whatsapp.com/send?text=" + enc(title + " " + here);
        paint();

        loadSupabase()
            .then(function (sb) {
                var viewedKey = "lb-viewed-" + slug;
                var inc = sessionStorage.getItem(viewedKey)
                    ? Promise.resolve(null)
                    : sb.rpc("increment_views", { p_slug: slug })
                        .then(function () { sessionStorage.setItem(viewedKey, "1"); });
                return inc.then(function () {
                    return sb.from("post_views").select("views").eq("post_slug", slug).maybeSingle();
                }).then(function (vres) {
                    if (vres.data) root.querySelector("[data-f=views]").textContent = vres.data.views;
                    return sb.from("post_likes").select("user_id", { count: "exact" }).eq("post_slug", slug);
                });
            })
            .then(function (res) {
                likes = res.count || 0;
                paint();
                return loadSupabase().then(function (sb) { return sb.auth.getUser(); });
            })
            .then(function (ures) {
                if (!ures.data.user) return;
                return loadSupabase().then(function (sb) {
                    return sb.from("post_likes").select("user_id")
                        .eq("post_slug", slug).eq("user_id", ures.data.user.id).maybeSingle();
                }).then(function (l) { liked = !!l.data; paint(); });
            })
            .catch(function () {});

        function withUser(fn) {
            return loadSupabase().then(function (sb) {
                return sb.auth.getUser().then(function (r) { return fn(sb, r.data.user.id); });
            });
        }
        function toggleLike() {
            if (!auth.signedIn) { auth.signIn(); return; }
            if (liked) {
                likes--; liked = false; paint();
                withUser(function (sb, uid) { return sb.from("post_likes").delete().eq("post_slug", slug).eq("user_id", uid); })
                    .catch(function () { likes++; liked = true; paint(); });
            } else {
                likes++; liked = true; paint();
                withUser(function (sb, uid) { return sb.from("post_likes").insert({ post_slug: slug, user_id: uid }); })
                    .catch(function () { likes--; liked = false; paint(); });
            }
        }
        function setShare(open) { lbShow(share, open); shareBtn.setAttribute("aria-expanded", String(open)); }
        function onClick(e) {
            var act = e.target.closest("[data-act]");
            if (act) {
                var a = act.getAttribute("data-act");
                if (a === "like") toggleLike();
                else if (a === "share") setShare(true);
                else if (a === "copy-link") {
                    navigator.clipboard.writeText(window.location.href)
                        .then(function () { lbToast("Đã chép liên kết!"); })
                        .catch(function () {});
                    setShare(false);
                }
                return;
            }
            if (e.target.closest("[data-share]")) setShare(false);
        }
        function onDocClick(e) { if (!share.hidden && !shareWrap.contains(e.target)) setShare(false); }
        root.addEventListener("click", onClick);
        document.addEventListener("click", onDocClick);
        return function () {
            root.removeEventListener("click", onClick);
            document.removeEventListener("click", onDocClick);
        };
    });

    // ================= public profile: /u/<user id> =================
    up.compiler(".lb-profile[data-user-id]", function (root) {
        var id = root.getAttribute("data-user-id");
        function done(found) {
            lbShow(root.querySelector("[data-f=loading]"), false);
            lbShow(root.querySelector("[data-f=missing]"), !found);
            lbShow(root.querySelector("[data-f=found]"), found);
        }
        if (!id || !configured()) { done(false); return; }
        loadSupabase()
            .then(function (sb) {
                return sb.from("profiles").select("display_name, avatar_url").eq("id", id).maybeSingle();
            })
            .then(function (res) {
                if (!res.data) { done(false); return; }
                root.querySelector("[data-f=name]").textContent = res.data.display_name || "Ẩn danh";
                var img = root.querySelector("[data-f=avatar]");
                if (res.data.avatar_url) img.src = res.data.avatar_url;
                return loadSupabase().then(function (sb) {
                    return Promise.all([
                        sb.from("comments").select("id, body, post_slug, created_at")
                            .eq("user_id", id).order("created_at", { ascending: false }).limit(10),
                        sb.from("comments").select("id", { count: "exact" }).eq("user_id", id),
                    ]);
                }).then(function (r) {
                    var comments = r[0].data || [];
                    root.querySelector("[data-f=count]").textContent = r[1].count || 0;
                    lbShow(root.querySelector("[data-f=none]"), !comments.length);
                    var list = root.querySelector("[data-f=list]");
                    comments.forEach(function (c) {
                        var li = lbTpl(root, "comment");
                        li.querySelector("[data-f=body]").innerHTML = renderComment(c.body);
                        li.querySelector("[data-f=link]").href = "/posts/" + c.post_slug + "#comment-" + c.id;
                        li.querySelector("[data-f=when]").textContent = fmtDate(c.created_at);
                        list.appendChild(li);
                    });
                    done(true);
                });
            })
            .catch(function () { done(false); });
    });

    // ================= own profile: /profile =================
    up.compiler(".lb-profile[data-profile]", function (root) {
        var file = null, previewUrl = null, highlights = [], started = false;
        var posts = JSON.parse(root.getAttribute("data-posts") || "[]");
        var avatarImg = root.querySelector("[data-f=avatar]");
        var nameInput = root.querySelector("#lb-name");
        var errorEl = root.querySelector("[data-f=error]");
        var fileInput = root.querySelector("input[type=file]");
        var form = root.querySelector(".lb-profile__form");

        function setError(msg) { errorEl.textContent = msg || ""; lbShow(errorEl, !!msg); }
        function setAvatar(url) { if (url) { avatarImg.src = url; avatarImg.style.display = ""; } }
        function postTitle(slug) {
            var p = posts.find(function (x) { return x.slug === slug; });
            return p ? p.title : slug;
        }
        // Derived from the store, not snapshotted: signing out has to flip this page back to
        // the signed-out view without a reload.
        function paint() {
            lbShow(root.querySelector("[data-f=loading]"), !auth.ready);
            lbShow(root.querySelector("[data-f=signin]"), auth.ready && !auth.signedIn);
            lbShow(root.querySelector("[data-f=inner]"), auth.ready && auth.signedIn);
            if (auth.ready && auth.signedIn && !started) start();
        }
        function start() {
            started = true;
            root.querySelector("[data-f=name]").textContent = auth.displayName;
            root.querySelector("[data-f=email]").textContent = auth.email;
            setAvatar(auth.avatar);
            nameInput.value = auth.displayName;
            loadLiked();
            loadHighlights();
            loadStats();
        }
        function loadStats() {
            var uid = auth.userId;
            loadSupabase().then(function (sb) {
                return Promise.all([
                    sb.from("post_likes").select("id", { count: "exact" }).eq("user_id", uid),
                    sb.from("comments").select("id", { count: "exact" }).eq("user_id", uid),
                    sb.from("highlights").select("id", { count: "exact" }).eq("user_id", uid),
                ]);
            }).then(function (res) {
                root.querySelector("[data-f=stat-liked]").textContent = res[0].count || 0;
                root.querySelector("[data-f=stat-comments]").textContent = res[1].count || 0;
                root.querySelector("[data-f=stat-highlights]").textContent = res[2].count || 0;
            }).catch(function () {});
        }
        function download(name, text) {
            var blob = new Blob([text], { type: "application/json" });
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = name;
            a.click();
            URL.revokeObjectURL(a.href);
        }
        function exportRows(table, cols, name) {
            loadSupabase().then(function (sb) {
                return sb.from(table).select(cols)
                    .eq("user_id", auth.userId).order("created_at", { ascending: false });
            }).then(function (res) { if (!res.error) download(name, JSON.stringify(res.data, null, 2)); })
              .catch(function () {});
        }
        function renderHighlights() {
            var list = root.querySelector("[data-f=hl-list]");
            list.innerHTML = "";
            lbShow(root.querySelector("[data-f=hl-empty]"), !highlights.length);
            highlights.forEach(function (h) {
                var item = lbTpl(root, "highlight");
                item.setAttribute("data-id", h.id);
                item.querySelector("[data-f=quote]").textContent = h.quote;
                var note = item.querySelector("[data-f=note]");
                lbShow(note, !!h.note);
                // notes are rich text (DOMPurify-sanitized in renderComment), not plain text
                note.querySelector("[data-f=note-html]").innerHTML = renderComment(h.note);
                var a = item.querySelector("[data-f=post]");
                a.href = "/posts/" + h.post_slug;
                a.textContent = postTitle(h.post_slug);
                list.appendChild(item);
            });
        }
        function loadHighlights() {
            loadSupabase()
                .then(function (sb) {
                    return sb.from("highlights").select("*")
                        .eq("user_id", auth.userId)
                        .order("created_at", { ascending: false }).limit(50);
                })
                .then(function (res) {
                    if (res.error) return;
                    highlights = res.data || [];
                    renderHighlights();
                })
                .catch(function () {});
        }
        function deleteHighlight(id) {
            loadSupabase()
                .then(function (sb) {
                    return sb.from("highlights").delete().eq("id", id).eq("user_id", auth.userId);
                })
                .then(function () {
                    highlights = highlights.filter(function (h) { return String(h.id) !== id; });
                    renderHighlights();
                })
                .catch(function () {});
        }
        function loadLiked() {
            loadSupabase()
                .then(function (sb) {
                    return sb.from("post_likes").select("post_slug").eq("user_id", auth.userId);
                })
                .then(function (res) {
                    var slugs = (res.data || []).map(function (d) { return d.post_slug; });
                    var liked = posts.filter(function (p) { return slugs.indexOf(p.slug) !== -1; });
                    var list = root.querySelector("[data-f=liked-list]");
                    list.innerHTML = "";
                    lbShow(root.querySelector("[data-f=liked-empty]"), !liked.length);
                    liked.forEach(function (p) {
                        var card = lbTpl(root, "liked");
                        var a = card.querySelector("[data-f=title]");
                        a.href = "/posts/" + p.slug;
                        a.textContent = p.title;
                        card.querySelector("[data-f=summary]").textContent = p.summary;
                        card.querySelector("[data-f=date]").textContent = p.date;
                        list.appendChild(card);
                    });
                })
                .catch(function () {});
        }
        function onFile(e) {
            var f = e.target.files && e.target.files[0];
            if (!f) return;
            file = f;
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            previewUrl = URL.createObjectURL(f);
            setAvatar(previewUrl);
        }
        function save(e) {
            e.preventDefault();
            var name = nameInput.value.trim();
            if (!name) { setError("Tên không được để trống."); return; }
            var avatar = auth.avatar;
            setDisabled(root, true); setError("");
            var uid = auth.userId;
            loadSupabase()
                .then(function (sb) {
                    if (!file) return sb;
                    var ext = (file.name.split(".").pop() || "png").toLowerCase();
                    var path = uid + "/" + Date.now() + "." + ext;
                    return sb.storage.from("avatars").upload(path, file, { upsert: false })
                        .then(function (res) {
                            if (res.error) throw res.error;
                            avatar = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl;
                            return sb;
                        });
                })
                .then(function (sb) {
                    return sb.from("profiles").upsert({
                        id: uid,
                        display_name: name,
                        avatar_url: avatar,
                        updated_at: new Date().toISOString(),
                    });
                })
                .then(function (res) {
                    setDisabled(root, false);
                    if (res.error) { setError(res.error.message); return; }
                    auth.displayName = name;
                    auth.avatar = avatar;
                    file = null;
                    root.querySelector("[data-f=name]").textContent = name;
                    auth.changed();
                    lbToast("Đã lưu!");
                })
                .catch(function (err) { setDisabled(root, false); setError(err.message); });
        }
        function onClick(e) {
            var act = e.target.closest("[data-act]");
            if (!act) return;
            var a = act.getAttribute("data-act");
            if (a === "export-comments") exportRows("comments", "post_slug, author_name, body, created_at, parent_id", "latexblog-comments.json");
            else if (a === "export-highlights") exportRows("highlights", "post_slug, quote, note, created_at", "latexblog-highlights.json");
            else if (a === "delete-highlight") deleteHighlight(act.closest("[data-id]").getAttribute("data-id"));
        }

        root.addEventListener("click", onClick);
        fileInput.addEventListener("change", onFile);
        // capture phase: Unpoly also listens for submit on every form (submitSelectors = 'form')
        form.addEventListener("submit", save, true);
        var off = auth.onChange(paint);
        paint();
        return function () {
            off();
            root.removeEventListener("click", onClick);
            form.removeEventListener("submit", save, true);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    });


    // exposed for site.js
    window.lbRenderComment = renderComment;
    window.lbLoadSupabase = loadSupabase;
})();
