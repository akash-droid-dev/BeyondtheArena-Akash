/* ====================================================================
   THE OPERATOR — sounds.js
   Layered UI sound effects, synthesized via Web Audio API.
   Zero asset weight. Mute toggle persisted to localStorage.
   ==================================================================== */

(function(){
  'use strict';

  /* ---------- state ---------- */
  let ctx = null;
  let bus = null;
  let muted = false;
  const lastFired = {};
  const RATE_LIMIT_MS = 60;

  try { muted = localStorage.getItem('ar-sound-muted') === '1'; } catch {}

  /* ---------- ctx ---------- */
  function ensureCtx(){
    if(!ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      ctx = new AC();
    }
    if(ctx.state === 'suspended') ctx.resume();
    if(!bus){
      const g = ctx.createGain();
      g.gain.value = 0.9;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 22;
      comp.ratio.value = 6;
      comp.attack.value = 0.004;
      comp.release.value = 0.12;
      g.connect(comp);
      comp.connect(ctx.destination);
      bus = g;
    }
    return ctx;
  }

  /* ---------- primitives ---------- */
  function tone(opts){
    const c = ensureCtx();
    if(!c) return;
    const type = opts.type || 'sine';
    const freq = opts.freq || 440;
    const dur = opts.dur || 0.1;
    const gain = opts.gain != null ? opts.gain : 0.18;
    const attack = opts.attack != null ? opts.attack : 0.004;
    const decay = opts.decay != null ? opts.decay : 0.03;
    const sustain = opts.sustain != null ? opts.sustain : 0.55;
    const freqEnd = opts.freqEnd;
    const detune = opts.detune || 0;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.detune.value = detune;
    const t0 = c.currentTime + (opts.delay || 0);
    o.frequency.setValueAtTime(freq, t0);
    if(freqEnd != null){
      // exponential for natural pitch sweeps
      o.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 0.01), t0 + dur);
    }
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.linearRampToValueAtTime(gain * sustain, t0 + attack + decay);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(bus);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  function noise(opts){
    const c = ensureCtx();
    if(!c) return;
    const dur = opts.dur || 0.1;
    const type = opts.type || 'lowpass';
    const freq = opts.freq || 1500;
    const sweepTo = opts.sweepTo;
    const q = opts.q != null ? opts.q : 1;
    const gain = opts.gain != null ? opts.gain : 0.12;
    const attack = opts.attack != null ? opts.attack : 0.004;
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for(let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = type;
    const t0 = c.currentTime + (opts.delay || 0);
    filter.frequency.setValueAtTime(freq, t0);
    if(sweepTo != null) filter.frequency.linearRampToValueAtTime(sweepTo, t0 + dur);
    filter.Q.value = q;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(bus);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  function defer(ms, fn){ setTimeout(fn, ms); }

  function ok(name){
    if(muted) return false;
    const now = performance.now();
    if(lastFired[name] && now - lastFired[name] < RATE_LIMIT_MS) return false;
    lastFired[name] = now;
    return true;
  }

  /* ---------- composite sounds (layered) ---------- */
  const Sounds = {
    /* Tile / button click — paper thwack + wood thud + UI tick */
    tileClick(){
      if(!ok('tileClick')) return;
      noise({ dur:0.07, type:'highpass', freq:2800, q:0.6, gain:0.08 });
      tone({ type:'sine', freq:120, freqEnd:78, dur:0.09, gain:0.18 });
      tone({ type:'triangle', freq:1900, dur:0.04, gain:0.045 });
    },

    /* Smaller tap — for chips, links, hover */
    tap(){
      if(!ok('tap')) return;
      tone({ type:'triangle', freq:2200, dur:0.03, gain:0.04 });
      noise({ dur:0.025, type:'highpass', freq:4000, gain:0.03 });
    },

    /* Swipe — bandpass whoosh + low whir + end tick */
    swipe(){
      if(!ok('swipe')) return;
      noise({ dur:0.24, type:'bandpass', freq:520, sweepTo:2400, q:1.3, gain:0.18 });
      tone({ type:'sawtooth', freq:70, freqEnd:240, dur:0.2, gain:0.06 });
      tone({ type:'sine', freq:2600, dur:0.04, gain:0.05, delay:0.19 });
    },

    /* Pass flip — card whip + plastic snap + landing click */
    passFlip(){
      if(!ok('passFlip')) return;
      // Whip
      noise({ dur:0.2, type:'bandpass', freq:1100, sweepTo:3000, q:0.9, gain:0.18 });
      tone({ type:'sawtooth', freq:180, freqEnd:520, dur:0.18, gain:0.07 });
      // Mid-air snap
      tone({ type:'square', freq:640, freqEnd:380, dur:0.04, gain:0.08, delay:0.06 });
      // Landing
      tone({ type:'sine', freq:160, freqEnd:84, dur:0.08, gain:0.18, delay:0.24 });
      noise({ dur:0.05, type:'lowpass', freq:2200, gain:0.07, delay:0.24 });
      tone({ type:'triangle', freq:1500, dur:0.03, gain:0.04, delay:0.27 });
    },

    /* Folder / dossier open — drawer slide + paper rustle + settle */
    folderOpen(){
      if(!ok('folderOpen')) return;
      noise({ dur:0.2, type:'lowpass', freq:1400, sweepTo:780, q:0.7, gain:0.11 });
      noise({ dur:0.16, type:'highpass', freq:2600, gain:0.05, delay:0.02 });
      tone({ type:'sine', freq:95, freqEnd:72, dur:0.09, gain:0.14, delay:0.15 });
    },

    /* Modal open — stadium kerchunk + air whoosh + floodlight buzz on */
    modalOpen(){
      if(!ok('modalOpen')) return;
      // Kerchunk (low double-pulse)
      tone({ type:'sine', freq:90, freqEnd:62, dur:0.12, gain:0.2 });
      tone({ type:'square', freq:170, freqEnd:120, dur:0.06, gain:0.06, delay:0.02 });
      // Whoosh
      noise({ dur:0.32, type:'bandpass', freq:700, sweepTo:1900, q:1.4, gain:0.13, delay:0.04 });
      // Buzz on
      tone({ type:'sawtooth', freq:200, freqEnd:440, dur:0.2, gain:0.045, delay:0.18 });
      tone({ type:'sawtooth', freq:404, dur:0.18, gain:0.035, detune:6, delay:0.2 });
    },

    /* Modal close — reverse whoosh + latch */
    modalClose(){
      if(!ok('modalClose')) return;
      noise({ dur:0.22, type:'bandpass', freq:1900, sweepTo:600, q:1.3, gain:0.11 });
      tone({ type:'sine', freq:220, freqEnd:90, dur:0.07, gain:0.13, delay:0.16 });
      tone({ type:'square', freq:480, freqEnd:280, dur:0.03, gain:0.05, delay:0.18 });
    },

    /* Theme toggle — switch click + light hum */
    themeToggle(){
      if(!ok('themeToggle')) return;
      tone({ type:'square', freq:820, freqEnd:520, dur:0.03, gain:0.1 });
      tone({ type:'sine', freq:240, freqEnd:140, dur:0.06, gain:0.14 });
      tone({ type:'sawtooth', freq:120, freqEnd:88, dur:0.22, gain:0.045, delay:0.04 });
      noise({ dur:0.05, type:'highpass', freq:3200, gain:0.04 });
    },

    /* Hover — very subtle tick */
    hover(){
      if(!ok('hover')) return;
      tone({ type:'triangle', freq:2600, dur:0.022, gain:0.022 });
    },

    /* Folder close — short reverse */
    folderClose(){
      if(!ok('folderClose')) return;
      noise({ dur:0.14, type:'lowpass', freq:780, sweepTo:1400, q:0.7, gain:0.08 });
    },

    /* Mute API */
    setMuted(v){
      muted = !!v;
      try { localStorage.setItem('ar-sound-muted', muted ? '1' : '0'); } catch {}
      window.dispatchEvent(new CustomEvent('sounds:mute-changed', { detail:{ muted } }));
    },
    isMuted(){ return muted; },
    toggleMute(){ this.setMuted(!muted); return muted; }
  };

  /* ---------- arm audio on first user gesture ---------- */
  function arm(){
    ensureCtx();
    document.removeEventListener('pointerdown', arm);
    document.removeEventListener('keydown', arm);
    document.removeEventListener('touchstart', arm);
  }
  document.addEventListener('pointerdown', arm, { once:true });
  document.addEventListener('keydown', arm, { once:true });
  document.addEventListener('touchstart', arm, { once:true, passive:true });

  /* ---------- mute toggle UI ---------- */
  function injectMuteToggle(){
    // styles
    if(!document.getElementById('sound-toggle-style')){
      const st = document.createElement('style');
      st.id = 'sound-toggle-style';
      st.textContent = `
        .sound-toggle{
          position:fixed;bottom:20px;right:20px;
          width:40px;height:40px;border-radius:50%;
          background:rgba(12,10,8,.86);color:#f1ebda;
          border:1px solid rgba(241,235,218,.22);
          display:grid;place-items:center;cursor:pointer;
          z-index:80;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
          transition:transform .15s ease, border-color .15s, background .15s;
          box-shadow:0 6px 18px rgba(0,0,0,.18);
        }
        .sound-toggle:hover{transform:scale(1.08);border-color:var(--flood,#d63919)}
        .sound-toggle:active{transform:scale(.95)}
        .sound-toggle svg{width:16px;height:16px}
        .sound-toggle .pulse{
          position:absolute;inset:-2px;border-radius:50%;
          border:1px solid var(--flood,#d63919);opacity:0;
          pointer-events:none;
        }
        .sound-toggle.pinged .pulse{animation:soundPing .55s ease-out}
        @keyframes soundPing{
          0%{transform:scale(1);opacity:.7}
          100%{transform:scale(1.45);opacity:0}
        }
        body[data-theme="paper"] .sound-toggle{
          background:rgba(241,235,218,.92);color:#0c0a08;
          border-color:rgba(12,10,8,.2);
        }
        body[data-theme="paper"] .sound-toggle:hover{border-color:var(--flood,#d63919)}
        @media(max-width:600px){
          .sound-toggle{bottom:14px;right:14px;width:36px;height:36px}
        }
      `;
      document.head.appendChild(st);
    }

    const SOUND_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6 H5 L9 3 V13 L5 10 H3 Z"/><path d="M11.5 5.5 C13 7 13 9 11.5 10.5"/><path d="M13.5 3.5 C16 5.5 16 10.5 13.5 12.5"/></svg>';
    const MUTE_ICON  = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6 H5 L9 3 V13 L5 10 H3 Z"/><path d="M11 6 L15 10 M15 6 L11 10"/></svg>';

    const btn = document.createElement('button');
    btn.className = 'sound-toggle';
    btn.setAttribute('aria-label', muted ? 'Unmute sounds' : 'Mute sounds');
    btn.title = muted ? 'Unmute sounds (M)' : 'Mute sounds (M)';
    btn.innerHTML = (muted ? MUTE_ICON : SOUND_ICON) + '<span class="pulse"></span>';

    function refresh(){
      btn.innerHTML = (muted ? MUTE_ICON : SOUND_ICON) + '<span class="pulse"></span>';
      btn.setAttribute('aria-label', muted ? 'Unmute sounds' : 'Mute sounds');
      btn.title = muted ? 'Unmute sounds (M)' : 'Mute sounds (M)';
    }

    btn.addEventListener('click', () => {
      Sounds.toggleMute();
      refresh();
      if(!muted){
        Sounds.tap();
        btn.classList.remove('pinged');
        // restart animation
        void btn.offsetWidth;
        btn.classList.add('pinged');
      }
    });

    // Keyboard shortcut: M
    window.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if(tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      if(e.key === 'm' || e.key === 'M'){
        if(e.metaKey || e.ctrlKey || e.altKey) return;
        Sounds.toggleMute();
        refresh();
      }
    });

    window.addEventListener('sounds:mute-changed', refresh);

    if(document.body) document.body.appendChild(btn);
    else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectMuteToggle);
  } else {
    injectMuteToggle();
  }

  window.Sounds = Sounds;
})();
