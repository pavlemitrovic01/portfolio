# ROADMAP — cl3menza.com Portfolio

Aktivni plan rada. Batch po batch, tema po tema.
Završen batch → `[x]`. Kad su svi `[x]` → arhiviraj, pravi novi roadmap.

Cilj:
- tehnička baza ostaje stabilna
- normal mode se pretvara u cinematic living landing
- cl3menza mode ostaje dublji sloj sajta
- finalni rezultat mora delovati skuplje, gušće, režiranije i art-directed

---

## ARHIVA — Faza 1 (batch-evi 1–5)

<details>
<summary>Završeni batch-evi (klikni za detalje)</summary>

### Batch 1 — Anchor ID audit `[x]`
Stabilni `id`-evi na svim cl3menza sekcijama + Header linkovi koji ih pogađaju.

### Batch 2 — Content: placeholder copy `[x]`
Realan tekst umesto placeholder-a u Hero (personal pitch) i Timeline (prvi i poslednji item).

### Batch 3 — Hero.tsx refactor `[x]`
Razdvoji normal i cl3menza render u zasebne komponente.

### Batch 4 — Mobile polish round 2 `[x]`
Verifikacija two-mode layouta na mobilnom. Fokus na cl3menza mode.

### Batch 5 — Navigation fragility fix `[x]`
Jedan `MutationObserver` preko `useCl3menzaBodyClass`; Hero, Header, Footer + App na istom izvoru.

</details>

---

## ARHIVA — Faza 2 (batch-evi 6–11)

<details>
<summary>Završeni batch-evi (klikni za detalje)</summary>

### Batch 6 — Git checkpoint `[x]`
Komituj sav nekomitirani rad iz batch-eva 3–5.
Fajlovi: sve modifikovane i untracked datoteke.
Režim: LEAN | Rizik: nizak

### Batch 7 — API hardening `[x]`
Rate-limiting na `api/claude.ts` (IP-based, in-memory ili Vercel KV).
Input validacija (max message length, sanitizacija).
Graceful error response umesto raw Anthropic greške.
Fajlovi: `api/claude.ts`
Režim: STANDARD | Rizik: srednji (LOCK zona)

### Batch 8 — SEO & Meta osnova `[x]`
GA4 placeholder, `sitemap.xml`, `robots.txt`, favicon set, `site.webmanifest`, OG image.
Fajlovi: `index.html`, `public/`
Režim: STANDARD | Rizik: srednji

### Batch 9 — Accessibility audit `[x]`
ARIA landmarks, keyboard nav, focus management, color contrast, skip-to-content.
Fajlovi: `Header.tsx`, `App.tsx`, `Layout.tsx`, sekcije
Režim: STANDARD | Rizik: nizak

### Batch 10 — Performance: lazy load i code split `[x]`
`React.lazy` + `Suspense` za cl3menza sekcije. 9 chunk-ova.
Fajlovi: `App.tsx`, `Hero.tsx`
Režim: STANDARD | Rizik: srednji (LOCK zona)

### Batch 11 — CSS modularizacija `[x]`
global.css → base.css + layout.css + hero.css + overrides.css + sections.css.
Fajlovi: `src/styles/`
Režim: STANDARD | Rizik: srednji

</details>

---

## ARHIVA — Faza 3 (batch-evi 12–15)

<details>
<summary>Završeni batch-evi (klikni za detalje)</summary>

### Batch 12A — Content placeholders `[x]`
About neutralni bio, Contact Upwork/Fiverr → non-interactive span, Projects fake kartice uklonjene.

### Batch 14 — Targeted fixes (iz QA) `[x]`
Google Fonts non-blocking, heading order fix.
Lighthouse delta: Perf 62→76, A11y 98→100, TBT 1370ms→420ms.

### Batch 15A — QA audit `[x]`
Lighthouse mobile: Perf 76 / A11y 100 / Best Practices 100 / SEO 100.

### Batch 15B — Production gap audit `[x]`
Production sinhronizovan sa lokalnim HEAD-om.

### Batch 15C — Push / deploy `[x]`
12 commit-a push-ovano, Vercel auto-deploy READY.

### Batch 15D — Final smoke test `[x]`
Manual browser smoke — sve OK, 0 errors, 0 failed requests.

</details>

---

## ARHIVA — Faza 4 — Kvalitet, Sigurnost, Maintainability

<details>
<summary>Završeni batch-evi (klikni za detalje)</summary>

### Batch 16 — Vitest setup + API testovi `[x]`
37/37 testova prolaze. typecheck čist. build ✓ 3.52s. dev server 0 errors.
Dev deps: vitest, @vitest/coverage-v8, jsdom, @types/node.
29 testova za api/claude.ts (validateBody 15, isRateLimited 5, handler 9).
8 testova za useCl3menzaBodyClass (getCl3menzaBodyClass 3, subscribe 5).
Bonus: tsconfig.node.json + DOM lib → fix pre-existing typecheck grešaka (fetch, process, Buffer).
Fajlovi: `vitest.config.ts`, `api/__tests__/claude.test.ts`, `src/hooks/__tests__/useCl3menzaBodyClass.test.ts`, `api/claude.ts` (3 exports), `package.json`, `tsconfig.node.json`

### Batch 17 — Mode switching integration test `[x]`
46/46 testova prolaze. typecheck čist. build ✓ 3.98s. dev server 0 errors.
Dev deps: @testing-library/react, @testing-library/jest-dom.
9 testova u `App.integration.test.tsx` — initial render, aktivacija, deaktivacija, reduced motion.

### Batch 18 — API hardening v2 `[x]`
52/52 testova prolaze. typecheck čist. build ✓ 3.61s.
Model lockdown, API key fail-fast, response sanitizacija, clean body forwarding.
Fajlovi: `api/claude.ts`, `src/components/sections/HeroCl3menza.tsx`, `api/__tests__/claude.test.ts`

### Batch 19 — Timer extraction + App.tsx cleanup `[x]`
52/52 testova prolaze. typecheck čist. build ✓ 4.41s.
`useTerminalBoot` enkapsulira boot/transition state.
`MatrixRain` izvučen u poseban fajl.
`App.tsx` postaje čist orkestrator.

### Batch 20 — CSS tema refactor `[x]`
`overrides.css` 808→285L.
Theme varijable, migracije po fajlovima, redundantni overrides uklonjeni.
typecheck ✓ | build ✓ | testovi ✓ | computed styles oba moda ✓ | 0 console errors.

### Batch 21 — Canvas optimizacija + cl3menza prefetch `[x]`
Page Visibility API za canvase, frame budget, prefetch lazy sekcija na hover.
typecheck ✓ | build ✓ | testovi ✓

</details>

---

## FAZA 5 — Landing Transformation (normal mode)

Cilj:
normal mode više nije klasičan homepage sa sekcijama.
Postaje jedna dugačka cinematic living scena:

- dark / premium / cosmic / editorial
- centralna svetlosna putanja / energy trail
- hero sa portretom
- 5 story kartica uz putanju
- scroll-driven ulaz u cl3menza mode
- prirodan scroll napred i nazad
- bez hard lock-a
- bez rušenja postojećeg cl3menza sistema

Napomena:
Faza 5 nije polish stare strukture.
Ovo je nova landing arhitektura iznad postojeće tehničke baze.

---

### L1 — Scene shell + continuous scroll architecture `[x]`
**GOAL**
Postaviti novu normal-mode arhitekturu kao `LandingScene` i prebaciti `App.tsx` sa old swap pristupa na continuous scroll + mount-once cl3 subtree.

**URAĐENO**
- `LandingScene` uveden
- `LandingBackground` uveden
- `landing.css` uveden
- `App.tsx` prebačen na continuous scroll arhitekturu
- `hasActivated` mount-once logika uvedena
- cl3 subtree ostaje mount-ovan posle prve aktivacije
- `window.scrollTo` reset logika uklonjena
- `aria-hidden` + `inert` za hidden subtree
- testovi ažurirani za novu arhitekturu

**FILES**
- `src/components/landing/LandingScene.tsx`
- `src/components/landing/LandingBackground.tsx`
- `src/styles/landing.css`
- `src/styles/global.css`
- `src/App.tsx`
- `src/hooks/useTerminalBoot.ts`
- `src/components/layout/Header.tsx`
- `src/__tests__/App.integration.test.tsx`

**VERIFY**
- typecheck čist
- build čist
- testovi zeleni
- normal mode renderuje landing shell
- cl3 activation radi bez scroll reset-a
- subtree mount-once pattern radi

---

### L2 — Landing hero baseline `[x]`
**GOAL**
Napraviti novi hero baseline za landing scenu: ime, positioning copy, 2 CTA, portrait placeholder, osnovni premium raspored.

**URAĐENO**
- novi `LandingHero`
- 2-column hero grid
- portrait placeholder
- 2 CTA
- floating micro-badges
- glitch detalj na prezimenu
- mobile reorder portreta

**FILES**
- `src/components/landing/LandingHero.tsx`
- `src/components/landing/LandingScene.tsx`
- `src/styles/landing.css`

**VERIFY**
- desktop layout radi
- mobile layout radi
- portrait placeholder renderuje
- 0 console errors

---

### L3 — Central path baseline `[x]`
**GOAL**
Uvesti stabilan centralni path layer sa responsive i reduced-motion fallback-om, bez overengineering-a.

**URAĐENO**
- `LandingPath` uveden
- div-based path, ne SVG
- scroll-driven `scaleY()` baseline
- mobile fallback = statično
- reduced-motion fallback = statično
- glow + node baseline postoje

**FILES**
- `src/components/landing/LandingPath.tsx`
- `src/components/landing/LandingScene.tsx`
- `src/styles/landing.css`

**VERIFY**
- typecheck čist
- build čist
- testovi zeleni
- path prisutan i stabilan
- nema console errors

---

### L4 — Story cards baseline `[x]`
**GOAL**
Uvesti 5 story kartica raspoređenih levo/desno uz path i vezati ih za novu landing scenu.

**URAĐENO**
- `LandingCards` uveden
- 5 kartica postoje
- left/right alternation postoji
- connectori i junction dot postoje
- mobile stack fallback postoji
- placeholder content direction usklađen sa brief-om

**NAPOMENA**
Copy je i dalje placeholder i nije launch-final.

**FILES**
- `src/components/landing/LandingCards.tsx`
- `src/components/landing/LandingScene.tsx`
- `src/styles/landing.css`

**VERIFY**
- kartice renderuju
- alternation radi
- mobile stack radi
- motion direction radi
- 0 console errors

---

## AKTIVNI BATCH-EVI

### L5 — Scroll-driven activation + cl3 transition `[ ]`
**GOAL**
Activation zona više ne sme biti prazan placeholder.
Uvesti pravi scroll-driven ulaz u cl3menza mode i prirodan povratak nazad.

**MORA DA VAŽI**
- scroll je primarni ulaz
- klik nije primary UX
- nema `scrollTo`
- nema hard lock-a
- nema DOM teardown-a na svakom reverse-u
- prvi ulaz može imati full boot
- naredni ulazi mogu imati lakši re-entry
- napred i nazad rade prirodnim scroll-om

**CORE**
- activation zona pri dnu landing scene
- buildup energije kako se korisnik približava
- threshold logika
- transition osećaj ~1.2s
- integracija sa postojećim boot/terminal/glitch sistemom
- reverse scroll vraća normal mode atmosferu bez flicker-a

**FILES**
- `src/components/landing/LandingScene.tsx`
- novi `src/components/landing/LandingActivation.tsx` ako je potrebno
- `src/styles/landing.css`
- minimalno `src/App.tsx` samo ako je nužno
- minimalno `src/hooks/useTerminalBoot.ts` samo ako je nužno

**FORBIDDEN**
- click kao primary activation
- `scrollTo`
- one-time lock logika
- DOM teardown na svakom reverse-u
- rušenje cl3 sekcija

**RISK**
Visok — srce iskustva.

**VERIFY**
- scroll down → aktivacija bez klika
- scroll up → povratak bez flicker-a
- nema scroll jump-a
- nema duplih trigger-a
- reduced motion radi
- mobile ponašanje provereno
- 0 console errors

---

### L6 — Ambijent background buildup `[ ]`
**GOAL**
Pozadina mora dobiti dubinu i gustinu, ne samo nebula + vignette.

**CORE**
- noise / texture layer
- depth dots
- dodatni glow slojevi
- gradient zone prelazi kroz scenu
- jači cosmic osećaj bez prenatrpanosti

**FILES**
- `src/components/landing/LandingBackground.tsx`
- `src/styles/landing.css`

**RISK**
Srednji — lako ode u perf problem ili kič.

**VERIFY**
- desktop / tablet / mobile visual pass
- scena deluje bogatije, ne teže
- nema prenatrpanosti
- reduced motion i dalje smislen
- performance sanity check

---

### L7 — Energy path upgrade `[ ]`
**GOAL**
Path više ne sme delovati kao samo stabilna linija.
Treba da postane energy trail koji vodi priču i pojačava se ka activation zoni.

**CORE**
- jači glow treatment
- pulse na čvorovima
- floating labels uz path
- vizuelno pojačavanje prema dnu
- bolji odnos path ↔ cards

**FILES**
- `src/components/landing/LandingPath.tsx`
- `src/components/landing/LandingCards.tsx`
- `src/styles/landing.css`

**RISK**
Srednji — motion density i mobile fallback.

**VERIFY**
- path stvarno vodi scenu
- ne deluje kao dekoracija bez smisla
- mobile fallback i dalje čist
- reduced motion fallback radi

---

### L8 — Card visual depth + hover `[ ]`
**GOAL**
Kartice moraju preći iz baseline/story blokova u premium narrative panels.

**CORE**
- hover glow / depth
- border light treatment
- jači connector vizual
- bolji panel layering
- placeholder copy ostaje dok ne stigne finalni tekst

**FILES**
- `src/components/landing/LandingCards.tsx`
- `src/styles/landing.css`

**RISK**
Nizak do srednji — CSS-heavy batch.

**VERIFY**
- desktop hover osećaj premium
- mobile touch fallback smislen
- nema prenaglašenih efekata
- tekst ostaje čitljiv

---

### L9 — Hero editorial polish + portrait `[ ]`
**GOAL**
Podignuti hero iz placeholder baseline-a u stvarni premium editorial entry point.

**CORE**
- portrait zona spremna za realnu fotografiju
- bolji odnos copy / portrait / badges / path
- CTA refinement
- tipografski polish
- bolja hero gustina bez haosa

**FILES**
- `src/components/landing/LandingHero.tsx`
- `src/styles/landing.css`
- po potrebi portrait asset lokacija

**RISK**
Srednji — lako ode u jeftin ili prazan hero.

**VERIFY**
- hero deluje premium i namerno režiran
- portrait ne deluje kao običan placeholder box
- desktop / tablet / mobile balans dobar
- CTA jasno rade

---

### L10 — Header + Footer alignment `[x]`
**GOAL**
Normal mode mora dobiti ultra-minimal presence.
Footer i header ne smeju više da vuku stari section mindset i mrtve linkove.

**CORE**
- minimal header za landing
- footer usklađen sa stvarnim stanjem
- nema `#signals` / `#about` mrtvih linkova
- cl3 fallback exit ostaje sekundarni mehanizam

**FILES**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/styles/layout.css`
- po potrebi `src/styles/landing.css`

**RISK**
Nizak do srednji.

**VERIFY**
- nema mrtvih anchor-a
- header ne deluje kao klasična navigacija
- oba moda rade smisleno
- mobile nav/fallback ne puca

---

### L11 — Micro-detail layers + density pass `[x]`
**GOAL**
Zgusnuti scenu mikro-detaljima tako da konačno dobije puni “wow” nivo bez novih glavnih blokova.

**CORE**
- floating labels
- light trails
- subtle UI noise
- depth dots
- dodatni glow elementi
- gradient zone prelazi
- sitni editorial detalji

**FILES**
- `src/components/landing/LandingBackground.tsx`
- `src/components/landing/LandingPath.tsx`
- `src/components/landing/LandingCards.tsx`
- `src/components/landing/LandingScene.tsx`
- `src/styles/landing.css`

**RISK**
Srednji — balans između premium i prenatrpano.

**VERIFY**
- scena više ne deluje prazno
- detalji ne guše glavnu kompoziciju
- performance i dalje prihvatljiv
- mobile i reduced motion ostaju smisleni

---

### L12 — Cleanup + tests + docs + final integration `[ ]`
**GOAL**
Zatvoriti tranziciju u novu landing arhitekturu i očistiti zastarele delove.

**CORE**
- cleanup mrtvog normal-mode koda koji više nije u render putanji
- update testova za finalni flow
- update `CLAUDE.md`
- update `docs/ROADMAP.md`
- final smoke discipline

**MRTAV KOD ZA PROCENU**
- `src/components/sections/Hero.tsx`
- `src/components/sections/HeroNormal.tsx`
- `src/components/sections/TrustSignals.tsx`
- `src/components/sections/About.tsx`

**FILES**
- gore navedeni zastareli fajlovi samo ako su stvarno obsolete
- `src/__tests__/App.integration.test.tsx`
- `CLAUDE.md`
- `docs/ROADMAP.md`

**RISK**
Srednji — cleanup lako ode u preuranjeno brisanje.

**VERIFY**
- typecheck čist
- testovi zeleni
- finalni normal → cl3 → normal flow radi
- docs odgovaraju stvarnom repou
- finalni manual smoke clean

---

## OPEN — Pending user input / assets

### Finalni hero i story copy `[ ]`
Čeka:
- finalni hero tekst
- finalni tekst za 5 kartica

### Finalni portrait asset `[ ]`
Čeka:
- Pavlova realna fotografija ili finalno odobren portrait treatment

### Testimonials `[defer]`
Realne recenzije nisu dostupne.

### Config pending
- cl3menza.com → Vercel domain config + DNS setup
- GA4 Measurement ID → zameni G-XXXXXXXXXX sa pravim ID-om