# CLAUDE.md — cl3menza.com Portfolio

> Projekat-specifičan runtime config. Samo ono što je unique za OVAJ projekat.
> Univerzalna pravila → `workflow/AI_RULES.md`

---

## Projekat

**Ime:** cl3menza.com portfolio
**Stack:** React 19 + TypeScript + Vite 5 + Framer Motion + Vercel
**Repo:** lokalni (root main)
**Production:** https://portfolio-seven-eosin-21.vercel.app

---

## Source of truth

1. Trenutni repo kod
2. Ovaj `CLAUDE.md`
3. `workflow/AI_RULES.md` za batch pravila (čitaj po potrebi)

Ne pretpostavljaj stanje fajlova bez čitanja. Repo > dokumentacija.

---

## Projekat-specifične istine

- Sajt ima **normal mode** (landing) i **cl3menza mode** (Planeta 2)
- Ulaz u cl3menza mode: portal tranzicija sa landing Activation zone
- CL3 je chamber-based flow: `Arrival` → `PullQuote` → `TheBuild` → `TheSystem` → `Contact` (Signal Out)
- `api/claude.ts` ima sopstveni `tsconfig.node.json` — van Vite bundle-a

---

## Ključni fajlovi

| Fajl | Uloga |
|------|-------|
| `src/main.tsx` | Entry |
| `src/App.tsx` | Orkestracija mode-a i sekcija |
| `src/components/sections/Arrival.tsx` | CL3 Chamber 1 — Arrival |
| `src/components/sections/PullQuote.tsx` | CL3 editorial pause |
| `src/components/sections/TheBuild.tsx` | CL3 Chamber 2 — The Build |
| `src/components/sections/TheSystem.tsx` | CL3 Chamber 3 — The System |
| `src/components/sections/Contact.tsx` | CL3 Signal Out |
| `src/components/sections/ChatTerminal.tsx` | Chat UI |
| `src/components/motion/MotionReveal.tsx` | Reveal primitive |
| `src/styles/chambers.css` | CL3 chamber styling |
| `src/styles/overrides.css` | Mode/atmosphere overrides |
| `api/claude.ts` | AI chat backend (Vercel serverless function) |

---

## Lock zone

| Fajl | Razlog |
|------|--------|
| `src/App.tsx` | Kontroliše ključni UX flow i mode orchestration |
| `api/claude.ts` | AI chat behavior, Vercel serverless — van Vite bundle |

LOCK = planski, STANDARD/STRICT tier, jači verify, bez usputnih promena.

> ⚠ **SYNC REQUIRED:** Ova lista mora biti identična `LOCK_ZONE` arrayu u `~/.claude/hooks/lock-zone-check.js` — ako menjaš jedno, menjaj i drugo.

---

## Deep context dokumenti (čitaj samo kad task to zahteva)

| Dokument | Tip | Kad se čita |
|----------|-----|------------|
| CL3_Planet_Reconstruction_Master_Roadmap.md | **AKTIVNI PLAN** | Kad radiš na CL3 mode — ovo je source-of-truth za CL3 batch-eve |
| Creative_Bible.md | Dizajn spec | Kad radiš na vizuelnom pravcu, dizajn odluke |
| ROADMAP.md | Arhiva | Istorija Faza 1–5 batch-eva (završeno) |
| LESSONS.md | Lekcije | Projekat-specifične lekcije iz ranijeg rada |
| session-brief.md | **SESSION DASHBOARD** | Brzi snapshot stanja na početku sesije — aktivan batch, blocker, sledeći korak |
| batch-log.md | **APPEND-ONLY ISTORIJA** | Kad trebaš istoriju batch-eva (zatvoreni, otvoreni, blokirani) |
| BLOCKERS.md | **BLOCKER REGISTRY** | Kad identifikuješ ili zatvaraš blocker |

> Ovo NISU runtime dokumenti. Ne čitaj ih na početku sesije. Čitaj kad task to zahteva.
> **Izuzetak:** `session-brief.md` se čita na početku sesije ako trebaš brz kontekst umesto punog CLAUDE.md.

---

## Current status (2026-04-19)

**Fokus:** CL3 Planet Reconstruction
**Aktivni plan:** `CL3_Planet_Reconstruction_Master_Roadmap.md`

**Batch status:**

| Batch | Status |
|-------|--------|
| MEGA-R1 — Atmosphere Foundation | DONE |
| MEGA-R2 — Reduction & Restructure | DONE |
| MEGA-R3 — Arrival Reconstruction | DONE |
| MEGA-R4a — The Build (chamber structure) | DONE |
| MEGA-R4b — The Build (screenshots + proof content) | **BLOCKED** |
| Batch-R5 — The System + Signal Out | DONE |
| Batch-R6 — Polish + Performance (technical metrics) | DONE (technical only) |
| Batch-R7 Phase 1 — Mobile Layout + Reduced Motion | DONE |

**R6 — TECHNICAL CLOSED (ne editorial final):**
- Lighthouse desktop 99 / mobile 88 ✅ (targeti ≥90 / ≥85) — CLS 0.024 ✅ TBT 0ms ✅
- Build ✅ Typecheck ✅ Bundle ✅ MatrixRain <768px ✅ CL3_EASE konzistentan ✅
- Smoke tests: PASS
- ⚠ TheBuild Block B (screenshots, aperture reveals) nije postojao tokom R6 — nije moglo biti polirano. R6 je zatvorio tehničke metrike, ne editorial completeness TheBuild-a.

**Open blockers:**
- **R4b BLOCKED** — vlasništvo: Pavle. Potrebni screenshotovi padrinobudva.com. TheBuild.tsx nema ni jednu `<img>` sliku. Dok R4b ostaje blocker: Block B ne postoji, aperture clip-path reveal nema šta da revealuje, key moments (final) nisu finalizovani. Roadmap Final Done Definition (Section 14) nije dostignut.

**Sledeći korak:**
1. R7 Phase 2 — touch targets (44px min) + screen reader + keyboard nav (pun Roadmap R7 scope)
2. R4b unblock — Pavle priprema screenshots → implementacija TheBuild Block B + aperture reveals
3. Final Done check po Roadmap Section 14

**Pending (van CL3 reconstruction):**
- P-OG, P-Content, P-API, domain config, GA4 real ID
- **⚠️ MANUAL:** Pavle rotira ANTHROPIC_API_KEY

> Ažuriraj ovo na kraju SVAKE sesije.
