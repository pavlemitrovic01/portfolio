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

---

## Deep context dokumenti (čitaj samo kad task to zahteva)

| Dokument | Tip | Kad se čita |
|----------|-----|------------|
| CL3_Planet_Reconstruction_Master_Roadmap.md | **AKTIVNI PLAN** | Kad radiš na CL3 mode — ovo je source-of-truth za CL3 batch-eve |
| Creative_Bible.md | Dizajn spec | Kad radiš na vizuelnom pravcu, dizajn odluke |
| ROADMAP.md | Arhiva | Istorija Faza 1–5 batch-eva (završeno) |
| LESSONS.md | Lekcije | Projekat-specifične lekcije iz ranijeg rada |

> Ovo NISU runtime dokumenti. Ne čitaj ih na početku sesije. Čitaj kad task to zahteva.

---

## Current status (2026-04-17)

**Fokus:** CL3 Planet Reconstruction
**Poslednji završen:** Workflow cleanup + Final Clean batch — CLOSED
**Aktivni plan:** `CL3_Planet_Reconstruction_Master_Roadmap.md`

**Workflow setup — završeno:**
- workflow/ sistema inicijalizovana u repou (SYSTEM.md, AI_RULES.md, projekat config, templates)
- .cursor/ uklonjen, .gitignore hardened, .claude/settings.local.json alignovan
- Header/Footer nav alignovan sa CL3 sekcijama (#arrival, #the-build, #the-system, #contact)
- section id-jevi dodati: Arrival, TheBuild, TheSystem

**R4a — The Build (bez screenshotova) — CLOSED:**
- Block A: weighted reveal (0.8s, gravity easing, translateY 30px)
- Block B: CL3 frame sistem (16:9, cyan border, opaque panel, aperture shell pripremljen)
- Block C: stagger reveal po momentu (0.7s, 0.28s stagger, gravity easing) + reduced-motion fix
- Block D: sekvencijalna aktivacija flow nodova + connector line-draw reveal + reduced-motion fix

**Sledeći korak:** R4b ili R5 (bez blocker-a)
- **R4b BLOCKER:** Potrebni realni screenshotovi padrinobudva.com (menu flow + admin dashboard, WebP, 16:9)
- **R5 — The System + Signal Out:** može odmah, bez blocker-a

**Pending (van CL3 reconstruction):**
- Batch P-Images: 15.8MB PNG → WebP (kritično za performance)
- Batch P-OG: OG image kreiranje
- Batch P-Content: Finalni copy + pravi URL-ovi (čeka Pavlov input)
- Batch P-API: CORS, system prompt server-side, Redis rate limiting
- Config: cl3menza.com domain + GA4 real ID
- **⚠️ MANUAL:** Pavle mora da rotira ANTHROPIC_API_KEY — .env bio u ZIP-u koji je uploadovan

> Ažuriraj ovo na kraju SVAKE sesije.
