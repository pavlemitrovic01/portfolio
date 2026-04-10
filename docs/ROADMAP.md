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

### Batch 19 — Timer extraction + App.tsx cleanup `[x]`
52/52 testova prolaze. typecheck čist. build ✓ 4.41s. App.tsx 271→130 linija.
useTerminalBoot enkapsulira sav boot/transition state, refs i timere.
MatrixRain izvučen u `src/components/canvas/MatrixRain.tsx`.
App.tsx je čist orkestrator — state, TERMINAL_LINES i interval logika su van fajla.
Fajlovi: `src/App.tsx`, `src/hooks/useTerminalBoot.ts`, `src/components/canvas/MatrixRain.tsx`

### Batch 20 — CSS tema refactor `[x]`
overrides.css 808→285L. 7 novih CSS varijabli (--tile-border, --step-bg/border, --kicker-color, --eyebrow-bg/border, --brand-glow).
Migracije: hv-personal/iframe/word-glitch → hero.css; trust-stats/easter/matrix/terminal/fragment → sections.css; badge/glitch-shake → layout.css.
Redundantni cl3 overrides uklonjeni (.tile::before, .brand::before, .eyebrow, .section-head .kicker, .process-step border, .project-main/.aside border).
typecheck ✓ | build ✓ | 52/52 testova ✓ | computed styles verifikovani oba moda | 0 console errors.
Fajlovi: `src/styles/base.css`, `overrides.css`, `hero.css`, `layout.css`, `sections.css`


### Batch 21 — Canvas optimizacija + cl3menza prefetch `[x]`
52/52 testova ✓. typecheck ✓. build ✓ 3.48s.
1. Page Visibility API: MatrixRain + ParticlesCanvas pauziraju rAF kad `document.hidden`, restartuju na `visibilitychange`.
2. Frame budget: ako frame > 20ms, preskoči sledeći rAF (sprečava jank na slabim uređajima).
3. Prefetch: `onMouseEnter` na "Genius builder vibe" tile triggeruje `import()` za HeroCl3menza + 7 lazy sekcija.
Fajlovi: `src/components/canvas/MatrixRain.tsx`, `src/components/canvas/ParticlesCanvas.tsx`, `src/components/sections/TrustSignals.tsx`

### Landing polish — završeno `[x]`
L-Activation: title-card heading scale, min-height, hero→journey connector thread.
L-Polish: portrait placeholder atmospheric treatment — radial depth, mask falloff, expanded glow.
L-Hero CTA: button authority + copy density.
L-Quote: ghost quotation mark + radial pocket on journey quote.
L-Bridge: journey→activation connector thread + top bloom.
L-Nebula: above-the-fold nebula recomposition — primary source moved center-right near portrait.
L-Mobile-Fix: portrait constraint at ≤760px, lact-pre orphan fix, tablet activation breathing room.
Files: `src/styles/landing.css` only.

### Cl3-Atmo — cl3 mode ambient fix `[x]`
Fixed broken `body.cl3menza-mode body::after` selector → `body.cl3menza-mode::after`.
Added teal radial glow behind `.hv-iframe-wrap` in cl3 mode.
Strengthened `.hv-chat` border + glow so it reads as active surface.
53/53 tests ✓ | tsc ✓ | build ✓.
Files: `src/styles/overrides.css` only.

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

---

## FAZA 5 — Landing redesign + produkciona priprema

Cilj: vizuelno uskladiti landing sa referencom, srediti tehničke dugove otkrivene u audit-u, i deployovati.

---

### Batch L-Portrait — Cinematic hero portrait `[x]`
Zamena placeholder-a pravom slikom. Cinematic fade-out mask, saturate/contrast filter, cyan glow iza leđa.
Fajlovi: `LandingHero.tsx`, `landing.css`, `public/pavle-portrait.jpg`

### Batch L-Path — SVG path refactor `[x]`
Framer Motion scroll-driven `pathLength` umesto manual RAF. Nativni SVG neonGlow/orbGlow filteri. Cyan `#00E5FF` stroke. Ghost path + 5 animiranih orbova sa scroll thresholds.
Fajlovi: `LandingPath.tsx`, `landing.css`, `LandingCards.tsx`

### Batch L-Layout — Hero layout fix `[x]`
Vračen CSS grid na `.lhero` (1fr 1fr). Uklonjene nefunkcionalne Tailwind klase iz JSX. Portrait pozicioniranje usklađeno sa referencom. Journey zona overlap sa hero-om (-200px margin).
Fajlovi: `LandingHero.tsx`, `landing.css`

---

### Batch P-Images — Optimizacija slika `[ ]`
**KRITIČNO — 15.8MB PNG → WebP.**
- Konvertovati sve 5 slika u WebP format: `card-*.png` (4x ~4MB) + `pavle-portrait.jpg`
- Dodati `srcset` i `width`/`height` atribute na `<img>` (CLS fix)
- Ciljane veličine: card slike max 400KB, portrait max 300KB
- Lighthouse Performance score direktno zavisi od ovoga
Fajlovi: `public/card-*.webp`, `public/pavle-portrait.webp`, `LandingCards.tsx`, `LandingHero.tsx`
Režim: LEAN | Rizik: nizak

### Batch P-OG — OG image `[ ]`
`og-image.png` je referenciran u `index.html` ali ne postoji u `/public/` → 404 na social share.
- Napraviti OG sliku (1200×630px) sa imenom, titulom i vizuelnim identitetom sajta
- Dodati fajl u `public/`
Fajlovi: `public/og-image.png`, `index.html` (verifikacija)
Režim: LEAN | Rizik: nizak

### Batch P-Content — Sadržaj i kredibilitet `[ ]`
Čeka Pavlov input za tekst i URL-ove.
- **Testimoniali:** Zameniti 3 placeholder quote-a pravim recenzijama klijenata (ili ukloniti sekciju)
- **Upwork/Fiverr dugmad:** Zameniti mrtve `<span>` elemente pravim `<a href="...">` linkovima sa realnim profilima
- **About copy:** Pavlova priča u About sekciji
- **System prompt konzistentnost:** "Started in 2025" vs "8 years experience" — uskladiti
Fajlovi: `Testimonials.tsx`, `LandingActivation.tsx`, `About.tsx`, `HeroCl3menza.tsx`
Režim: LEAN | Rizik: nizak

### Batch P-API — API bezbednost `[ ]`
- **CORS:** Dodati origin whitelist u `api/claude.ts` (samo cl3menza.com domena)
- **System prompt server-side:** Premestiti hardkodiran system prompt iz `HeroCl3menza.tsx` u `api/claude.ts` — klijent ne sme da šalje sistem prompt
- **Rate limiting:** Zameniti in-memory `Map` sa Upstash Redis ili Vercel Edge Middleware (in-memory ne radi na serverless)
Fajlovi: `api/claude.ts`, `HeroCl3menza.tsx`
Režim: STANDARD | Rizik: srednji (LOCK zona)

### Batch P-DeadCode — Cleanup tehničkog duga `[ ]`
- Obrisati `useMagnetic.ts` hook (no-op) i import u `App.tsx`
- Obrisati mrtve CSS klase (~200 linija): `.hv-personal*`, `.lhero-badge*`, `.lhero-portrait-cinematic` (ako nije u upotrebi), `.journey-track`, `.journey-fill`, `.journey-bloom`, `.journey-glow`, `.journey-junction-core`
- Reorganizovati `hero.css` (695 linija) — izvući `buttons.css`, `grid.css`, `chat.css` u zasebne fajlove
- Popravi `aria-hidden` bez vrednosti na `<canvas>` za particle
- Dodati `aria-label` na chat input u `HeroCl3menza.tsx`
- Fiksirati `useParallax` — ukloniti `.glow` selektor koji nema matchove u DOM-u
Fajlovi: `App.tsx`, `useMagnetic.ts`, `useParallax.ts`, `landing.css`, `hero.css`, `HeroCl3menza.tsx`
Režim: STANDARD | Rizik: nizak

### Batch P-Deploy — Push + deploy + smoke test `[ ]`
- `git add` + `git commit` svih promena iz Faze 5
- `git push origin main` → Vercel auto-deploy
- Production smoke test: OG share, chat API, cl3menza mode, mobile
- Lighthouse audit na produkciji (mobile + desktop)
Fajlovi: git operacije
Režim: LEAN | Rizik: nizak
