# ROADMAP — cl3menza.com Portfolio

Aktivni plan rada. Batch po batch, tema po tema.
Završen batch → `[x]`. Kad su svi `[x]` → arhiviraj, pravi novi roadmap.

Cilj: ocena 9/9.5 — stabilnost, zaštita, infrastruktura pre sadržaja.

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

## FAZA 4 — Kvalitet, Sigurnost, Maintainability

Cilj: podići projekat sa 7/10 na 8.5+ — testovi, security hardening, DX, performans.

Redosled: 16 → 17 → 18 → 19 → 20 ↔ 21 (20 i 21 nezavisni, mogu paralelno).

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
9 testova u App.integration.test.tsx — initial render (2), aktivacija (4), deaktivacija (2), reduced motion (1).
Napomena: MatrixRain uvek renderuje canvas — `reduceMotion` kontroliše samo animacioni loop, ne element.
Fajlovi: `src/__tests__/App.integration.test.tsx`, `src/test-setup.ts`, `vitest.config.ts` (setupFiles), `package.json`

### Batch 18 — API hardening v2 `[x]`
52/52 testova prolaze. typecheck čist. build ✓ 3.61s. HeroCl3menza chunk 7.35→7.30kB.
1. Model lockdown: ANTHROPIC_MODEL + MAX_TOKENS konstante, model validacija uklonjena iz validateBody, frontend ne šalje model/max_tokens.
2. API key fail-fast: handler vraća 500 odmah ako ANTHROPIC_API_KEY nije setovan.
3. Response sanitizacija: sanitizeAnthropicResponse() — strip HTML tagova samo iz content[].text blokova.
4. Body forwarding cleanup: konstruiše čist objekat {model, max_tokens, messages, system} — extra klijentska polja ne prolaze.
Novi testovi: missing API key (500), extra fields not forwarded, sanitize (5 testova).
Fajlovi: `api/claude.ts`, `src/components/sections/HeroCl3menza.tsx`, `api/__tests__/claude.test.ts`

### Batch 19 — Timer extraction + App.tsx cleanup `[ ]`
Izvlači 60+ linija timer logike u custom hook. App.tsx postaje čist orkestrator.
Zavisi od: Batch 17 (integration test pokriva refactor).

**Scope:**
- Napravi `src/hooks/useTerminalBoot.ts` — enkapsulira boot sekvencu (terminal lines, glitch, mode set, scroll, focus, announcement)
- Hook prima: subscribe/get funkcije iz useCl3menzaBodyClass
- Hook vraća: `{ cl3menzaMode, glitching, terminal, terminalLines, modeAnnouncement }`
- Svi `useRef`, `setTimeout`, `setInterval`, cleanup interno u hooku
- App.tsx koristi hook umesto inline logike
- Opciono: izvuci MatrixRain u `src/components/canvas/MatrixRain.tsx`

CORE: useTerminalBoot hook, App.tsx refactor
FLEX: MatrixRain extraction
FORBIDDEN: promena boot sekvence vizuala ili timing-a

Fajlovi: `src/App.tsx`, novi `src/hooks/useTerminalBoot.ts`
Režim: STANDARD | Rizik: srednji (LOCK zona App.tsx)
Verify: Batch 17 integration testovi prolaze. App.tsx < 180 linija. Manual test oba moda.

### Batch 20 — CSS tema refactor `[ ]`
Najveći refactor — prebacivanje sa class-override pristupa na CSS custom properties toggle.
Nezavisan od Batch 19/21, ali bolje posle test infrastrukture.

**Scope:**
- Definiši CSS custom property set u `base.css`: `:root { --bg-primary; --text-primary; --accent; ... }`
- `body.cl3menza-mode` override-uje samo varijable, ne elemente
- Zameni `body.cl3menza-mode .element { color: X }` sa `color: var(--text-primary)` u samim elementima
- Cilj: `overrides.css` sa 808L → ~300L
- Ne menjaj vizuelni output — čist refactor

CORE: CSS variable definicije, migracija 60%+ override-a
FLEX: potpuna eliminacija tematskih duplikata
FORBIDDEN: promena boja, efekata, layout-a

Fajlovi: `src/styles/base.css`, `src/styles/overrides.css`, `src/styles/sections.css`
Režim: STANDARD | Rizik: srednji
Verify: build OK, side-by-side vizuelna provera oba moda, Lighthouse stabilan.

### Batch 21 — Canvas optimizacija + cl3menza prefetch `[ ]`
Performans poboljšanja bez promene UX-a.
Nezavisan od Batch 20, može paralelno.

**Scope:**
1. **Page Visibility API** — MatrixRain i ParticlesCanvas pauziraju kad tab nije aktivan (`document.hidden` u rAF loop)
2. **Frame budget** — ako prethodni frame > 20ms, preskoči sledeći (sprečava jank na slabim uređajima)
3. **Prefetch cl3menza chunks** — `onMouseEnter` na "Genius builder vibe" kartici triggeruje `import()` za HeroCl3menza i lazy sekcije. Instant tranzicija jer su chunk-ovi u cache-u.

CORE: visibility pause, prefetch
FLEX: frame budgeting
FORBIDDEN: promena vizuala particle/matrix efekata

Fajlovi: `src/App.tsx` (MatrixRain), `src/components/canvas/ParticlesCanvas.tsx`, `src/components/sections/TrustSignals.tsx`
Režim: LEAN | Rizik: nizak
Verify: DevTools Performance — nema rAF kad tab u pozadini. Network — chunk-ovi na hover pre klika.

---

## OPEN — Pending user input / config

### Batch 12B — Finalni content `[ ]`
Finalni About copy (Pavle's priča) + pravi Upwork/Fiverr URL-ovi.
Čeka: tekst od Pavla + aktivne profile URL-ove.
Fajlovi: `About.tsx`, `Contact.tsx`
Režim: LEAN | Rizik: nizak

### Batch 13 — Testimonials `[defer]`
Realne recenzije nisu dostupne. Sekcija ostaje, popunjava se naknadno.

### Config pending (van batch sistema)
- cl3menza.com → Vercel domain config + DNS setup
- GA4 Measurement ID → zameni G-XXXXXXXXXX sa pravim ID-om
