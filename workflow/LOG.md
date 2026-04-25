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
