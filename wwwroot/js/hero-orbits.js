// wwwroot/js/hero-orbits.js
// The hero's Kepler figure: nested ellipses sharing one focus, the way Newton drew them.
// Reached only through the up.compiler in site.js, which is the one thing that knows a
// canvas appeared — three.js is 384 KB and must not cost a post page anything.
//
// Every colour is read from the site's own CSS tokens rather than hardcoded, because
// site.css redefines :root in several appended theme blocks and a hex literal here would
// drift the first time a palette is retuned.

import * as THREE from '/js/vendor/three.module.min.js';

const ORBITS = 7;
const SEGMENTS = 512;
const A_MIN = 2.6, A_MAX = 9.4;
const E_TIGHT = 0.86, E_WIDE = 0.28;
const OPACITY_IN = 0.34, OPACITY_OUT = 0.14;
const TILT_DEG = 2, TILT_STEP_DEG = 3;
const GROUP_TILT_DEG = -14;
const PRECESS_PERIOD_S = 90;
const NODE_PERIOD_S = 24;
const NODE_OPACITY = 0.85;
const NODE_SCALE = 0.42;
const FOG_DENSITY = 0.055;
const CAMERA_Y = 3.2, CAMERA_Z = 12;
const FALLBACK = { bg: '#f4f6fb', neon: '#5367e8', neon2: '#159b9b', neon3: '#2d78c5' };

function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
}

function lerp(a, b, t) { return a + (b - a) * t; }

// x = a(cosE - e) puts the focus at the origin, which is what lets every orbit in the
// family share a single focus instead of a common centre.
function orbitPoint(a, e, E, out) {
    var b = a * Math.sqrt(1 - e * e);
    return out.set(a * (Math.cos(E) - e), 0, b * Math.sin(E));
}

export function mount(canvas) {
    var renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (err) {
        // No WebGL: the CSS gradient underneath is the whole design, so leave it alone.
        canvas.remove();
        return function () {};
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color(token('--bg', FALLBACK.bg)), FOG_DENSITY);

    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, CAMERA_Y, CAMERA_Z);
    camera.lookAt(0, 0, 0);

    var group = new THREE.Group();
    group.rotation.x = GROUP_TILT_DEG * Math.PI / 180;
    scene.add(group);

    var palette = [
        token('--neon', FALLBACK.neon),
        token('--neon-2', FALLBACK.neon2),
        token('--neon-3', FALLBACK.neon3),
    ];
    var owned = [];
    var p = new THREE.Vector3();

    for (var i = 0; i < ORBITS; i++) {
        var t = ORBITS === 1 ? 0 : i / (ORBITS - 1);
        var a = lerp(A_MIN, A_MAX, t);
        var e = lerp(E_TIGHT, E_WIDE, t);
        var pts = new Float32Array(SEGMENTS * 3);
        for (var s = 0; s < SEGMENTS; s++) {
            orbitPoint(a, e, (s / SEGMENTS) * Math.PI * 2, p);
            pts[s * 3] = p.x;
            pts[s * 3 + 1] = p.y;
            pts[s * 3 + 2] = p.z;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        var mat = new THREE.LineBasicMaterial({
            color: new THREE.Color(palette[i % palette.length]),
            transparent: true,
            opacity: lerp(OPACITY_IN, OPACITY_OUT, t),
        });
        var loop = new THREE.LineLoop(geo, mat);
        loop.rotation.x = (TILT_DEG + TILT_STEP_DEG * i) * Math.PI / 180;
        group.add(loop);
        owned.push(geo, mat);
    }

    // One travelling node on the tightest orbit. A sprite, not a mesh: it needs no light
    // and cannot fall outside the palette.
    var nodeMat = new THREE.SpriteMaterial({
        color: new THREE.Color(palette[0]),
        transparent: true,
        opacity: NODE_OPACITY,
    });
    var node = new THREE.Sprite(nodeMat);
    node.scale.setScalar(NODE_SCALE);
    group.add(node);
    owned.push(nodeMat);

    function resize() {
        var w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return;                 // ResizeObserver fires again once it has a size
        renderer.setSize(w, h, false);       // false: CSS owns the display size
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();

    var frames = 0;
    function draw(elapsed) {
        orbitPoint(A_MIN, E_TIGHT, (elapsed / NODE_PERIOD_S) * Math.PI * 2, p);
        node.position.set(p.x, p.y, p.z);
        group.rotation.y = (elapsed / PRECESS_PERIOD_S) * Math.PI * 2;
        renderer.render(scene, camera);
        canvas.dataset.lbFrames = String(++frames);
    }

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var raf = 0, startedAt = 0;
    function tick(now) {
        if (!startedAt) startedAt = now;
        draw((now - startedAt) / 1000);
        if (!reduced) raf = requestAnimationFrame(tick);
    }

    if (reduced) draw(0);
    else raf = requestAnimationFrame(tick);

    // A background tab should not hold a GPU.
    function onVisibility() {
        if (document.hidden) {
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
        } else if (!reduced && !raf) {
            startedAt = 0;
            raf = requestAnimationFrame(tick);
        }
    }
    document.addEventListener('visibilitychange', onVisibility);

    var ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return function dispose() {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        for (var k = 0; k < owned.length; k++) owned[k].dispose();
        renderer.dispose();
    };
}
