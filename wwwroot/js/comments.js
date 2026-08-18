// ---- auth, comments, likes, share, profile: Supabase-backed, Alpine
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
    // Toolbar dùng plain onclick (hoạt động trong mọi component); vùng nhập giữ
    // x-on:input riêng để đồng bộ dữ liệu (body/replyBody/noteText/noteEditHtml).
    function rteExec(e, cmd, val) {
        document.execCommand(cmd, false, val || null);
        var area = e.currentTarget.closest(".lb-rte").querySelector(".lb-rte__area");
        if (area) area.focus();
        syncRteToolbar();
    }

    // Toolbar active state. The command lives in the inline onclick (no data-*
    // attributes on the buttons), so read it back from there.
    function rteCmdState(cmd, val) {
        try {
            if (cmd === "formatBlock") {
                var tag = String(val || "").replace(/[<>]/g, "").toLowerCase();
                return String(document.queryCommandValue("formatBlock")).toLowerCase() === tag;
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
        var btns = area.closest(".lb-rte").querySelectorAll(".lb-editor__btn");
        for (var i = 0; i < btns.length; i++) {
            var m = /rteExec\(event,\s*'([^']+)'(?:,\s*'([^']*)')?/.exec(btns[i].getAttribute("onclick") || "");
            if (m) btns[i].classList.toggle("is-active", rteCmdState(m[1], m[2]));
        }
    }
    document.addEventListener("selectionchange", syncRteToolbar);

    var _rteMathArea = null;
    function openRteMath(e) {
        _rteMathArea = e.currentTarget.closest(".lb-rte").querySelector(".lb-rte__area");
        var popup = document.getElementById("lb-rte-math");
        var input = document.getElementById("lb-rte-math-tex");
        if (popup) popup.classList.add("is-open");
        if (input) { input.value = ""; input.focus(); }
    }
    function insertRteMath() {
        var input = document.getElementById("lb-rte-math-tex");
        var tex = input ? input.value.trim() : "";
        if (tex && _rteMathArea) {
            var marker = document.createElement("span");
            marker.className = "lb-math";
            marker.setAttribute("data-tex", tex);
            var sel = window.getSelection();
            if (sel.rangeCount && _rteMathArea.contains(sel.anchorNode)) {
                var r = sel.getRangeAt(0);
                r.deleteContents();
                r.insertNode(marker);
                r.setStartAfter(marker);
                r.collapse(true);
                sel.removeAllRanges();
                sel.addRange(r);
            } else {
                _rteMathArea.appendChild(marker);
            }
            _rteMathArea.dispatchEvent(new Event("input", { bubbles: true }));
        }
        var popup = document.getElementById("lb-rte-math");
        if (popup) popup.classList.remove("is-open");
    }
    function closeRteMath() {
        var popup = document.getElementById("lb-rte-math");
        if (popup) popup.classList.remove("is-open");
    }

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

    document.addEventListener("alpine:init", function () {
        // ================= shared auth store =================
        // Supabase persists the session in localStorage; read it synchronously so
        // the header paints the signed-in state immediately instead of flashing
        // "sign in" until getSession() resolves (~500ms).
        var cached = cachedSessionUser();
        var cachedMd = (cached && cached.user_metadata) || {};
        Alpine.store("auth", {
            enabled: configured(),
            ready: false,
            signedIn: !!cached,
            displayName: cachedMd.full_name || cachedMd.name || (cached && cached.email) || "",
            avatar: cachedMd.avatar_url || "",
            userId: (cached && cached.id) || "",
            email: (cached && cached.email) || "",
            isAdmin: false,
            _started: false,
            init: function () {
                var self = this;
                if (!this.enabled || this._started) return;
                this._started = true;
                loadSupabase()
                    .then(function (sb) {
                        return sb.auth.getSession().then(function (res) {
                            // no live session: undo the optimistic localStorage seed
                            if (!(res.data && res.data.session)) { self.clear(); self.ready = true; return; }
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
                                .then(function (p) { self.applyUser(user, p.data); self.ready = true; });
                        });
                    })
                    .catch(function () { self.ready = true; });
            },
            whenReady: function () {
                var self = this;
                if (this.ready) return Promise.resolve();
                return new Promise(function (resolve) {
                    var iv = setInterval(function () { if (self.ready) { clearInterval(iv); resolve(); } }, 80);
                });
            },
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
                    .then(function () {
                        self.clear();
                        lbToast("Đã đăng xuất.");
                    })
                    .catch(function () {});
            },
        });

        // ================= comments (cursor pagination + editor) =================
        Alpine.data("comments", function () {
            return {
                configured: configured(),
                loading: true,
                loadingMore: false,
                posting: false,
                body: "",
                replyBody: "",
                replyTarget: null,
                comments: [],
                topTotal: 0,
                topLoaded: 0,
                hasMore: false,
                _lastTop: null,
                preview: false,
                previewHtml: "",
                replyPreview: false,
                replyPreviewHtml: "",
                error: "",
                slug: "",
                // display_name -> user id, filled by mergeProfiles; used to turn
                // "@Ten Nguoi" in a comment body into a profile link.
                // ponytail: only covers people who appear on this page; a mention
                // of a stranger stays plain text.
                _people: {},

                init: function (slug) {
                    // Alpine auto-calls init() (no arg) before x-init; guard it
                    if (!slug) return;
                    this.slug = slug;
                    if (!this.configured) { this.loading = false; return; }
                    var self = this;
                    Alpine.store("auth").init();
                    loadSupabase()
                        .then(function () { return self.loadPage(null); })
                        .then(function () { return self.jumpToHash(); })
                        .catch(function (e) { self.error = e.message; self.loading = false; });
                },

                // Notifications link to /posts/<slug>#comment-<id>. Comments are
                // paginated, so keep pulling pages until the target is loaded,
                // then scroll to it and flash it.
                jumpToHash: function () {
                    var m = /^#comment-([0-9a-fA-F-]+)$/.exec(location.hash || "");
                    if (!m) return;
                    var self = this, id = m[1];
                    var loaded = this.comments.some(function (c) { return c.id === id; });
                    if (!loaded) {
                        if (!this.hasMore || !this._lastTop) return;
                        return this.loadPage(this._lastTop.created_at)
                            .then(function () { return self.jumpToHash(); });
                    }
                    this.$nextTick(function () {
                        var el = document.getElementById("comment-" + id);
                        if (!el) return;
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                        el.classList.add("is-target");
                        setTimeout(function () { el.classList.remove("is-target"); }, 2500);
                    });
                },

                // cursor pagination: top-level mới nhất trước; mỗi trang + toàn bộ reply của chúng
                loadPage: function (cursor) {
                    var self = this;
                    var PAGE = 3;
                    return loadSupabase().then(function (sb) {
                        var q = sb.from("comments")
                            .select("id, user_id, author_name, avatar_url, body, created_at, parent_id")
                            .eq("post_slug", self.slug)
                            .is("parent_id", null)
                            .order("created_at", { ascending: false })
                            .order("id", { ascending: false })
                            .limit(PAGE);
                        if (cursor) q = q.lt("created_at", cursor);
                        var countQ = sb.from("comments").select("id", { count: "exact" })
                            .eq("post_slug", self.slug).is("parent_id", null);
                        return Promise.all([q, countQ]);
                    }).then(function (res) {
                        var topRes = res[0], countRes = res[1];
                        self.topTotal = countRes.count || 0;
                        if (topRes.error) { self.error = topRes.error.message; self.loading = false; return; }
                        var tops = topRes.data || [];
                        if (!tops.length) { self.loading = false; return; }
                        var ids = tops.map(function (t) { return t.id; });
                        return loadSupabase().then(function (sb) {
                            return sb.from("comments")
                                .select("id, user_id, author_name, avatar_url, body, created_at, parent_id")
                                .in("parent_id", ids).order("created_at", { ascending: true });
                        }).then(function (repRes) {
                            var rows = tops.concat(repRes.data || []);
                            return self.mergeProfiles(rows).then(function () {
                                var batch = buildThread(rows);
                                if (cursor) self.comments = self.comments.concat(batch);
                                else self.comments = batch;
                                self._lastTop = tops[tops.length - 1];
                                self.topLoaded += tops.length;
                                self.hasMore = self.topLoaded < self.topTotal;
                                self.loading = false;
                                if (repRes.error) self.error = repRes.error.message;
                            });
                        });
                    });
                },
                loadMore: function () {
                    if (!this.hasMore || this.loadingMore || !this._lastTop) return;
                    this.loadingMore = true;
                    var self = this;
                    this.loadPage(this._lastTop.created_at)
                        .then(function () { self.loadingMore = false; })
                        .catch(function (e) { self.loadingMore = false; self.error = e.message; });
                },

                // profile hiện tại (tên/avatar đã sửa) đè lên snapshot lúc bình luận
                mergeProfiles: function (rows) {
                    var self = this;
                    var uids = [];
                    rows.forEach(function (r) { if (r.user_id && uids.indexOf(r.user_id) === -1) uids.push(r.user_id); });
                    if (!uids.length) return Promise.resolve();
                    return loadSupabase().then(function (sb) {
                        return sb.from("profiles").select("id, display_name, avatar_url").in("id", uids);
                    }).then(function (pr) {
                        var prof = {};
                        (pr.data || []).forEach(function (p) {
                            prof[p.id] = p;
                            if (p.display_name) self._people[p.display_name] = p.id;
                        });
                        rows.forEach(function (r) {
                            var p = prof[r.user_id];
                            if (p) {
                                if (p.display_name) r.author_name = p.display_name;
                                if (p.avatar_url) r.avatar_url = p.avatar_url;
                            }
                        });
                    });
                },

                post: function () {
                    var text = this.body;
                    if (!stripHtml(text).trim() || this.posting) return;
                    this._insert(text, null);
                },
                postReply: function (parentId) {
                    var text = this.replyBody;
                    if (!stripHtml(text).trim() || this.posting) return;
                    this._insert(text, parentId);
                },
                _insert: function (text, parentId) {
                    this.posting = true; this.error = "";
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            var row = { post_slug: self.slug, body: text };
                            if (parentId) row.parent_id = parentId;
                            return sb.from("comments").insert(row).select();
                        })
                        .then(function (res) {
                            self.posting = false;
                            if (res.error) { self.error = res.error.message; return; }
                            self.body = ""; self.replyBody = ""; self.replyTarget = null;
                            var ma = document.querySelector('.lb-rte__area[data-rte="main"]');
                            if (ma) ma.innerHTML = "";
                            var ra = document.querySelector('.lb-rte__area[data-rte="reply"]');
                            if (ra) ra.innerHTML = "";
                            lbToast("Đã gửi bình luận!");
                            var row = res.data && res.data[0];
                            if (row) self.insertLocally(row, parentId);
                            else self.loadPage(null);
                        })
                        .catch(function (e) { self.posting = false; self.error = e.message; });
                },
                // chèn comment mới vào danh sách đang hiển thị (không cần tải lại)
                insertLocally: function (row, parentId) {
                    var self = this;
                    this.mergeProfiles([row]).then(function () {
                        if (!parentId) {
                            row.depth = 0; row.rootId = row.id;
                            self.comments.unshift(row); // mới nhất lên đầu
                            self.topLoaded++; self.topTotal++;
                        } else {
                            var parent = self.comments.find(function (c) { return c.id === parentId; });
                            var rootId = parent ? parent.rootId : null;
                            if (rootId) {
                                row.depth = 1; row.rootId = rootId;
                                var idx = -1;
                                self.comments.forEach(function (c, i) { if (c.rootId === rootId) idx = i; });
                                self.comments.splice(idx + 1, 0, row);
                            } else {
                                self.comments.unshift(row);
                            }
                        }
                    });
                },
                openReply: function (id) {
                    var c = this.comments.find(function (x) { return x.id === id; });
                    this.replyTarget = id;
                    this.replyBody = c && c.author_name ? "@" + c.author_name + " " : "";
                    this.replyPreview = false;
                    var self = this;
                    this.$nextTick(function () {
                        var ra = document.querySelector(".lb-comments__replyform .lb-rte__area");
                        if (ra) ra.innerHTML = self.replyBody;
                    });
                },
                cancelReply: function () { this.replyTarget = null; this.replyBody = ""; this.replyPreview = false; },

                // ---- edit (chỉ trong 5 phút, server-enforced qua RPC) ----
                editingId: null,
                editBody: "",
                canEdit: function (c) {
                    if (!c || !Alpine.store("auth").signedIn) return false;
                    if (c.user_id !== Alpine.store("auth").userId) return false;
                    var age = Date.now() - new Date(c.created_at).getTime();
                    return age >= 0 && age < 5 * 60 * 1000;
                },
                startEdit: function (c) { this.editingId = c.id; this.editBody = c.body; },
                cancelEdit: function () { this.editingId = null; this.editBody = ""; },
                saveEdit: function (c) {
                    if (!stripHtml(this.editBody).trim() || this.posting) return;
                    this.posting = true; this.error = "";
                    var self = this;
                    loadSupabase()
                        .then(function (sb) { return sb.rpc("edit_comment", { p_id: c.id, p_body: self.editBody }); })
                        .then(function (res) {
                            self.posting = false;
                            if (res.error) { self.error = res.error.message; return; }
                            var row = res.data;
                            if (row) { c.body = row.body; c.edited_at = row.edited_at; }
                            self.editingId = null;
                            self.editBody = "";
                            lbToast("Đã sửa bình luận!");
                        })
                        .catch(function (e) { self.posting = false; self.error = e.message; });
                },
                renderBody: function (body) { return linkifyMentions(renderComment(body), this._people); },
                adminDelete: function (c) {
                    var self = this;
                    loadSupabase()
                        .then(function (sb) { return sb.rpc("admin_delete_comment", { p_id: c.id }); })
                        .then(function (res) {
                            if (res.error) { self.error = res.error.message; return; }
                            self.comments = self.comments.filter(function (x) { return x.id !== c.id; });
                            lbToast("Đã xóa bình luận!");
                        })
                        .catch(function (e) { self.error = e.message; });
                },

                // ---- rich text editor (dùng global rteExec/openRteMath; đây chỉ đồng bộ dữ liệu) ----
                rteInput: function (e) {
                    var area = e.currentTarget;
                    if (area.getAttribute("data-rte") === "main") this.body = area.innerHTML;
                    else this.replyBody = area.innerHTML;
                },
            };
        });

        // ================= notifications (nav bell) =================
        Alpine.data("notifications", function () {
            return {
                open: false, unread: 0, list: [],
                init: function () {
                    var self = this;
                    Alpine.store("auth").init();
                    Alpine.store("auth").whenReady().then(function () {
                        if (!Alpine.store("auth").signedIn) return;
                        self.load();
                        setInterval(function () { if (Alpine.store("auth").signedIn) self.load(); }, 90000);
                    });
                },
                load: function () {
                    var self = this;
                    if (!Alpine.store("auth").signedIn) return;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("notifications").select("*")
                                .eq("user_id", Alpine.store("auth").userId)
                                .order("created_at", { ascending: false }).limit(20);
                        })
                        .then(function (res) {
                            if (res.error) return;
                            self.list = res.data || [];
                            self.unread = self.list.filter(function (n) { return !n.read; }).length;
                        })
                        .catch(function () {});
                },
                toggle: function () {
                    this.open = !this.open;
                    if (this.open) this.load();
                },
                // Mark read before following the link: a fire-and-forget update
                // gets cancelled by the navigation, which is why they stayed unread.
                openItem: function (n, ev) {
                    if (n.read) return;
                    ev.preventDefault();
                    var href = ev.currentTarget.getAttribute("href");
                    var self = this;
                    loadSupabase()
                        .then(function (sb) { return sb.from("notifications").update({ read: true }).eq("id", n.id); })
                        .catch(function () {})
                        .then(function () {
                            n.read = true;
                            self.unread = Math.max(0, self.unread - 1);
                            window.location.href = href;
                        });
                },
                markAllRead: function () {
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("notifications").update({ read: true })
                                .eq("user_id", Alpine.store("auth").userId).eq("read", false);
                        })
                        .then(function () {
                            self.unread = 0;
                            self.list.forEach(function (n) { n.read = true; });
                        })
                        .catch(function () {});
                },
            };
        });

        // ================= annotations (tô sáng + ghi chú đoạn bài) =================
        Alpine.data("annotations", function () {
            return {
                configured: configured(),
                slug: "",
                menuOpen: false,
                noteOpen: false,
                noteText: "",
                menuX: 0,
                menuY: 0,
                _pendingRange: null,
                _pendingQuote: "",
                _byId: {},
                noteView: null,
                noteEdit: false,
                noteEditHtml: "",
                init: function (slug) {
                    this.slug = slug;
                    if (!this.configured) return;
                    var self = this;
                    Alpine.store("auth").init();
                    Alpine.store("auth").whenReady().then(function () {
                        if (Alpine.store("auth").signedIn) self.load();
                    });
                    // chuột phải khi có chọn text trong bài -> menu tô sáng / ghi chú
                    document.addEventListener("contextmenu", function (e) {
                        var prose = e.target && e.target.closest ? e.target.closest(".lb-prose") : null;
                        if (!prose) return;
                        var sel = window.getSelection();
                        if (!sel || sel.isCollapsed) return;
                        if (!prose.contains(sel.anchorNode) || !prose.contains(sel.focusNode)) return;
                        e.preventDefault();
                        if (!Alpine.store("auth").signedIn) { Alpine.store("auth").signIn(); return; }
                        var quote = sel.toString().trim().slice(0, 500);
                        if (!quote) return;
                        self._pendingQuote = quote;
                        self._pendingRange = sel.getRangeAt(0).cloneRange();
                        self.menuX = e.clientX;
                        self.menuY = e.clientY;
                        self.menuOpen = true;
                        self.noteOpen = false;
                    });
                    document.addEventListener("click", function () { self.menuOpen = false; });
                    document.addEventListener("click", function (e) {
                        var m = e.target && e.target.closest ? e.target.closest(".lb-hl") : null;
                        if (m && m.getAttribute("data-note")) {
                            var h = self._byId[m.getAttribute("data-id")];
                            if (h) self.viewNote(h);
                        }
                    });
                },
                viewNote: function (h) {
                    this.noteView = h;
                    this.noteEdit = false;
                    this.noteEditHtml = h.note || "";
                },
                closeNoteView: function () { this.noteView = null; this.noteEdit = false; },
                startEditNote: function () { this.noteEdit = true; this.noteEditHtml = this.noteView.note || ""; },
                saveEditNote: function () {
                    var self = this;
                    loadSupabase().then(function (sb) {
                        return sb.from("highlights").update({ note: self.noteEditHtml })
                            .eq("id", self.noteView.id).eq("user_id", Alpine.store("auth").userId);
                    }).then(function (res) {
                        if (res.error) return;
                        self.noteView.note = self.noteEditHtml;
                        self.noteEdit = false;
                        lbToast("Đã lưu ghi chú!");
                        var m = document.querySelector('.lb-hl[data-id="' + self.noteView.id + '"]');
                        if (m) m.setAttribute("data-note", self.noteEditHtml);
                    }).catch(function () {});
                },
                renderNote: function (note) { return renderComment(note); },
                load: function () {
                    var self = this;
                    loadSupabase().then(function (sb) {
                        return sb.from("highlights").select("*")
                            .eq("post_slug", self.slug).eq("user_id", Alpine.store("auth").userId);
                    }).then(function (res) {
                        if (res.error || !res.data) return;
                        var article = document.querySelector(".lb-post-page");
                        if (!article) return;
                        self._byId = {};
                        res.data.forEach(function (h) {
                            self._byId[h.id] = h;
                            applyHighlight(article, h);
                        });
                    }).catch(function () {});
                },
                save: function (note) {
                    var self = this;
                    loadSupabase().then(function (sb) {
                        return sb.from("highlights").insert({
                            post_slug: self.slug,
                            user_id: Alpine.store("auth").userId,
                            quote: self._pendingQuote,
                            note: note || "",
                        }).select();
                    }).then(function (res) {
                        if (res.error) return;
                        var row = res.data && res.data[0];
                        if (row && self._pendingRange) {
                            var mark = document.createElement("mark");
                            mark.className = "lb-hl";
                            mark.setAttribute("data-id", row.id);
                            mark.setAttribute("data-note", row.note || "");
                            try {
                                var frag = self._pendingRange.extractContents();
                                mark.appendChild(frag);
                                self._pendingRange.insertNode(mark);
                            } catch (e) {}
                        }
                        self.menuOpen = false;
                        self.noteOpen = false;
                        self.noteText = "";
                        window.getSelection().removeAllRanges();
                    }).catch(function () {});
                },
                highlight: function () { this.save(""); },
                shareQuote: function () {
                    var url = window.location.href.split("#")[0] + "#:~:text=" + encodeURIComponent(this._pendingQuote);
                    var self = this;
                    navigator.clipboard.writeText(url)
                        .then(function () { lbToast("Đã chép liên kết đoạn!"); })
                        .catch(function () {});
                    this.menuOpen = false;
                },
                openNote: function () {
                    this.menuOpen = false;
                    this.noteOpen = true;
                    this.noteText = "";
                    var a = document.querySelector(".lb-hlnote .lb-rte__area");
                    if (a) a.innerHTML = "";
                },
                cancelNote: function () { this.noteOpen = false; this.noteText = ""; },
                saveNote: function () { this.save(this.noteText); },
            };
        });

        // ================= like + share (post page) =================
        Alpine.data("postActions", function () {
            return {
                slug: "", title: "", likes: 0, liked: false, loading: true,
                views: 0, shareOpen: false,
                init: function (slug, title) {
                    this.slug = slug; this.title = title;
                    var self = this;
                    Alpine.store("auth").init();
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
                                if (vres.data) self.views = vres.data.views;
                                return sb.from("post_likes").select("user_id", { count: "exact" }).eq("post_slug", slug);
                            });
                        })
                        .then(function (res) {
                            self.likes = res.count || 0;
                            self.loading = false;
                            return loadSupabase().then(function (sb) { return sb.auth.getUser(); });
                        })
                        .then(function (ures) {
                            if (!ures.data.user) return;
                            return loadSupabase().then(function (sb) {
                                return sb.from("post_likes").select("user_id")
                                    .eq("post_slug", self.slug).eq("user_id", ures.data.user.id).maybeSingle();
                            }).then(function (l) { self.liked = !!l.data; });
                        })
                        .catch(function () { self.loading = false; });
                },
                toggleLike: function () {
                    if (!Alpine.store("auth").signedIn) { Alpine.store("auth").signIn(); return; }
                    if (this.liked) { this.likes--; this.liked = false; this._unlike(); }
                    else { this.likes++; this.liked = true; this._like(); }
                },
                _like: function () {
                    var self = this;
                    loadSupabase().then(function (sb) { return sb.auth.getUser(); })
                        .then(function (r) { var uid = r.data.user.id; return loadSupabase().then(function (sb) { return sb.from("post_likes").insert({ post_slug: self.slug, user_id: uid }); }); })
                        .catch(function () { self.likes--; self.liked = false; });
                },
                _unlike: function () {
                    var self = this;
                    loadSupabase().then(function (sb) { return sb.auth.getUser(); })
                        .then(function (r) { var uid = r.data.user.id; return loadSupabase().then(function (sb) { return sb.from("post_likes").delete().eq("post_slug", self.slug).eq("user_id", uid); }); })
                        .catch(function () { self.likes++; self.liked = true; });
                },
                share: function () { this.shareOpen = true; },
                copyLink: function () {
                    navigator.clipboard.writeText(window.location.href)
                        .then(function () { lbToast("Đã chép liên kết!"); })
                        .catch(function () {});
                },
                enc: function (s) { return encodeURIComponent(s); },
            };
        });

        // public profile: /u/<user id>
        Alpine.data("publicProfile", function () {
            return {
                loading: true, found: false,
                displayName: "", avatar: "", commentCount: 0, comments: [],
                init: function (id) {
                    if (!id || !configured()) { this.loading = false; return; }
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("profiles").select("display_name, avatar_url").eq("id", id).maybeSingle();
                        })
                        .then(function (res) {
                            if (!res.data) { self.loading = false; return; }
                            self.found = true;
                            self.displayName = res.data.display_name || "Ẩn danh";
                            self.avatar = res.data.avatar_url || "";
                            return loadSupabase().then(function (sb) {
                                return Promise.all([
                                    sb.from("comments").select("id, body, post_slug, created_at")
                                        .eq("user_id", id).order("created_at", { ascending: false }).limit(10),
                                    sb.from("comments").select("id", { count: "exact" }).eq("user_id", id),
                                ]);
                            }).then(function (r) {
                                self.comments = r[0].data || [];
                                self.commentCount = r[1].count || 0;
                            });
                        })
                        .then(function () { self.loading = false; })
                        .catch(function () { self.loading = false; });
                },
                renderBody: function (body) { return renderComment(body); },
            };
        });

        Alpine.data("profile", function () {
            return {
                loading: true,
                // Derived, not snapshotted: signing out has to flip this page back
                // to the signed-out view without a reload.
                get signedIn() { return Alpine.store("auth").signedIn; },
                displayName: "", email: "", avatar: "",
                nameInput: "", file: null, saving: false, error: "",
                likedPosts: [],
                highlights: [],
                stats: { liked: 0, comments: 0, highlights: 0 },
                init: function () {
                    var self = this;
                    Alpine.store("auth").init();
                    Alpine.store("auth").whenReady().then(function () {
                        self.loading = false;
                        var s = Alpine.store("auth");
                        if (!s.signedIn) return;
                        self.displayName = s.displayName;
                        self.avatar = s.avatar;
                        self.nameInput = s.displayName;
                        self.email = s.email;
                        self.loadLiked();
                        self.loadHighlights();
                        self.loadStats();
                    });
                },
                // notes are rich text (DOMPurify-sanitized in renderComment), not plain text
                renderNote: function (note) { return renderComment(note); },
                loadStats: function () {
                    var self = this;
                    var uid = Alpine.store("auth").userId;
                    loadSupabase().then(function (sb) {
                        return Promise.all([
                            sb.from("post_likes").select("id", { count: "exact" }).eq("user_id", uid),
                            sb.from("comments").select("id", { count: "exact" }).eq("user_id", uid),
                            sb.from("highlights").select("id", { count: "exact" }).eq("user_id", uid),
                        ]);
                    }).then(function (res) {
                        self.stats.liked = res[0].count || 0;
                        self.stats.comments = res[1].count || 0;
                        self.stats.highlights = res[2].count || 0;
                    }).catch(function () {});
                },
                exportComments: function () {
                    var self = this;
                    loadSupabase().then(function (sb) {
                        return sb.from("comments").select("post_slug, author_name, body, created_at, parent_id")
                            .eq("user_id", Alpine.store("auth").userId).order("created_at", { ascending: false });
                    }).then(function (res) { if (!res.error) self.download("latexblog-comments.json", JSON.stringify(res.data, null, 2)); })
                      .catch(function () {});
                },
                exportHighlights: function () {
                    var self = this;
                    loadSupabase().then(function (sb) {
                        return sb.from("highlights").select("post_slug, quote, note, created_at")
                            .eq("user_id", Alpine.store("auth").userId).order("created_at", { ascending: false });
                    }).then(function (res) { if (!res.error) self.download("latexblog-highlights.json", JSON.stringify(res.data, null, 2)); })
                      .catch(function () {});
                },
                download: function (name, text) {
                    var blob = new Blob([text], { type: "application/json" });
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = name;
                    a.click();
                    URL.revokeObjectURL(a.href);
                },
                loadHighlights: function () {
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("highlights").select("*")
                                .eq("user_id", Alpine.store("auth").userId)
                                .order("created_at", { ascending: false }).limit(50);
                        })
                        .then(function (res) {
                            if (res.error) return;
                            self.highlights = res.data || [];
                        })
                        .catch(function () {});
                },
                deleteHighlight: function (id) {
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("highlights").delete().eq("id", id).eq("user_id", Alpine.store("auth").userId);
                        })
                        .then(function () {
                            self.highlights = self.highlights.filter(function (h) { return h.id !== id; });
                        })
                        .catch(function () {});
                },
                postTitle: function (slug) {
                    var posts = window.__POSTS__ || [];
                    var p = posts.find(function (x) { return x.slug === slug; });
                    return p ? p.title : slug;
                },
                loadLiked: function () {
                    var self = this;
                    loadSupabase()
                        .then(function (sb) {
                            return sb.from("post_likes").select("post_slug").eq("user_id", Alpine.store("auth").userId);
                        })
                        .then(function (res) {
                            var slugs = (res.data || []).map(function (d) { return d.post_slug; });
                            var posts = window.__POSTS__ || [];
                            self.likedPosts = posts.filter(function (p) { return slugs.indexOf(p.slug) !== -1; });
                        })
                        .catch(function () {});
                },
                onFile: function (e) {
                    var f = e.target.files && e.target.files[0];
                    if (!f) return;
                    this.file = f;
                    if (this._previewUrl) URL.revokeObjectURL(this._previewUrl);
                    this._previewUrl = URL.createObjectURL(f);
                    this.avatar = this._previewUrl;
                },
                save: function () {
                    var self = this;
                    if (!this.nameInput.trim()) { this.error = "Tên không được để trống."; return; }
                    this.saving = true; this.error = "";
                    var uid = Alpine.store("auth").userId;
                    loadSupabase()
                        .then(function (sb) {
                            var chain = Promise.resolve(sb);
                            if (self.file) {
                                var ext = (self.file.name.split(".").pop() || "png").toLowerCase();
                                var path = uid + "/" + Date.now() + "." + ext;
                                chain = sb.storage.from("avatars").upload(path, self.file, { upsert: false })
                                    .then(function (res) {
                                        if (res.error) throw res.error;
                                        var pub = sb.storage.from("avatars").getPublicUrl(path);
                                        self.avatar = pub.data.publicUrl;
                                        return sb;
                                    });
                            }
                            return chain;
                        })
                        .then(function (sb) {
                            return sb.from("profiles").upsert({
                                id: uid,
                                display_name: self.nameInput.trim(),
                                avatar_url: self.avatar,
                                updated_at: new Date().toISOString(),
                            });
                        })
                        .then(function (res) {
                            self.saving = false;
                            if (res.error) { self.error = res.error.message; return; }
                            Alpine.store("auth").displayName = self.nameInput.trim();
                            Alpine.store("auth").avatar = self.avatar;
                            self.displayName = self.nameInput.trim();
                            self.file = null;
                            lbToast("Đã lưu!");
                        })
                        .catch(function (e) { self.saving = false; self.error = e.message; });
                },
            };
        });
    });

    // exposed for site.js / inline handlers
    window.lbRenderComment = renderComment;
    window.lbLoadSupabase = loadSupabase;
    window.rteExec = rteExec;
    window.openRteMath = openRteMath;
    window.insertRteMath = insertRteMath;
    window.closeRteMath = closeRteMath;
})();
