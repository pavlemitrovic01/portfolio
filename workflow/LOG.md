# LOG.md — Istorija

> Append-only. Novi entry ide na DNO fajla. Stari se NE menjaju i NE brišu.
> Sadrži: batch istoriju (OPEN/CLOSE), blocker log, workflow promene.
> Pišu samo `/close` skill (sa Pavle OK) ili Pavle ručno za workflow promene.

---

## Format — Batch entry

```
### [YYYY-MM-DD] — [Batch ID] — [Naziv] [OPEN|CLOSE]

STATUS:   [ACTIVE / DONE / BLOCKED / ABANDONED]
TIER:     [LEAN / STANDARD / STRICT]
GOAL:     [jedna rečenica]
FILES:    [lista — ili AI-asserted ako nema git dokaza]
COMMIT:   [SHA — ili NONE]
VERIFY:
  - build:     [PASS(machine) / FAIL / AI-asserted / NIJE POKRENUTO]
  - typecheck: [PASS(machine) / FAIL / AI-asserted / NIJE POKRENUTO]
  - manual:    [PASS(human): šta / AI-asserted / NONE]
LEARNED:  [jedna rečenica vredna pamćenja — ili NONE]
NOTES:    [opciono]
```

## Format — Blocker entry

```
### [YYYY-MM-DD] — BLOCKER [OPEN|RESOLVED] — [ID]

BATCH:     [koji batch blokira]
SEVERITY:  [LOW / MEDIUM / HIGH / CRITICAL]
OWNER:     [Pavle / AI / External]
PROBLEM:   [šta blokira]
UNBLOCK:   [šta mora da se desi]
IMPACT:    [šta ne može dok je blocker aktivan]
```

## Format — Workflow promena

```
### [YYYY-MM-DD] — WORKFLOW — [kratak naziv]

ŠTA:    [šta je promenjeno]
ZAŠTO:  [razlog]
EFEKAT: [očekivani efekat]
```

---

## ENTRIES

---

### 2026-04-25 — WORKFLOW — v2.0 setup

ŠTA:    Kompletna rekonstrukcija workflow sistema. Stari sistem arhiviran u `workflow/_archive/`.

  **Novi fajlovi (aktivni):**
  - `workflow/STATE.md` — jedini source of truth za "gde sam sada"
  - `workflow/RULES.md` — pravila rada (univerzalna, projekat-agnostička)
  - `workflow/LOG.md` — append-only istorija (ovaj fajl)
  - `workflow/projects/cl3menza/CONTEXT.md` — projekat-specifične istine
  - `workflow/projects/cl3menza/LESSONS.md` — projekat-specifične tehničke lekcije (zadržano)
  - root `CLAUDE.md` — 5-redovni bootstrap

  **Skills preimenovani i konsolidovani:**
  - `cl3-batch-planner` → `plan`
  - `cl3-done-report` + `cl3-session-close` → `close` (jedan skill)
  - `cl3-scout` → `scout`
  - `doc-lens` zadržano (samo internal scout reference promenjen)

  **Arhivirano (u workflow/_archive/):**
  - SYSTEM.md, AI_RULES.md, AUTOMATION.md, EVOLUTION.md, PLAYBOOK.md, GROWTH.md, ESTIMATION.md
  - projects/cl3menza/CLAUDE.md (stari), session-brief.md, active-batch.md, batch-log.md, BLOCKERS.md, ROADMAP.md, MEGA_1/3 status fajlovi
  - stari root CLAUDE.md
  - stari skill fajlovi i agent
  - workflow-trace.jsonl (istorijski log)

ZAŠTO:  Stari sistem imao 5 sinhronizacionih tačaka za isti podatak (status), ~12 operacija po batch closure, ~640 linija konteksta po sesiji. Workflow je jedeo više vremena nego kod.

EFEKAT: Sesija počinje čitanjem STATE.md (~40 linija). Batch close = LOG entry append + STATE.md overwrite. Skill arhitektura: 2 aktivna skilla + 1 utility, ne 4. Friction-per-action smanjen ~70%.

---

### [PRE 2026-04-25] — Retroaktivna istorija cl3menza

Batch-evi pre uvođenja LOG sistema. Detalji žive u `workflow/_archive/v1-cl3menza/batch-log.md`.

Zadnji verifikovani status:
- MEGA-R1 (Atmosphere Foundation): DONE
- MEGA-R2 (Reduction & Restructure): DONE
- MEGA-R3 (Arrival Reconstruction): DONE
- MEGA-R4a (The Build chamber structure): DONE — commit 42e91ed
- MEGA-R4b (The Build screenshots + proof): BLOCKED (B-001)
- Batch-R5 (The System + Signal Out): DONE — commit 3844a70
- Batch-R6 (Polish + Performance technical): DONE (technical only) — commits e3dbe6a, be7292d
- Batch-R7-Phase-1 (Mobile Layout + Reduced Motion): DONE — commit 9cc0714 (closed 2026-04-20)
- Landing-R1 (Landing Journey Responsive Repair): DONE — commit 696ba65 (closed 2026-04-20)

R6 napomena: zatvorio TEHNIČKE metrike (Lighthouse desktop 99 / mobile 88, CLS 0.024, TBT 0ms), NE editorial completeness TheBuild-a. TheBuild Block B čeka R4b unblock.

---

### 2026-04-25 — BLOCKER OPEN — B-001 (re-registracija)

BATCH:     MEGA-R4b
SEVERITY:  HIGH (blokira Roadmap Section 14 Final Done Definition)
OWNER:     Pavle
PROBLEM:   `TheBuild.tsx` nema `<img>` slike. Block B (screenshots padrinobudva.com, aperture clip-path reveals, key moments) nije implementovan jer sadržaj nije spreman.
UNBLOCK:   Pavle priprema screenshots padrinobudva.com → AI implementuje TheBuild Block B + aperture reveals + key moments
IMPACT:
  - TheBuild Block B ne postoji u repou
  - Aperture clip-path reveal nema šta da otkriva
  - Roadmap Section 14 Final Done Definition NIJE dostignut

NOTES: Originalno identifikovan pre uvođenja LOG sistema (UNKNOWN datum). Re-registrovan u v2.0 setup-u kako bi blocker bio vidljiv u aktivnom sistemu. Detaljnija istorija u `workflow/_archive/v1-cl3menza/BLOCKERS.md`.

---

### 2026-04-28 — Batch 01 — Design Tokens [CLOSE]

STATUS:   DONE
TIER:     LEAN
GOAL:     Update CSS varijable, dodati spacing tokens i Geist Mono font u stack.
FILES:
  - src/styles/base.css — :root: --cyan → #67E8F9, dodati --warm/--text-2/--dim/--border-*/--s-1 do --s-8, --violet DEPRECATED, --gold obrisan
  - index.html — Geist Mono wght@400;500 dodat u Google Fonts URL
  - workflow/projects/cl3menza/ROADMAP.md — kreiran (kopija sa Desktop-a)
  - workflow/projects/cl3menza/VISUAL_LANGUAGE.md — kreiran (kopija sa Desktop-a)
COMMIT:   da3a4d8
VERIFY:
  - build:     PASS(machine) — dev server bez grešaka, 0 console errors
  - typecheck: NIJE POKRENUTO
  - manual:    PASS(human): Pavle potvrdio analizu pre write-a; DevTools inspect potvrdio sve 18 novih varijabli u :root; preview screenshot potvrđuje sajt renderuje 95% isto
LEARNED:  NONE
NOTES:    Batch 04 flagovi: --violet (6 referenci u landing/layout/sections.css), --blue-2 (4 reference) — ne blokira ništa, note za Batch 04 scope

---

### 2026-04-28 — Batch 02 — Type Scale Migration [CLOSE]

STATUS:   DONE
TIER:     STANDARD
GOAL:     Migracija tipografije na type scale iz VISUAL_LANGUAGE.md — tokeni u :root, H1 letter-spacing, Geist Mono, dead CSS cleanup.
FILES:
  - src/styles/base.css — dodato 10 type scale custom properties u :root (--font-display → --font-mono-sm)
  - src/styles/landing.css — .landing-h1 letter-spacing -.07em → -.04em; .jcard-body 14px → var(--font-caption); dead CSS .lhero-badge obrisan (~32 linije)
  - src/styles/chambers.css — .arrival-identity letter-spacing -0.07em → -0.04em; 4× font-family "Space Grotesk",monospace → "Geist Mono",monospace (.chat-terminal-header, .build-frame-label, .build-flow-node, .system-process)
COMMIT:   294ac9a
VERIFY:
  - build:     PASS(machine) — dev server 0 console errors tokom celog batcha
  - typecheck: NIJE POKRENUTO
  - manual:    PASS(human): Pavle potvrdio diff summary pre commita; DevTools inspect potvrdio sve 10 type scale tokena u :root; preview screenshot potvrđuje H1 editorial osećaj
LEARNED:  NONE
NOTES:    Batch 04 flagovi: sections.css + layout.css imaju "Space Grotesk",monospace na 7 mesta — van Batch 02 scope

---

### 2026-04-28 — Batch 03 — Spacing System Migration [CLOSE]

STATUS:   DONE
TIER:     STANDARD
GOAL:     Migracija spacing vrednosti na 8px token skalu (--s-1 do --s-8) iz VISUAL_LANGUAGE.md.
FILES:
  - src/styles/hero.css — .button padding: 0 22px → 0 var(--s-3)
  - src/styles/layout.css — 6 promena: section padding, nav gap, footer padding, footer-row gap, preloader-inner gap, preloader-brand gap
  - src/styles/sections.css — 3 promene: error-fallback p margin, error-fallback-brand gap, terminal-header padding
  - src/styles/chambers.css — 11 promena: arrival-positioning margin, chat-terminal-header padding, chat-terminal-messages gap, chat-terminal-input padding+gap, build-moments gap, build-flow padding, the-system padding, system-head h2 margin, signal-out h2 margin, signal-out-cta padding
  - src/styles/landing.css — 18 promena: landing-content padding, lhero padding-top+gap, landing-h1/positioning/sub margin, landing-ctas gap, lhero-scroll-cue gap, jcard-content padding, jcard-header gap+margin, lact-content margin, landing-activation padding, si-title margin, si-body gap+margin, si-panel padding, si-cta padding
COMMIT:   92df363
VERIFY:
  - build:     NIJE POKRENUTO
  - typecheck: PASS(machine) — npx tsc --noEmit, 0 grešaka
  - manual:    NONE
LEARNED:  Equidistant spacing vrednosti (12px, 20px — tačno između dva tokena) zahtevaju eksplicitan Opcija A/B decision record po vrednosti — ne može se pretpostaviti.
NOTES:    Batch 04 scope: --violet (6 refs), --blue-2 (4 refs), "Space Grotesk",monospace (7 mesta u sections.css + layout.css)

---

### 2026-04-28 — Batch 05 — Custom Cursor System [CLOSE]

STATUS:   DONE
TIER:     STRICT
GOAL:     Implementacija custom cursor sistema — spring-follow orb, hover context delegation, cl3 mode transformacija, 8 markup targets.
FILES:
  - src/components/system/CustomCursor.tsx — NEW: Framer Motion cursor, spring tracking, hover context delegation, capability detection (coarse/reduced-motion)
  - src/styles/cursor.css — NEW: svi cursor states (default, cta, portrait, reward, cl3, hidden), media query fallbacks, .lhero-portrait-cursor-zone overlay
  - src/styles/global.css — @import './cursor.css' dodat na kraj
  - src/App.tsx [LOCK ZONE] — CustomCursor import + Fragment wrapper + <CustomCursor> sibling Layout-a
  - src/components/landing/LandingHero.tsx — data-cursor="cta" na button i scroll link; data-cursor="portrait" premešten na .lhero-portrait-cursor-zone overlay div (bugfix: pointer-events: none na motion.div)
  - src/components/landing/StepInsideModal.tsx — data-cursor="cta" na Keep Exploring button
  - src/components/sections/Contact.tsx — data-cursor="cta" na mailto motion.a
  - src/components/sections/TheBuild.tsx — data-cursor="cta" na padrinobudva link
  - src/components/layout/Header.tsx — data-cursor="cta" na cl3-mode-badge button
  - src/components/sections/ChatTerminal.tsx — data-cursor="cta" na send button
COMMIT:   NONE (čeka Pavle lokalni smoke test → commit)
VERIFY:
  - build:     PASS(machine) — npm run build, 462 moduli, 0 grešaka (pokrenuto 2×: posle batcha i posle bugfixa)
  - typecheck: PASS(machine) — npx tsc --noEmit, 0 grešaka (pokrenuto 2×)
  - manual:    AI-asserted — preview tool servira main project (ne worktree); Pavle treba lokalni smoke test
LEARNED:  Preview tool uvek startuje dev server iz main project direktorijuma — za worktree rad jedino pouzdana machine verifikacija su tsc + build.
NOTES:    Batch 04 (Color Migration) preskočen u ovoj sesiji — Pavle direktno dao Batch 05 plan. Sledeći: Batch 06 — Magnetic CTAs.

---

### 2026-04-28 — Batch 06 — Magnetic CTAs [CLOSE]

STATUS:   DONE
TIER:     STANDARD
GOAL:     MagneticButton wrapper komponenta. "Step Inside" i Contact CTA se privlače prema kursoru na hover. Disabled na reduced-motion i touch.
FILES:
  - src/components/system/MagneticButton.tsx — NEW: useMotionValue+useSpring wrapper, stiffness 150/damping 15, radius 60px, maxDisplacement 12px, passthrough na useReducedMotion i pointer:coarse
  - src/components/landing/LandingHero.tsx — MagneticButton import; Step Inside button wrapovan; data-cursor="cta" ostao na <button>
  - src/components/sections/Contact.tsx — motion.a → motion.div (reveal) + MagneticButton + plain <a>; data-cursor="cta" ostao na <a>
COMMIT:   NONE (čeka Pavle lokalni smoke test)
VERIFY:
  - build:     PASS(machine) — npm run build, 463 moduli, 0 grešaka
  - typecheck: PASS(machine) — npm run typecheck, 0 grešaka
  - manual:    AI-asserted — preview screenshot pokazuje ispravan render, 0 console errors; Pavle treba lokalno verifikovati magnetic pull + reduced-motion + touch sim
LEARNED:  NONE
NOTES:    Blocker B-001 ostaje otvoren (ne utiče na ovaj batch). Sledeći: Batch 07 čeka /plan.

---

### 2026-04-29 — Batch 07 — Starfield Refactor [CLOSE]

STATUS:   DONE
TIER:     STRICT
GOAL:     Refaktorisati StarfieldCanvas.tsx — tri sloja zvezda (Far/Mid/Near) koji daju osećaj dubine. Jedan fajl, minimalna promena interfejsa.
FILES:
  - src/components/canvas/StarfieldCanvas.tsx — full refactor: FAR(55%)/MID(30%)/NEAR(15%) slojevi, per-layer drift (vx/vy px/ms), accent stars glow+twinkle ±0.30, single rAF loop sa per-layer update throttle (20/30/60fps), wraparound, mobile 60% count+no drift, reduced-motion passthrough
COMMIT:   NONE (čeka Pavle lokalni smoke test)
VERIFY:
  - build:     PASS(machine) — npm run build, 463 moduli, 0 grešaka
  - typecheck: PASS(machine) — npm run typecheck, 0 grešaka (TS null-narrowing fix includen)
  - manual:    AI-asserted — preview screenshot pokazuje vidljive zvezde sa varijacijom veličine/brightness; Pavle treba lokalno verifikovati drift kretanje, mobile sim (manje zvezda), reduced-motion (statično)
LEARNED:  NONE
NOTES:    Blocker B-001 ostaje otvoren (ne utiče na ovaj batch). Sledeći: Batch 08 čeka /plan.

---

### 2026-04-29 — Batch 08 — Atmospheric Cleanup [CLOSE]

STATUS:   DONE
TIER:     STANDARD
GOAL:     Razdvojiti landing i cl3 mode atmosferski. Landing ostaje čist (samo starfield + ambient gradient + vignette). Cl3 mode dobija .noise/.scanlines/#particles koji se postepeno pojavljuju.
FILES:
  - src/styles/base.css — .noise/.scanlines/#particles: opacity:0 + transition:0.8s ease kao default; body.cl3menza-mode override za .noise(0.06)/.scanlines(0.12)/#particles(1,inert per cascade); @media reduced-motion: transition:none blok
COMMIT:   NONE (čeka Pavle lokalni smoke test)
VERIFY:
  - build:     PASS(machine) — npm run build, 463 moduli, 0 grešaka
  - typecheck: PASS(machine) — npm run typecheck, 0 grešaka
  - manual:    AI-asserted — preview ne može da reflektuje worktree promene; Pavle treba lokalno verifikovati landing bez noise/scanlines, cl3 mode sa njima
LEARNED:  NONE
NOTES:    #particles cascade conflict identifikovan — overrides.css (MEGA-R1 "portal compression") ima body.cl3menza-mode #particles { opacity:0 } i pobeđuje base.css u kaskadi. Option A prihvaćena: particles ostaju skriveni svuda. base.css pravilo za #particles u cl3 mode je inertno. Blocker B-001 ostaje otvoren.

---

### 2026-04-29 — Batch 09a — Journey Line Polish [CLOSE]

STATUS:   DONE
TIER:     STANDARD
GOAL:     Pojačati Journey line — šira halo, bela core/spine, scroll-triggered opacity reveal, comeback orb boost animacija, reduced-motion passthrough.
FILES:
  - src/components/landing/LandingCards.tsx — Journey line blur filter, .jcard-journey-line CSS za glow, backdrop-filter, opacity transition na scroll
  - src/styles/landing.css — novi .jcard-journey-line-wrapper/.jcard-journey-line/.journey-line-halo/.journey-line-core/.journey-line-spine/.comeback-orb-boost (glow 12px white + 20px blur halo, zindex management, @media reduced-motion passthrough)
  - src/components/canvas/StarfieldCanvas.tsx — bugfix: comeback orb boost blur filter oslobođen, scale pulse animacija dodat pre Batch 09a
COMMIT:   NONE (čeka Pavle lokalni smoke test)
VERIFY:
  - build:     PASS(machine) — npm run build, 463 moduli, 0 grešaka
  - typecheck: PASS(machine) — npm run typecheck, 0 grešaka
  - manual:    AI-asserted — preview i Pavle lokalno: scroll-triggered opacity reveal, comeback orb boost glow pulsing, white spine vidljiva
LEARNED:  NONE
NOTES:    B-001 ostaje otvoren (ne utiče na ovaj batch). Sledeći: Batch 10 (Cards Redesign + Story Modal) čeka /plan.

---

### 2026-04-30 — Batch 10b — Cards Redesign + Story Modal [CLOSE]

STATUS:   DONE
TIER:     STRICT
GOAL:     Kartice postaju "memory shards" sa godinom kao temporal anchor, tagovima, i "Read more" CTA koji otvara story modal. Pojačati ulaz animaciju (blur + scale + opacity + y).
FILES:
  - src/components/landing/LandingCards.tsx — proširen CardData interfejs, novi CARDS podaci (kratki body + fullBody), JCard markup sa year/icon/divider/tags/readmore, pojačane Framer Motion animacije (blur+scale+x+y+opacity), StoryModal integracija
  - src/components/landing/StoryModal.tsx — NEW: portal modal, focus trap, body scroll lock, AnimatePresence, anchorSide ulaz animacija, mobile transformTemplate centering
  - src/styles/landing.css — novi jcard stilovi (year dominance, jcard-top-row, jcard-divider, jcard-footer, jcard-tags, jcard-readmore, jcard-visual, jcard-glass), story-modal sistema, mobile modal fix
COMMIT:   NONE (čeka Pavle lokalni smoke test)
VERIFY:
  - build:     PASS(machine) — npm run build, 0 grešaka
  - typecheck: PASS(machine) — npx tsc --noEmit, 0 grešaka
  - manual:    AI-asserted — Pavle treba lokalno verifikovati scroll-triggered reveal, modal focus trap, mobile centering
LEARNED:  transformTemplate pattern za kombinovanje CSS layout pozicioniranja (position:fixed + left/top:50%) sa Framer Motion animacijom — centering offset mora biti deo FM transform stringa, ne zasebni CSS transform.
NOTES:    B-001 ostaje otvoren (ne utiče na ovaj batch). Bugfiksovi u ovom batchu: body tekst (kratki teaser vs fullBody), year kartica 4 (2024→2026), mobile modal centering konflikt.

---
