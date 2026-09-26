(function () {
  "use strict";

  /* ---------- page chrome ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navLinks = {};
  document.querySelectorAll(".nav-links a").forEach(function (a) { navLinks[a.dataset.section] = a; });

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = navLinks[e.target.id];
        if (link) link.classList.toggle("active", e.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navLinks).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  function flashSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }
  Object.keys(navLinks).forEach(function (id) {
    navLinks[id].addEventListener("click", function () { flashSection(id); });
  });

  /* ---------- breakout ---------- */
  var canvas = document.getElementById("game");
  var stage = document.getElementById("stage");
  var ctx = canvas.getContext("2d");
  var W = 800, H = 600;               // virtual resolution, scaled to fit the stage
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var C = {
    bg: "#0d1014",
    brick: "#161c23",
    brickLine: "#28313c",
    accent: "#08fdd8",
    pink: "#ff3d7f",
    text: "#e8edf2",
    muted: "#6b7684"
  };

  var SECTIONS = {
    EXPERIENCE: { id: "experience", title: "Experience", text: "Now at Cashfree Payments. Before that: Samsung (Connectivity-AI) and Microland, working on C router APIs, MERN dashboards and conversational AI." },
    INTERESTS:  { id: "interests",  title: "Interests",  text: "Physics, singing, sketching, gaming, and cracking codes and ciphers." },
    EDUCATION:  { id: "education",  title: "Education",  text: "B.E. in Biotechnology from BIT Mesra, Ranchi." },
    PROJECTS:   { id: "projects",   title: "Projects",   text: "chess-video: turns chess PGN files into Instagram-ready 1080×1920 MP4 reels, right in the browser." },
    SKILLS:     { id: "skills",     title: "Skills",     text: "Backend first: Node.js, C/C++, Python, React, Redux, OpenWrt and FastCGI." }
  };
  // [row, col] -> label, matching the original layout
  var LABELS = { "0,0": "EXPERIENCE", "1,2": "INTERESTS", "1,4": "EDUCATION", "2,3": "PROJECTS", "3,1": "SKILLS" };

  var ROWS = 4, COLS = 5, GAP, SIDE, TOP, BH, BW, LABEL_FONT, compact = null;

  // Wide stages use an 800x600 board; phones get a taller 400x533 board so labels stay legible.
  function layout(isCompact) {
    compact = isCompact;
    stage.classList.toggle("compact", compact);
    W = compact ? 400 : 800;
    H = compact ? 533 : 600;
    SIDE = compact ? 12 : 24;
    GAP = compact ? 6 : 10;
    TOP = compact ? 24 : 36;
    BH = compact ? 34 : 40;
    BW = (W - SIDE * 2 - GAP * (COLS - 1)) / COLS;
    LABEL_FONT = compact ? "500 10px 'JetBrains Mono', monospace" : "500 15px 'JetBrains Mono', monospace";
  }
  function bx(b) { return SIDE + b.c * (BW + GAP); }
  function by(b) { return TOP + b.r * (BH + GAP); }
  function placePaddle() {
    var w = compact ? 90 : 130;
    paddle = { w: w, h: 14, x: W / 2 - w / 2, y: H - 40, speed: W * 0.9 };
  }
  layout(canvas.getBoundingClientRect().width < 520);

  var paddle, ball, bricks, particles, lives, unlocked, state, keys = {};
  var elLives = document.getElementById("lives");
  var elUnlocked = document.getElementById("unlocked");
  var overlay = document.getElementById("overlay");
  var ovKicker = document.getElementById("overlay-kicker");
  var ovTitle = document.getElementById("overlay-title");
  var ovText = document.getElementById("overlay-text");
  var ovGo = document.getElementById("overlay-go");
  var ovResume = document.getElementById("overlay-resume");

  function newGame() {
    placePaddle();
    bricks = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        bricks.push({ r: r, c: c, label: LABELS[r + "," + c] || null, alive: true });
      }
    }
    particles = [];
    lives = 3;
    unlocked = 0;
    Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("unlocked"); });
    resetBall();
    hideOverlay();
    updateHud();
    state = "ready";
  }

  function resetBall() {
    ball = { r: compact ? 7 : 9, x: paddle.x + paddle.w / 2, y: paddle.y - 10, vx: 0, vy: 0, speed: H * 0.76 };
  }

  function launch() {
    if (state === "ready") {
      var angle = (-90 + (Math.random() * 50 - 25)) * Math.PI / 180;
      ball.vx = Math.cos(angle) * ball.speed;
      ball.vy = Math.sin(angle) * ball.speed;
      state = "playing";
    } else if (state === "paused") {
      hideOverlay();
      state = "playing";
    } else if (state === "over") {
      newGame();
    }
  }

  function updateHud() {
    elLives.textContent = "♥".repeat(lives) + "♡".repeat(3 - lives);
    elUnlocked.textContent = unlocked;
  }

  function showOverlay(kicker, title, text, sectionId, resumeLabel) {
    ovKicker.textContent = kicker;
    ovTitle.textContent = title;
    ovText.textContent = text;
    ovGo.hidden = !sectionId;
    if (sectionId) ovGo.setAttribute("href", "#" + sectionId);
    ovGo.dataset.section = sectionId || "";
    ovResume.textContent = resumeLabel;
    overlay.hidden = false;
  }
  function hideOverlay() { overlay.hidden = true; }

  ovGo.addEventListener("click", function () { flashSection(ovGo.dataset.section); });
  ovResume.addEventListener("click", function () { launch(); canvas.focus({ preventScroll: true }); });

  /* ---------- physics ---------- */
  function step(dt) {
    var dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    if (dir) paddle.x += dir * paddle.speed * dt;
    paddle.x = Math.max(8, Math.min(W - paddle.w - 8, paddle.x));

    if (state === "ready") {
      ball.x = paddle.x + paddle.w / 2;
      ball.y = paddle.y - ball.r - 1;
    }

    if (state === "playing") {
      var dist = Math.hypot(ball.vx, ball.vy) * dt;
      var n = Math.max(1, Math.ceil(dist / 4)); // sub-step so the ball never tunnels
      for (var i = 0; i < n && state === "playing"; i++) moveBall(dt / n);
    }

    for (var p = particles.length - 1; p >= 0; p--) {
      var q = particles[p];
      q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 600 * dt; q.life -= dt;
      if (q.life <= 0) particles.splice(p, 1);
    }
  }

  function moveBall(dt) {
    var px = ball.x, py = ball.y;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.x < ball.r) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
    if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); }
    if (ball.y < ball.r) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }

    // paddle: bounce angle depends on where the ball lands
    if (ball.vy > 0 && ball.y + ball.r >= paddle.y && py + ball.r <= paddle.y + 2 &&
        ball.x >= paddle.x - ball.r && ball.x <= paddle.x + paddle.w + ball.r) {
      var hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      hit = Math.max(-1, Math.min(1, hit));
      var a = (-90 + hit * 60) * Math.PI / 180;
      ball.speed = Math.min(ball.speed + 8, H * 1.2);
      ball.vx = Math.cos(a) * ball.speed;
      ball.vy = Math.sin(a) * ball.speed;
      ball.y = paddle.y - ball.r;
    }

    for (var i = 0; i < bricks.length; i++) {
      var b = bricks[i];
      if (!b.alive) continue;
      var x0 = bx(b), y0 = by(b);
      var cx = Math.max(x0, Math.min(ball.x, x0 + BW));
      var cy = Math.max(y0, Math.min(ball.y, y0 + BH));
      if ((ball.x - cx) * (ball.x - cx) + (ball.y - cy) * (ball.y - cy) > ball.r * ball.r) continue;

      var wasOutsideX = px < x0 - ball.r + 1 || px > x0 + BW + ball.r - 1;
      if (wasOutsideX) { ball.vx = -ball.vx; ball.x = px; } else { ball.vy = -ball.vy; ball.y = py; }
      breakBrick(b);
      break;
    }

    if (ball.y - ball.r > H) loseLife();
  }

  function breakBrick(b) {
    b.alive = false;
    burst(bx(b) + BW / 2, by(b) + BH / 2,b.label ? C.accent : C.muted, b.label ? 26 : 12);
    if (!b.label) {
      if (bricks.every(function (x) { return !x.alive; })) {
        state = "over";
        showOverlay("board cleared", "Nice run.", "Every brick is down. Scroll on for the full resume, or play again.", "experience", "Play again");
      }
      return;
    }
    var s = SECTIONS[b.label];
    unlocked++;
    if (navLinks[s.id]) navLinks[s.id].classList.add("unlocked");
    updateHud();
    state = "paused";
    showOverlay(unlocked === 5 ? "5 / 5 unlocked · all sections found" : "unlocked " + unlocked + " / 5",
      s.title, s.text, s.id, "Keep playing");
  }

  function loseLife() {
    lives--;
    updateHud();
    if (lives <= 0) {
      state = "over";
      showOverlay("game over", "Out of balls.", "You unlocked " + unlocked + " of 5 sections. Everything is also listed below.", "experience", "Play again");
      return;
    }
    resetBall();
    state = "ready";
  }

  function burst(x, y, color, count) {
    if (reduceMotion) return;
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2, v = 80 + Math.random() * 260;
      particles.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120, life: 0.5 + Math.random() * 0.4, color: color });
    }
  }

  /* ---------- rendering ---------- */
  function rr(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw(t) {
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    // faint grid
    ctx.strokeStyle = "rgba(255,255,255,0.025)";
    ctx.lineWidth = 1;
    for (var gx = 40; gx < W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
    for (var gy = 40; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

    var pulse = reduceMotion ? 0.6 : 0.45 + 0.35 * Math.sin(t / 400);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = LABEL_FONT;
    bricks.forEach(function (b) {
      if (!b.alive) return;
      var x0 = bx(b), y0 = by(b);
      rr(x0, y0, BW, BH, 7);
      if (b.label) {
        ctx.fillStyle = "rgba(8,253,216,0.10)";
        ctx.fill();
        ctx.shadowColor = C.accent;
        ctx.shadowBlur = 14 * pulse;
        ctx.strokeStyle = C.accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = C.accent;
        ctx.fillText(b.label, x0 + BW / 2, y0 + BH / 2 + 1);
      } else {
        ctx.fillStyle = C.brick;
        ctx.fill();
        ctx.strokeStyle = C.brickLine;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    particles.forEach(function (q) {
      ctx.globalAlpha = Math.max(0, q.life / 0.9);
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x - 2, q.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;

    // paddle
    var grad = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.w, 0);
    grad.addColorStop(0, C.accent);
    grad.addColorStop(1, "#7cf7ff");
    rr(paddle.x, paddle.y, paddle.w, paddle.h, 7);
    ctx.shadowColor = C.accent;
    ctx.shadowBlur = 18;
    ctx.fillStyle = grad;
    ctx.fill();

    // ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = C.accent;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (state === "ready") {
      ctx.fillStyle = C.text;
      ctx.globalAlpha = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t / 300);
      ctx.font = compact ? "500 15px 'JetBrains Mono', monospace" : "500 18px 'JetBrains Mono', monospace";
      ctx.fillText(compact ? "space or tap to launch" : lives < 3 ? "press space to relaunch" : "press space or start", W / 2, H - 110);
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.muted;
      ctx.font = compact ? "12px 'JetBrains Mono', monospace" : "14px 'JetBrains Mono', monospace";
      ctx.fillText(compact ? "break a glowing brick" : "break a glowing brick to unlock a section", W / 2, H - 80);
    }
  }

  /* ---------- sizing ---------- */
  function resize() {
    var rect = canvas.getBoundingClientRect();
    var isCompact = rect.width < 520;
    if (isCompact !== compact) {
      // Board geometry changed: rescale paddle and ball into the new coordinate space.
      var px = (paddle.x + paddle.w / 2) / W, bxr = ball.x / W, byr = ball.y / H, sv = 1;
      layout(isCompact);
      var oldBall = ball;
      placePaddle();
      paddle.x = px * W - paddle.w / 2;
      resetBall();
      if (state === "playing" || state === "paused") {
        sv = ball.speed / oldBall.speed;
        ball.x = bxr * W; ball.y = byr * H; ball.vx = oldBall.vx * sv; ball.vy = oldBall.vy * sv;
      }
    }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  }
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);

  /* ---------- input ---------- */
  function gameInView() {
    var r = canvas.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }
  function typingTarget(el) {
    return el && (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "INPUT" || el.tagName === "TEXTAREA");
  }

  window.addEventListener("keydown", function (e) {
    if (!gameInView()) return;
    var k = e.key;
    if (k === "ArrowLeft" || k === "a" || k === "A") { keys.left = true; if (state !== "over") e.preventDefault(); }
    else if (k === "ArrowRight" || k === "d" || k === "D") { keys.right = true; if (state !== "over") e.preventDefault(); }
    else if ((k === " " || k === "Enter") && !typingTarget(document.activeElement)) { e.preventDefault(); launch(); }
  });
  window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
  });
  window.addEventListener("blur", function () { keys = {}; });

  function pointerX(e) {
    var r = canvas.getBoundingClientRect();
    return (e.clientX - r.left) / r.width * W;
  }
  canvas.addEventListener("pointermove", function (e) {
    if (e.pointerType === "mouse" || e.buttons) paddle.x = pointerX(e) - paddle.w / 2;
  });
  canvas.addEventListener("pointerdown", function (e) {
    paddle.x = pointerX(e) - paddle.w / 2;
    if (state === "ready") launch();
  });

  canvas.tabIndex = 0;
  document.getElementById("start").addEventListener("click", function () { launch(); canvas.focus({ preventScroll: true }); });
  document.getElementById("reset").addEventListener("click", function () { newGame(); canvas.focus({ preventScroll: true }); });

  /* ---------- loop ---------- */
  var last = 0;
  function frame(t) {
    var dt = Math.min((t - last) / 1000 || 0, 1 / 30);
    last = t;
    step(dt);
    draw(t);
    requestAnimationFrame(frame);
  }

  newGame();
  resize();
  requestAnimationFrame(frame);
})();

/* ---------- likes ---------- */
// Counts live in Abacus (a free, no-signup counter API) because GitHub Pages is static.
// Each browser can like each item once; that choice is remembered in localStorage.
(function () {
  "use strict";

  var API = "https://abacus.jasoncameron.dev";
  var local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var NS = local ? "gh-alpha7-portfolio-dev" : "gh-alpha7-portfolio";

  var groups = {};   // key -> { buttons, name, count, liked, busy }
  document.querySelectorAll(".like[data-like-key]").forEach(function (btn) {
    var key = btn.dataset.likeKey;
    if (!groups[key]) groups[key] = { buttons: [], name: btn.dataset.likeName || "this", count: null, liked: read(key), busy: false };
    groups[key].buttons.push(btn);
    btn.addEventListener("click", function () { like(key, btn); });
  });

  function read(key) {
    try { return localStorage.getItem("liked:" + key) === "1"; } catch (e) { return false; }
  }
  function remember(key) {
    try { localStorage.setItem("liked:" + key, "1"); } catch (e) { /* private mode: like still counts */ }
  }

  function fmt(n) {
    if (n == null) return "–";
    if (n < 1000) return String(n);
    return (n / 1000).toFixed(n < 10000 ? 1 : 0).replace(/\.0$/, "") + "k";
  }

  function render(key) {
    var g = groups[key];
    g.buttons.forEach(function (btn) {
      btn.querySelector(".like-count").textContent = fmt(g.count);
      btn.setAttribute("aria-pressed", g.liked ? "true" : "false");
      var total = g.count == null ? "" : " (" + g.count + (g.count === 1 ? " like)" : " likes)");
      btn.setAttribute("aria-label", (g.liked ? "You liked " : "Like ") + g.name + total);
      btn.title = g.liked ? "Thanks for the love!" : "Like " + g.name;
    });
  }

  function pop(btn) {
    btn.classList.remove("pop");
    void btn.offsetWidth;
    btn.classList.add("pop");
  }

  function request(action, key) {
    return fetch(API + "/" + action + "/" + NS + "/" + key, { cache: "no-store" }).then(function (res) {
      if (res.status === 404) return { value: 0 };   // counter not created until the first like
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  function like(key, btn) {
    var g = groups[key];
    pop(btn);
    if (g.liked || g.busy) return;   // one like per browser; the API can't safely un-like
    g.busy = true;
    g.liked = true;
    g.count = (g.count || 0) + 1;   // optimistic
    render(key);
    request("hit", key).then(function (data) {
      g.count = data.value;
      remember(key);
    }).catch(function () {
      g.liked = false;
      g.count = Math.max(0, (g.count || 1) - 1);
    }).then(function () {
      g.busy = false;
      render(key);
    });
  }

  Object.keys(groups).forEach(function (key) {
    render(key);
    request("get", key).then(function (data) {
      groups[key].count = data.value;
    }).catch(function () { /* leave the dash if the API is unreachable */ }).then(function () { render(key); });
  });
})();
