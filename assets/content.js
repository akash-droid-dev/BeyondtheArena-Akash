/* ====================================================================
   THE OPERATOR — content.js
   Central content store. All editable content lives here.
   Loads overrides from localStorage on init. Saves changes back.
   ==================================================================== */

window.PortfolioContent = (function () {
  'use strict';

  const KEY = 'ar-portfolio-content-v1';
  const VERSION = 1;

  /* ============= DEFAULT CONTENT ============= */
  const DEFAULTS = {
    version: VERSION,

    meta: {
      title: 'Akash Rathore — The Operator',
      description: 'Akash Rathore — Business Analyst, Sports Operations and Product. Portfolio: TATA IPL, National Games Goa, SAJHA, Khelo India Archery, Somnath Swabhiman Parva, GoBananas GMS.'
    },

    theme: {
      mode: 'paper',
      accent: '#d63919',
      paperBg: '#f1ebda',
      paperInk: '#0c0a08',
      floodBg: '#0e0c0a',
      floodInk: '#f1ebda'
    },

    curtain: {
      meta: 'The Operator · Portfolio · Vol. 03 · Issue 26',
      markHtml: 'Akash <em>Rathore</em>',
      strap: 'Business Analyst · Sports Operations · Product'
    },

    ticker: {
      enabled: true,
      label: 'Live · Ops',
      items: [
        'TATA IPL 2024 · Accreditation Manager · Multi-stadium',
        'SAJHA · Sports Authority of Jharkhand · Unified Portal',
        '37th National Games, Goa · Accreditation Policy',
        'Khelo India Youth Games · Tamil Nadu · Branding',
        'NTPC Khelo India Archery · Ambaji, Gujarat · 2026',
        'Somnath Swabhiman Parva · PM Protocol · 2026',
        'Hyderabad E-Prix · Supervisor · 2023'
      ]
    },

    masthead: {
      markLetter: 'A',
      title: 'The Operator',
      vol: '03',
      issue: '26',
      edition: 'New Delhi',
      workCta: 'Work',
      hireCta: 'Hire Akash'
    },

    hero: {
      pill: 'Portfolio · 2026',
      est: 'EST. 2021 — INDIA',
      section: 'Section · Business Analysis × Sports Ops',
      firstName: 'Akash',
      lastName: 'Rathore',
      roleChips: ['Business Analyst', 'Sports Operations', 'Accreditation', 'Product Documentation'],
      locationCity: 'New Delhi, IN',
      coordinates: '28.61° N · 77.20° E',
      availability: 'Available Q2 ’26',
      scrollCue: 'Scroll to read',
      tickets: [
        { event: 'TATA IPL 2024', stamp: 'PAID', art: 'tk-art-ipl',
          rows: [['Venue', 'Wankhede · MUM'], ['Gate', '04 · Zone A'], ['Seat', 'OPS · CONCOURSE']],
          stub: '01', stubLabel: 'ACCRED', imageUrl: '' },
        { event: 'KIA · Archery', stamp: 'VENUE', art: 'tk-art-arch',
          rows: [['Range', 'Ambaji · 70m'], ['Std.', 'AAI / WA']],
          stub: '02', stubLabel: 'RANGE', imageUrl: '' },
        { event: 'Somnath ’26', stamp: 'PM TIER', art: 'tk-art-som',
          rows: [['Zone', 'VIP · Stage'], ['Protocol', 'PM']],
          stub: '03', stubLabel: 'PROTOCOL', imageUrl: '' }
      ],
      feature: {
        stamp: 'The Feature',
        titleHtml: 'The analyst who can also <em>build the stadium</em>.',
        body: 'Three years across IPL stadia, national games, and federation platforms — translating chaos on the ground into BRDs, FRDs, PRDs, and software that actually ships.',
        items: [
          { label: 'Now', value: 'GoBananas · GMS' },
          { label: 'Disciplines', value: 'BA · Ops · Product' },
          { label: 'Languages', value: 'Eng · Hindi' },
          { label: 'Toolchain', value: 'Figma · Jira · Claude' }
        ]
      }
    },

    manifesto: {
      sectionNum: '§ 01',
      sectionLabel: 'Manifesto',
      titleHtml: 'A career spent <em>between</em><br>the whistle and the wireframe.',
      paragraphs: [
        'I work where sports operations and product meet. One week I’m authoring the accreditation policy for a multi-sport national event; the next I’m sitting with engineers to scope a registration module, or driving across a state to set up an archery range to <span class="hl">AAI standards</span>.',
        'The throughline is the same: take a messy, high-stakes situation — a stadium, a federation, a state government — and turn it into something that runs. Documents, dashboards, workflows, vendor matrices, escalation paths. Whatever the system needs.',
        'I’ve delivered for the <span class="hl">IPL</span>, the <span class="hl">National Games</span>, <span class="hl">Khelo India</span>, the Sports Authority of Jharkhand, and a state-level cultural event hosted by the Prime Minister.'
      ],
      pullquote: {
        body: 'I write the BRDs. I print the badges. I’m comfortable in both rooms.',
        cite: 'Operating principle'
      },
      dossierMeta: { name: 'The Operator', files: 'Personal Dossier · 03 files', hint: 'tap a folder ▾' },
      dossier: [
        { num: '01', title: 'Currently', stamp: 'ACTIVE', stampClass: '', seal: 'SEALED · 2026',
          rows: [['Asst. Manager — IT &amp; Ops', 'GoBananas / GMS'], ['Business Analysis', 'Reg · Accred · Tourney'], ['Based out of', 'New Delhi']],
          footLeft: 'Filed · 13 May 2026', footRight: 'Live' },
        { num: '02', title: 'I write', stamp: 'DOCS', stampClass: 'doc', seal: 'SPEC SET',
          rows: [['BRD · FRD · PRD', 'Platform spec'], ['SOPs · DPRs', 'Event spec'], ['Tender Docs', 'Govt. compliance']],
          footLeft: 'Authored · 12+', footRight: 'Living docs' },
        { num: '03', title: 'I run', stamp: 'OPS', stampClass: 'ops', seal: 'FIELD LOG',
          rows: [['Accreditation', 'Multi-stadium'], ['Vendor coordination', 'End-to-end'], ['Cross-functional ops', 'Engg · Design · Govt.']],
          footLeft: 'States · 7', footRight: 'Match-ready' }
      ]
    },

    stats: {
      sectionNum: '§ 02',
      sectionLabel: 'By the Numbers',
      items: [
        { num: '3', suffix: '+', label: 'Years of Practice', sub: 'Since 2021' },
        { num: '12', suffix: '', label: 'Major Events Delivered', sub: 'National & International' },
        { num: '4', suffix: '', label: 'Platforms Documented', sub: 'GMS · SAJHA + 2' },
        { num: '7', suffix: '', label: 'States Operated In', sub: 'Goa to Jharkhand' }
      ]
    },

    work: {
      sectionNum: '§ 03',
      sectionLabel: 'Selected Work',
      titleHtml: 'Six recent <em>environments</em>.',
      lede: 'Click any tile to enter the project — overview, gallery, specs, outcomes. Each project is its own room.'
    },

    projects: {
      gms: {
        gate: 'G-01', stamp: 'NOW · LIVE', stampClass: 'st-live',
        client: 'GoBananas · Product', year: '2025 — Present',
        tileTitleHtml: 'Games <em>Management</em> System',
        kpis: [['3', 'Modules'], ['BRD<sup>+2</sup>', 'Spec set'], ['94<sup>%</sup>', 'Coverage'], ['Live', 'Active']],
        statusLabel: 'Now Playing', statusClass: 'on',
        bpMeta: 'GoBananas · Platform Architecture · v2.1',
        name: 'Games Management System', clientFull: 'GoBananas', yearFull: '2025 — Present',
        pill: '01 · Now', role: 'Product & Business Analysis',
        title: 'Games <em>Management</em> System',
        strap: 'A platform built to run real federations and real events — from registration through accreditation, draw, scoring and reporting.',
        overview: 'Authoring the BRD, FRD and PRD for a single platform that replaces the spreadsheet-and-WhatsApp stack federations rely on. The work moves between user research with federation operators, wireframing flows in Figma, and writing automation specs engineering can implement without ambiguity.',
        why: 'Why this matters · Federations spend half their event time chasing data. A single source of truth across registration, accreditation and competition unlocks better scheduling, faster results and credible reporting.',
        hud: [['3', 'Modules'], ['BRD<sup>+2</sup>', 'Spec set'], ['<em>Live</em>', 'Status']],
        sealNo: 'GMS', phases: [1, 1, 1, 1, 0, 0],
        kvs: [['Role', 'Product · BA · UX'], ['Modules', 'Registration · Accreditation · Tournament'], ['Status', 'Active development'], ['Stakeholders', 'GMS team · Federations'], ['Outputs', 'BRD · FRD · PRD · Figma wireframes']],
        gallery: [
          { cap: 'Registration flow', kind: 'gms-1', imageUrl: '' },
          { cap: 'Accreditation matrix', kind: 'gms-2', imageUrl: '' },
          { cap: 'Draw board', kind: 'gms-3', imageUrl: '' },
          { cap: 'Scoring console', kind: 'gms-4', imageUrl: '' },
          { cap: 'Reports', kind: 'gms-5', imageUrl: '' }
        ],
        specs: [['Domain', 'Federation operations'], ['Users', 'Federation staff · Officials · Athletes'], ['Scale', 'National events · Multi-discipline'], ['Approach', 'Modular · API-first'], ['Documentation', 'Living BRD/FRD/PRD set']],
        chips: ['Figma', 'Jira', 'Claude Code', 'OpenClaw', 'MS Word', 'Notion', 'Codex', 'Stitch'],
        bullets: ['<b>Authored</b> a 3-document spec set (BRD / FRD / PRD) used by engineering and design.', '<b>Wireframed</b> high-fidelity flows for registration, accreditation and tournament.', '<b>Scoped</b> the accreditation module end-to-end with zone, role & access matrices.', '<b>Coordinated</b> design reviews, sprint planning and feature roadmaps.'],
        bars: [['Documentation coverage', '94%', 94], ['Stakeholder alignment', '88%', 88], ['Module readiness', '71%', 71]],
        span: 7
      },
      sajha: {
        gate: 'G-02', stamp: 'SHIPPED', stampClass: 'st-ship',
        client: 'Sports Authority · Jharkhand', year: '2024 — 2025',
        tileTitleHtml: '<em>SAJHA</em> Portal',
        kpis: [['9<sup>/12</sup>', 'Fed.'], ['7<sup>+</sup>', 'Flows'], ['BRD', 'Authored'], ['State', 'Govt.']],
        statusLabel: 'Shipped', statusClass: 'archive',
        bpMeta: 'Sports Auth. of Jharkhand · State Portal',
        name: 'SAJHA Sports Portal', clientFull: 'Sports Authority of Jharkhand', yearFull: '2024 — 2025',
        pill: '02 · Shipped', role: 'Business Analyst',
        title: '<em>SAJHA</em> Sports Portal',
        strap: 'A unified state sports portal — federations, athletes, coaches and infrastructure under one roof.',
        overview: 'Owned business analysis for a state-government portal that brings disparate federation processes into one digital system. Translated the lived reality of state sports administration into requirements that engineering could implement.',
        why: 'Why this matters · State sports bodies coordinate hundreds of federations on paper. A unified portal is the difference between knowing your athlete pool and guessing it.',
        hud: [['9<sup>/12</sup>', 'Fed.'], ['7<sup>+</sup>', 'Flows'], ['<em>Live</em>', 'Statewide']],
        sealNo: 'SAJ', phases: [1, 1, 1, 1, 1, 0],
        kvs: [['Role', 'Lead Business Analyst'], ['Sector', 'State Government'], ['Lifecycle', 'Discovery → Delivery'], ['Modules', '7+ federation workflows'], ['Compliance', 'Govt. of Jharkhand standards']],
        gallery: [
          { cap: 'Athlete profile', kind: 'sajha-1', imageUrl: '' },
          { cap: 'Federation dashboard', kind: 'sajha-2', imageUrl: '' },
          { cap: 'Coach registry', kind: 'sajha-3', imageUrl: '' },
          { cap: 'Venue infrastructure', kind: 'sajha-4', imageUrl: '' },
          { cap: 'Reports & analytics', kind: 'sajha-5', imageUrl: '' }
        ],
        specs: [['Client', 'Sports Authority of Jharkhand'], ['Stakeholders', 'Federations · Coaches · Athletes · Officers'], ['Scope', 'Statewide rollout'], ['Format', 'Web portal · multi-role'], ['Documentation', 'BRD / FRD / Tender alignment']],
        chips: ['MS Word', 'Excel', 'Jira', 'Figma', 'Visily', 'PowerPoint', 'Govt. Stack'],
        bullets: ['<b>Mapped</b> 7+ federation workflows into a unified information architecture.', '<b>Authored</b> BRD/FRD aligned with government tender language.', '<b>Drove</b> requirement workshops with sport federations and state officials.', '<b>Bridged</b> engineering & policy stakeholders through delivery.'],
        bars: [['Federations onboarded', '9 / 12', 75], ['Workflow digitization', '81%', 81], ['Officer adoption', '67%', 67]],
        span: 5
      },
      ipl: {
        gate: 'G-03', stamp: 'MARQUEE', stampClass: 'st-marquee',
        client: 'Paytm Insider · BCCI', year: '2023 — 2024',
        tileTitleHtml: 'TATA IPL <em>Accred.</em>',
        kpis: [['6', 'Venues'], ['10k<sup>+</sup>', 'Badges'], ['99.7<sup>%</sup>', 'Uptime'], ['Live', 'Match-day']],
        statusLabel: 'Archive', statusClass: 'archive',
        bpMeta: 'WANKHEDE · TOP DOWN · 1:2400',
        name: 'TATA IPL Accreditation', clientFull: 'Paytm Insider · BCCI', yearFull: '2023 — 2024',
        pill: '03 · Marquee', role: 'Accreditation Manager',
        title: 'TATA IPL <em>Accreditation</em>',
        strap: 'Multi-stadium access control across the IPL season — every badge, gate, zone and exception.',
        overview: 'Ran accreditation operations across multiple IPL venues. Built the systems and SOPs that determined who could go where and when, working alongside franchise, broadcast, security and venue ops teams under real-time pressure.',
        why: 'Why this matters · An IPL stadium is a moving city. Accreditation is the policy layer that keeps it from collapsing — get one zone wrong and a broadcast feed dies.',
        hud: [['6', 'Venues'], ['10k<sup>+</sup>', 'Badges'], ['99.7<sup>%</sup>', 'Uptime']],
        sealNo: 'IPL', phases: [1, 1, 1, 1, 1, 1],
        kvs: [['Role', 'Accreditation Manager'], ['Stadiums', 'Multi-venue · National'], ['Stakeholders', 'BCCI · Franchises · Broadcast'], ['Real-time decisions', 'Daily'], ['Volume', 'Thousands of badges / venue']],
        gallery: [
          { cap: 'Stadium aerial', kind: 'ipl-1', imageUrl: '' },
          { cap: 'Badge zones', kind: 'ipl-2', imageUrl: '' },
          { cap: 'Gate ops', kind: 'ipl-3', imageUrl: '' },
          { cap: 'Floodlit field', kind: 'ipl-4', imageUrl: '' },
          { cap: 'Command room', kind: 'ipl-5', imageUrl: '' }
        ],
        specs: [['Scale', 'IPL season · Multi-stadium'], ['Functions', 'Access control · Real-time ops · Vendor'], ['Pressure', 'Match day, no margin'], ['Coordination', 'Security · Broadcast · Franchise'], ['Outputs', 'Zone matrices · SOPs · Escalations']],
        chips: ['Excel', 'Word', 'PowerPoint', 'Vendor Mgmt', 'Govt. Liaison', 'Field Ops'],
        bullets: ['<b>Managed</b> accreditation operations across multiple IPL stadiums.', '<b>Built</b> zone matrices, badge tiers and gate-level flow protocols.', '<b>Resolved</b> real-time access escalations on match days.', '<b>Coordinated</b> printing, vendor lifecycle and audit reporting.'],
        bars: [['Match-day uptime', '99.7%', 99], ['Issue resolution SLA', '< 4 min', 92], ['Stakeholder NPS', 'High', 88]],
        span: 5
      },
      ng: {
        gate: 'G-04', stamp: 'POLICY', stampClass: 'st-policy',
        client: 'Sports Authority · Goa', year: '2023',
        tileTitleHtml: '37<sup>th</sup> National <em>Games</em>, Goa',
        kpis: [['30<sup>+</sup>', 'Disciplines'], ['1', 'Policy'], ['9<sup>/9</sup>', 'Sign-offs'], ['Tender', '1st pass']],
        statusLabel: 'Archive', statusClass: 'archive',
        bpMeta: 'SAG · 30 Disciplines · 6 Anchor Venues',
        name: '37th National Games · Goa', clientFull: 'Sports Authority of Goa', yearFull: '2023',
        pill: '04 · Policy', role: 'Accreditation Policy & IT',
        title: '37th National <em>Games</em>, Goa',
        strap: 'Drafted accreditation policy, tender documentation and IT integration for India\'s largest multi-sport event.',
        overview: 'Authored the accreditation policy that governed access for 30+ disciplines across the games. Wrote tender documents, integrated IT systems with on-ground accreditation, and coordinated between state ministries, federations and operations vendors.',
        why: 'Why this matters · National Games is the rehearsal for the Olympic dream. Policy here becomes precedent for every multi-sport event India runs next.',
        hud: [['30<sup>+</sup>', 'Disciplines'], ['1', 'Policy'], ['9<sup>/9</sup>', 'Sign-offs']],
        sealNo: 'NG', phases: [1, 1, 1, 1, 1, 1],
        kvs: [['Role', 'Policy Author · IT Coordinator'], ['Disciplines', '30+'], ['Host', 'Sports Authority of Goa'], ['Doc set', 'Policy · Tender · SOP'], ['Coordination', 'Inter-ministry']],
        gallery: [
          { cap: 'Opening ceremony', kind: 'ng-1', imageUrl: '' },
          { cap: 'Policy document', kind: 'ng-2', imageUrl: '' },
          { cap: 'Venue map', kind: 'ng-3', imageUrl: '' },
          { cap: 'IT integration', kind: 'ng-4', imageUrl: '' },
          { cap: 'Tender review', kind: 'ng-5', imageUrl: '' }
        ],
        specs: [['Format', 'Multi-sport · 30+ disciplines'], ['Authoring', 'Policy · Tender · SOP'], ['Integration', 'Accreditation IT systems'], ['Coordination', 'SAG · Federations · Vendors'], ['Outputs', 'Living policy doc · Procurement set']],
        chips: ['MS Word', 'Excel', 'Policy Frameworks', 'Govt. Tendering', 'SOP Authoring'],
        bullets: ['<b>Drafted</b> end-to-end accreditation policy adopted for the games.', '<b>Wrote</b> tender documents aligned with state procurement.', '<b>Integrated</b> on-ground accreditation with IT backend.', '<b>Liaised</b> across ministries, federations and venue ops.'],
        bars: [['Policy adoption', '100%', 100], ['Tender clearance', 'First pass', 92], ['Cross-ministry sign-off', '9/9', 100]],
        span: 7
      },
      archery: {
        gate: 'G-05', stamp: 'JAN ’26', stampClass: 'st-q',
        client: 'NTPC Khelo India · Ambaji', year: 'Jan 2026',
        tileTitleHtml: '<em>Archery</em> Ranking',
        kpis: [['70<sup>m</sup>', 'Range'], ['AAI', 'Std.'], ['5', 'Days'], ['Soon', 'Q1 ’26']],
        statusLabel: 'Upcoming', statusClass: 'soon',
        bpMeta: 'AMBAJI · Range Plan · AAI Compliant',
        name: 'Khelo India Archery — Ambaji', clientFull: 'NTPC Khelo India', yearFull: 'Jan 2026',
        pill: '05 · 2026', role: 'Venue Lead',
        title: 'Archery National <em>Ranking</em>',
        strap: 'Setting up a competition archery venue in Ambaji, Gujarat to international AAI standards.',
        overview: 'Led venue setup for the NTPC Khelo India Archery National Ranking tournament. Owned vendor coordination, equipment audits, range calibration and competition flow to World Archery / AAI standards.',
        why: 'Why this matters · A national ranking event determines who shoots for India next. The range has to be precise, the scoring credible and the timing bulletproof.',
        hud: [['70<sup>m</sup>', 'Range'], ['AAI', 'Std.'], ['<em>Soon</em>', 'Status']],
        sealNo: 'AMB', phases: [1, 1, 1, 1, 0, 0],
        kvs: [['Role', 'Venue Lead'], ['Discipline', 'Archery (Recurve · Compound)'], ['Standard', 'World Archery · AAI'], ['Location', 'Ambaji, Gujarat'], ['Year', 'January 2026']],
        gallery: [
          { cap: 'Range overview', kind: 'archery-1', imageUrl: '' },
          { cap: 'Target setup', kind: 'archery-2', imageUrl: '' },
          { cap: 'Athlete bay', kind: 'archery-3', imageUrl: '' },
          { cap: 'Scoring booth', kind: 'archery-4', imageUrl: '' },
          { cap: 'Calibration', kind: 'archery-5', imageUrl: '' }
        ],
        specs: [['Distances', '18m / 30m / 50m / 70m'], ['Equipment', 'Targets · Stands · Buttresses · Nets'], ['Compliance', 'AAI · WA standards'], ['Functions', 'Vendor · Officials · Athlete services'], ['Outputs', 'Range layout · Audit log']],
        chips: ['Vendor Mgmt', 'AAI Standards', 'Field Ops', 'Excel', 'SOP Writing'],
        bullets: ['<b>Calibrated</b> archery range to AAI international standards.', '<b>Owned</b> vendor onboarding, equipment audits and on-field setup.', '<b>Coordinated</b> officials, scoring teams and athlete services.', '<b>Authored</b> competition flow SOPs for the meet.'],
        bars: [['Range compliance', 'AAI ✓', 100], ['Setup days saved', '-2', 82], ['Vendor SLA', 'On-time', 95]],
        span: 5
      },
      somnath: {
        gate: 'G-06', stamp: 'PM TIER', stampClass: 'st-pm',
        client: '1000 Years of Somnath Mandir', year: 'Jan 2026',
        tileTitleHtml: 'Somnath <em>Swabhiman</em>',
        kpis: [['PM', 'Tier'], ['4', 'Zones'], ['1k', 'Years'], ['0', 'Critical inc.']],
        statusLabel: 'Upcoming', statusClass: 'soon',
        bpMeta: '1000 Years · PM Protocol · Concentric Access',
        name: 'Somnath Swabhiman Parva', clientFull: '1000 Years of Somnath Mandir', yearFull: 'Jan 2026',
        pill: '06 · PM Protocol', role: 'Accreditation & Event Flow',
        title: 'Somnath <em>Swabhiman</em> Parva',
        strap: 'VIP accreditation, PM-protocol access control and event flow for a state-level cultural event.',
        overview: 'Owned accreditation and event-flow design for the 1000-year cultural commemoration at Somnath. Designed the badge tier system, gate-level access logic and command protocols for an event hosted by the Prime Minister.',
        why: 'Why this matters · A PM event compresses years of crowd, security and protocol decisions into hours. Documentation is the only thing that holds.',
        hud: [['PM', 'Tier'], ['4', 'Zones'], ['<em>1k</em>', 'Years']],
        sealNo: 'SOM', phases: [1, 1, 1, 1, 0, 0],
        kvs: [['Role', 'Accreditation · Event flow'], ['Format', 'State cultural event'], ['Protocol', 'PM-tier'], ['Location', 'Somnath, Gujarat'], ['Year', 'January 2026']],
        gallery: [
          { cap: 'Temple at twilight', kind: 'somnath-1', imageUrl: '' },
          { cap: 'Stage build', kind: 'somnath-2', imageUrl: '' },
          { cap: 'VIP badge', kind: 'somnath-3', imageUrl: '' },
          { cap: 'Gate flow', kind: 'somnath-4', imageUrl: '' },
          { cap: 'Command room', kind: 'somnath-5', imageUrl: '' }
        ],
        specs: [['Audience', 'Federation · State · PM-tier'], ['Zones', 'FOP · VIP · Stage · Press'], ['Coordination', 'State · Security · Cultural'], ['Outputs', 'Zone matrix · SOPs · Badge tiers'], ['Sensitivity', 'High protocol']],
        chips: ['Word', 'Excel', 'Protocol', 'Govt. Liaison', 'Security Liaison', 'Field Ops'],
        bullets: ['<b>Designed</b> VIP accreditation tiers and zone matrix.', '<b>Authored</b> event-flow & command SOPs for the cultural program.', '<b>Coordinated</b> state agencies, security and cultural production.', '<b>Ran</b> rehearsal & dry-run cycles to surface gate-flow risks.'],
        bars: [['Protocol compliance', '100%', 100], ['Gate-flow incidents', '0 critical', 96], ['Cross-agency sign-off', 'All-clear', 100]],
        span: 7
      }
    },

    projectOrder: ['gms', 'sajha', 'ipl', 'ng', 'archery', 'somnath'],

    career: {
      sectionNum: '§ 04',
      sectionLabel: 'Career Tape',
      titleHtml: 'The <em>tape</em>.',
      lede: 'A career, top to bottom. Click a card, drag to swipe, or arrow-key through.'
    },

    roles: [
      {
        no: '06', when: '2025 — Present', where: 'New Delhi',
        role: 'Asst. Manager — <em>IT & Ops</em>',
        org: 'GoBananas · Games Management System',
        venue: 'Delhi HQ', clock: '09:41 IST',
        loc: 'delhi', locName: 'New Delhi', coord: '28.61° N · 77.20° E',
        tapeId: 'AR-2025-06', duration: 'Ongoing', side: 'A · 06',
        trajX: 240, trajY: 10,
        pts: [
          'Authoring BRD / FRD / PRD for the GMS platform — federation registration, accreditation, tournament & venue modules.',
          'Translating real-world sports ops into automation specs alongside engineering & design.',
          'Bridging product, design, vendor & federation stakeholders end-to-end.'
        ],
        mini: [['<em>3</em>', 'Modules'], ['<em>BRD</em>', '+ FRD + PRD'], ['<em>2025</em>', 'Joined']],
        skills: ['Figma', 'BRD', 'PRD', 'Jira', 'Claude'],
        quote: 'Translating a stadium concourse into a sprint board, one ticket at a time.',
        type: 'Product', icon: 'product', live: true, rail: 100,
        cta: 'Open project'
      },
      {
        no: '05', when: 'Jan 2026', where: 'Ambaji, Gujarat',
        role: 'Venue <em>Lead</em> — Archery',
        org: 'NTPC Khelo India Archery — National Ranking',
        venue: 'Ambaji · Range', clock: '07:15 IST',
        loc: 'ambaji', locName: 'Ambaji, GJ', coord: '24.32° N · 72.85° E',
        tapeId: 'AR-2026-05', duration: '5 days', side: 'A · 05',
        trajX: 192, trajY: 18,
        pts: [
          'Set up archery range to World Archery / AAI international standards.',
          'Owned venue vendor coordination, equipment audits and competition flow.',
          'Coordinated officials, scoring, athlete services across the meet.'
        ],
        mini: [['<em>70</em><sup>m</sup>', 'Range'], ['<em>AAI</em>', 'Compliant'], ['<em>5</em>', 'Days']],
        skills: ['Vendor', 'AAI', 'Field Ops', 'SOPs'],
        quote: 'A national-ranking arrow leaves the bow because the buttress was square at dawn.',
        type: 'Ops', icon: 'target', rail: 84
      },
      {
        no: '04', when: 'Jan 2026', where: 'Somnath, Gujarat',
        role: 'Accreditation <em>Officer</em>',
        org: 'Somnath Swabhiman Parva — 1000 Years',
        venue: 'Somnath · Coast', clock: '18:32 IST',
        loc: 'somnath', locName: 'Somnath, GJ', coord: '20.88° N · 70.40° E',
        tapeId: 'AR-2026-04', duration: '2 weeks', side: 'A · 04',
        trajX: 144, trajY: 30,
        pts: [
          'VIP accreditation & PM-protocol access control for a state-level cultural event.',
          'Designed zone matrix, badge tiers and gate flow with security & state liaison.',
          'Authored event SOPs and command-and-control protocol.'
        ],
        mini: [['<em>PM</em>', 'Protocol'], ['<em>4</em>', 'Zones'], ['<em>1k</em>', 'Years']],
        skills: ['Protocol', 'Security', 'State Liaison'],
        quote: 'PM-tier protocol compresses a year of decisions into hours — documentation is what holds.',
        type: 'Ops', icon: 'shield', rail: 68
      },
      {
        no: '03', when: '2024 — 2025', where: 'Jharkhand',
        role: 'Business <em>Analyst</em>',
        org: 'SAJHA — Sports Authority of Jharkhand',
        venue: 'Ranchi · Govt.', clock: '11:08 IST',
        loc: 'ranchi', locName: 'Ranchi, JH', coord: '23.34° N · 85.31° E',
        tapeId: 'AR-2024-03', duration: '12 months', side: 'B · 03',
        trajX: 96, trajY: 42,
        pts: [
          'Documented end-to-end requirements for a unified state sports portal.',
          'Mapped federation, athlete, coach and infrastructure workflows.',
          'Coordinated with engineering teams to ship federation modules.'
        ],
        mini: [['<em>9</em><sup>/12</sup>', 'Fed.'], ['<em>7+</em>', 'Flows'], ['<em>BRD</em>', 'Authored']],
        skills: ['BA', 'Figma', 'Govt. Stack', 'Word'],
        quote: 'State sports administration runs on paper. The portal is the first time the paper has a memory.',
        type: 'BA', icon: 'doc', rail: 52
      },
      {
        no: '02', when: '2023 — 2024', where: 'Multi-stadium · India',
        role: 'Accreditation <em>Manager</em>',
        org: 'TATA IPL — Paytm Insider',
        venue: 'Wankhede / Eden / Chinnaswamy', clock: '19:30 IST',
        loc: 'mumbai', locName: 'Multi-stadium', coord: '18.94° N · 72.83° E',
        tapeId: 'AR-2023-02', duration: '1 season', side: 'B · 02',
        trajX: 48, trajY: 60,
        pts: [
          'Multi-stadium accreditation operations across the IPL season.',
          'Owned ground access control, vendor printing, real-time issue resolution.',
          'Built escalation paths with security, broadcast and franchise stakeholders.'
        ],
        mini: [['<em>6</em>', 'Venues'], ['<em>10k+</em>', 'Badges'], ['<em>99.7</em><sup>%</sup>', 'Uptime']],
        skills: ['Ops', 'Security', 'Vendor', 'Field Ops'],
        quote: 'An IPL stadium is a moving city. My job was to make sure the gates agreed with each other.',
        type: 'Ops', icon: 'badge', marquee: true, rail: 36
      },
      {
        no: '01', when: '2023', where: 'Goa',
        role: 'Accreditation <em>Policy</em>',
        org: '37th National Games, Goa — Sports Authority of Goa',
        venue: 'Panaji · SAG', clock: '10:20 IST',
        loc: 'goa', locName: 'Panaji, GA', coord: '15.49° N · 73.82° E',
        tapeId: 'AR-2023-01', duration: '~2 months', side: 'B · 01',
        trajX: 0, trajY: 72,
        pts: [
          'Drafted accreditation policy and tender documentation.',
          'Integrated IT systems with on-ground accreditation processes.',
          'Coordinated 30+ disciplines, federations and state ministries.'
        ],
        mini: [['<em>30</em><sup>+</sup>', 'Disciplines'], ['<em>1</em>', 'Policy'], ['<em>9</em><sup>/9</sup>', 'Sign-offs']],
        skills: ['Policy', 'Tender', 'Govt.', 'SOPs'],
        quote: 'A national-games policy doesn’t end at the games — it becomes precedent for every meet after.',
        type: 'Policy', icon: 'policy', rail: 20
      }
    ],

    toolkit: {
      sectionNum: '§ 05',
      sectionLabel: 'Toolkit',
      titleHtml: 'The <em>kit</em>.',
      lede: 'A practical mix of documentation craft, product tools, and the new wave of AI co-pilots that have quietly become daily drivers.',
      groups: [
        { name: 'Documentation', items: ['BRD*', 'FRD*', 'PRD*', 'FRS', 'SOPs', 'DPRs', 'Use Cases', 'User Flows', 'Process Maps', 'Tender Docs', 'Automation Specs'] },
        { name: 'Product & Design', items: ['Figma*', 'Visily', 'Google Stitch', 'Adobe Photoshop', 'Final Cut Pro'] },
        { name: 'Project & Ops', items: ['Jira*', 'Zoho Sprints', 'MS Word', 'MS Excel', 'PowerPoint', 'Google Workspace'] },
        { name: 'AI & Dev', items: ['Claude Code*', 'ChatGPT · Codex*', 'OpenClaw', 'Ollama', 'GitHub', 'Vercel', 'Leonardo', 'Blackbox', 'Hugging Face'] },
        { name: 'Core Strengths', items: ['Project Planning', 'Stakeholder Comms', 'Cross-functional Coord.', 'Decision Making', 'Problem Solving'] },
        { name: 'Education', items: ['BMS · Sports Mgmt*', 'NEST Academy ’21–’23', 'Lucknow Public Collegiate', 'St. Thomas School'] }
      ]
    },

    contact: {
      sectionNum: '§ 06',
      sectionLabel: 'Get in Touch',
      titleHtml: 'Need an <em>operator</em>?',
      lede: 'Open to roles in business analysis, product/platform documentation, and sports/event operations. Comfortable on a call, on a stadium concourse, or in a tender review.',
      links: [
        { text: 'akash@beyondthearena.co', small: 'Email →', href: 'mailto:akash@beyondthearena.co' },
        { text: '+91 77049 73781', small: 'Direct →', href: 'tel:+917704973781' },
        { text: 'Download CV · PDF', small: 'Resume →', href: 'uploads/Akash_Rathore__CV.pdf' },
        { text: 'linkedin / akashrathore06', small: 'LinkedIn →', href: 'https://linkedin.com/in/akashrathore06' },
        { text: 'github / akash-droid-dev', small: 'GitHub →', href: 'https://github.com/akash-droid-dev' }
      ]
    },

    pass: {
      front: {
        ev: 'Issued · 2026 · India',
        titleHtml: 'Accreditation <em>Pass</em>',
        lvl: 'All Areas',
        nameHtml: 'Akash <em>Rathore</em>',
        role: 'Business Analyst · Sports Operations',
        zones: [
          { label: 'FOP', denied: false }, { label: 'OPS', denied: false }, { label: 'VIP', denied: false },
          { label: 'PRESS', denied: true }, { label: 'IT', denied: false }
        ],
        idCode: 'ID · AR-0626',
        validYear: 'Valid · 2026',
        photoUrl: ''
      },
      back: {
        title: 'Terms of Access',
        intro: 'This credential authorises the bearer to author, operate and ship across product and platform disciplines for sports and large-scale events.',
        permitted: 'BRD · FRD · PRD · SOP · DPR · Tender · Automation · Vendor &amp; Stakeholder Mgmt.',
        zones: 'Field of Play · Operations · VIP · IT · Accreditation Control',
        notes: 'Works equally on a stadium concourse and a sprint board.',
        code: 'AR · 0626 · IN · 2026',
        signature: 'Akash Rathore',
        signatureSub: 'Authorised Bearer'
      },
      hint: 'Click the pass to flip'
    },

    colophon: {
      bigHtml: 'End<em>.</em>',
      meta: '<b>The Operator — Vol. 03 / Issue 26</b>\nSet in Instrument Serif, Space Grotesk &amp; JetBrains Mono.<br>Designed &amp; written by Akash Rathore. New Delhi, 2026.<br>© All rights reserved.'
    },

    sounds: {
      enabled: true,
      volume: 0.9,
      showMuteButton: true,
      effects: {
        tileClick: true,
        tap: true,
        swipe: true,
        passFlip: true,
        folderOpen: true,
        modalOpen: true,
        modalClose: true,
        themeToggle: true,
        hover: true
      }
    }
  };

  /* ============= STORAGE ============= */
  let current = null;

  function deepClone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    for (const k of Object.keys(source)) {
      const sv = source[k];
      if (Array.isArray(sv)) {
        target[k] = sv;
      } else if (sv && typeof sv === 'object') {
        if (!target[k] || typeof target[k] !== 'object' || Array.isArray(target[k])) target[k] = {};
        deepMerge(target[k], sv);
      } else {
        target[k] = sv;
      }
    }
    return target;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        current = deepClone(DEFAULTS);
        return current;
      }
      const parsed = JSON.parse(raw);
      current = deepClone(DEFAULTS);
      deepMerge(current, parsed);
    } catch (e) {
      console.warn('[content] load failed, using defaults', e);
      current = deepClone(DEFAULTS);
    }
    return current;
  }

  function getAll() {
    if (!current) load();
    return current;
  }

  function get(path) {
    if (!current) load();
    if (!path) return current;
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, current);
  }

  function set(path, value) {
    if (!current) load();
    const parts = path.split('.');
    const last = parts.pop();
    let target = current;
    for (const p of parts) {
      if (target[p] == null || typeof target[p] !== 'object') target[p] = {};
      target = target[p];
    }
    target[last] = value;
  }

  function replace(newContent) {
    current = deepClone(DEFAULTS);
    deepMerge(current, newContent);
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('content:saved', { detail: current }));
      return true;
    } catch (e) {
      console.error('[content] save failed', e);
      return false;
    }
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) { /* noop */ }
    current = deepClone(DEFAULTS);
    window.dispatchEvent(new CustomEvent('content:saved', { detail: current }));
    return current;
  }

  function exportJson() {
    return JSON.stringify(current, null, 2);
  }

  /* Strip volatile/local-only fields before publishing to production. */
  function buildPublishPayload() {
    const snap = JSON.parse(JSON.stringify(current));
    return snap;
  }

  function publishJson() {
    return JSON.stringify(buildPublishPayload(), null, 2);
  }

  function importJson(jsonStr) {
    const parsed = JSON.parse(jsonStr);
    replace(parsed);
    save();
    return current;
  }

  /* Initial sync load (defaults + localStorage). */
  load();

  /* Async load also pulls assets/content.json (the "production" snapshot) if it
     exists, merging it between defaults and localStorage. Result order:
       defaults  <  assets/content.json  <  localStorage
     Visitors with empty localStorage see content.json (what the admin published).
     Admin previewing in iframe sees their localStorage edits on top. */
  const REMOTE_URL = 'assets/content.json';
  let remoteLoaded = false;
  const loadPromise = (async function () {
    try {
      const url = REMOTE_URL + '?t=' + Date.now();
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) return current;
      const remote = await r.json();
      // Re-build current from layers
      const merged = deepClone(DEFAULTS);
      deepMerge(merged, remote);
      try {
        const localRaw = localStorage.getItem(KEY);
        if (localRaw) deepMerge(merged, JSON.parse(localRaw));
      } catch (e) { /* noop */ }
      current = merged;
      remoteLoaded = true;
      window.dispatchEvent(new CustomEvent('content:remote-loaded', { detail: current }));
    } catch (e) {
      // Network error, CORS, file:// origin, file not found — silently use defaults+local.
    }
    return current;
  })();

  return {
    DEFAULTS: DEFAULTS,
    load: load,
    loadPromise: loadPromise,
    isRemoteLoaded: () => remoteLoaded,
    getAll: getAll,
    get: get,
    set: set,
    replace: replace,
    save: save,
    reset: reset,
    exportJson: exportJson,
    publishJson: publishJson,
    importJson: importJson,
    KEY: KEY,
    REMOTE_URL: REMOTE_URL
  };
})();
