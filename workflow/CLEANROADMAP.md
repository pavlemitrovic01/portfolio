# cleanroadmap.md

> **Status:** ACTIVE — Faza 0 specifikovana, Faza 1/2 skicirane
> **Created:** 2026-05-01
> **Source-of-truth za:** stabilizaciju projekta, workflow v3, finish & launch
> **Ko menja ovaj fajl:** samo Pavle, ili `/close` u retrospekciji. Promene idu kroz revision log na dnu.

---

## Filozofija

Sistem je u stanju gde je disciplina dokumentacije veća od stvarne mehanike. Cleanup ide po obrnutom principu: manje fajlova, manje pravila, više stvarnog enforcement-a. Pavle (čovek) ostaje jedini real gate — to je ok, ali sistem mora da pomaže Pavlu da ne zaboravi.

Tri faze, fixed redosled. Faza 0 je sve što ide live sad. Faza 1 i 2 se finalizuju tek kad prethodna prođe. Razlog: ne pišemo plan za stanje koje će se promeniti za 2 sata.

---

## Faza 0 — STABILIZE

**Cilj faze:** repo čist, push proveden, testovi zeleni, hygiene zatvorena. Bez novih feature-a, bez workflow promena, bez Roadmap reconciliation-a.

**Trajanje:** 1 sesija (~2h)
**Tier:** STANDARD overall, batch-evi LEAN/STANDARD
**Approval gate:** Pavle odobrava cleanroadmap u celosti pre B0.1, pa svaki batch eksplicitno pre starta.

### B0.1 — Pre-flight Verification (LEAN, ~10 min)

**CILJ:** Potvrditi da je stanje identično git readout-u od 2026-05-01. Ne menjati ništa.

**FAJLOVI:** ne dira nijedan.

**PLAN:**
1. Pokrenuti `git status --porcelain`, `git log --oneline origin/main..HEAD`, `git worktree list`
2. Verifikovati da output odgovara očekivanom: 5 modified + 1 untracked, 12 commits ahead, 6 worktrees + main
3. Ako bilo šta odstupa → STOP, prijaviti Pavlu, ne ići na B0.2

**RIZIK:** LOW — read-only operacija.

**VERIFIKACIJA:** Output identičan onom u sesiji audit-a. Ako nije, sve dalje pretpostavke su nevažeće.

**EXIT:** Pavle daje "ok B0.1 stanje potvrđeno" → kreće B0.2.

---

### B0.2 — Commit Batch 12a + Push 12 Commits (STANDARD, ~20 min)

**CILJ:** Working tree clean, origin/main = HEAD. Sve od Batch 01 do Batch 12a + og-image fix na GitHub-u.

**FAJLOVI (commit):**
- `src/components/sections/Contact.tsx` — Batch 12a Contact terminal rewrite
- `src/styles/chambers.css` — Batch 12a signal-out block replacement
- `src/styles/sections.css` — Batch 12a fragment-overlay warm flash
- `workflow/LOG.md` — Batch 12a CLOSE entry
- `workflow/STATE.md` — Batch 12a "poslednji završen" update

**FAJLOVI (untracked decision):**
- `.claude/Hooks/` — Windows case-duplikat folder, treba odluku. Default: brisanje (jer `.claude/hooks/` već u `.gitignore`). Vidi PLAN korak 1.

**PLAN:**
1. Odlučiti `.claude/Hooks/` (brisanje preporučeno — duplikat case-insensitive od `.claude/hooks/` koji je već gitignored)
2. `git add` pet modifikovanih fajlova
3. `git commit -m "feat(contact): Batch 12a — Contact Terminal Treatment + Warm Flash"`
4. `git push origin main`
5. Verifikovati da `git log --oneline origin/main..HEAD` vraća prazan output

**RIZIK:**
- LOW za commit/push
- MEDIUM ako je remote main dobio nove commits između audit-a i ovog batch-a (push fail). Mitigation: `git fetch` pre push-a, ako ima divergence → STOP.

**VERIFIKACIJA:**
- `git status` → nothing to commit, working tree clean
- `git log --oneline origin/main..HEAD` → empty
- GitHub web UI → main pokazuje 13 commitova preko prethodnog stanja (od da3a4d8 do novi Batch 12a)
- `npm run build` → exit 0 (PASS(machine))
- `npm run typecheck` → exit 0 (PASS(machine))

**EXIT:** Pavle potvrđuje GitHub web UI vidi sve commits → kreće B0.3.

---

### B0.3 — Test Suite Restoration (STANDARD, ~30 min)

**CILJ:** `npm run test` exit 0. Vitest skenira samo main, ne worktree-ove. Framer-motion mock pokriva sve stvarno korišćene API-je.

**FAJLOVI:**
- `src/__tests__/App.integration.test.tsx` — proširiti framer-motion mock (dodati `useMotionValue`, `useSpring`, `useMotionValueEvent`)
- `vitest.config.ts` — dodati `exclude: ['.claude/**', 'node_modules/**']` u test konfiguraciju

**PLAN:**
1. Pre fix-a: `npm run test 2>&1 | tee /tmp/test-before.log` — capture trenutni fail signature
2. Edit `src/__tests__/App.integration.test.tsx` — proširiti `vi.mock('framer-motion')`:
   - `useMotionValue: vi.fn((init) => ({ get: () => init, set: vi.fn(), on: vi.fn(() => () => {}) }))`
   - `useSpring: vi.fn((source) => source)`
   - `useMotionValueEvent: vi.fn()`
3. Edit `vitest.config.ts` — dodati `exclude` za `.claude/worktrees` i `_archive`
4. `npm run test` — verifikovati exit 0
5. Ako i dalje failuje → root cause analiza, NE krpiti naslepo. Ne širiti scope na druge mock-ove bez Pavle OK.
6. Commit: `fix(test): restore framer-motion mock + exclude worktrees from vitest`
7. Push

**RIZIK:**
- MEDIUM: drugi testovi mogu otkriti drift između src/ i mock-a (na primer test koji očekuje `useReducedMotion` da vraća boolean a sad dobija `null`)
- LOW: vitest exclude može da preskoči i validne testove ako pattern nije precizan
- LOW: ostali test-related issues (npr. legitimnih bugova u kodu) — ako se pojave, NE rešavaju u ovom batchu, prijavljuju za zaseban batch

**VERIFIKACIJA:**
- `npm run test` → exit 0, sve test fajlove prolaze
- `npm run typecheck` → exit 0
- Test count odgovara očekivanom (3 test fajla × stvarni broj testova, ne 5×)
- Commit + push prolaze

**EXIT:** Test suite zelena, push uspešan → kreće B0.4.

---

### B0.4 — Worktree & Branch Cleanup (STANDARD, ~20 min)

**CILJ:** Jedan radni direktorijum (main), bez stale branch-eva. Repo state minimal.

**FAJLOVI:** ne dira source. Operacije su git-only + filesystem.

**PLAN:**

**Worktree cleanup (6 → 0):**
```
git worktree remove .claude/worktrees/frosty-kepler-78286b
git worktree remove .claude/worktrees/jolly-lamarr-a44150
git worktree remove .claude/worktrees/jovial-banzai-9d9e28
git worktree remove .claude/worktrees/laughing-raman-8d3944
git worktree prune
```
Ako `worktree remove` failuje (locked/dirty) → `--force` flag, ali tek posle Pavle OK.

**Local branch cleanup (7 → 0):**
Sve grane su 0 commits ahead of main, bezbedno za brisanje:
```
git branch -D claude/epic-blackwell-705244
git branch -D claude/frosty-kepler-78286b
git branch -D claude/jolly-lamarr-a44150
git branch -D claude/jovial-banzai-9d9e28
git branch -D claude/jovial-montalcini-af845d
git branch -D claude/laughing-raman-8d3944
git branch -D claude/vigorous-solomon-086459
```

**Remote branch cleanup (3 → 0, sa diff check za 1):**
1. `origin/claude/gallant-allen` — 0 commits ispred main → `git push origin --delete claude/gallant-allen`
2. `origin/claude/strange-darwin` — 0 commits ispred main → `git push origin --delete claude/strange-darwin`
3. `origin/claude/trusting-grothendieck` — **ima 1 unique commit (def2fcf)**:
   - PRVO: `git diff main..origin/claude/trusting-grothendieck --stat` — videti šta menja
   - PRVO: `git show def2fcf --stat` — videti commit content
   - Ako diff pokazuje 0 vrednost (sve već implementovano kroz Batches 09a/10b/12a) → `git push origin --delete claude/trusting-grothendieck`
   - Ako diff pokazuje nešto vredno → STOP, prijaviti Pavlu, NE brisati. Diskutovati cherry-pick ili arhiviranje.

**Cleanup završetak:**
```
git fetch --prune
git worktree list                # mora pokazati samo main
git branch -a                    # mora pokazati samo main + origin/main
```

**RIZIK:**
- MEDIUM za trusting-grothendieck — moguće gubljenje rada ako se brišе bez diff check-a. **Mitigation: diff je obavezan korak, ne preskače se.**
- LOW za sve ostalo — sve grane su prazne i sve worktree-ove su na main SHA-ovima, output potvrđuje.
- LOW: `worktree remove` može da se ne dovrši ako neki proces (npr. dev server) drži foldere. Mitigation: ugasiti dev server pre B0.4.

**VERIFIKACIJA:**
- `git worktree list` → samo `Portfolio 1` (main)
- `git branch -a` → `* main`, `remotes/origin/HEAD`, `remotes/origin/main`
- `ls -la .claude/worktrees/` → folder prazan ili obrisan
- Ništa nije commitovano u ovom batch-u (operacije su git-only)

**EXIT:** Repo state minimal, push origin pokazuje samo main → kreće B0.5.

---

### B0.5 — Asset & Config Hygiene (LEAN, ~30 min)

**CILJ:** og-image kompresija, .vercelignore proveren, .env handling jasno dokumentovan (ne rotacija — to ide odvojeno kad Pavle odluči).

**FAJLOVI:**
- `public/og-image.png` — kompresija 1.6 MB → ≤ 200 KB (cilj: 100-150 KB)
- `.gitignore` — verifikovati da `.env` ostaje gitignored
- `.vercelignore` — verifikovati da public assets idu u deploy
- `index.html` — verifikovati og:image tag i dimenzije

**PLAN:**
1. Pavle koristi alat za kompresiju (TinyPNG, squoosh.app, ili `pngquant --quality=65-80 og-image.png` ako je instaliran)
2. Cilj: ≤ 200 KB, optimum 1200×630 dimenzije, PNG ili JPG
3. Validacija: Twitter Card Validator (https://cards-dev.twitter.com/validator) → mora pass
4. Verifikacija: Facebook Sharing Debugger
5. `.gitignore` line check: `.env` mora biti tamo (verifikovano u zip-u — jeste)
6. `.vercelignore` review: ne smeta `public/` (verifikovano — `.vercelignore` je 18 bytes, samo basic)
7. Commit: `chore(assets): compress og-image (1.6MB → 150KB) for social card validation`
8. Push

**RIZIK:**
- LOW: kompresija može produciti vidljivu degradaciju kvaliteta. Mitigation: A/B usporediti pre/posle u browseru.
- LOW: kompresovan PNG možda nije ispod 200KB ako original ima velike dimenzije ili previše detalja. Mitigation: konvertovati u JPG (gubitak transparentnosti je ok za og-image).

**VERIFIKACIJA:**
- `du -sh public/og-image.png` → ≤ 200 KB
- Twitter Card Validator → pass
- Lighthouse social meta check → pass
- `npm run build` → exit 0 (asset hash menjan, ali build prolazi)

**EXIT:** og-image kompresovan, social cards funkcionalni → Faza 0 ZATVORENA.

---

### Faza 0 — EXIT KRITERIJUM (sve mora biti tačno)

- [ ] `git status` → nothing to commit, working tree clean
- [ ] `git log --oneline origin/main..HEAD` → empty
- [ ] `git worktree list` → samo main
- [ ] `git branch -a` → main + origin/main, nijedan claude/*
- [ ] `npm run build` → exit 0
- [ ] `npm run typecheck` → exit 0
- [ ] `npm run test` → exit 0
- [ ] `du -sh public/og-image.png` → ≤ 200 KB
- [ ] `.env` rotacija — pending (Pavle odlučuje datum)

Kad svih 8 stavki = ✓ → Faza 0 DONE → kreće `/plan` za Faza 1 (workflow v3).

---

## Faza 1 — WORKFLOW v3 (skicirano, finalizuje se posle Faze 0)

**Cilj:** workflow ima realnu mehaniku, ne dekoraciju. Truth-types su shell exit code, ne label. Doc layer ≤ 4 fajla, ≤ 2000 linija per-project.

**Predviđeni batch:** 1 STRICT batch, ~3h, 4 commit-a.

**Skicirani sadržaj:**
- Doc consolidation: VISUAL_LANGUAGE → BIBLE merge, legacy ROADMAP → archive ili brisanje, CL3_Planet rename u ROADMAP, LESSONS distill u RULES §14
- Skill update: `/close` dobija obavezno `npm run build && typecheck && test` execution sa exit code capture-om; `/plan` dobija clean working tree check; novi `/kickoff` skill koji se zove na startu sesije
- Hook decision: ili pravi `session-bootstrap` hook ili ga obrišemo i priznamo da je user-level
- RULES.md update: §8 verification mehanika, §19 doc cap, §20 lessons cap, §21 workflow change frequency

**Decision points pre Faze 1:**
- Da li zadržati LESSONS.md ili distill u RULES (Opus predlog: forced rotation u LESSONS.md, ne brisanje)
- Skill definicija: pravi alat ili Markdown spec — proveriti šta Claude Code hook API zaista podržava
- Da li `/audit` skill ide u v3 ili se dodaje kasnije

**Ne pišemo Faza 1 batch sada.** Finalizuje se kad Faza 0 prođe i kad imam odgovor na decision points.

---

## Faza 2 — FINISH & LAUNCH (skicirano, finalizuje se posle Faze 1)

**Cilj:** CL3 reconstruction zatvoren. cl3menza.com live. og funkcionalan. Demo URL → real domain.

**Predviđeni batch-evi (svaki je zaseban /plan kad dođe red):**

| ID | Naziv | Tier | Procena |
|---|---|---|---|
| B2.1 | Roadmap §14 Reconciliation | STANDARD | ~1h |
| B2.2 | TheBuild Iframe Decision (real orders) | STANDARD | ~1h |
| B2.3 | Reward System v1 | STRICT | ~2h |
| B2.4 | TheSystem Chamber Polish | STANDARD | ~1.5h |
| B2.5 | Domain Activation (cl3menza.com) | STANDARD | ~30min |
| B2.6 | OG Meta Tags + GA4 Real ID | LEAN | ~30min |
| B2.7 | PATH_D Refinement (deferred geometry, R13) | STRICT | ~2h |
| B2.8 | Final Production Smoke + Lighthouse | STANDARD | ~30min |

**Redosled:** B2.1 prvi (jer otkriva šta je stvarno DONE i šta ide u scope), B2.5 i B2.6 mogu paralelno, B2.8 zadnji.

**Ne pišemo Faza 2 batch-eve sada.**

---

## Lock zone za ovaj fajl

Ovaj `CLEANROADMAP.md` se ne edituje van revision log-a na dnu. Nove odluke se ne brišu prošle — dodaju se kao revision sa datumom i razlogom.

Promene plana koje nisu trivijalne (npr. dodavanje novog batch-a, brisanje exit kriterijuma) zahtevaju eksplicitan Pavle OK pre upisivanja.

---

## Revision Log

| Datum | Autor | Promena | Razlog |
|-------|-------|---------|--------|
| 2026-05-01 | Opus + Pavle | Initial draft, Faza 0 specifikovana | Posle dual audit-a (Opus + Claude Code) |
| 2026-05-01 | Pavle | Dodat u repo kao `workflow/CLEANROADMAP.md` | Source-of-truth za cleanup sesiju |

---

*This document is the source-of-truth for project stabilization, workflow v3 migration, and CL3 finish. Any deviation requires explicit discussion and rationale before implementation.*
