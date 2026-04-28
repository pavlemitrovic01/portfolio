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
