// ── CONFIG ── Edit these! ──────────────────────────────────────────
  const CONFIG = {
    name: "Widya Arie Setyaningrum",           // 👈 Change this!
    birthdate: "1977-03-30",     // 👈 Change this! (YYYY-MM-DD)
    message: "Untuk Ibu terbaik",               // 👈 Custom letter (null = keep default)
    signature: "— With love 💛", // 👈 Your signature
  };
  // ─────────────────────────────────────────────────────────────────

  // Apply config
  document.getElementById('hero-name').textContent = CONFIG.name;
  if (CONFIG.message) document.getElementById('letter-body').textContent = CONFIG.message;
  document.querySelector('.letter-sig').textContent = CONFIG.signature;

  // ── PARTICLES ──────────────────────────────────────────────────────
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(W * H / 16000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5
          ? `rgba(240,192,64,${Math.random() * 0.5 + 0.2})`
          : `rgba(232,96,122,${Math.random() * 0.4 + 0.1})`
      });
    }
  }

  function animParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animParticles);
  }

  resize(); createParticles(); animParticles();
  window.addEventListener('resize', () => { resize(); createParticles(); });

  // ── COUNTDOWN ─────────────────────────────────────────────────────
  function updateClock() {
    const birth = new Date(CONFIG.birthdate);
    const now   = new Date();
    let diff = now - birth;

    const years   = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    diff -= years * 1000 * 60 * 60 * 24 * 365.25;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('c-y').textContent = String(years).padStart(2,'0');
    document.getElementById('c-d').textContent = String(days).padStart(3,'0');
    document.getElementById('c-h').textContent = String(hours).padStart(2,'0');
    document.getElementById('c-m').textContent = String(minutes).padStart(2,'0');
    document.getElementById('c-s').textContent = String(seconds).padStart(2,'0');

    // Check if today is birthday
    const isBirthday = now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();
    const msg = document.getElementById('bday-msg');
    msg.style.display = isBirthday ? 'block' : 'none';
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ── SCROLL REVEAL ─────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // ── CONFETTI BURST ─────────────────────────────────────────────────
  const wishes = [
    "Your wish is on its way to the stars! ⭐",
    "May this wish come true with time! 🌙",
    "The universe heard you! ✨",
    "Sending your wish into the cosmos! 🚀",
    "A wish well made! 💫",
  ];

  let candlesBlown = false;
  function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    const cake = document.getElementById('cake');
    cake.textContent = '🍰';
    cake.style.filter = 'drop-shadow(0 0 30px rgba(240,192,64,0.6))';

    const wish = document.getElementById('wish-revealed');
    wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    wish.style.opacity = '1';

    launchConfetti();
  }

  function launchConfetti() {
    const colors = ['#f0c040','#e8607a','#fde98a','#ffffff','#b8860b','#ff9eb5','#a3e4d7'];
    const pieces = [];
    const bc = document.createElement('canvas');
    bc.className = 'confetti-burst';
    bc.width = window.innerWidth;
    bc.height = window.innerHeight;
    document.body.appendChild(bc);
    const bctx = bc.getContext('2d');

    for (let i = 0; i < 200; i++) {
      pieces.push({
        x: window.innerWidth  / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 5,
        w: Math.random() * 12 + 5,
        h: Math.random() * 6  + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        rv: (Math.random() - 0.5) * 8,
        g: 0.25
      });
    }

    let frame = 0;
    function draw() {
      bctx.clearRect(0, 0, bc.width, bc.height);
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.rv;
        bctx.save();
        bctx.translate(p.x, p.y);
        bctx.rotate(p.rot * Math.PI / 180);
        bctx.fillStyle = p.color;
        bctx.globalAlpha = Math.max(0, 1 - frame / 120);
        bctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        bctx.restore();
      });
      frame++;
      if (frame < 130) requestAnimationFrame(draw);
      else bc.remove();
    }
    draw();
  }


  // ════════════════════════════════════════════════════
  //  PRESENT OPEN
  // ════════════════════════════════════════════════════
  let presentOpened = false;

  // Shake on hover
  const box = document.getElementById('present-box');
  box.addEventListener('mouseenter', () => {
    if (presentOpened) return;
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 500);
  });

  function openPresent() {
    if (presentOpened) return;
    presentOpened = true;

    // Fly lid off
    document.getElementById('present-lid').classList.add('open');

    // Burst stars from box
    const wrap = document.getElementById('present-wrap');
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    const emojis = ['⭐','✨','💫','🌟','🎊','🎉','💛','🌸'];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.className = 'star-burst';
      el.textContent = emojis[i % emojis.length];
      const angle = (i / 12) * Math.PI * 2;
      const dist  = 80 + Math.random() * 80;
      el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--ty', Math.sin(angle) * dist - 40 + 'px');
      el.style.left = (cx - 12) + 'px';
      el.style.top  = (cy - 12) + 'px';
      el.style.position = 'fixed';
      el.style.zIndex = 300;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }

    // Hide hint
    document.getElementById('present-hint').style.opacity = '0';

    // Show wheel after a beat
    setTimeout(() => openWheel(), 700);
  }

  // ════════════════════════════════════════════════════
  //  SPINNING WHEEL
  // ════════════════════════════════════════════════════
  const SEGMENTS = [
    { label: 'Traktir\nMakan', emoji: '🍽️',  color: '#c0364f', sub: 'Ayo makan enak bareng! Restoran pilihan kamu 🍜',        tag: 'makanan' },
    { label: 'Beliin\nBarang',       emoji: '👟',  color: '#7b2d8b', sub: 'Pilih sepatu impianmu, semua ditanggung! 👟',             tag: 'barang'  },
  ];

  const wCanvas = document.getElementById('wheelCanvas');
  const wCtx    = wCanvas.getContext('2d');
  const NUM     = SEGMENTS.length;
  const ARC     = (2 * Math.PI) / NUM;
  let   wheelAngle = 0;
  let   isSpinning = false;

  function drawWheel(angle) {
    const W = wCanvas.width;
    const cx = W / 2, cy = W / 2, R = W / 2 - 6;
    wCtx.clearRect(0, 0, W, W);

    SEGMENTS.forEach((seg, i) => {
      const start = angle + i * ARC - Math.PI / 2;
      const end   = start + ARC;

      // Slice
      wCtx.beginPath();
      wCtx.moveTo(cx, cy);
      wCtx.arc(cx, cy, R, start, end);
      wCtx.closePath();
      wCtx.fillStyle = seg.color;
      wCtx.fill();

      // Subtle lighter edge
      wCtx.beginPath();
      wCtx.moveTo(cx, cy);
      wCtx.arc(cx, cy, R, start, end);
      wCtx.closePath();
      wCtx.strokeStyle = 'rgba(255,255,255,0.12)';
      wCtx.lineWidth = 1.5;
      wCtx.stroke();

      // Text
      wCtx.save();
      wCtx.translate(cx, cy);
      wCtx.rotate(start + ARC / 2);
      wCtx.textAlign = 'right';

      // Emoji
      wCtx.font = `${W * 0.07}px serif`;
      wCtx.fillText(seg.emoji, R - 10, 6);

      // Label
      wCtx.fillStyle = 'rgba(255,255,255,0.95)';
      wCtx.font = `bold ${W * 0.038}px "DM Sans", sans-serif`;
      const lines = seg.label.split('\n');
      lines.forEach((line, li) => {
        wCtx.fillText(line, R - 44, (li - (lines.length - 1) / 2) * (W * 0.045));
      });

      wCtx.restore();
    });

    // Center circle
    wCtx.beginPath();
    wCtx.arc(cx, cy, W * 0.07, 0, 2 * Math.PI);
    wCtx.fillStyle = '#0d0a0b';
    wCtx.fill();
    wCtx.strokeStyle = 'rgba(240,192,64,0.6)';
    wCtx.lineWidth = 2.5;
    wCtx.stroke();

    // Center star
    wCtx.font = `${W * 0.06}px serif`;
    wCtx.textAlign = 'center';
    wCtx.fillText('🎁', cx, cy + W * 0.02);
  }

  drawWheel(0);

  function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const btn = document.getElementById('spin-btn');
    btn.disabled = true;
    document.getElementById('wheel-result').classList.remove('show');

    // Random extra spins + land on random segment
    const targetSegIdx = Math.floor(Math.random() * NUM);
    const extraSpins   = 5 + Math.floor(Math.random() * 5);     // 5–10 full spins
    const segCenter    = (targetSegIdx + 0.5) * ARC;             // center of target slice
    const targetAngle  = extraSpins * 2 * Math.PI + (2 * Math.PI - segCenter); // pointer at top

    const startAngle = wheelAngle;
    const totalDelta = targetAngle;
    const duration   = 4000 + Math.random() * 1500; // 4–5.5 sec
    let   startTime  = null;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);

      wheelAngle = startAngle + totalDelta * eased;
      drawWheel(wheelAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        wheelAngle = startAngle + totalDelta;
        isSpinning = false;
        showResult(targetSegIdx);
      }
    }

    requestAnimationFrame(animate);
  }

  function showResult(idx) {
    const seg = SEGMENTS[idx];
    document.getElementById('result-emoji').textContent = seg.emoji;
    document.getElementById('result-title').textContent = seg.label.replace('\n', ' ');
    document.getElementById('result-sub').textContent   = seg.sub;
    document.getElementById('wheel-result').classList.add('show');
    launchConfetti();
  }

  function resetWheel() {
    document.getElementById('wheel-result').classList.remove('show');
    document.getElementById('spin-btn').disabled = false;
    wheelAngle = 0;
    drawWheel(0);
  }

  function openWheel() {
    document.getElementById('wheel-overlay').classList.add('active');
  }

  function closeWheel() {
    document.getElementById('wheel-overlay').classList.remove('active');
  }

  // Close on backdrop click
  document.getElementById('wheel-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeWheel();
  });

  document.querySelectorAll('.emoji-item').forEach(el => {
    el.addEventListener('click', () => {
      el.style.transform = 'scale(1.5) rotate(10deg)';
      setTimeout(() => el.style.transform = '', 300);
    });
  });