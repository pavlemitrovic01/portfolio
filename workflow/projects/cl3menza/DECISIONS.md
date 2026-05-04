# DECISIONS.md — cl3menza Closed Decisions Log

Append-only history. New entries go at the bottom.
No size cap — this grows over time.
See [ROADMAP.md](ROADMAP.md) for current/upcoming, [BIBLE.md](BIBLE.md) for current specs.

---

## 2026-04-13 — Phase A Initiated: CL3 Planet Reconstruction

Started CL3 reconstruction from scratch after diagnosis showed 9 structural failures: atmosphere dies at portal, no spatial physics, section-wall syndrome (8 sections, identical MotionReveal), content redundancy, hero overload (iframe + chat + pills), proof fragmentation, generic contact with disabled buttons, motion monotony, performance issues (iframe + ResizeObserver).

Created `CL3_Planet_Reconstruction_Master_Roadmap.md` as source-of-truth. Defined: two-planet spatial philosophy, 4-chamber architecture (Arrival → PullQuote → TheBuild → TheSystem → SignalOut), 7-layer atmosphere system, gravity easing `cubic-bezier(0.16, 1, 0.3, 1)`, chamber-specific motion bible, removal/merge matrix.

## 2026-04-13 to 2026-04-22 — Phase A Complete (MEGA-R1 through Batch-R7)

| Batch | Šta je urađeno |
|---|---|
| MEGA-R1 | Atmosphere Foundation — dense fog base, directional glow sources, structural vignette, inter-chamber gradients, MatrixRain 55%→15-25%, structural lines, micro-glow accents, atmospheric compression portal sequence |
| MEGA-R2 | Reduction & Restructure — 8 sections → 4 chambers. Created: Arrival, PullQuote, TheBuild, TheSystem, SignalOut. Removed: iframe, trust pills, Systems tile grid, Projects card, Flagship feature matrix, AnatomyOfBuild interactive, Process tile grid, Stack tile grid, Testimonials, disabled buttons. |
| MEGA-R3 | Arrival Reconstruction — monumental identity statement, structural chat terminal, exposure-from-darkness motion (1.0-1.2s), pull-quote reveal, arrival hold 15-20vh. Gravity easing throughout. |
| MEGA-R4a | The Build chamber structure — context block, screenshot frames, key moments sequential reveal, architecture flow scroll-driven activation. Aperture clip-path reveal. |
| MEGA-R4b | **BLOCKED** — Padrino Budva screenshots ne postoje. TheBuild Block B (visual) čeka. |
| Batch-R5 | The System + Signal Out — capabilities vertical list, process one-line, stack signal. Signal Out: single heading + email CTA. Atmospheric arc complete. |
| Batch-R6 | Polish + Performance — Lighthouse 99/88 achieved, CLS/TBT/bundle ✅. Cross-chamber motion consistency. CSS cleanup. Dead code removal. |
| Batch-R7 | Mobile + Reduced Motion — layout audit, touch targets, font scaling, prefers-reduced-motion complete audit. |

**Baseline after Phase A:** All 8 old sections replaced with 4 chambers. Performance targets met. R4b remains open blocker.

## 2026-04-25 — Workflow v2.0 Setup

Migrated from v1 to v2 doc structure. Key changes: STATE.md + LOG.md split, new /plan and /close skills, per-project documentation structure (CONTEXT.md + project-specific docs).

Novi fajlovi: workflow/STATE.md, workflow/LOG.md, workflow/RULES.md, workflow/projects/cl3menza/VISUAL_LANGUAGE.md, workflow/projects/cl3menza/ROADMAP.md (legacy v1 plan).

## 2026-04-25 to 2026-05-01 — Phase B Complete (Batch 01-12a Visual Polish)

| Batch | Šta je urađeno |
|---|---|
| Batch 01 | Design Tokens — CSS variables (--cyan, --blue, --warm, bg/text/border slojevi), Geist Mono, spacing tokens --s-1..--s-8 |
| Batch 02 | Type Scale Migration — H1 letter-spacing -0.07 → -0.04em (editorial feel), eyebrow pills, mono restricted to system labels |
| Batch 03 | Spacing System Migration — 8px-based tokens throughout all CSS files, section padding standardization |
| Batch 04 | Color Migration — cyan ekskluzivno na 4 elementa, blue za UI, warm na tačno 3 mesta, violet/gold removed |
| Batch 05 | Custom Cursor System — 12px dot, context-aware shapes (CTA/portrait/reward), disabled na touch |
| Batch 06 | Magnetic CTAs — Step Inside 60px radius, max 12px displacement, stiffness 150 damping 15 |
| Batch 07 | Starfield Refactor — 3 layers (Far 60%/Mid 30%/Near 10%), accent stars (5-6) sa sin wave trepnjom, mobile 60% bez drift |
| Batch 08 | Atmospheric Cleanup — scanlines/noise/grid/particles premešten iz landing-a u cl3, landing čišći |
| Batch 09 | Journey Linija Refactor — story-mapped PATH_D, stroke width 0.8→2→1px, scroll-driven pathLength i opacity, comeback orb pojačan |
| Batch 10 | Cards Surgery — 40-word limit per kartica, ±40px entrance animation (was ±18px), orb scale 0.6→1 |
| Batch 11 | TheBuild Architecture Flow — BuildArchitectureFlow komponenta, node sequence, connector animations, "10 nedelja" stat strip |
| Batch 12a | Contact Terminal Treatment — terminal-style signal received layout. Warm Mode Flash dodat u fragment glitch. |

## 2026-05-01 — Phase C: Workflow Stabilization (Faza 0)

5 batch-eva za stabilizaciju pre novih feature-a:
- F0.1: Pre-flight audit — clean state verified, CLEANROADMAP.md kreiran
- F0.2: Push 12 backed-up commits (lokalni commits koji nisu bili na Vercel)
- F0.3: Test restoration — framer-motion mock, jsdom matchMedia fix (57 testova restored)
- F0.4: Worktree cleanup — dirty audit, investigation, safe cleanup
- F0.5: Asset hygiene — og-image.png.png rename, WebP compression (1.6MB→120KB), jcard hover polish

**Baseline locked:** 464 moduli, 57 testova, workflow-v2-backup branch napravljen od pre-F1.0 SHA.

## 2026-05-02 — Phase D: Workflow v3 Initiated

F1.0: Pre-flight + backup (done). F1.1: Doc consolidation (ovaj batch).

---

## Deprecated Lessons (moved from LESSONS.md)

### 2026-03-26 — Lighthouse via Edge — DEPRECATED

**Original lesson:** `npx lighthouse` ne pronalazi Chrome na Windows. Rešenje: `CHROME_PATH` na Edge (`/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`). EPERM cleanup error benigan.

**Primena:** Svaki Lighthouse run na ovoj mašini: koristiti Edge path.

**Razlog deprecation:** Machine-specific resolved lesson. Ako se ponovi, rešenje je ovde. Ne zahteva aktivno mesto u LESSONS.md.

---

### 2026-03-26 — App terminal timers bez cleanup-a — DEPRECATED

**Original lesson:** `App.tsx` cl3menza ulaz pokretao `setInterval`/`setTimeout` bez čišćenja na unmount — StrictMode/lifecycle rizik. Rešenje: `useTerminalBoot` hook sa eksplicitnim cleanup-om.

**Primena:** Bilo koji orchestration sa više async koraka na MutationObserver/body klasi: uvek eksplicitan cleanup, best u zasebnom hooku.

**Razlog deprecation:** RESOLVED i implementirano u `useTerminalBoot`. Ne ponavlja se kao aktivan problem.

---

### 2026-03-24 — Mikro-batch overhead — DEPRECATED

**Original lesson:** Previše mikro-batch-eva za low-risk UI/CSS. 1 tema = 1 batch kao default.

**Razlog deprecation:** Subsumed by RULES.md tier system (LEAN/STANDARD/STRICT). Operacionalizovano u sistemu.

---

### 2026-03-24 — CLAUDE.md bloat — DEPRECATED

**Original lesson:** Runtime CLAUDE.md mora biti kratak. Layered pristup: CLAUDE.md → RULES.md → LESSONS.md.

**Razlog deprecation:** Subsumed by RULES.md i workflow struktura. Implementirano, ne ponavlja se kao problem.

---

### 2026-03-24 — cl3menza trigger pogrešno internalizovan — DEPRECATED

**Original lesson:** Ulaz = TrustSignals kartica "Genius builder vibe". Izlaz = Header badge. Ne oslanjati se na staro sećanje kad repo pokazuje drugačiju istinu.

**Razlog deprecation:** Phase A specific. UX trigger logika je sada čista u kodu (i u CONTEXT.md arhitektura sekciji). Komponentna struktura promenjena u Phase A (komore, ne sections).

---

### 2026-03-24 — Mode-aware nav desinhronizacija — DEPRECATED

**Original lesson:** Mode-aware navigation mora pratiti stvarno renderovane sekcije, ne statičku listu linkova.

**Razlog deprecation:** Nav restrukturiran u Phase A uz chamber model. Problem više ne postoji u ovoj formi.

---

### 2026-04-05 — Framer Motion useScroll offset sintaksa — DEPRECATED

**Original lesson:** Ispravna sintaksa: `"end end"`, ne `"end bottom"` za Framer Motion useScroll offset string.

**Razlog deprecation:** RESOLVED u kodu. Tehničke detalje framework API-ja ne čuvamo u LESSONS.md — to je posao dokumentacije i koda.

---

### 2026-04-01 — CSS selector specificity trap u cl3 mode — DEPRECATED

**Original lesson:** `body.cl3menza-mode body::after` — nemoguć selektor. Pseudo-elementi na body: `body.cl3menza-mode::after`, ne `body.cl3menza-mode body::after`.

**Razlog deprecation:** RESOLVED i implementirano ispravno. Tehnička lekcija koja je sada u kodu.

---

### 2026-03-26 — QA pre deploy, ne posle — DEPRECATED

Deprecated 2026-05-03 (B2.0): distilled to RULES §14 #4 ("QA pre deploy — DONE → build → push → smoke").

**PROBLEM:** 12 commit-a ostalo lokalno nekoliko sesija — production bio daleko iza. Otkriveno tek u Batch 15B.

**LEKCIJA:** Na kraju svakog batch-a koji menja runtime: `git push` je deo verify faze, ne opcija. Vercel auto-deploy je brz (~15s) — nema razloga čekati.

**PRIMENA:** Batch workflow: DONE → build → push → smoke. Posebno za LOCK zone i API promene.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

### 2026-03-24 — Source-of-truth drift — DEPRECATED

Deprecated 2026-05-03 (B2.0): distilled to RULES §14 #2 ("Source-of-truth drift — repo > doc; proveri pre rada").

**PROBLEM:** Dokumentacija bila delimično zastarela u odnosu na realni repo.

**LEKCIJA:** AI radi po pogrešnim pretpostavkama kad doc i kod ne pričaju istu priču.

**PRIMENA:** Pri većim nastavcima rada prvo proveri da li CLAUDE.md i repo pričaju istu priču.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

### 2026-03-24 — Audit → scope explosion — DEPRECATED

Deprecated 2026-05-03 (B2.0): distilled to RULES §14 #5 ("Audit ≠ implementacija — posle audita trijaž pre akcije: kritično → primetno → polish").

**PROBLEM:** Audit lako sklizne u prevelik implementation scope.

**LEKCIJA:** Posle audit-a trijaž pre implementacije: kritično → primetno → polish. Najmanji siguran batch prvi.

**PRIMENA:** Uvek razdvoji audit findings od execution plana.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

### 2026-04-01 — AI scope inflation — DEPRECATED

Deprecated 2026-05-03 (B2.0): distilled to RULES §14 #1 ("AI scope inflation — svaki plan ima 'RADIMO' i 'NE RADIMO' sekciju").

**PROBLEM:** AI lako predloži veći scope nego što je potreban za task.

**LEKCIJA:** U svakom planu jasno preseći: šta radimo sada vs šta svesno ostaje za kasnije.

**PRIMENA:** Plan uvek sadrži "radimo" i "ne radimo" sekciju. Scope expansion zahteva eksplicitnu odluku.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

### 2026-04-01 — background vs background-image — DEPRECATED

Deprecated 2026-05-03 (B2.0): distilled to RULES §14 #6 ("CSS shorthand oprez — `background:` resetuje sve sub-properties; koristi `background-image:` kad dodaješ na postojeći element").

**PROBLEM:** Korišćenje `background:` shorthand na elementu koji već ima background property može resetovati sve sub-properties (color, position, size, repeat, attachment, origin, clip) na default vrednosti.

**LEKCIJA:** Kad dodaješ samo novi gradient na postojeći element, koristi `background-image:` umesto `background:`. Shorthand je bezbedan samo kad svesno pišeš kompletan novi background od nule.

**PRIMENA:** Proveriti svaki batch koji dodaje gradient na element koji već ima bg definisan drugde.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-07-01

---

## Closed Specs (moved from Creative_Bible, VISUAL_LANGUAGE, CL3_Planet)

### Creative_Bible §11-14 — Legacy MEGA Batch Descriptions (Phase A, completed)

*Sections 11-14 iz Creative_Bible.md opisuju originalne MEGA 1-5 batch-eve — pre CL3 rekonstrukcije. Sav sadržaj je implementiran.*

Key decisions preserved:
- MEGA 1 (Visual Engine): path 7-layer spec, orb upgrade Faza A/B, starfield Canvas-based → COMPLETED
- MEGA 2 (Journey Integration): card reveal sequence, connector animation, edge light → COMPLETED
- MEGA 3 (Bookend Polish): hero floating badge, mouse parallax, activation vignette buildup → COMPLETED
- MEGA 4 (CL3 + Copy): atmospheric shift, copy tone pass across all zones → COMPLETED
- MEGA 5 (Final QA): checklist-based visual/motion/copy/commercial pass → COMPLETED

### Creative_Bible §12 — Batch Filter (subsumed by RULES.md)

Original batch filter per batch:
- GOAL: jedna jasna stvar
- SCOPE: koje zone sme da dira
- NO-GO ZONES: šta ne dira
- VISUAL SUCCESS CRITERIA: kako znamo da je vizuelno uspelo
- TECH VERIFICATION: typecheck/build/tests/smoke
- VISUAL VERDICT: ne "radi" nego "da li izgleda skuplje i zašto"
- RISK NOTE: šta može poći po zlu

*Subsumed by RULES.md batch workflow. Više nije potreban kao poseban spec u BIBLE.*

### VISUAL_LANGUAGE.md §15 — v2 Backlog (post-launch)

*Ovi items ostaju kao v2 backlog. Ne implementirati pre launch-a bez eksplicitne odluke.*

- **Sound design** — Web Audio API generisani zvukovi (whoosh, blip, click). Muted toggle, default off.
- **Cinematic mode prelaz** — full particle kondenzacija sequence (linija → particles → tačka → eksplozija, ukupno ~2s). Samo warm flash u v1.
- **Reward system v2** — 5+ dodatnih lokacija, Konami code, periodična rotacija.
- **Internationalization** — srpska + engleska verzija toggle.
- **Project case study templates** — Pasta Bar 2x2 case study, template za buduće projekte.

### VISUAL_LANGUAGE.md §16 — Decision Log

*Zašto su ove vizuelne odluke donete. Trajno u DECISIONS jer daju razlog za pravila u BIBLE.*

| Odluka | Razlog |
|---|---|
| Hladan dominant + topli #F4A261 accent | Hladan = heynesh DNA, kosmički osećaj. Topli accent daje dramaturški kontrast pri prelazu. Bez njega paleta je emocionalno jednostrana. |
| Cyan ekskluzivno za 4 elementa | Kad je svuda, gubi ekskluzivitet. Kad je samo na liniji + brand-u + cursor-u u cl3 = potpis. |
| 8px spacing system | Sistematizacija = "intentional" osećaj. Premium sajt nikad ne koristi proizvoljne brojeve. |
| Story-mapped path geometry | Matematička S-kriva = generička. Krivine vezane za priču = lično i autentično. |
| Orb → cursor transformacija | Vezuje dva sloja u jedno iskustvo. Mozak prepoznaje isti vizuelni jezik. |
| Mono samo za system strings | Body u mono = developer template trope. Mono kao accent = system thinker karakter. |
| Reward sistem warm boja | Diferencira od cyan junction orbova. Topli accent ima funkciju, nije dekoracija. |
| Pivot najduži vertikalni segment | 7 godina drift-a vizuelno = dugačka linija koja se odbija da se vrati gore. Dramaturgija dužine. |

---

*Append new decisions at the bottom. No size cap.*

## 2026-05-04 — Phase D Setup Complete

Faza 0 (cleanup, B0.1-B0.5) + Faza 1 (workflow v3, F1.0-F1.6) + B2.0 honesty pass + B2.0a SHA fix + B2.0c lock-zone removal — sve DONE.

cleanroadmap.md je bio planning artifact koji je odslužio svoj posao. Sadržaj distillovan/dupliran u:
- LOG.md (svi batch entries)
- ROADMAP.md (Faza 2 lista)
- LESSONS.md + RULES §14 (lessons captured)
- DECISIONS.md (ovaj entry — closure record)

Revision log iz cleanroadmap-a (5 entries):

| Datum | Autor | Promena | Razlog |
|-------|-------|---------|--------|
| 2026-05-01 | Opus + Pavle | Initial draft, Faza 0 specifikovana | Posle dual audit-a (Opus + Claude Code) |
| 2026-05-01 | Pavle | Dodat u repo kao `workflow/CLEANROADMAP.md` | Source-of-truth za cleanup sesiju |
| 2026-05-02 | Opus + Pavle + Claude Code | Faza 0 COMPLETE — sve 5 batch-eva (B0.1-B0.5) DONE | Repo stabilizovan: 0 unpushed, čist working tree, 1 worktree, testovi zelena, og-image 120KB WebP |
| 2026-05-02 | Opus + Pavle + Claude Code | Faza 1 in progress — F1.0-F1.3 DONE, F1.4 (ovaj batch), F1.5 next | Workflow v3 mehanizam live: doc layer 6→4 fajla (1138 active linija), 2 hooks, 5 skills, RULES §19-22 |
| 2026-05-03 | Opus + Pavle + Claude Code | Faza 1 COMPLETE — F1.0-F1.6 DONE; B2.0 honesty pass added | Eksterni Claude Code audit (85 min) otkrio 9 drift instances + 3 broken mehanike (lock-zone hook nedostajao, doc-lens stale paths, bootstrap Windows broken). B2.0 zatvara sve. |

cleanroadmap.md briše se u B2.0d cleanup batch-u.
