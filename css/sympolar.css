/* =====================================================
   SYMPOLAR — SHARED FORM STYLES v2
   sympolar.com · sympolarllc@gmail.com
   ===================================================== */

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

:root {
  --bg:           #060f1a;
  --bg-2:         #081525;
  --txt:          #eef4ff;
  --muted:        #7a9dbf;
  --muted2:       #4a6a85;
  --sky:          #87ceeb;
  --sky-dim:      rgba(135,206,235,.15);
  --sky-border:   rgba(135,206,235,.25);
  --coral:        #ff7f6e;
  --coral-dim:    rgba(255,127,110,.12);
  --coral-border: rgba(255,127,110,.3);
  --peach:        #ffb38a;
  --mint:         #6de8c8;
  --gold:         #f5c842;
  --glass:        rgba(255,255,255,.042);
  --glass-border: rgba(255,255,255,.085);
  --glass-hover:  rgba(255,255,255,.075);
  --radius:       18px;
  --radius-sm:    12px;
  --radius-xs:    8px;
  --shadow:       0 8px 32px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05);
  --font-d: 'Syne', Georgia, serif;
  --font-b: 'DM Sans', Georgia, serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  background-image:
    radial-gradient(ellipse 80% 50% at 15% -10%, rgba(135,206,235,.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 85% 110%, rgba(255,127,110,.05) 0%, transparent 55%);
  color: var(--txt); font-family: var(--font-b); font-size: 15px; line-height: 1.65; min-height: 100vh;
}
body::before {
  content: ''; position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 0; opacity: 0.4;
}

/* HEADER */
.site-header { background: rgba(6,15,26,.94); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 860px; margin: 0 auto; padding: 13px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.header-brand { font-family: var(--font-d); font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sky); text-decoration: none; }
.header-nav { display: flex; gap: 6px; flex-wrap: wrap; }
.header-nav a { font-family: var(--font-d); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); text-decoration: none; padding: 5px 11px; border-radius: 100px; border: 1px solid transparent; transition: all 0.2s; }
.header-nav a:hover { color: var(--txt); border-color: var(--glass-border); }
.header-nav a.active { color: var(--sky); border-color: var(--sky-border); background: var(--sky-dim); }

/* PIPELINE */
.pipeline-bar { background: var(--bg-2); border-bottom: 1px solid var(--glass-border); padding: 14px 0; }
.pipeline-inner { max-width: 860px; margin: 0 auto; padding: 0 28px; display: flex; align-items: center; }
.pipe-step { display: flex; align-items: center; gap: 8px; font-family: var(--font-d); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted2); text-decoration: none; padding: 5px 10px; border-radius: 6px; transition: color 0.2s; white-space: nowrap; }
.pipe-step:hover { color: var(--muted); }
.pipe-step.current { color: var(--sky); }
.pipe-step.done { color: var(--mint); }
.pipe-num { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 9px; }
.pipe-step.done .pipe-num { background: rgba(109,232,200,.15); }
.pipe-step.current .pipe-num { background: var(--sky-dim); }
.pipe-arrow { color: var(--muted2); font-size: 10px; padding: 0 4px; user-select: none; }

/* HERO */
.form-hero { background: var(--bg-2); text-align: center; padding: 56px 24px 44px; border-bottom: 1px solid var(--glass-border); position: relative; overflow: hidden; }
.form-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--sky-border) 40%, var(--coral-border) 60%, transparent); }
.hero-tag { display: inline-block; font-family: var(--font-d); font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); background: var(--coral-dim); border: 1px solid var(--coral-border); padding: 5px 14px; border-radius: 100px; margin-bottom: 18px; }
.form-hero h1 { font-family: var(--font-d); font-size: clamp(26px, 4.5vw, 44px); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 10px; }
.form-hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--sky), var(--mint)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.form-hero p { color: var(--muted); max-width: 480px; margin: 0 auto 14px; font-size: 14px; font-weight: 300; }
.hero-meta { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted2); background: var(--glass); border: 1px solid var(--glass-border); padding: 6px 14px; border-radius: 100px; }
.hero-meta span { color: var(--gold); font-weight: 500; }

/* CONTAINER */
.container { max-width: 860px; margin: 0 auto; padding: 40px 28px 90px; position: relative; z-index: 1; }

/* CARDS */
.card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 24px 26px; margin-bottom: 16px; box-shadow: var(--shadow); }
.card-title { font-family: var(--font-d); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sky); margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--glass-border); display: flex; align-items: center; gap: 8px; }
.card-icon { font-size: 14px; }

/* FIELDS */
.field-group { display: grid; grid-template-columns: 1fr; gap: 14px; }
.field-group.two { grid-template-columns: 1fr 1fr; }
.field-group.three { grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 600px) { .field-group.two, .field-group.three { grid-template-columns: 1fr; } }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.opt { color: var(--muted2); font-weight: 400; font-size: 10px; letter-spacing: 0; text-transform: none; }
.req { color: var(--coral); font-size: 10px; }
.field input, .field select, .field textarea { background: rgba(255,255,255,.05); border: 1px solid var(--glass-border); border-radius: var(--radius-xs); color: var(--txt); font-family: var(--font-b); font-size: 14px; padding: 11px 13px; outline: none; width: 100%; transition: border-color 0.2s, background 0.2s; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--sky-border); background: rgba(135,206,235,.04); }
.field input::placeholder, .field textarea::placeholder { color: var(--muted2); }
.field input:-webkit-autofill,
.field input:-webkit-autofill:hover,
.field input:-webkit-autofill:focus,
.field input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px rgba(8,21,37,1) inset !important;
  -webkit-text-fill-color: #eef4ff !important;
  caret-color: #eef4ff;
  border-color: var(--sky-border) !important;
}
.field select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a6a85' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; padding-right: 36px; }
.field select option { background: #0e1f35; }
.field textarea { resize: vertical; min-height: 90px; }
.field-hint { font-size: 11px; color: var(--muted2); margin-top: 2px; }

/* FILE UPLOAD */
.upload-zone { border: 2px dashed var(--glass-border); border-radius: var(--radius-sm); padding: 28px 20px; text-align: center; cursor: pointer; transition: all 0.25s; position: relative; background: rgba(255,255,255,.02); }
.upload-zone:hover, .upload-zone.drag-over { border-color: var(--sky-border); background: var(--sky-dim); }
.upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.upload-icon { font-size: 28px; margin-bottom: 8px; }
.upload-label { font-family: var(--font-d); font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.upload-hint { font-size: 11px; color: var(--muted2); margin-top: 4px; }
.file-list { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
.file-chip { display: flex; align-items: center; gap: 10px; background: var(--sky-dim); border: 1px solid var(--sky-border); border-radius: 8px; padding: 7px 12px; font-size: 12px; color: var(--sky); }
.file-chip .fname { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-chip .fsize { color: var(--muted2); font-size: 11px; white-space: nowrap; }
.file-chip .fremove { cursor: pointer; color: var(--muted2); font-size: 14px; line-height: 1; padding: 0 2px; }
.file-chip .fremove:hover { color: var(--coral); }

/* PILLS / CHECKBOXES */
.pill-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.pill { position: relative; cursor: pointer; }
.pill input { position: absolute; opacity: 0; width: 0; height: 0; }
.pill .pl { padding: 7px 14px; border-radius: 100px; border: 1px solid var(--glass-border); background: var(--glass); font-size: 13px; color: var(--muted); transition: all 0.2s; white-space: nowrap; cursor: pointer; display: block; }
.pill input:checked + .pl { background: var(--sky-dim); border-color: var(--sky-border); color: var(--sky); font-weight: 500; }
.check-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; margin-top: 6px; }
.check-item { display: flex; align-items: flex-start; gap: 9px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius-xs); padding: 9px 12px; cursor: pointer; transition: all 0.2s; }
.check-item:hover { background: var(--glass-hover); }
.check-item input[type="checkbox"] { appearance: none; width: 15px; height: 15px; min-width: 15px; border: 1.5px solid var(--muted2); border-radius: 3px; cursor: pointer; transition: all 0.2s; position: relative; margin-top: 2px; }
.check-item input[type="checkbox"]:checked { background: var(--sky); border-color: var(--sky); }
.check-item input[type="checkbox"]:checked::after { content: '✓'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #050d18; font-weight: 900; }
.check-item .cl { font-size: 13px; color: var(--muted); line-height: 1.4; }
.check-item input:checked ~ .cl { color: var(--txt); }

/* SUBMIT */
.btn-submit { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, var(--sky), var(--mint)); color: #050d18; font-family: var(--font-d); font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: none; border-radius: 10px; padding: 14px 28px; cursor: pointer; transition: opacity 0.2s, transform 0.15s; margin-top: 8px; }
.btn-submit:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-submit:active { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.submit-wrap { display: flex; flex-direction: column; gap: 10px; }
.progress-bar-wrap { display: none; background: var(--glass-border); border-radius: 4px; height: 4px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--sky), var(--mint)); border-radius: 4px; width: 0%; transition: width 0.3s ease; }
.status-msg { font-size: 12px; color: var(--muted); display: none; }

/* OPTIONAL BADGE */
.optional-badge { display: inline-block; font-family: var(--font-d); font-size: 9px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); background: rgba(245,200,66,.1); border: 1px solid rgba(245,200,66,.25); padding: 3px 9px; border-radius: 100px; vertical-align: middle; margin-left: 8px; }

/* SUCCESS */
.success-screen { display: none; text-align: center; padding: 80px 24px; }
.success-icon { font-size: 52px; margin-bottom: 20px; }
.success-screen h2 { font-family: var(--font-d); font-size: 32px; font-weight: 800; margin-bottom: 10px; }
.success-screen p { color: var(--muted); font-size: 14px; max-width: 400px; margin: 0 auto 28px; }
.success-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.success-links a { padding: 10px 20px; border-radius: 8px; border: 1px solid var(--sky-border); background: var(--sky-dim); color: var(--sky); font-family: var(--font-d); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
.success-links a:hover { background: rgba(135,206,235,.25); }

/* FOOTER */
.form-footer { background: var(--bg-2); border-top: 1px solid var(--glass-border); padding: 20px 28px; text-align: center; font-size: 12px; color: var(--muted2); }
.form-footer a { color: var(--muted); text-decoration: none; }
.form-footer a:hover { color: var(--sky); }

/* RESPONSIVE */
@media (max-width: 640px) {
  .header-inner { padding: 11px 16px; }
  .container { padding: 28px 16px 70px; }
  .card { padding: 18px 16px; }
  .pipeline-inner { overflow-x: auto; scrollbar-width: none; }
  .pipeline-inner::-webkit-scrollbar { display: none; }
  .pipe-step span:last-child { display: none; }
}
