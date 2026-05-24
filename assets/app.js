/* ====================================================================
   THE OPERATOR — app.js
   ==================================================================== */

(() => {
'use strict';

/* ============= CONTENT STORE ============= */
const CS = window.PortfolioContent;

let TWEAKS = {};
let ROLES = [];
let PROJECTS = {};

const ACCENTS = [
  {id:'#d63919', name:'Vermilion'},
  {id:'#0c6cf2', name:'Stadium Blue'},
  {id:'#1f8a5b', name:'Field Green'},
  {id:'#b08842', name:'Gold'},
  {id:'#7c3aed', name:'Ultra'}
];

/* ============= SOUNDS HELPER ============= */
function S(name){ if(window.Sounds && typeof window.Sounds[name] === 'function') window.Sounds[name](); }

function refreshContentRefs(){
  if(!CS){ return; }
  ROLES = CS.get('roles') || [];
  const order = CS.get('projectOrder') || ['gms','sajha','ipl','ng','archery','somnath'];
  const allProj = CS.get('projects') || {};
  PROJECTS = {};
  order.forEach(k => { if(allProj[k]) PROJECTS[k] = allProj[k]; });
  TWEAKS = {
    accent: CS.get('theme.accent') || '#d63919',
    theme: CS.get('theme.mode') || 'paper',
    showTicker: CS.get('ticker.enabled') !== false,
    showPolaroids: true
  };
}
refreshContentRefs();


/* ============= CURTAIN ============= */
function initCurtain(){
  const c = document.getElementById('curtain');
  if(!c) return;
  setTimeout(() => c.classList.add('gone'), 2000);
}

/* ============= SCROLL PROGRESS ============= */
function initScrollProg(){
  const bar = document.getElementById('scrollProg');
  if(!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (h.scrollTop / max * 100) + '%';
  };
  window.addEventListener('scroll', update, {passive:true});
  update();
}

/* ============= THEME ============= */
function initTheme(){
  const btn = document.getElementById('themeBtn');
  if(!btn) return;
  const lbl = btn.querySelector('.label');
  const apply = (t) => {
    document.body.setAttribute('data-theme', t);
    lbl.textContent = t === 'paper' ? 'Floodlights · On' : 'Paper · On';
    TWEAKS.theme = t;
  };
  btn.addEventListener('click', () => {
    S('themeToggle');
    const cur = document.body.getAttribute('data-theme') || 'paper';
    apply(cur === 'paper' ? 'floodlights' : 'paper');
  });
  apply(TWEAKS.theme || 'paper');
}

/* ============= MAGNETIC BUTTONS ============= */
function initMagnetic(){
  const els = document.querySelectorAll('[data-magnetic]');
  els.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*.18}px, ${y*.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ============= STAT COUNTERS ============= */
function initStats(){
  const els = document.querySelectorAll('[data-count]');
  const animate = (el) => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t-start)/dur);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = String(Math.round(target * eased)).padStart(2,'0');
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.3});
  els.forEach(el => io.observe(el));
}

/* ============= REVEAL ============= */
function initReveal(){
  const els = document.querySelectorAll('[data-reveal]');
  if(!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  els.forEach(el => io.observe(el));
}

function tagReveals(){
  ['.cover-grid','.section-tag','.section-h','.section-lede','.manifesto','.stats','.project-bar','.project-grid','.deck-wrap','.toolkit','.contact','.colophon'].forEach(s => {
    document.querySelectorAll(s).forEach(el => el.setAttribute('data-reveal',''));
  });
}

/* ============= CAREER DECK ============= */
function initDeck(){
  const stage = document.querySelector('.deck-stage');
  const dotsWrap = document.querySelector('.deck-dots');
  const prevBtn = document.querySelector('.deck-prev');
  const nextBtn = document.querySelector('.deck-next');
  const playBtn = document.querySelector('.deck-play');
  const counter = document.querySelector('.deck-counter b');
  const nowEmp = document.querySelector('.deck-now-emp');
  const tcA = document.querySelector('.tb-tcA');
  const tcB = document.querySelector('.tb-tcB');
  const scrubDots = document.querySelector('.ts-dots');
  const scrubFill = document.querySelector('.ts-fill');
  const filmFrames = document.querySelector('.film-frames');
  const reelsCard = document.querySelector('.bs-reels');
  const locNameEl = document.querySelector('.bs-loc-name');
  const coordEl = document.querySelector('.bs-coord');
  const tapeIdEl = document.querySelector('.bs-tape-id');
  const mvType = document.querySelector('.mv-type');
  const mvId = document.querySelector('.mv-id');
  const mvDur = document.querySelector('.mv-dur');
  const mvSide = document.querySelector('.mv-side');
  const statusPill = document.querySelector('.bs-status-pill');
  const trajCur = document.querySelector('.traj-pts circle.cur');
  if(!stage) return;

  let idx = 0;
  let playing = false;
  let autoTimer = null;

  // Card builder
  const typeIcons = {
    product:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2" width="10" height="10"/><path d="M2 6h10M6 2v10"/></svg>',
    target:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="2.5"/><circle cx="7" cy="7" r="0.7" fill="currentColor"/></svg>',
    shield:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 1.5 L12 3.5 V7.5 C12 10 7 12.5 7 12.5 C7 12.5 2 10 2 7.5 V3.5 Z"/></svg>',
    doc:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 1.5 H9 L11.5 4 V12.5 H3 Z"/><path d="M9 1.5 V4 H11.5"/><path d="M4.5 7 H9.5 M4.5 9 H9.5"/></svg>',
    badge:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="1.5" width="8" height="11" rx="1"/><circle cx="7" cy="5.5" r="1.5"/><path d="M4.5 9.5 H9.5"/></svg>',
    policy:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.5 2.5 H11.5 V11.5 H2.5 Z"/><path d="M5 2.5 V11.5 M9 2.5 V11.5"/><path d="M5 5 H11.5 M5 8 H11.5"/></svg>'
  };

  // Project-cover gradient backgrounds for filmstrip frames
  const frameBgs = {
    'product':'radial-gradient(60% 80% at 30% 20%,rgba(255,181,71,.55),transparent 60%),linear-gradient(135deg,#1a1410,#0a0805)',
    'target':'repeating-radial-gradient(circle at 80% 30%,#fff8e1 0 14px,#f4d56e 14px 28px,#14110a 28px 42px,#d63919 42px 56px,#14110a 56px 70px)',
    'shield':'radial-gradient(50% 80% at 50% 100%,rgba(255,181,71,.55),transparent 65%),linear-gradient(180deg,#3a1a08,#0a0502)',
    'doc':'radial-gradient(60% 80% at 50% 100%,rgba(60,140,90,.6),transparent 70%),linear-gradient(160deg,#0e3a2a,#08231a)',
    'badge':'radial-gradient(70% 100% at 50% 0%,rgba(255,181,71,.8),transparent 65%),linear-gradient(180deg,#3a1606,#14060a)',
    'policy':'radial-gradient(60% 100% at 100% 100%,rgba(64,170,180,.45),transparent 70%),linear-gradient(135deg,#0a283d,#040e18)'
  };

  // Build cards
  ROLES.forEach((r, i) => {
    const c = document.createElement('div');
    c.className = 'deck-card';
    c.dataset.idx = i;
    const liveDot = r.live
      ? '<span class="dot"></span><span>LIVE</span><span class="venue">· '+r.venue+'</span>'
      : '<span class="dot" style="background:var(--mute-2);animation:none"></span><span>ARCHIVE</span><span class="venue">· '+r.venue+'</span>';
    c.innerHTML = `
      <div class="dc-bcast">
        ${liveDot}
        <span class="clock">${r.clock}</span>
        <span class="ix">FILE · ${r.no}/06</span>
      </div>
      <div class="dc-pad">
        <span class="dc-no">${r.no}</span>
        <div class="dc-head">
          <span class="dc-when">${r.when} · ${r.where}</span>
          <span class="dc-type">${typeIcons[r.icon] || ''}${r.type}</span>
        </div>
        <h3 class="dc-role">${r.role}</h3>
        <div class="dc-org">${r.org}</div>
        <div class="dc-mini">
          ${r.mini.map(([v,k]) => `<div><div class="v">${v}</div><div class="k">${k}</div></div>`).join('')}
        </div>
        <div class="dc-quote">\u201c${r.quote}\u201d</div>
        <div class="dc-skills">${r.skills.map(s => `<span>${s}</span>`).join('')}</div>
        <div class="dc-foot">
          <span class="seal">${r.marquee ? 'Marquee · IPL' : (r.live ? 'Now Playing' : 'Closed Out')}</span>
          <span class="cta">${r.cta || 'Archive entry'}
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11 L11 3 M5 3 H11 V9"/></svg>
          </span>
        </div>
        <div class="dc-rail" style="--rail:${r.rail}%"></div>
      </div>
    `;
    stage.appendChild(c);

    // dot
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Role ${i+1}`);
    dot.addEventListener('click', () => { S('tap'); idx = i; render(); });
    dotsWrap.appendChild(dot);
  });

  // Build year-scrubber dots (6 = one per role, newest on right)
  // Map idx (0=newest) to scrub-pos (5=newest right)
  const yrs = [...ROLES].reverse(); // 0 oldest → 5 newest
  yrs.forEach((r, scrubPos) => {
    const b = document.createElement('button');
    b.dataset.scrubPos = scrubPos;
    b.setAttribute('aria-label', `Jump to ${r.when}`);
    b.addEventListener('click', () => { S('swipe'); idx = ROLES.length - 1 - scrubPos; render(); });
    scrubDots.appendChild(b);
  });

  // Build filmstrip frames (newest on left, matches idx)
  ROLES.forEach((r, i) => {
    const f = document.createElement('button');
    f.className = 'frame';
    f.dataset.idx = i;
    f.style.setProperty('--fb', frameBgs[r.icon] || '');
    f.innerHTML = `
      <span class="fm-no">${r.no} · ${r.where.split(',')[0]}</span>
      <span class="fm-t">${r.role.replace(/<[^>]+>/g,'')}</span>
    `;
    // Apply bg
    f.querySelector(':scope::before'); // noop
    f.style.cssText = `background:${frameBgs[r.icon] || ''}`;
    f.addEventListener('click', () => { S('tileClick'); idx = i; render(); });
    filmFrames.appendChild(f);
  });

  const cards = [...stage.querySelectorAll('.deck-card')];
  const dots = [...dotsWrap.querySelectorAll('button')];
  const scrubBtns = [...scrubDots.querySelectorAll('button')];
  const frameBtns = [...filmFrames.querySelectorAll('.frame')];
  const mapDots = [...document.querySelectorAll('.md')];

  function render(){
    const r = ROLES[idx];

    // Cards (perspective stack)
    cards.forEach((c, i) => {
      const off = i - idx;
      const abs = Math.abs(off);
      let tx = off * 56;
      let ty = abs * 12;
      let rot = off * -3.5;
      let scale = 1 - Math.min(abs, 3) * 0.07;
      let z = 10 - abs;
      let op = abs > 2 ? 0 : 1;
      let filter = abs > 0 ? `blur(${abs*0.6}px)` : 'none';
      c.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
      c.style.zIndex = z;
      c.style.opacity = op;
      c.style.filter = filter;
    });

    // Dots
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));

    // Counter + now
    counter.textContent = String(idx+1).padStart(2,'0');
    if(nowEmp) nowEmp.textContent = r.org.split('·')[0].trim();
    if(tcA) tcA.textContent = r.no;
    if(tcB) tcB.textContent = String((6-idx)*7).padStart(2,'0');

    // Scrubber
    const scrubPos = ROLES.length - 1 - idx; // 0..5 left→right
    scrubBtns.forEach((b, i) => {
      b.classList.toggle('on', i === scrubPos);
      b.classList.toggle('done', i < scrubPos);
    });
    if(scrubFill) scrubFill.style.width = ((scrubPos/(ROLES.length-1)) * 100) + '%';

    // Filmstrip
    frameBtns.forEach((f, i) => f.classList.toggle('on', i === idx));

    // Map dot
    mapDots.forEach(m => m.classList.toggle('on', m.dataset.loc === r.loc));

    // Reels paused state for archived?
    if(reelsCard) reelsCard.classList.toggle('paused', !r.live);

    // Bside metadata
    if(locNameEl) locNameEl.textContent = r.locName;
    if(coordEl) coordEl.textContent = r.coord;
    if(tapeIdEl) tapeIdEl.textContent = r.tapeId;
    if(mvType) mvType.textContent = r.type;
    if(mvId) mvId.textContent = r.tapeId;
    if(mvDur) mvDur.textContent = r.duration;
    if(mvSide) mvSide.textContent = r.side;
    if(statusPill){
      statusPill.textContent = r.live ? 'LIVE' : 'ARCHIVE';
      statusPill.classList.toggle('off', !r.live);
    }

    // Trajectory current point
    if(trajCur){ trajCur.setAttribute('cx', r.trajX); trajCur.setAttribute('cy', r.trajY); }
  }

  // Click side card to focus
  cards.forEach((c, i) => {
    c.addEventListener('click', () => {
      if(i !== idx && !c._dragging){ S('tileClick'); idx = i; render(); stopAuto(); }
    });
  });

  // Controls
  const stopAuto = () => { playing = false; if(autoTimer){ clearInterval(autoTimer); autoTimer = null; } updatePlayIcon(); };
  const startAuto = () => { playing = true; autoTimer = setInterval(() => { idx = (idx + 1) % ROLES.length; render(); }, 3800); updatePlayIcon(); };
  const updatePlayIcon = () => {
    if(!playBtn) return;
    playBtn.querySelector('.ico-play').style.display = playing ? 'none' : '';
    playBtn.querySelector('.ico-pause').style.display = playing ? '' : 'none';
  };
  prevBtn?.addEventListener('click', () => { S('swipe'); stopAuto(); idx = (idx - 1 + ROLES.length) % ROLES.length; render(); });
  nextBtn?.addEventListener('click', () => { S('swipe'); stopAuto(); idx = (idx + 1) % ROLES.length; render(); });
  playBtn?.addEventListener('click', () => { S('tap'); playing ? stopAuto() : startAuto(); });

  // Keys
  window.addEventListener('keydown', (e) => {
    if(document.querySelector('.env.open')) return;
    if(e.key === 'ArrowLeft'){ S('swipe'); stopAuto(); idx = (idx - 1 + ROLES.length) % ROLES.length; render(); }
    if(e.key === 'ArrowRight'){ S('swipe'); stopAuto(); idx = (idx + 1) % ROLES.length; render(); }
  });

  // Drag
  let down = false, sx = 0, dragCard = null;
  stage.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('.deck-card');
    if(!c || +c.dataset.idx !== idx) return;
    down = true; sx = e.clientX; dragCard = c;
    c.classList.add('drag');
    stopAuto();
  });
  window.addEventListener('pointermove', (e) => {
    if(!down) return;
    const dx = e.clientX - sx;
    dragCard.style.transform = `translate(${dx}px, 0) rotate(${dx*0.04}deg)`;
  });
  window.addEventListener('pointerup', (e) => {
    if(!down) return;
    const dx = e.clientX - sx;
    if(dragCard) dragCard.classList.remove('drag');
    down = false;
    if(Math.abs(dx) > 80){
      S('swipe');
      if(dx < 0) idx = (idx + 1) % ROLES.length;
      else idx = (idx - 1 + ROLES.length) % ROLES.length;
    }
    render();
    dragCard = null;
  });

  render();
}

/* ============= PASS FLIP ============= */
function initPass(){
  const pass = document.getElementById('pass');
  if(!pass) return;
  pass.addEventListener('click', () => {
    S('passFlip');
    pass.classList.toggle('flipped');
  });
}

/* ============= GALLERY IMAGE BG ============= */
function galleryBg(kind){
  // CSS gradient placeholders themed per project
  const themes = {
    'gms':['#1a1410','#0a0805','#ffb547'],
    'sajha':['#0e3a2a','#08231a','#f4c430'],
    'ipl':['#3a1606','#14060a','#ffb547'],
    'ng':['#0a283d','#082030','#40aab4'],
    'archery':['#14110a','#3a1010','#f4d56e'],
    'somnath':['#3a1a08','#1a0a04','#ffb547']
  };
  const base = kind.split('-')[0];
  const [a,b,c] = themes[base] || ['#222','#111','#fff'];
  const seeds = [
    `radial-gradient(60% 80% at 30% 20%,${c}55,transparent 60%),linear-gradient(135deg,${a},${b})`,
    `radial-gradient(50% 70% at 80% 80%,${c}40,transparent 65%),linear-gradient(160deg,${b},${a})`,
    `radial-gradient(40% 60% at 50% 50%,${c}30,transparent 60%),repeating-linear-gradient(45deg,${a} 0 40px,${b} 40px 80px)`,
    `repeating-radial-gradient(circle at 50% 50%,${c}33 0 14px,${a} 14px 28px,${b} 28px 42px)`,
    `linear-gradient(90deg,${a} 0%,${b} 50%,${a} 100%)`,
    `radial-gradient(circle at 70% 30%,${c}66,transparent 50%),linear-gradient(180deg,${b},${a})`
  ];
  const seed = (parseInt(kind.split('-')[1] || '1') - 1) % seeds.length;
  return seeds[seed];
}

/* ============= TILT (project cards) ============= */
function initTilt(){
  const cards = document.querySelectorAll('.proj');
  cards.forEach(card => {
    const bp = card.querySelector('.proj-blueprint');
    const title = card.querySelector('.prs-title');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-4px)`;
      if(bp) bp.style.transform = `translate3d(${x*-10}px, ${y*-8}px, 0)`;
      if(title) title.style.transform = `translate3d(${x*4}px, ${y*3}px, 0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if(bp) bp.style.transform = '';
      if(title) title.style.transform = '';
    });
  });
}

/* ============= PROJECT MODAL ============= */
function initModal(){
  const env = document.getElementById('env');
  const closeBtn = document.getElementById('envClose');

  function open(key){
    const p = PROJECTS[key];
    if(!p) return;

    // Crumbs
    env.querySelector('.crumbs .name').textContent = p.name;
    env.querySelector('.crumbs .client').textContent = p.client;

    // HUD
    const hud = env.querySelector('.hud-stats');
    hud.innerHTML = (p.hud || []).map(([v,k]) =>
      `<div class="hud-stat"><div><span class="v">${v}</span><div class="k">${k}</div></div></div>`
    ).join('');
    // Live clock
    const setClock = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2,'0');
      const mm = String(d.getMinutes()).padStart(2,'0');
      const ss = String(d.getSeconds()).padStart(2,'0');
      const clk = env.querySelector('.hud-clock');
      if(clk) clk.textContent = `${hh}:${mm}:${ss}`;
    };
    setClock();
    if(window.__clockTimer) clearInterval(window.__clockTimer);
    window.__clockTimer = setInterval(setClock, 1000);

    // Phase timeline
    const phases = p.phases || [1,1,1,0,0,0];
    env.querySelectorAll('.ph-step').forEach((s,i) => {
      s.classList.remove('done','active');
      if(phases[i] === 1) s.classList.add('done');
      else if(i > 0 && phases[i-1] === 1) s.classList.add('active');
    });

    // Zone matrix — universal, but flavoured to project
    const ZONES = ['FOP','OPS','VIP','PRESS','IT'];
    const matrix = {
      'Accred':[1,1,1,1,1],
      'Operator':[1,1,1,0,1],
      'Vendor':[0,1,0,0,0],
      'Press':[2,1,0,1,0]  // 2 = escort
    };
    const zmGrid = env.querySelector('.zm-grid');
    let zmHtml = '<div class="zm-cell h"></div>' + ZONES.map(z => `<div class="zm-cell h">${z}</div>`).join('');
    Object.entries(matrix).forEach(([role,cells]) => {
      zmHtml += `<div class="zm-cell role">${role}</div>`;
      cells.forEach(c => {
        const cls = c === 1 ? 'on' : (c === 2 ? 'esc' : 'off');
        const sym = c === 1 ? '●' : (c === 2 ? 'E' : '—');
        zmHtml += `<div class="zm-cell ${cls}">${sym}</div>`;
      });
    });
    zmGrid.innerHTML = zmHtml;

    // Seal
    const sealNoEl = env.querySelector('.seal-no');
    if(sealNoEl) sealNoEl.textContent = p.sealNo || '—';

    // Hero
    const hero = env.querySelector('.heroimg');
    hero.style.background = galleryBg(`${key}-1`);
    env.querySelector('.kicker .pill').textContent = p.pill;
    env.querySelector('.kicker .role').textContent = p.role;
    env.querySelector('.kicker .year').textContent = p.year;
    env.querySelector('.heroinfo h2').innerHTML = p.title;
    env.querySelector('.heroinfo .strap').textContent = p.strap;

    // Overview
    env.querySelector('[data-pane="overview"] .ov-body').innerHTML = `<p>${p.overview}</p>`;
    env.querySelector('[data-pane="overview"] .why-q').textContent = p.why;
    env.querySelector('[data-pane="overview"] .kvs').innerHTML =
      p.kvs.map(([k,v]) => `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('');

    // Gallery
    env.querySelector('[data-pane="gallery"] .gallery').innerHTML =
      p.gallery.map((g, i) => {
        const sizes = ['grid-column:span 3;grid-row:span 2','grid-column:span 3;grid-row:span 1','grid-column:span 2;grid-row:span 1','grid-column:span 2;grid-row:span 1','grid-column:span 2;grid-row:span 1'];
        return `<div class="g-img" style="background:${galleryBg(g.kind)};${sizes[i] || ''}" data-cap="${g.cap}"></div>`;
      }).join('');

    // Specs
    env.querySelector('[data-pane="specs"] .spec-list').innerHTML =
      p.specs.map(([k,v]) => `<li><span class="k">${k}</span><span class="v">${v}</span></li>`).join('');
    env.querySelector('[data-pane="specs"] .chips-wrap').innerHTML =
      p.chips.map(c => `<span>${c}</span>`).join('');

    // Outcomes
    env.querySelector('[data-pane="outcomes"] .bullet-list').innerHTML =
      p.bullets.map(b => `<li>${b}</li>`).join('');
    env.querySelector('[data-pane="outcomes"] .bars').innerHTML =
      p.bars.map(([l,r,pct]) => `
        <div class="bar-row">
          <div class="bh"><span class="l">${l}</span><span class="r">${r}</span></div>
          <div class="bar"><i data-w="${pct}"></i></div>
        </div>`).join('');

    // Activate first tab
    env.querySelectorAll('.env-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'overview'));
    env.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === 'overview'));

    env.classList.add('open');
    env.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';

    // Animate bars after open
    setTimeout(() => {
      env.querySelectorAll('.bar i').forEach(i => i.style.width = i.dataset.w + '%');
    }, 350);
  }

  function close(){
    env.classList.remove('open');
    env.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(window.__clockTimer){ clearInterval(window.__clockTimer); window.__clockTimer = null; }
  }

  document.querySelectorAll('.proj').forEach(el => {
    el.addEventListener('click', () => { S('tileClick'); S('modalOpen'); open(el.dataset.key); });
  });
  closeBtn.addEventListener('click', () => { S('modalClose'); close(); });
  env.addEventListener('click', (e) => { if(e.target === env){ S('modalClose'); close(); } });
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape' && env.classList.contains('open')){ S('modalClose'); close(); } });

  // Tabs
  env.querySelectorAll('.env-tab').forEach(t => {
    t.addEventListener('click', () => {
      S('tap');
      const tab = t.dataset.tab;
      env.querySelectorAll('.env-tab').forEach(x => x.classList.toggle('active', x === t));
      env.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === tab));
      if(tab === 'outcomes'){
        setTimeout(() => env.querySelectorAll('.bar i').forEach(i => i.style.width = i.dataset.w + '%'), 50);
      }
    });
  });
}

/* ============= POLAROIDS PARALLAX ============= */
function initPolaroids(){
  const ps = document.querySelectorAll('.poloroid');
  if(!ps.length) return;
  document.querySelector('.cover')?.addEventListener('mousemove', (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    const nx = (e.clientX / w - 0.5);
    const ny = (e.clientY / h - 0.5);
    ps.forEach((p, i) => {
      const m = (i+1) * 6;
      const baseRot = [6, -7, 3][i] || 0;
      p.style.transform = `translate(${nx*m}px, ${ny*m}px) rotate(${baseRot + nx*2}deg)`;
    });
  });
}

/* ============= TICKETS — scroll-in / scroll-out ============= */
function initTickets(){
  const tickets = [...document.querySelectorAll('.ticket')];
  if(!tickets.length) return;

  // Stagger reveal on first scroll-in
  tickets.forEach((t,i) => {
    setTimeout(() => t.classList.add('in'), 700 + i*220);
  });

  // Scroll-driven punch-in/out + parallax
  const cover = document.querySelector('.cover');
  let raf = 0;
  const update = () => {
    raf = 0;
    if(!cover) return;
    const r = cover.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 at hero top, 1 when hero fully scrolled past
    const p = Math.max(0, Math.min(1, (-r.top) / (r.height || 1)));
    tickets.forEach((t,i) => {
      const baseRot = [7,-8,4][i] || 0;
      // mild parallax
      const ty = p * (60 + i*20);
      const op = 1 - Math.min(1, p*1.4);
      t.style.setProperty('--tk-rot', `${baseRot + p*-4}deg`);
      t.style.opacity = op;
      t.style.transform = `translateY(${ty}px) rotate(${baseRot + p*-4}deg) scale(${1 - p*0.08})`;
      // when scrolled back up past zero, re-add
      if(p < 0.1) t.classList.add('in');
    });
  };
  window.addEventListener('scroll', () => {
    if(raf) return;
    raf = requestAnimationFrame(update);
  }, {passive:true});

  // Hover parallax (kept subtle)
  cover?.addEventListener('mousemove', (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    const nx = (e.clientX / w - 0.5);
    const ny = (e.clientY / h - 0.5);
    tickets.forEach((t,i) => {
      const m = (i+1) * 4;
      t.style.translate = `${nx*m}px ${ny*m}px`;
    });
  });
  cover?.addEventListener('mouseleave', () => {
    tickets.forEach(t => t.style.translate = '');
  });
}

/* ============= DOSSIER FOLDERS ============= */
function initFolders(){
  const folders = document.querySelectorAll('.folder');
  // Open the first one by default
  folders.forEach((f,i) => {
    if(i === 0) f.setAttribute('aria-expanded','true');
    f.addEventListener('click', () => {
      const open = f.getAttribute('aria-expanded') === 'true';
      // accordion: close others
      folders.forEach(o => o.setAttribute('aria-expanded','false'));
      if(!open){ f.setAttribute('aria-expanded','true'); S('folderOpen'); }
      else { S('folderClose'); }
    });
  });
}

/* ============= TWEAKS PANEL ============= */
function initTweaks(){
  // Create panel
  const panel = document.createElement('div');
  panel.className = 'tweaks';
  panel.innerHTML = `
    <div class="tw-h">
      <span class="ttl"></span>
      <button id="twClose" aria-label="Close"></button>
    </div>
    <div class="tw-row">
      <label></label>
      <div class="tw-swatches">
        ${ACCENTS.map(a => `<div class="tw-sw" data-c="${a.id}" style="background:${a.id}" title="${a.name}"></div>`).join('')}
      </div>
    </div>
    <div class="tw-row">
      <label></label>
      <div class="tw-toggles">
        <button data-theme="paper"></button>
        <button data-theme="floodlights"></button>
      </div>
    </div>
    <div class="tw-row">
      <label></label>
      <div class="tw-toggles">
        <button data-ticker="on"></button>
        <button data-ticker="off"></button>
      </div>
    </div>
    <div class="tw-row">
      <label></label>
      <div class="tw-toggles">
        <button data-pol="on"></button>
        <button data-pol="off"></button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  const send = (edits) => {
    Object.assign(TWEAKS, edits);
    try{ window.parent.postMessage({type:'__edit_mode_set_keys', edits}, '*'); }catch{}
  };

  const applyAccent = (c) => {
    document.documentElement.style.setProperty('--flood', c);
    panel.querySelectorAll('.tw-sw').forEach(s => s.classList.toggle('on', s.dataset.c === c));
  };
  const applyTheme = (t) => {
    document.body.setAttribute('data-theme', t);
    panel.querySelectorAll('[data-theme]').forEach(b => b.classList.toggle('on', b.dataset.theme === t));
    const lbl = document.querySelector('#themeBtn .label');
    if(lbl) lbl.textContent = t === 'paper' ? 'Floodlights · On' : 'Paper · On';
  };
  const applyTicker = (on) => {
    document.querySelector('.ticker').style.display = on ? '' : 'none';
    panel.querySelectorAll('[data-ticker]').forEach(b => b.classList.toggle('on', (b.dataset.ticker === 'on') === on));
  };
  const applyPolaroids = (on) => {
    const p = document.querySelector('.polaroids');
    if(p) p.style.display = on ? '' : 'none';
    panel.querySelectorAll('[data-pol]').forEach(b => b.classList.toggle('on', (b.dataset.pol === 'on') === on));
  };

  // wire
  panel.querySelectorAll('.tw-sw').forEach(s => s.addEventListener('click', () => { applyAccent(s.dataset.c); send({accent:s.dataset.c}); }));
  panel.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => { applyTheme(b.dataset.theme); send({theme:b.dataset.theme}); }));
  panel.querySelectorAll('[data-ticker]').forEach(b => b.addEventListener('click', () => { const on = b.dataset.ticker === 'on'; applyTicker(on); send({showTicker:on}); }));
  panel.querySelectorAll('[data-pol]').forEach(b => b.addEventListener('click', () => { const on = b.dataset.pol === 'on'; applyPolaroids(on); send({showPolaroids:on}); }));

  // Initial apply
  applyAccent(TWEAKS.accent || '#d63919');
  applyTheme(TWEAKS.theme || 'paper');
  applyTicker(!!TWEAKS.showTicker);
  applyPolaroids(!!TWEAKS.showPolaroids);

  // Edit mode protocol
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if(d.type === '__activate_edit_mode') panel.classList.add('show');
    if(d.type === '__deactivate_edit_mode') panel.classList.remove('show');
  });
  panel.querySelector('#twClose').addEventListener('click', () => {
    panel.classList.remove('show');
    try{ window.parent.postMessage({type:'__edit_mode_dismissed'}, '*'); }catch{}
  });
  try{ window.parent.postMessage({type:'__edit_mode_available'}, '*'); }catch{}
}

/* ============= CONTENT APPLICATION ============= */
function $(sel, root){ return (root || document).querySelector(sel); }
function $$(sel, root){ return [...(root || document).querySelectorAll(sel)]; }

function applyContent(){
  if(!CS) return;
  const c = CS.getAll();

  // Meta
  document.title = c.meta.title || document.title;
  const md = document.querySelector('meta[name="description"]');
  if(md && c.meta.description) md.setAttribute('content', c.meta.description);

  // Theme CSS variables
  const root = document.documentElement;
  if(c.theme.accent) root.style.setProperty('--flood', c.theme.accent);
  document.body.setAttribute('data-theme', c.theme.mode || 'paper');

  // Generic data-c walkers
  $$('[data-c]').forEach(el => {
    const path = el.dataset.c;
    const v = CS.get(path);
    if(v != null) el.textContent = v;
  });
  $$('[data-c-html]').forEach(el => {
    const path = el.dataset.cHtml;
    const v = CS.get(path);
    if(v != null) el.innerHTML = v;
  });
  $$('[data-c-attr]').forEach(el => {
    const spec = el.dataset.cAttr;
    const idx = spec.indexOf(':');
    if(idx < 0) return;
    const attr = spec.slice(0, idx);
    const path = spec.slice(idx + 1);
    const v = CS.get(path);
    if(v != null) el.setAttribute(attr, v);
  });

  // Curtain
  setText('.curtain .meta', c.curtain && c.curtain.meta);
  setHtml('.curtain .mark', c.curtain && c.curtain.markHtml);
  setText('.curtain .strap', c.curtain && c.curtain.strap);

  // Ticker
  renderTicker(c.ticker);

  // Masthead
  setText('.masthead .mast-mark', c.masthead && c.masthead.markLetter);
  setText('.masthead .mast-title', c.masthead && c.masthead.title);
  const mastMeta = $('.masthead .mast-meta');
  if(mastMeta && c.masthead){
    mastMeta.innerHTML =
      '<span>Vol. <b>'+esc(c.masthead.vol)+'</b></span>' +
      '<span>Issue <b>'+esc(c.masthead.issue)+'</b></span>' +
      '<span>Edition <b>'+esc(c.masthead.edition)+'</b></span>';
  }
  const workLink = $('.masthead a.btn-ghost[href="#work"]');
  if(workLink && c.masthead){
    workLink.innerHTML = esc(c.masthead.workCta) + '\n        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11 L11 3 M5 3 H11 V9"/></svg>';
  }
  const hireLink = $('.masthead a.btn-ghost.solid');
  if(hireLink && c.masthead){
    hireLink.innerHTML = esc(c.masthead.hireCta) + '\n        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7 H11 M7 3 L11 7 L7 11"/></svg>';
  }

  // Hero
  renderHero(c.hero);

  // Manifesto
  renderManifesto(c.manifesto);

  // Stats
  renderStats(c.stats);

  // Work section header + project tiles
  setText('.section[id="work"] .section-tag .num', c.work && c.work.sectionNum);
  const workTagEl = $('.section[id="work"] .section-tag');
  if(workTagEl && c.work) workTagEl.lastChild && (workTagEl.lastChild.nodeValue = ' ' + c.work.sectionLabel);
  setHtml('.section[id="work"] .section-h', c.work && c.work.titleHtml);
  setText('.section[id="work"] .section-lede', c.work && c.work.lede);
  renderProjectTiles();

  // Career section header
  const careerSec = document.querySelectorAll('.section[data-folio]')[3];
  if(careerSec && c.career){
    setText('.section-tag .num', c.career.sectionNum, careerSec);
    const tagEl = careerSec.querySelector('.section-tag');
    if(tagEl) tagEl.lastChild && (tagEl.lastChild.nodeValue = ' ' + c.career.sectionLabel);
    setHtml('.section-h', c.career.titleHtml, careerSec);
    setText('.section-lede', c.career.lede, careerSec);
  }

  // Toolkit
  renderToolkit(c.toolkit);

  // Contact
  renderContact(c.contact);

  // Pass
  renderPass(c.pass);

  // Colophon
  setHtml('.colophon h2.big', c.colophon && c.colophon.bigHtml);
  const colMeta = $('.colophon .meta');
  if(colMeta && c.colophon) colMeta.innerHTML = c.colophon.meta;
}

function esc(s){ return String(s == null ? '' : s).replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[m]); }
function setText(sel, val, root){ const el = (root || document).querySelector(sel); if(el && val != null) el.textContent = val; }
function setHtml(sel, val, root){ const el = (root || document).querySelector(sel); if(el && val != null) el.innerHTML = val; }

function renderTicker(t){
  const tk = $('.ticker');
  if(!tk) return;
  if(!t){ return; }
  tk.style.display = t.enabled ? '' : 'none';
  const label = $('.ticker .label', tk);
  if(label){
    label.innerHTML = '<span class="pulse"></span> ' + esc(t.label || 'Live · Ops');
  }
  const track = $('.ticker .track', tk);
  if(track){
    const items = (t.items || []).concat(t.items || []); // duplicate for seamless loop
    track.innerHTML = items.map(i => `<span><span class="dot">●</span>${esc(i)}</span>`).join('');
  }
}

function renderHero(h){
  if(!h) return;
  const issue = $('.cover .issue');
  if(issue){
    issue.innerHTML =
      '<span class="pill">'+esc(h.pill)+'</span>' +
      '<span>'+esc(h.est)+'</span>' +
      '<span>'+esc(h.section)+'</span>';
  }
  const h1 = $('.cover h1');
  if(h1) h1.innerHTML = esc(h.firstName) + '<br>' + esc(h.lastName) + '<span class="amp">.</span>';
  const roles = $('.cover .roles');
  if(roles){
    roles.innerHTML = (h.roleChips || []).map((r,i) => `<span class="role-chip${i===0?' solid':''}">${esc(r)}</span>`).join('');
  }
  const loc = $('.cover .location');
  if(loc){
    loc.innerHTML = '<b>'+esc(h.locationCity)+'</b>'+esc(h.coordinates)+'<br>'+esc(h.availability);
  }
  const cue = $('.cover .scrollcue');
  if(cue){
    cue.innerHTML = '<span class="line"></span>'+esc(h.scrollCue);
  }
  // Tickets
  const tickets = $$('.tickets .ticket');
  (h.tickets || []).forEach((tk, i) => {
    const el = tickets[i];
    if(!el) return;
    const art = el.querySelector('.tk-art');
    if(art){
      art.className = 'tk-art ' + (tk.art || '');
      if(tk.imageUrl){
        art.style.background = `url("${tk.imageUrl}") center/cover`;
      } else {
        art.style.background = '';
      }
    }
    setText('.tk-event', tk.event, el);
    setText('.tk-stamp', tk.stamp, el);
    // rows
    const head = el.querySelector('.tk-head');
    const barcode = el.querySelector('.tk-barcode');
    const body = el.querySelector('.tk-body');
    if(body){
      // remove existing rows
      [...body.querySelectorAll('.tk-row')].forEach(r => r.remove());
      const rows = (tk.rows || []).map(([k,v]) => `<div class="tk-row"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');
      if(barcode){ barcode.insertAdjacentHTML('beforebegin', rows); }
      else if(head){ head.insertAdjacentHTML('afterend', rows); }
    }
    setText('.tk-stub-no', tk.stub, el);
    setText('.tk-stub-l', tk.stubLabel, el);
  });
  // Feature
  if(h.feature){
    const feat = $('.feature');
    if(feat){
      setText('.feature .stamp', h.feature.stamp, feat);
      setHtml('.feature h3', h.feature.titleHtml, feat);
      setText('.feature p', h.feature.body, feat);
      const ul = feat.querySelector('ul');
      if(ul){
        ul.innerHTML = (h.feature.items || []).map(it => `<li><span>${esc(it.label)}</span><b>${esc(it.value)}</b></li>`).join('');
      }
    }
  }
}

function renderManifesto(m){
  if(!m) return;
  const sec = document.querySelectorAll('.section[data-folio]')[0];
  if(!sec) return;
  setText('.section-tag .num', m.sectionNum, sec);
  const tagEl = sec.querySelector('.section-tag');
  if(tagEl) tagEl.lastChild && (tagEl.lastChild.nodeValue = ' ' + m.sectionLabel);
  setHtml('.section-h', m.titleHtml, sec);
  const body = sec.querySelector('.manifesto .body');
  if(body){
    const paras = (m.paragraphs || []).map(p => `<p>${p}</p>`).join('');
    const pq = m.pullquote || {body:'', cite:''};
    const pqHtml = `<blockquote class="pullquote">${esc(pq.body)}<cite>${esc(pq.cite)}</cite></blockquote>`;
    // Insert paragraphs[0], paragraphs[1], pullquote, paragraphs[2]
    body.innerHTML =
      ((m.paragraphs || []).slice(0,2).map(p => `<p>${p}</p>`).join('')) +
      pqHtml +
      ((m.paragraphs || []).slice(2).map(p => `<p>${p}</p>`).join(''));
  }
  // Dossier folders
  const side = sec.querySelector('.dossier');
  if(side && m.dossier){
    const meta = side.querySelector('.doss-meta');
    if(meta && m.dossierMeta){
      meta.innerHTML =
        '<span>'+esc(m.dossierMeta.name)+'</span>' +
        '<span>'+esc(m.dossierMeta.files)+'</span>' +
        '<span class="doss-instr">'+esc(m.dossierMeta.hint)+'</span>';
    }
    // remove existing folders, re-render
    [...side.querySelectorAll('.folder')].forEach(f => f.remove());
    m.dossier.forEach((d, i) => {
      const folder = document.createElement('button');
      folder.className = 'folder';
      folder.dataset.folder = ['now','write','run'][i] || ('f'+i);
      folder.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      folder.innerHTML = `
        <div class="folder-tab">
          <span class="f-num">${esc(d.num)}</span>
          <span class="f-title">${esc(d.title)}</span>
          <span class="f-stamp ${esc(d.stampClass || '')}">${esc(d.stamp)}</span>
          <svg class="f-chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4.5 L6 7.5 L9 4.5"/></svg>
        </div>
        <div class="folder-body">
          <div class="folder-seal">${esc(d.seal)}</div>
          ${(d.rows || []).map(([l,r]) => `<div class="row"><span>${l}</span><span>${r}</span></div>`).join('')}
          <div class="folder-foot"><span>${esc(d.footLeft)}</span><span>${esc(d.footRight)}</span></div>
        </div>
      `;
      side.appendChild(folder);
    });
  }
}

function renderStats(s){
  if(!s) return;
  const sec = document.querySelectorAll('.section[data-folio]')[1];
  if(!sec) return;
  setText('.section-tag .num', s.sectionNum, sec);
  const tagEl = sec.querySelector('.section-tag');
  if(tagEl) tagEl.lastChild && (tagEl.lastChild.nodeValue = ' ' + s.sectionLabel);
  const grid = sec.querySelector('.stats');
  if(grid && s.items){
    grid.innerHTML = s.items.map(it => `
      <div class="stat">
        <div class="num"><span data-count="${esc(it.num)}">00</span>${it.suffix ? '<sup>'+esc(it.suffix)+'</sup>' : ''}</div>
        <div class="label">${esc(it.label)}</div>
        <div class="sub">${esc(it.sub)}</div>
      </div>
    `).join('');
  }
}

function renderProjectTiles(){
  const c = CS.getAll();
  const order = c.projectOrder || ['gms','sajha','ipl','ng','archery','somnath'];
  $$('.proj').forEach(el => {
    const key = el.dataset.key;
    const p = (c.projects || {})[key];
    if(!p) return;
    // Top strip
    const gate = el.querySelector('.proj-gate');
    if(gate) gate.innerHTML = '<i></i>GATE · ' + esc(p.gate);
    const stamp = el.querySelector('.proj-stamp');
    if(stamp){
      stamp.className = 'proj-stamp ' + (p.stampClass || '');
      stamp.textContent = p.stamp;
    }
    // Blueprint meta
    setText('.bp-meta', p.bpMeta, el);
    // Sign
    setText('.prs-client', p.client, el);
    setText('.prs-year', p.year, el);
    setHtml('.prs-title', p.tileTitleHtml, el);
    // KPIs
    const kpi = el.querySelector('.prs-kpi');
    if(kpi && p.kpis){
      kpi.innerHTML = p.kpis.map(([v,k]) => `<div><b>${v}</b><span>${esc(k)}</span></div>`).join('');
    }
    // Status
    const st = el.querySelector('.prs-status');
    if(st){
      st.className = 'prs-status ' + (p.statusClass || '');
      st.innerHTML = '<i></i> ' + esc(p.statusLabel);
    }
  });
}

function renderToolkit(t){
  if(!t) return;
  const sec = document.querySelectorAll('.section[data-folio]')[4];
  if(!sec) return;
  setText('.section-tag .num', t.sectionNum, sec);
  const tagEl = sec.querySelector('.section-tag');
  if(tagEl) tagEl.lastChild && (tagEl.lastChild.nodeValue = ' ' + t.sectionLabel);
  setHtml('.section-h', t.titleHtml, sec);
  setText('.section-lede', t.lede, sec);
  const grid = sec.querySelector('.toolkit');
  if(!grid || !t.groups) return;
  const icons = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h7M9 16h7M9 8h3"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 3v18"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 L20 7 V17 L12 21 L4 17 V7 Z"/><path d="M12 3 V21 M4 7 L20 17 M20 7 L4 17"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20 L12 4 L20 20 Z"/><path d="M8 14 H16"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 L22 8 L12 13 L2 8 Z"/><path d="M6 10 V15 C6 16.5 9 18 12 18 C15 18 18 16.5 18 15 V10"/></svg>'
  ];
  grid.innerHTML = t.groups.map((g, gi) => `
    <div class="tk-group">
      <h5><span class="ic">${icons[gi] || icons[0]}</span>${esc(g.name)}</h5>
      <div class="tk-list">
        ${(g.items || []).map(it => {
          const star = /\*$/.test(it);
          const txt = star ? it.slice(0, -1) : it;
          return `<span${star ? ' class="star"' : ''}>${esc(txt)}</span>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function renderContact(c){
  if(!c) return;
  const sec = $('#contact');
  if(!sec) return;
  setText('.section-tag .num', c.sectionNum, sec);
  const tagEl = sec.querySelector('.section-tag');
  if(tagEl) tagEl.lastChild && (tagEl.lastChild.nodeValue = ' ' + c.sectionLabel);
  setHtml('h2', c.titleHtml, sec);
  setText('.lede', c.lede, sec);
  const wrap = sec.querySelector('.contact-links');
  if(wrap && c.links){
    wrap.innerHTML = c.links.map(l => {
      const isDl = (l.href || '').endsWith('.pdf') ? ' download' : '';
      const ext = /^https?:/.test(l.href || '') ? ' target="_blank" rel="noopener"' : '';
      return `<a class="c-link" href="${esc(l.href)}"${isDl}${ext}><span>${esc(l.text)}</span><small>${esc(l.small)}</small></a>`;
    }).join('');
  }
}

function renderPass(p){
  if(!p) return;
  const front = $('.pass-front');
  const back = $('.pass-back');
  if(front && p.front){
    const f = p.front;
    setText('.ev', f.ev, front);
    setHtml('.pf-head .title', f.titleHtml, front);
    setText('.lvl', f.lvl, front);
    setHtml('.name', f.nameHtml, front);
    setText('.role', f.role, front);
    const zones = front.querySelector('.zones');
    if(zones && f.zones){
      zones.innerHTML = f.zones.map(z => `<span${z.denied ? ' class="no"':''}>${esc(z.label)}</span>`).join('');
    }
    const fs = front.querySelector('.footstrip');
    if(fs) fs.innerHTML = '<span>'+esc(f.idCode)+'</span><span>'+esc(f.validYear)+'</span>';
    const photo = front.querySelector('.photo');
    if(photo){
      if(f.photoUrl){
        photo.style.background = `url("${f.photoUrl}") center/cover`;
      } else {
        photo.style.background = '';
      }
    }
  }
  if(back && p.back){
    const b = p.back;
    setText('.bk-h', b.title, back);
    const list = back.querySelector('.bk-list');
    if(list){
      list.innerHTML =
        esc(b.intro) +
        '<b>Permitted</b>' + b.permitted +
        '<b>Zones</b>' + esc(b.zones) +
        '<b>Notes</b>' + esc(b.notes);
    }
    setText('.bk-code', b.code, back);
    const sig = back.querySelector('.signature');
    if(sig) sig.innerHTML = esc(b.signature) + '<small>' + esc(b.signatureSub) + '</small>';
  }
  // Hint
  const hint = $('.pass-hint');
  if(hint && p.hint) hint.textContent = p.hint;
}

/* ============= STORAGE SYNC ============= */
function watchContentChanges(){
  // Reload on storage changes from another tab (e.g. admin saved)
  window.addEventListener('storage', (e) => {
    if(e.key === (CS && CS.KEY)) {
      location.reload();
    }
  });
  // Same-tab (e.g. iframe preview): listen for postMessage from admin
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if(d.type === 'portfolio:content-updated'){
      CS.load();
      refreshContentRefs();
      location.reload();
    }
  });
}

/* ============= GLOBAL CLICK SOUNDS ============= */
function initGlobalClickSounds(){
  // Delegated click listener for elements that aren't bound by specific handlers above.
  document.addEventListener('click', (e) => {
    const t = e.target;
    if(!t || !t.closest) return;
    // Skip the sound toggle button itself (it has its own behavior)
    if(t.closest('.sound-toggle')) return;
    // Magnetic header buttons (Work, Hire Akash, theme already covered)
    if(t.closest('a[data-magnetic]')){ S('tileClick'); return; }
    // Contact links
    if(t.closest('.c-link')){ S('tileClick'); return; }
    // Section anchors / generic anchor jumps
    if(t.closest('.skip-link')){ S('tap'); return; }
    // Hero ticket "click" (decorative — still satisfying)
    if(t.closest('.ticket')){ S('tap'); return; }
  });

  // Subtle hover ticks on key interactive elements (capped via rate limit in Sounds)
  function hoverWire(sel){
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('pointerenter', () => S('hover'));
    });
  }
  hoverWire('.proj');
  hoverWire('.deck-card');
  hoverWire('.folder');
  hoverWire('a[data-magnetic]');
  hoverWire('.c-link');
  hoverWire('.role-chip');
}

/* ============= BOOT ============= */
function boot(){
  applyContent();
  refreshContentRefs();
  tagReveals();
  initCurtain();
  initScrollProg();
  initTheme();
  initMagnetic();
  initStats();
  initReveal();
  initDeck();
  initPass();
  initModal();
  initTilt();
  initPolaroids();
  initTickets();
  initFolders();
  initTweaks();
  initGlobalClickSounds();
  watchContentChanges();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
