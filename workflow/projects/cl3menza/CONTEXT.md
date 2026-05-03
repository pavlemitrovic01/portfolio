# CONTEXT.md — cl3menza.com Portfolio

> Projekat-specifične istine. Stack, arhitektura, lock zone, ključni fajlovi.
> **Bez statusa** — status je u `workflow/STATE.md`.
> Čitaj kad radiš na ovom projektu, ne na početku svake sesije.

---

## Projekat

| Polje | Vrednost |
|-------|----------|
| Stack | React 19 + TypeScript + Vite 5 + Framer Motion + Vercel |
| Repo | lokalni, branch: main |
| Production | https://portfolio-seven-eosin-21.vercel.app |

---

## Arhitektura

- Sajt ima **normal mode** (landing) i **cl3menza mode** (Planeta 2)
- Ulaz u cl3menza mode: portal tranzicija sa landing Activation zone
- CL3 je chamber-based flow: `Arrival` → `PullQuote` → `TheBuild` → `TheSystem` → `Contact` (Signal Out)
- `api/claude.ts` ima sopstveni `tsconfig.node.json` — van Vite bundle-a

---

## Ključni fajlovi

| Fajl | Uloga |
|------|-------|
| `src/main.tsx` | Entry |
| `src/App.tsx` | Orkestracija mode-a i sekcija — **LOCK** |
| `src/components/sections/Arrival.tsx` | CL3 Chamber 1 — Arrival |
| `src/components/sections/PullQuote.tsx` | CL3 editorial pause |
| `src/components/sections/TheBuild.tsx` | CL3 Chamber 2 — The Build |
| `src/components/sections/TheSystem.tsx` | CL3 Chamber 3 — The System |
| `src/components/sections/Contact.tsx` | CL3 Signal Out |
| `src/components/sections/ChatTerminal.tsx` | Chat UI |
| `src/components/motion/MotionReveal.tsx` | Reveal primitive |
| `src/styles/chambers.css` | CL3 chamber styling |
| `src/styles/overrides.css` | Mode/atmosphere overrides |
| `api/claude.ts` | AI chat backend (Vercel serverless) — **LOCK** |

---

## Lock zone

Fajlovi koje ne dirati bez STRICT tier batch-a + Pavle approval-a.

| Fajl | Razlog |
|------|--------|
| `src/App.tsx` | Kontroliše ključni UX flow i mode orchestration |
| `api/claude.ts` | AI chat behavior, Vercel serverless — van Vite bundle-a |

LOCK = planski rad, STANDARD ili STRICT tier, jači verify, bez usputnih promena.

---

## Project documentation

| Dokument | Tip | Kad se čita | Cap |
|----------|-----|------------|-----|
| `CONTEXT.md` | Projekat istine | Na početku CL3 rada | 100 lines |
| `ROADMAP.md` | Execution plan | Kad planiraš batch | 600 lines |
| `BIBLE.md` | Brand + visual system | Kad radiš na vizuelnom pravcu | 1200 lines |
| `LESSONS.md` | Aktivne lekcije | Kad repetiš grešku | 200 lines, 7 entries |
| `DECISIONS.md` | Zatvorene odluke i istorija | Kad trebaš context | no cap |

> Ovo NISU runtime dokumenti. Ne čitaj ih na početku sesije. Čitaj kad task to zahteva.

---

## Source of truth (za ovaj projekat)

1. Trenutni repo kod
2. `workflow/STATE.md` (status)
3. Ovaj `CONTEXT.md` (projekat istine)
4. `workflow/RULES.md` (univerzalna pravila)

Za CL3 rad dodatno:
5. `BIBLE.md` (brand + visual + CL3 specs)
6. `ROADMAP.md` (current execution + §14 Final Done)

Ne pretpostavljaj stanje fajlova bez čitanja. **Repo > dokumentacija > memorija.**
