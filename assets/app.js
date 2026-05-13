/* ====================================================================
   THE OPERATOR — app.js
   ==================================================================== */

(() => {
'use strict';

/* ============= TWEAK DEFAULTS ============= */
const TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#d63919",
  "theme": "paper",
  "showTicker": true,
  "showPolaroids": true
}/*EDITMODE-END*/;

const ACCENTS = [
  {id:'#d63919', name:'Vermilion'},
  {id:'#0c6cf2', name:'Stadium Blue'},
  {id:'#1f8a5b', name:'Field Green'},
  {id:'#b08842', name:'Gold'},
  {id:'#7c3aed', name:'Ultra'}
];

/* ============= CAREER DATA ============= */
const ROLES = [
  {
    no:'06', when:'2025 — Present', where:'New Delhi',
    role:'Asst. Manager — <em>IT & Ops</em>',
    org:'GoBananas · Games Management System',
    venue:'Delhi HQ', clock:'09:41 IST',
    pts:[
      'Authoring BRD / FRD / PRD for the GMS platform — federation registration, accreditation, tournament & venue modules.',
      'Translating real-world sports ops into automation specs alongside engineering & design.',
      'Bridging product, design, vendor & federation stakeholders end-to-end.'
    ],
    mini:[['<em>3</em>','Modules'],['<em>BRD</em>','+ FRD + PRD'],['<em>2025</em>','Joined']],
    skills:['Figma','BRD','PRD','Jira','Claude'],
    quote:'Translating a stadium concourse into a sprint board, one ticket at a time.',
    type:'Product', icon:'product', live:true, rail:100,
    cta:'Open project'
  },
  {
    no:'05', when:'Jan 2026', where:'Ambaji, Gujarat',
    role:'Venue <em>Lead</em> — Archery',
    org:'NTPC Khelo India Archery — National Ranking',
    venue:'Ambaji · Range', clock:'07:15 IST',
    pts:[
      'Set up archery range to World Archery / AAI international standards.',
      'Owned venue vendor coordination, equipment audits and competition flow.',
      'Coordinated officials, scoring, athlete services across the meet.'
    ],
    mini:[['<em>70</em><sup>m</sup>','Range'],['<em>AAI</em>','Compliant'],['<em>5</em>','Days']],
    skills:['Vendor','AAI','Field Ops','SOPs'],
    quote:'A national-ranking arrow leaves the bow because the buttress was square at dawn.',
    type:'Ops', icon:'target', rail:84
  },
  {
    no:'04', when:'Jan 2026', where:'Somnath, Gujarat',
    role:'Accreditation <em>Officer</em>',
    org:'Somnath Swabhiman Parva — 1000 Years',
    venue:'Somnath · Coast', clock:'18:32 IST',
    pts:[
      'VIP accreditation & PM-protocol access control for a state-level cultural event.',
      'Designed zone matrix, badge tiers and gate flow with security & state liaison.',
      'Authored event SOPs and command-and-control protocol.'
    ],
    mini:[['<em>PM</em>','Protocol'],['<em>4</em>','Zones'],['<em>1k</em>','Years']],
    skills:['Protocol','Security','State Liaison'],
    quote:'PM-tier protocol compresses a year of decisions into hours — documentation is what holds.',
    type:'Ops', icon:'shield', rail:68
  },
  {
    no:'03', when:'2024 — 2025', where:'Jharkhand',
    role:'Business <em>Analyst</em>',
    org:'SAJHA — Sports Authority of Jharkhand',
    venue:'Ranchi · Govt.', clock:'11:08 IST',
    pts:[
      'Documented end-to-end requirements for a unified state sports portal.',
      'Mapped federation, athlete, coach and infrastructure workflows.',
      'Coordinated with engineering teams to ship federation modules.'
    ],
    mini:[['<em>9</em><sup>/12</sup>','Fed.'],['<em>7+</em>','Flows'],['<em>BRD</em>','Authored']],
    skills:['BA','Figma','Govt. Stack','Word'],
    quote:'State sports administration runs on paper. The portal is the first time the paper has a memory.',
    type:'BA', icon:'doc', rail:52
  },
  {
    no:'02', when:'2023 — 2024', where:'Multi-stadium · India',
    role:'Accreditation <em>Manager</em>',
    org:'TATA IPL — Paytm Insider',
    venue:'Wankhede / Eden / Chinnaswamy', clock:'19:30 IST',
    pts:[
      'Multi-stadium accreditation operations across the IPL season.',
      'Owned ground access control, vendor printing, real-time issue resolution.',
      'Built escalation paths with security, broadcast and franchise stakeholders.'
    ],
    mini:[['<em>6</em>','Venues'],['<em>10k+</em>','Badges'],['<em>99.7</em><sup>%</sup>','Uptime']],
    skills:['Ops','Security','Vendor','Field Ops'],
    quote:'An IPL stadium is a moving city. My job was to make sure the gates agreed with each other.',
    type:'Ops', icon:'badge', marquee:true, rail:36
  },
  {
    no:'01', when:'2023', where:'Goa',
    role:'Accreditation <em>Policy</em>',
    org:'37th National Games, Goa — Sports Authority of Goa',
    venue:'Panaji · SAG', clock:'10:20 IST',
    pts:[
      'Drafted accreditation policy and tender documentation.',
      'Integrated IT systems with on-ground accreditation processes.',
      'Coordinated 30+ disciplines, federations and state ministries.'
    ],
    mini:[['<em>30</em><sup>+</sup>','Disciplines'],['<em>1</em>','Policy'],['<em>9</em><sup>/9</sup>','Sign-offs']],
    skills:['Policy','Tender','Govt.','SOPs'],
    quote:'A national-games policy doesn\u2019t end at the games — it becomes precedent for every meet after.',
    type:'Policy', icon:'policy', rail:20
  }
];

/* ============= PROJECT DATA (modal) ============= */
const PROJECTS = {
  gms:{
    name:'Games Management System', client:'GoBananas', year:'2025 — Present',
    pill:'01 · Now', role:'Product & Business Analysis',
    title:'Games <em>Management</em> System',
    strap:'A platform built to run real federations and real events — from registration through accreditation, draw, scoring and reporting.',
    overview:'Authoring the BRD, FRD and PRD for a single platform that replaces the spreadsheet-and-WhatsApp stack federations rely on. The work moves between user research with federation operators, wireframing flows in Figma, and writing automation specs engineering can implement without ambiguity.',
    why:'Why this matters · Federations spend half their event time chasing data. A single source of truth across registration, accreditation and competition unlocks better scheduling, faster results and credible reporting.',
    hud:[['3','Modules'],['BRD<sup>+2</sup>','Spec set'],['<em>Live</em>','Status']],
    sealNo:'GMS', phases:[1,1,1,1,0,0],
    kvs:[
      ['Role','Product · BA · UX'],
      ['Modules','Registration · Accreditation · Tournament'],
      ['Status','Active development'],
      ['Stakeholders','GMS team · Federations'],
      ['Outputs','BRD · FRD · PRD · Figma wireframes']
    ],
    gallery:[
      {cap:'Registration flow', kind:'gms-1'},
      {cap:'Accreditation matrix', kind:'gms-2'},
      {cap:'Draw board', kind:'gms-3'},
      {cap:'Scoring console', kind:'gms-4'},
      {cap:'Reports', kind:'gms-5'}
    ],
    specs:[
      ['Domain','Federation operations'],
      ['Users','Federation staff · Officials · Athletes'],
      ['Scale','National events · Multi-discipline'],
      ['Approach','Modular · API-first'],
      ['Documentation','Living BRD/FRD/PRD set']
    ],
    chips:['Figma','Jira','Claude Code','OpenClaw','MS Word','Notion','Codex','Stitch'],
    bullets:[
      '<b>Authored</b> a 3-document spec set (BRD / FRD / PRD) used by engineering and design.',
      '<b>Wireframed</b> high-fidelity flows for registration, accreditation and tournament.',
      '<b>Scoped</b> the accreditation module end-to-end with zone, role & access matrices.',
      '<b>Coordinated</b> design reviews, sprint planning and feature roadmaps.'
    ],
    bars:[
      ['Documentation coverage','94%',94],
      ['Stakeholder alignment','88%',88],
      ['Module readiness','71%',71]
    ]
  },
  sajha:{
    name:'SAJHA Sports Portal', client:'Sports Authority of Jharkhand', year:'2024 — 2025',
    pill:'02 · Shipped', role:'Business Analyst',
    title:'<em>SAJHA</em> Sports Portal',
    strap:'A unified state sports portal — federations, athletes, coaches and infrastructure under one roof.',
    overview:'Owned business analysis for a state-government portal that brings disparate federation processes into one digital system. Translated the lived reality of state sports administration into requirements that engineering could implement.',
    why:'Why this matters · State sports bodies coordinate hundreds of federations on paper. A unified portal is the difference between knowing your athlete pool and guessing it.',
    hud:[['9<sup>/12</sup>','Fed.'],['7<sup>+</sup>','Flows'],['<em>Live</em>','Statewide']],
    sealNo:'SAJ', phases:[1,1,1,1,1,0],
    kvs:[
      ['Role','Lead Business Analyst'],
      ['Sector','State Government'],
      ['Lifecycle','Discovery → Delivery'],
      ['Modules','7+ federation workflows'],
      ['Compliance','Govt. of Jharkhand standards']
    ],
    gallery:[
      {cap:'Athlete profile', kind:'sajha-1'},
      {cap:'Federation dashboard', kind:'sajha-2'},
      {cap:'Coach registry', kind:'sajha-3'},
      {cap:'Venue infrastructure', kind:'sajha-4'},
      {cap:'Reports & analytics', kind:'sajha-5'}
    ],
    specs:[
      ['Client','Sports Authority of Jharkhand'],
      ['Stakeholders','Federations · Coaches · Athletes · Officers'],
      ['Scope','Statewide rollout'],
      ['Format','Web portal · multi-role'],
      ['Documentation','BRD / FRD / Tender alignment']
    ],
    chips:['MS Word','Excel','Jira','Figma','Visily','PowerPoint','Govt. Stack'],
    bullets:[
      '<b>Mapped</b> 7+ federation workflows into a unified information architecture.',
      '<b>Authored</b> BRD/FRD aligned with government tender language.',
      '<b>Drove</b> requirement workshops with sport federations and state officials.',
      '<b>Bridged</b> engineering & policy stakeholders through delivery.'
    ],
    bars:[
      ['Federations onboarded','9 / 12',75],
      ['Workflow digitization','81%',81],
      ['Officer adoption','67%',67]
    ]
  },
  ipl:{
    name:'TATA IPL Accreditation', client:'Paytm Insider · BCCI', year:'2023 — 2024',
    pill:'03 · Marquee', role:'Accreditation Manager',
    title:'TATA IPL <em>Accreditation</em>',
    strap:'Multi-stadium access control across the IPL season — every badge, gate, zone and exception.',
    overview:'Ran accreditation operations across multiple IPL venues. Built the systems and SOPs that determined who could go where and when, working alongside franchise, broadcast, security and venue ops teams under real-time pressure.',
    why:'Why this matters · An IPL stadium is a moving city. Accreditation is the policy layer that keeps it from collapsing — get one zone wrong and a broadcast feed dies.',
    hud:[['6','Venues'],['10k<sup>+</sup>','Badges'],['99.7<sup>%</sup>','Uptime']],
    sealNo:'IPL', phases:[1,1,1,1,1,1],
    kvs:[
      ['Role','Accreditation Manager'],
      ['Stadiums','Multi-venue · National'],
      ['Stakeholders','BCCI · Franchises · Broadcast'],
      ['Real-time decisions','Daily'],
      ['Volume','Thousands of badges / venue']
    ],
    gallery:[
      {cap:'Stadium aerial', kind:'ipl-1'},
      {cap:'Badge zones', kind:'ipl-2'},
      {cap:'Gate ops', kind:'ipl-3'},
      {cap:'Floodlit field', kind:'ipl-4'},
      {cap:'Command room', kind:'ipl-5'}
    ],
    specs:[
      ['Scale','IPL season · Multi-stadium'],
      ['Functions','Access control · Real-time ops · Vendor'],
      ['Pressure','Match day, no margin'],
      ['Coordination','Security · Broadcast · Franchise'],
      ['Outputs','Zone matrices · SOPs · Escalations']
    ],
    chips:['Excel','Word','PowerPoint','Vendor Mgmt','Govt. Liaison','Field Ops'],
    bullets:[
      '<b>Managed</b> accreditation operations across multiple IPL stadiums.',
      '<b>Built</b> zone matrices, badge tiers and gate-level flow protocols.',
      '<b>Resolved</b> real-time access escalations on match days.',
      '<b>Coordinated</b> printing, vendor lifecycle and audit reporting.'
    ],
    bars:[
      ['Match-day uptime','99.7%',99],
      ['Issue resolution SLA','< 4 min',92],
      ['Stakeholder NPS','High',88]
    ]
  },
  ng:{
    name:'37th National Games · Goa', client:'Sports Authority of Goa', year:'2023',
    pill:'04 · Policy', role:'Accreditation Policy & IT',
    title:'37th National <em>Games</em>, Goa',
    strap:'Drafted accreditation policy, tender documentation and IT integration for India\'s largest multi-sport event.',
    overview:'Authored the accreditation policy that governed access for 30+ disciplines across the games. Wrote tender documents, integrated IT systems with on-ground accreditation, and coordinated between state ministries, federations and operations vendors.',
    why:'Why this matters · National Games is the rehearsal for the Olympic dream. Policy here becomes precedent for every multi-sport event India runs next.',
    hud:[['30<sup>+</sup>','Disciplines'],['1','Policy'],['9<sup>/9</sup>','Sign-offs']],
    sealNo:'NG', phases:[1,1,1,1,1,1],
    kvs:[
      ['Role','Policy Author · IT Coordinator'],
      ['Disciplines','30+'],
      ['Host','Sports Authority of Goa'],
      ['Doc set','Policy · Tender · SOP'],
      ['Coordination','Inter-ministry']
    ],
    gallery:[
      {cap:'Opening ceremony', kind:'ng-1'},
      {cap:'Policy document', kind:'ng-2'},
      {cap:'Venue map', kind:'ng-3'},
      {cap:'IT integration', kind:'ng-4'},
      {cap:'Tender review', kind:'ng-5'}
    ],
    specs:[
      ['Format','Multi-sport · 30+ disciplines'],
      ['Authoring','Policy · Tender · SOP'],
      ['Integration','Accreditation IT systems'],
      ['Coordination','SAG · Federations · Vendors'],
      ['Outputs','Living policy doc · Procurement set']
    ],
    chips:['MS Word','Excel','Policy Frameworks','Govt. Tendering','SOP Authoring'],
    bullets:[
      '<b>Drafted</b> end-to-end accreditation policy adopted for the games.',
      '<b>Wrote</b> tender documents aligned with state procurement.',
      '<b>Integrated</b> on-ground accreditation with IT backend.',
      '<b>Liaised</b> across ministries, federations and venue ops.'
    ],
    bars:[
      ['Policy adoption','100%',100],
      ['Tender clearance','First pass',92],
      ['Cross-ministry sign-off','9/9',100]
    ]
  },
  archery:{
    name:'Khelo India Archery — Ambaji', client:'NTPC Khelo India', year:'Jan 2026',
    pill:'05 · 2026', role:'Venue Lead',
    title:'Archery National <em>Ranking</em>',
    strap:'Setting up a competition archery venue in Ambaji, Gujarat to international AAI standards.',
    overview:'Led venue setup for the NTPC Khelo India Archery National Ranking tournament. Owned vendor coordination, equipment audits, range calibration and competition flow to World Archery / AAI standards.',
    why:'Why this matters · A national ranking event determines who shoots for India next. The range has to be precise, the scoring credible and the timing bulletproof.',
    hud:[['70<sup>m</sup>','Range'],['AAI','Std.'],['<em>Soon</em>','Status']],
    sealNo:'AMB', phases:[1,1,1,1,0,0],
    kvs:[
      ['Role','Venue Lead'],
      ['Discipline','Archery (Recurve · Compound)'],
      ['Standard','World Archery · AAI'],
      ['Location','Ambaji, Gujarat'],
      ['Year','January 2026']
    ],
    gallery:[
      {cap:'Range overview', kind:'archery-1'},
      {cap:'Target setup', kind:'archery-2'},
      {cap:'Athlete bay', kind:'archery-3'},
      {cap:'Scoring booth', kind:'archery-4'},
      {cap:'Calibration', kind:'archery-5'}
    ],
    specs:[
      ['Distances','18m / 30m / 50m / 70m'],
      ['Equipment','Targets · Stands · Buttresses · Nets'],
      ['Compliance','AAI · WA standards'],
      ['Functions','Vendor · Officials · Athlete services'],
      ['Outputs','Range layout · Audit log']
    ],
    chips:['Vendor Mgmt','AAI Standards','Field Ops','Excel','SOP Writing'],
    bullets:[
      '<b>Calibrated</b> archery range to AAI international standards.',
      '<b>Owned</b> vendor onboarding, equipment audits and on-field setup.',
      '<b>Coordinated</b> officials, scoring teams and athlete services.',
      '<b>Authored</b> competition flow SOPs for the meet.'
    ],
    bars:[
      ['Range compliance','AAI ✓',100],
      ['Setup days saved','-2',82],
      ['Vendor SLA','On-time',95]
    ]
  },
  somnath:{
    name:'Somnath Swabhiman Parva', client:'1000 Years of Somnath Mandir', year:'Jan 2026',
    pill:'06 · PM Protocol', role:'Accreditation & Event Flow',
    title:'Somnath <em>Swabhiman</em> Parva',
    strap:'VIP accreditation, PM-protocol access control and event flow for a state-level cultural event.',
    overview:'Owned accreditation and event-flow design for the 1000-year cultural commemoration at Somnath. Designed the badge tier system, gate-level access logic and command protocols for an event hosted by the Prime Minister.',
    why:'Why this matters · A PM event compresses years of crowd, security and protocol decisions into hours. Documentation is the only thing that holds.',
    hud:[['PM','Tier'],['4','Zones'],['<em>1k</em>','Years']],
    sealNo:'SOM', phases:[1,1,1,1,0,0],
    kvs:[
      ['Role','Accreditation · Event flow'],
      ['Format','State cultural event'],
      ['Protocol','PM-tier'],
      ['Location','Somnath, Gujarat'],
      ['Year','January 2026']
    ],
    gallery:[
      {cap:'Temple at twilight', kind:'somnath-1'},
      {cap:'Stage build', kind:'somnath-2'},
      {cap:'VIP badge', kind:'somnath-3'},
      {cap:'Gate flow', kind:'somnath-4'},
      {cap:'Command room', kind:'somnath-5'}
    ],
    specs:[
      ['Audience','Federation · State · PM-tier'],
      ['Zones','FOP · VIP · Stage · Press'],
      ['Coordination','State · Security · Cultural'],
      ['Outputs','Zone matrix · SOPs · Badge tiers'],
      ['Sensitivity','High protocol']
    ],
    chips:['Word','Excel','Protocol','Govt. Liaison','Security Liaison','Field Ops'],
    bullets:[
      '<b>Designed</b> VIP accreditation tiers and zone matrix.',
      '<b>Authored</b> event-flow & command SOPs for the cultural program.',
      '<b>Coordinated</b> state agencies, security and cultural production.',
      '<b>Ran</b> rehearsal & dry-run cycles to surface gate-flow risks.'
    ],
    bars:[
      ['Protocol compliance','100%',100],
      ['Gate-flow incidents','0 critical',96],
      ['Cross-agency sign-off','All-clear',100]
    ]
  }
};

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
  const counter = document.querySelector('.deck-counter b');
  const nowEmp = document.querySelector('.deck-now-emp');
  if(!stage) return;

  let idx = 0;

  // Build cards
  const typeIcons = {
    product:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2" width="10" height="10"/><path d="M2 6h10M6 2v10"/></svg>',
    target:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="2.5"/><circle cx="7" cy="7" r="0.7" fill="currentColor"/></svg>',
    shield:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 1.5 L12 3.5 V7.5 C12 10 7 12.5 7 12.5 C7 12.5 2 10 2 7.5 V3.5 Z"/></svg>',
    doc:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 1.5 H9 L11.5 4 V12.5 H3 Z"/><path d="M9 1.5 V4 H11.5"/><path d="M4.5 7 H9.5 M4.5 9 H9.5"/></svg>',
    badge:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="1.5" width="8" height="11" rx="1"/><circle cx="7" cy="5.5" r="1.5"/><path d="M4.5 9.5 H9.5"/></svg>',
    policy:'<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.5 2.5 H11.5 V11.5 H2.5 Z"/><path d="M5 2.5 V11.5 M9 2.5 V11.5"/><path d="M5 5 H11.5 M5 8 H11.5"/></svg>'
  };

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
        <div class="dc-quote">“${r.quote}”</div>
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

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Role ${i+1}`);
    dot.addEventListener('click', () => { idx = i; render(); });
    dotsWrap.appendChild(dot);
  });

  const cards = [...stage.querySelectorAll('.deck-card')];
  const dots = [...dotsWrap.querySelectorAll('button')];

  function render(){
    cards.forEach((c, i) => {
      const off = i - idx;
      const abs = Math.abs(off);
      let tx = off * 64;
      let ty = abs * 14;
      let rot = off * -4;
      let scale = 1 - Math.min(abs, 3) * 0.07;
      let z = 10 - abs;
      let op = abs > 2 ? 0 : 1;
      let filter = abs > 0 ? `blur(${abs*0.6}px)` : 'none';
      c.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
      c.style.zIndex = z;
      c.style.opacity = op;
      c.style.filter = filter;
      c.style.pointerEvents = abs === 0 ? 'auto' : 'auto';
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    counter.textContent = String(idx+1).padStart(2,'0');
    nowEmp.textContent = ROLES[idx].org.split('·')[0].trim();
  }

  // Click side card to focus
  cards.forEach((c, i) => {
    c.addEventListener('click', (e) => {
      if(i !== idx && !c._dragging){ idx = i; render(); }
    });
  });

  // Controls
  prevBtn.addEventListener('click', () => { idx = (idx - 1 + ROLES.length) % ROLES.length; render(); });
  nextBtn.addEventListener('click', () => { idx = (idx + 1) % ROLES.length; render(); });

  // Keys
  window.addEventListener('keydown', (e) => {
    if(document.querySelector('.env.open')) return;
    if(e.key === 'ArrowLeft'){ idx = (idx - 1 + ROLES.length) % ROLES.length; render(); }
    if(e.key === 'ArrowRight'){ idx = (idx + 1) % ROLES.length; render(); }
  });

  // Drag
  let down = false, sx = 0, dragCard = null;
  stage.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('.deck-card');
    if(!c || +c.dataset.idx !== idx) return;
    down = true; sx = e.clientX; dragCard = c;
    c.classList.add('drag');
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
  pass.addEventListener('click', () => pass.classList.toggle('flipped'));
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
    el.addEventListener('click', () => open(el.dataset.key));
  });
  closeBtn.addEventListener('click', close);
  env.addEventListener('click', (e) => { if(e.target === env) close(); });
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });

  // Tabs
  env.querySelectorAll('.env-tab').forEach(t => {
    t.addEventListener('click', () => {
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
      if(!open) f.setAttribute('aria-expanded','true');
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

/* ============= BOOT ============= */
function boot(){
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
  initPolaroids();
  initTickets();
  initFolders();
  initTweaks();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
