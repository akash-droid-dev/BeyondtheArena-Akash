/* ============================================================
   AKASH RATHORE — PORTFOLIO
   Interactions, project environments, scroll effects
   ============================================================ */

// ---------- IMAGE SOURCES ----------
const IMG = {
  stadium:     'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=80',
  cricketField:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80',
  cricketBat:  'https://images.unsplash.com/photo-1500098693856-b29e29ab30f8?w=1600&q=80',
  crowd:       'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80',
  archery:     'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=1600&q=80',
  archeryAlt:  'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1600&q=80',
  temple:      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80',
  templeAlt:   'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80',
  conference:  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80',
  meeting:     'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80',
  dashboard:   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
  screens:     'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80',
  goa:         'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=80',
  podium:      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1600&q=80',
  flag:        'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80',
  ceremony:    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&q=80',
  signage:     'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80',
  badge:       'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1600&q=80',
  jharkhand:   'https://images.unsplash.com/photo-1604608672516-f1b9b1d1a4a4?w=1600&q=80',
  govBldg:     'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80',
  team:        'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80',
  whiteboard:  'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=1600&q=80',
  laptop:      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=80',
};

// ---------- PROJECT DATA ----------
const PROJECTS = {
  gms: {
    name: 'Games Management System',
    nameHTML: 'Games <em>Management</em> System',
    client: 'GoBananas',
    year: '2025 — Present',
    role: 'Business Analyst · Product',
    cover: IMG.dashboard,
    strap: "A federation-grade games platform — Registration, Accreditation, Tournament Management, Admin — documented from first principles.",
    tags: ['BRD/FRD/PRD', 'UI/UX Wireframing', 'Automation'],
    pill: 'In Production',
    overview: [
      "GMS is the operating system for a sports federation. It moves every athlete from registration to the field of play, every official from credential to access zone, every tournament from fixture to final.",
      "My job is to translate the messy reality of how sports actually run — federations, sponsors, government rules, vendor SLAs — into something engineering can ship: BRDs, FRDs, PRDs, user flows, workflow diagrams, use cases, acceptance criteria.",
      "I also run client servicing on the same platform: approvals, change requests, status reviews, delivery accountability — so the spec author and the delivery owner are the same person."
    ],
    bullets: [
      "<b>4 modules</b> documented end-to-end: Registration, Accreditation, Tournament Management, Admin.",
      "User flows, workflow diagrams, use cases & scenarios produced for every primary path and exception.",
      "Stakeholder asks (federation / sponsor / govt.) translated into platform-ready specs and sequenced with engineering and design.",
      "Manual workflows mapped, bottlenecks identified, automation proposed and shipped to cut turnaround time.",
    ],
    gallery: [
      { src: IMG.dashboard, cap: 'Module dashboard · Admin' , cls:'big'},
      { src: IMG.whiteboard, cap: 'Workflow sessions', cls:'tall'},
      { src: IMG.screens, cap: 'Spec / wireframes' , cls:'wide'},
      { src: IMG.meeting, cap: 'Stakeholder review' , cls:'sq'},
      { src: IMG.laptop, cap: 'Implementation review' , cls:'thumb'},
      { src: IMG.team, cap: 'Cross-functional sync' , cls:'thumb'},
      { src: IMG.signage, cap: 'On-ground rollout' , cls:'thumb'},
    ],
    specs: [
      ['Role','Business Analyst · Product'],
      ['Engagement','Asst. Manager · IT & Ops'],
      ['Modules','4 · Reg · Accred · Tourney · Admin'],
      ['Stack','Figma · Jira · Zoho · MS 365'],
      ['Stakeholders','Engg · Design · Ops · Govt.'],
      ['Status','Live & iterating'],
    ],
    chips: { 'Documentation': ['BRD','FRD','PRD','SOP','Use Cases','User Flows','Process Maps'], 'Tools':['Figma','Jira','Zoho Sprints'] },
    outcomes: [
      ['Spec coverage', 96],
      ['Manual steps automated', 72],
      ['Stakeholder approvals on time', 88],
      ['Module ship velocity', 80],
    ],
    why: "GMS is the through-line of my product practice. It demonstrates the discipline of writing a platform from the operator's seat — every spec is informed by having actually run the operation it describes.",
  },

  sajha: {
    name: 'SAJHA — Unified Sports Portal',
    nameHTML: 'SAJHA — Unified <em>Sports</em> Portal',
    client: 'Sports Authority of Jharkhand',
    year: '2024 — 2025',
    role: 'Project Lead',
    cover: IMG.govBldg,
    strap: "Digitising a state sports authority — athletes, officials, federations, schemes — into one navigable portal.",
    tags: ['Digitalization', 'FRD/BRD/SOP/DPR', 'Government'],
    pill: 'Shipped',
    overview: [
      "SAJHA is the single front door to the Sports Authority of Jharkhand. Citizens, athletes, technical officials and federations get answers, schemes and services from one place — instead of seven offices.",
      "I led the digitalisation effort: workflows mapped, services scoped, a multi-module database designed and integrated with the authority's internal IT systems.",
      "Government work runs on paper. The lifecycle documentation — FRDs, BRDs, SOPs, DPRs — is the contract. I owned it end to end for the portal and adjacent platform initiatives."
    ],
    bullets: [
      "<b>End-to-end digitisation</b> of information & service delivery for citizens, athletes and officials.",
      "Multi-module sports database — athletes, officials, federations, stakeholders — integrated with internal IT.",
      "Full-lifecycle documentation: FRDs, BRDs, SOPs, DPRs for the portal and related programs.",
      "Drove enrolment for state government sports schemes through purpose-built tooling and process automation.",
    ],
    gallery: [
      { src: IMG.govBldg, cap: 'Sports Authority of Jharkhand', cls:'big'},
      { src: IMG.jharkhand, cap: 'Field outreach', cls:'tall'},
      { src: IMG.dashboard, cap: 'Portal · scheme console', cls:'wide'},
      { src: IMG.whiteboard, cap: 'Workflow mapping', cls:'sq'},
      { src: IMG.meeting, cap: 'Departmental review', cls:'thumb'},
      { src: IMG.screens, cap: 'FRD walkthroughs', cls:'thumb'},
      { src: IMG.team, cap: 'Sports fellows · Ranchi', cls:'thumb'},
    ],
    specs: [
      ['Role','Project Lead'],
      ['Client','Sports Authority of Jharkhand'],
      ['Modules','Athletes · Officials · Federations · Schemes'],
      ['Docs','FRDs · BRDs · SOPs · DPRs'],
      ['Users','Athletes · Officials · Citizens'],
      ['Status','Shipped'],
    ],
    chips: { 'Documentation':['FRD','BRD','SOP','DPR','Tender Docs'], 'Domains':['Athletes DB','Officials DB','Schemes','Outreach'] },
    outcomes: [
      ['Workflow digitisation', 84],
      ['Scheme enrolment uplift', 68],
      ['Manual files retired', 78],
      ['Inter-dept handoffs cut', 60],
    ],
    why: "Working with a state authority taught me to write specs that survive paper, audits and turnover. The portal is a hand-off proof that the documents work."
  },

  ipl: {
    name: 'TATA IPL — Accreditation',
    nameHTML: 'TATA IPL — <em>Accreditation</em>',
    client: 'Paytm Insider',
    year: '2023 — 2024',
    role: 'Accreditation Manager',
    cover: IMG.stadium,
    strap: "A matrix-based accreditation framework for one of the most-watched leagues in the world, operated across multiple stadia.",
    tags: ['Crowd Management', 'Access Control', 'Real-time'],
    pill: 'Delivered · 2 Seasons',
    overview: [
      "Two IPL seasons. The job is brutally simple to describe and brutally hard to do: every person in the stadium has the right access, at the right zone, at the right time.",
      "In 2024 I spearheaded crowd management and access-control strategy across multi-stadium operations. The system was a zoning matrix — issued at registration, validated at the gate, escalated in real time when something didn't match.",
      "In 2023 I worked the same problem from the other end — printing, issuing and verifying credentials on the floor, coordinating signage and security liaison.",
    ],
    bullets: [
      "Matrix-based accreditation framework monitoring crowd movement, zoning and credential validity in real time.",
      "<b>Multi-stadium</b> ops with central coordination on issuance, escalation handling and venue compliance.",
      "Operated both as <b>floor lead</b> (’23) and <b>strategy lead</b> (’24) — full vertical experience.",
      "Worked alongside venue security, league ops and broadcast partners across match days.",
    ],
    gallery: [
      { src: IMG.stadium, cap: 'Floodlit ground', cls:'big'},
      { src: IMG.cricketBat, cap: 'Match day', cls:'tall'},
      { src: IMG.cricketField, cap: 'Field of play', cls:'wide'},
      { src: IMG.crowd, cap: 'Crowd · multi-stand', cls:'sq'},
      { src: IMG.badge, cap: 'Credential issuance', cls:'thumb'},
      { src: IMG.signage, cap: 'Zone signage', cls:'thumb'},
      { src: IMG.team, cap: 'Ops floor', cls:'thumb'},
    ],
    specs: [
      ['Role','Accreditation Manager (2024) · Executive (2023)'],
      ['Seasons','IPL 2023 + 2024'],
      ['Scope','Multi-stadium'],
      ['Discipline','Access · Zoning · Crowd'],
      ['Stakeholders','League · Venue · Security · Broadcast'],
      ['Status','Delivered'],
    ],
    chips: { 'Operations':['Access Control','Zoning Matrix','Credential Issuance','Escalation'], 'Coordination':['League Ops','Venue Security','Broadcast'] },
    outcomes: [
      ['Credential validity rate', 99],
      ['Escalation resolution', 95],
      ['Venue compliance', 100],
      ['Cross-venue consistency', 92],
    ],
    why: "The IPL is where you learn to keep your head when a stand is rushing the gate. Most of how I think about access control was forged across these two seasons."
  },

  ng: {
    name: '37th National Games — Goa',
    nameHTML: '37<sup>th</sup> National Games — <em>Goa</em>',
    client: 'Sports Authority of Goa',
    year: '2023',
    role: 'Project Officer — Accreditation & IT',
    cover: IMG.goa,
    strap: "Authoring policy and tender scope for one of India's largest multi-sport events.",
    tags: ['Accreditation Policy', 'Tender Docs', 'IT Integration'],
    pill: 'Closed',
    overview: [
      "A 28-discipline multi-sport games across an entire state. Hundreds of officials, thousands of athletes, multiple venues, one credential system.",
      "I drafted the Games Accreditation Policy aligned to multi-sport event standards and government compliance — then authored the manuals and tender documents that turned the policy into a deliverable.",
      "On the IT side I supported the setup and integration that made accreditation, data flow and venue operations actually work together.",
    ],
    bullets: [
      "Drafted and executed the <b>Games Accreditation Policy</b>, aligned to multi-sport event standards.",
      "Authored department manuals and tender documents — accreditation + IT scope, vendor obligations, SLAs.",
      "Supported IT systems setup and integration across accreditation, data flow and venue ops.",
      "Coordinated with multiple government bodies and federations during the build-up.",
    ],
    gallery: [
      { src: IMG.goa, cap: 'Goa — host state', cls:'big'},
      { src: IMG.podium, cap: 'Podium · medal ceremony', cls:'tall'},
      { src: IMG.flag, cap: 'Opening ceremony', cls:'wide'},
      { src: IMG.ceremony, cap: 'Multi-venue ops', cls:'sq'},
      { src: IMG.badge, cap: 'Credential design', cls:'thumb'},
      { src: IMG.signage, cap: 'Venue signage', cls:'thumb'},
      { src: IMG.dashboard, cap: 'Data flow design', cls:'thumb'},
    ],
    specs: [
      ['Role','Project Officer'],
      ['Client','Sports Authority of Goa'],
      ['Scope','Policy · Tender · IT'],
      ['Disciplines','28 sports'],
      ['Edition','37th National Games'],
      ['Status','Closed'],
    ],
    chips: { 'Authored':['Accred. Policy','Dept. Manuals','Tender Docs','SLAs'], 'IT':['Systems Setup','Data Flow','Venue Ops Integration'] },
    outcomes: [
      ['Policy adoption (venues)', 100],
      ['Tender clarity (queries closed)', 90],
      ['Cross-dept handoffs', 85],
      ['IT readiness pre-games', 92],
    ],
    why: "Goa is where I started writing the language of large events for the government — policy first, tender second, system third."
  },

  archery: {
    name: 'NTPC Khelo India — Archery',
    nameHTML: 'NTPC Khelo India — <em>Archery</em>',
    client: 'GoBananas · Archery Assoc. of India',
    year: 'January 2026',
    role: 'Production & Operations Manager',
    cover: IMG.archery,
    strap: "Production and ops lead for the NTPC Khelo India National Ranking Women's Archery Tournament — Ambaji, Gujarat.",
    tags: ['Venue Setup', 'AAI Standards', 'Vendor Ops'],
    pill: 'Delivered',
    overview: [
      "A national-ranking women's archery tournament executed to the Archery Association of India's standards in Ambaji, Gujarat.",
      "I planned the venue end to end — field of play, scoring, athlete amenities, signage — then ran vendor coordination for equipment, materials and infrastructure on the build.",
      "On match days I supervised live event operations across the tournament timeline."
    ],
    bullets: [
      "Planned end-to-end venue setup as per <b>Archery Association of India standards</b>.",
      "Managed vendor coordination for equipment, materials and on-site infrastructure.",
      "Supervised signage, equipment placement and live event operations across the tournament timeline.",
      "Worked closely with the federation, athletes and the host venue team.",
    ],
    gallery: [
      { src: IMG.archery, cap: 'Field of play · target line', cls:'big'},
      { src: IMG.archeryAlt, cap: 'Athletes warming up', cls:'tall'},
      { src: IMG.signage, cap: 'Venue signage', cls:'wide'},
      { src: IMG.ceremony, cap: 'Officials briefing', cls:'sq'},
      { src: IMG.flag, cap: 'Opening', cls:'thumb'},
      { src: IMG.team, cap: 'Ops floor', cls:'thumb'},
      { src: IMG.podium, cap: 'Medal ceremony', cls:'thumb'},
    ],
    specs: [
      ['Role','Production & Ops Manager'],
      ['Venue','Ambaji, Gujarat'],
      ['Standards','Archery Association of India'],
      ['Discipline','Women’s Archery · National Ranking'],
      ['Scope','Setup → Execution'],
      ['Status','Delivered'],
    ],
    chips: { 'Production':['Venue Setup','FOP Layout','Signage','Equipment Placement'], 'Coordination':['Vendors','Federation','Host Venue'] },
    outcomes: [
      ['Venue compliance (AAI)', 100],
      ['Vendor SLA adherence', 95],
      ['Athlete satisfaction', 92],
      ['On-time execution', 100],
    ],
    why: "Archery is millimetric. A misaligned target line is a story. Running this event to federation standards was a test of every operations habit I have."
  },

  somnath: {
    name: 'Somnath Swabhiman Parva',
    nameHTML: 'Somnath <em>Swabhiman</em> Parva',
    client: 'GoBananas · Gov. of Gujarat',
    year: 'January 2026',
    role: 'Project Coordinator',
    cover: IMG.temple,
    strap: "1000 Years of Somnath Mandir — a high-profile state cultural event featuring the Hon'ble Prime Minister.",
    tags: ['VIP Accreditation', 'Event Flow', 'Security Coord.'],
    pill: 'Delivered',
    overview: [
      "A millennium of one of India's most significant temples, marked with a state-level event hosted by the Hon'ble Prime Minister.",
      "I coordinated cross-functional teams across protocol, vendor, security and creative — and authored the detailed event-flow documentation for PM arrival protocol and the ceremonial proceedings.",
      "On the ground I owned VIP accreditation, security coordination and vendor & material deployment across the venue."
    ],
    bullets: [
      "Coordinated cross-functional teams for a state-level cultural event with the Hon'ble Prime Minister.",
      "Managed VIP accreditation and security coordination end to end.",
      "Authored detailed event-flow documentation for <b>PM arrival protocol</b> and ceremonial proceedings.",
      "Vendor and material deployment across the venue.",
    ],
    gallery: [
      { src: IMG.temple, cap: 'Somnath at dusk', cls:'big'},
      { src: IMG.templeAlt, cap: 'Ceremonial space', cls:'tall'},
      { src: IMG.flag, cap: 'State flags', cls:'wide'},
      { src: IMG.ceremony, cap: 'Protocol briefing', cls:'sq'},
      { src: IMG.podium, cap: 'Address stage', cls:'thumb'},
      { src: IMG.signage, cap: 'Wayfinding', cls:'thumb'},
      { src: IMG.team, cap: 'Coordination team', cls:'thumb'},
    ],
    specs: [
      ['Role','Project Coordinator'],
      ['Event','Somnath Swabhiman Parva'],
      ['Principal','Hon’ble Prime Minister'],
      ['Disciplines','Protocol · Security · Vendor'],
      ['Author','PM Arrival Protocol Doc'],
      ['Status','Delivered'],
    ],
    chips: { 'Protocol':['PM Arrival','Ceremonial Flow','VIP Accred.'], 'On-Ground':['Security Coord.','Vendor Deployment','Material Logistics'] },
    outcomes: [
      ['Protocol compliance', 100],
      ['VIP accred. accuracy', 98],
      ['Vendor on-time', 96],
      ['Event flow adherence', 100],
    ],
    why: "Working a PM-level protocol event sharpens an operator. The margin for error is zero, and every minute of the timeline is a contract."
  },
};

// ---------- EXPERIENCE DECK DATA ----------
// Career chapters, most recent first. The deck reads as a tape — start on
// "Now," scrub backward through the chapters. Replace dates/lines/stats with
// real values when ready; the deck regenerates itself from this array.
const EXPERIENCE = [
  {
    num: '01', label: 'Now',
    employer: 'GoBananas · New Delhi',
    cover: IMG.dashboard,
    role: 'Asst. Manager',
    roleEm: 'IT & Ops',
    year: '2025 — Present',
    line: 'Business analysis and product documentation for GMS — the federation-grade games platform. Concurrent ops on NTPC Khelo India Archery and Somnath Swabhiman Parva.',
    stats: [['Modules', '04'], ['Events', '02'], ['Status', 'Live']],
  },
  {
    num: '02', label: 'Shipped',
    employer: 'Sports Authority of Jharkhand · Ranchi',
    cover: IMG.govBldg,
    role: 'Project Lead',
    roleEm: 'SAJHA Portal',
    year: '2024 — 2025',
    line: 'Led the digitalisation of a state sports authority — unified athletes, officials, federations and schemes into one navigable portal.',
    stats: [['Modules', '04'], ['Docs', '04'], ['Outcome', 'Shipped']],
  },
  {
    num: '03', label: 'Marquee',
    employer: 'Paytm Insider · Multi-stadium',
    cover: IMG.stadium,
    role: 'Accreditation Manager',
    roleEm: 'TATA IPL',
    year: '2023 — 2024',
    line: 'Two IPL seasons. Floor lead in ’23, strategy lead in ’24 — matrix-based access control across multi-stadium league operations.',
    stats: [['Seasons', '02'], ['Scope', 'IPL'], ['Outcome', 'Delivered']],
  },
  {
    num: '04', label: 'Policy',
    employer: 'Sports Authority of Goa · Panaji',
    cover: IMG.goa,
    role: 'Project Officer',
    roleEm: 'Accreditation & IT',
    year: '2023',
    line: '37th National Games — drafted the Games Accreditation Policy and authored the tender documents that ran the IT build across 28 disciplines.',
    stats: [['Sports', '28'], ['Authored', 'Policy'], ['Outcome', 'Closed']],
  },
  {
    num: '05', label: 'Genesis',
    employer: 'NEST Academy',
    cover: IMG.podium,
    role: 'BMS',
    roleEm: 'Sports Management',
    year: '2021 — 2023',
    line: 'Two years of sports management study with early on-ground assignments — Khelo India Youth Games (Tamil Nadu), Hyderabad E-Prix. The training ground.',
    stats: [['Years', '02'], ['Events', '02'], ['Degree', 'BMS']],
  },
];

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  initCurtain();
  initTitleChars();
  initTheme();
  initReveal();
  initCounters();
  initProjects();
  initPolaroids();
  initExperienceDeck();
  initPass();
  initCursor();
  initParallax();
});

// ---------- CURTAIN INTRO ----------
function initCurtain(){
  const curtain = document.getElementById('curtain');
  if (!curtain) return;
  document.body.classList.add('lock');
  setTimeout(() => {
    curtain.classList.add('gone');
    document.body.classList.remove('lock');
  }, 2600);
}

// ---------- TITLE CHARACTER REVEAL ----------
function initTitleChars(){
  const h1 = document.querySelector('.cover h1');
  if (!h1) return;
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE){
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach(ch => {
        if (ch === ' '){ frag.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement('span');
        s.className = 'char'; s.textContent = ch;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('char')){
      [...node.childNodes].forEach(walk);
    }
  };
  [...h1.childNodes].forEach(walk);
  const chars = h1.querySelectorAll('.char');
  chars.forEach((c, i) => c.style.animationDelay = (2.6 + i * 0.04) + 's');
}

// ---------- THEME TOGGLE ----------
function initTheme(){
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const dark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', dark ? 'paper' : 'dark');
    btn.querySelector('.label').textContent = dark ? 'Floodlights · On' : 'Floodlights · Off';
  });
}

// ---------- REVEAL ON SCROLL ----------
function initReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.section, .stat, .proj, .t-row, .tk-group, .feature').forEach(el => {
    el.classList.add('reveal'); io.observe(el);
  });
}

// ---------- ANIMATED COUNTERS ----------
function initCounters(){
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1400;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0)/dur);
        const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = p < 1 ? String(v).padStart(2, '0') : String(target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: .4 });
  counters.forEach(c => io.observe(c));
}

// ---------- POLAROIDS ----------
function initPolaroids(){
  const pols = document.querySelectorAll('.poloroid');
  const projMap = {
    ipl:     { src: IMG.stadium, cap: 'IPL · Floodlit' },
    archery: { src: IMG.archery, cap: 'Archery · Ambaji' },
    somnath: { src: IMG.temple,  cap: 'Somnath · 2026' },
    gms:     { src: IMG.dashboard, cap: 'GMS · Spec' },
    sajha:   { src: IMG.govBldg, cap: 'SAJHA · Jharkhand' },
    ng:      { src: IMG.goa, cap: 'National Games · Goa' },
  };
  pols.forEach(p => {
    const data = projMap[p.dataset.project] || { src: IMG.stadium, cap: 'Field of Play' };
    const img = p.querySelector('.ph');
    if (img) img.style.backgroundImage = `url(${data.src})`;
    const cap = p.querySelector('.cap'); if (cap) cap.textContent = data.cap;
  });
}

// ---------- PROJECT GRID & ENVIRONMENT MODAL ----------
function initProjects(){
  const tiles = document.querySelectorAll('.proj');
  tiles.forEach(tile => {
    const key = tile.dataset.key;
    const proj = PROJECTS[key]; if (!proj) return;
    const img = tile.querySelector('.cover-img');
    if (img) img.style.backgroundImage = `url(${proj.cover})`;
    tile.addEventListener('click', () => openEnv(key));
  });

  const env = document.getElementById('env');
  env.addEventListener('click', e => { if (e.target === env) closeEnv(); });
  document.getElementById('envClose').addEventListener('click', closeEnv);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEnv(); });
}

function openEnv(key){
  const proj = PROJECTS[key]; if (!proj) return;
  const env = document.getElementById('env');
  env.querySelector('.crumbs .name').textContent = proj.name;
  env.querySelector('.crumbs .client').textContent = proj.client;
  env.querySelector('.heroimg').style.backgroundImage = `url(${proj.cover})`;
  env.querySelector('.env-hero .kicker .pill').textContent = proj.pill;
  env.querySelector('.env-hero .kicker .role').textContent = proj.role;
  env.querySelector('.env-hero .kicker .year').textContent = proj.year;
  env.querySelector('.env-hero h2').innerHTML = proj.nameHTML;
  env.querySelector('.env-hero .strap').textContent = proj.strap;

  const ovBody = env.querySelector('.ov-grid .ov-body');
  ovBody.innerHTML = proj.overview.map(p => `<p>${p}</p>`).join('');
  const why = env.querySelector('.ov-grid .why-q');
  why.innerHTML = `<h3>Why <em>this</em> project matters</h3><p>${proj.why}</p>`;
  const sideKv = env.querySelector('.ov-side .kvs');
  sideKv.innerHTML = proj.specs.map(([k,v]) => `<div class="kv"><span>${k}</span><span>${v}</span></div>`).join('');

  const gal = env.querySelector('.gallery');
  gal.innerHTML = proj.gallery.map(g => `
    <div class="g-cell ${g.cls}">
      <div class="gi" style="background-image:url(${g.src})"></div>
      <div class="cap">${g.cap}</div>
    </div>
  `).join('');

  const specL = env.querySelector('.spec-list');
  specL.innerHTML = proj.specs.map(([k,v]) => `<li><span class="k">${k}</span><span class="v">${v}</span></li>`).join('');
  const chipsWrap = env.querySelector('.chips-wrap');
  chipsWrap.innerHTML = Object.entries(proj.chips).map(([g, list]) => `
    <div style="margin-bottom:22px">
      <h5 style="font-family:'Instrument Serif',serif; font-style:italic; font-size:22px; margin:0 0 10px; font-weight:400;">${g}</h5>
      <div class="chips">${list.map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  `).join('');

  const bulletList = env.querySelector('.bullet-list');
  bulletList.innerHTML = proj.bullets.map(b => `<li>${b}</li>`).join('');
  const bars = env.querySelector('.bars');
  bars.innerHTML = proj.outcomes.map(([n, v]) => `
    <div class="bar">
      <div class="bh"><span class="name">${n}</span><span class="v">${String(v).padStart(2,'0')}%</span></div>
      <div class="track"><div class="fill" style="--w:${v}%"></div></div>
    </div>
  `).join('');

  env.querySelectorAll('.env-tab').forEach((t,i) => t.classList.toggle('active', i===0));
  env.querySelectorAll('.tab-pane').forEach((p,i) => p.classList.toggle('active', i===0));

  env.classList.add('open');
  document.body.classList.add('lock');
}

function closeEnv(){
  const env = document.getElementById('env');
  env.classList.remove('open');
  document.body.classList.remove('lock');
}

// tabs
document.addEventListener('click', e => {
  const tab = e.target.closest('.env-tab');
  if (!tab) return;
  const env = tab.closest('.env');
  if (!env) return;
  const target = tab.dataset.tab;
  env.querySelectorAll('.env-tab').forEach(t => t.classList.toggle('active', t === tab));
  env.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === target));
  env.querySelector('.env-body').scrollTo({ top: env.querySelector('.env-tabs').offsetTop, behavior:'smooth' });
});

// ---------- EXPERIENCE DECK ----------
function initExperienceDeck(){
  const stage = document.querySelector('.deck-stage');
  const dotsHost = document.querySelector('.deck-dots');
  if (!stage || !dotsHost) return;

  const total = EXPERIENCE.length;
  let active = 0;

  EXPERIENCE.forEach((e, i) => {
    const card = document.createElement('article');
    card.className = 'deck-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="dc-bg" style="background-image:url(${e.cover})"></div>
      <div class="dc-tint"></div>
      <div class="dc-stripe">
        <span class="dc-num">${e.num} · ${e.label}</span>
        <span>${e.year}</span>
      </div>
      <div class="dc-body">
        <div class="dc-employer">${e.employer}</div>
        <h3 class="dc-role">${e.role} <em>· ${e.roleEm}</em></h3>
        <div class="dc-line">${e.line}</div>
      </div>
      <div class="dc-foot">
        ${e.stats.map(([k,v]) => `<div class="dc-stat">${k}<b>${v}</b></div>`).join('')}
      </div>
    `;
    card.addEventListener('click', () => {
      if (i !== active) setActive(i);
    });
    stage.appendChild(card);

    const dot = document.createElement('button');
    dot.className = 'deck-dot';
    dot.setAttribute('aria-label', `Chapter ${e.num} — ${e.employer}`);
    dot.addEventListener('click', () => setActive(i));
    dotsHost.appendChild(dot);
  });

  const counter = document.querySelector('.deck-counter b');
  const counterSub = document.querySelector('.deck-counter sub');
  const nowEmp = document.querySelector('.deck-now-emp');
  if (counterSub) counterSub.textContent = `/ ${String(total).padStart(2, '0')}`;

  function setActive(i){
    active = ((i % total) + total) % total;
    const cards = stage.querySelectorAll('.deck-card');
    cards.forEach((c, idx) => {
      const off = idx - active;
      c.style.setProperty('--off', off);
      c.style.setProperty('--absoff', Math.abs(off));
      c.classList.toggle('active', off === 0);
      c.classList.toggle('hidden', Math.abs(off) > 3);
    });
    dotsHost.querySelectorAll('.deck-dot').forEach((d, idx) => d.classList.toggle('on', idx === active));
    if (counter) counter.textContent = String(active + 1).padStart(2, '0');
    if (nowEmp) nowEmp.textContent = EXPERIENCE[active].employer;
  }

  document.querySelector('.deck-prev')?.addEventListener('click', () => setActive(active - 1));
  document.querySelector('.deck-next')?.addEventListener('click', () => setActive(active + 1));

  window.addEventListener('keydown', e => {
    if (document.body.classList.contains('lock')) return;
    if (document.getElementById('env')?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') setActive(active - 1);
    else if (e.key === 'ArrowRight') setActive(active + 1);
  });

  let startX = 0, dragging = false;
  const begin = (x) => { startX = x; dragging = true; };
  const end = (x) => {
    if (!dragging) return;
    dragging = false;
    const dx = x - startX;
    if (Math.abs(dx) > 50) setActive(active + (dx < 0 ? 1 : -1));
  };
  stage.addEventListener('mousedown', e => begin(e.clientX));
  window.addEventListener('mouseup', e => end(e.clientX));
  stage.addEventListener('touchstart', e => begin(e.touches[0].clientX), { passive: true });
  stage.addEventListener('touchend', e => end(e.changedTouches[0].clientX));

  setActive(0);
}

// ---------- ACCRED PASS ----------
function initPass(){
  const pass = document.getElementById('pass');
  if (!pass) return;
  pass.addEventListener('click', () => pass.classList.toggle('flipped'));
}

// ---------- CURSOR FOLLOWER ----------
function initCursor(){
  if (window.matchMedia('(hover: none)').matches) return;
  const c = document.createElement('div'); c.className = 'cur';
  document.body.appendChild(c);
  let x=window.innerWidth/2, y=window.innerHeight/2, tx=x, ty=y;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    x += (tx - x) * .22; y += (ty - y) * .22;
    c.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${c.classList.contains('big')?4:1})`;
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll('a, button, .proj, .pass, .role-chip, .c-link, .poloroid, .env-tab, .tk-list span, .deck-card, .deck-dot, .deck-btn').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('big'));
    el.addEventListener('mouseleave', () => c.classList.remove('big'));
  });
}

// ---------- PARALLAX ----------
function initParallax(){
  const items = document.querySelectorAll('[data-parallax]');
  const onScroll = () => {
    const y = window.scrollY;
    items.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || .1;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
