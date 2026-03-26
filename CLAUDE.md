# CLAUDE RUNTIME — cl3menza.com Portfolio

## Uloga

- Claude Code = executor u realnom repou
- Opus = plan / review / escalation
- Sonnet = execution
- Pavle Mitrović = final approval

Radi kao disciplinovan inženjer:
- prvo razumej
- onda planiraj
- onda izvrši
- zatim verifikuj
- ne nagađaj
- ne širi scope bez kontrole

---

## Source of truth

Prioritet istine:
1. trenutni repo
2. ovaj `CLAUDE.md`
3. `docs/ai/rules.md` i `docs/ai/lessons.md` po potrebi

Pravila:
- ne pretpostavljaj stanje fajlova bez čitanja
- ako se repo i stariji kontekst razlikuju, repo pobeđuje
- dodatne AI docs čitaj samo kad su relevantne za task

---

## Režimi rada

Tri nivoa: **LEAN**, **STANDARD**, **STRICT**.
AI bira režim na osnovu rizika. Korisnik može da override-uje.

| Režim | Kad | Format |
|---|---|---|
| LEAN | low-risk, 1 tema, 2–5 fajlova, bez LOCK | GOAL / FILES / RISK / VERIFY |
| STANDARD | medium-risk, interakcije, component state | GOAL / BATCH TYPE / CORE / FILES / RISK / VERIFY / APPROVAL |
| STRICT | LOCK zone, arhitektura, nejasni bugovi | Detaljniji plan, jači verify, bez improvizacije |

Detalji i primeri → `docs/ai/rules.md` sekcije 2–3.

---

## Batch princip

- **1 tema = 1 batch** (ne file-by-file kad rizik to ne traži)
- Batch mora imati: jasan cilj, end state, test plan, granicu scope-a
- Scope: CORE / FLEX / FORBIDDEN za svaki batch

Detalji → `docs/ai/rules.md` sekcije 1, 3, 4, 5.

---

## Hard zabrane

Bez eksplicitnog approval-a:
- ne dodaj nove dependency-je
- ne diraj LOCK zone
- ne radi env / schema / deploy promene
- ne refaktoriši van scope-a
- ne uvodi random pattern
- ne rešavaj "usput" stvari
- ne radi `/compact` ili `/clear` bez upozorenja
- ne razbijaj low-risk temu na mikro-korake bez razloga

---

## Execution pravila

Pre svake izmene:
- pročitaj fajl koji menjaš
- pročitaj minimalno potrebne okolne fajlove
- proveri postojeći pattern
- fokusiraj se na DELTA promenu, ne na ceo sistem

Tokom execution-a:
- ne re-analiziraj ceo repo bez potrebe
- ne uvodi šire cleanup-e
- menjaj minimalno
- zadrži postojeće ponašanje osim ako je cilj drugačiji

Ako nešto nije jasno:
- stani
- postavi jedno konkretno pitanje
- ne nagađaj

---

## Verifikacija

Proporcionalna, ne mehanička:
- docs-only → tekstualna konzistentnost
- mali UI batch → build + ručni test
- interaction/state → build/typecheck + flow test
- high-risk → strongest available verification

Batch nije zatvoren bez verifikacije.

---

## Self-review

Pre prijave DONE:
- pregledaj diff
- proveri da nisi dirao van scope-a
- proveri side effect-e
- proveri naming / pattern / strukturu
- popravi očigledan problem pre prijave

Završni format:

```text
DONE:
CHANGED:
VERIFY:
NEXT:
LEARNED:
```

Ako ništa nije upisano u AI docs, reci to eksplicitno.

---

## CLAUDE.md održavanje

CLAUDE.md je kratak runtime fajl. Upisuj samo:
- hard pravila
- batch režim
- ključni project essentials
- lock zone
- current status + datum
- next step

Ne upisuj:
- eseje
- duplikate
- prolazne sitnice
- mikro-promene bez trajne vrednosti

Šira pravila → `docs/ai/rules.md`
Lekcije → `docs/ai/lessons.md`
Aktivni plan → `docs/ROADMAP.md`

---

## Project essentials

Ključni fajlovi:
- `src/main.tsx` — entry
- `src/App.tsx` — orkestracija mode-a i sekcija
- `src/components/sections/Hero.tsx` — centralna i najkompleksnija sekcija
- `src/components/sections/TrustSignals.tsx` — trigger za ulaz u cl3menza mode
- `src/components/layout/Header.tsx` — mode-aware header i izlaz iz cl3menza mode
- `src/components/layout/Footer.tsx` — mode-aware footer nav
- `src/styles/global.css` — glavni stylesheet
- `api/claude.ts` — AI chat backend endpoint

Važne istine:
- sajt ima normal mode i cl3menza mode
- ulaz u cl3menza mode je kartica **Genius builder vibe**
- Hero u cl3menza mode sadrži project preview + AI chat
- `api/claude.ts` je Vercel serverless function — van Vite bundle; ima sopstveni `tsconfig.node.json`

---

## Lock zone

Posebno oprezno:
- `src/App.tsx`
- `src/components/sections/Hero.tsx`
- `api/claude.ts`

Razlog: kontrolišu ključni UX flow, mode orchestration i AI chat behavior.

LOCK ne znači "ne diraj nikad". Znači:
- diraj samo planski
- preferiraj Standard ili Strict
- jači verify
- bez usputnih promena

---

## Current status (2026-03-26)

Roadmap Faza 1–3 završen (arhivirano). Faza 4 u toku.
Batch 16–18 zatvoreni: 52 testova (34 API + 8 hooks + 9 integration + 1 skipped model), `npm test` = zeleno.
Production: https://portfolio-seven-eosin-21.vercel.app — sve OK.
Detalji → `docs/ROADMAP.md`.

Sledeći korak:
- **Batch 19**: Timer extraction — useTerminalBoot hook, App.tsx cleanup
- Batch 12B: finalni About copy + pravi Upwork/Fiverr URL-ovi (čeka Pavle's input)
- Config: cl3menza.com domain setup + GA4 real ID

---

## Session protocol

Na kraju svake sesije:
- ažuriraj `Current status` (datum + fokus + sledeći korak)
- upiši lekciju u `lessons.md` ako je nešto naučeno

Na početku nove sesije:
- pročitaj `Current status`
- pročitaj relevantne fajlove za task
- ne re-analiziraj ceo repo

---

## System principle

- theme-by-theme, ne file-by-file kad rizik to ne traži
- minimalan token burn
- maksimalna preciznost
- dobar momentum
- bez scope haosa
