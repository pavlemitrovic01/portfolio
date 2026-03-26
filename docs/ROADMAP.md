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

---

## FAZA 2 — Stabilnost, zaštita, infrastruktura

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
Konfiguriši GA4 sa pravim ID-om ili ukloni placeholder script.
Dodaj `sitemap.xml`, `robots.txt`.
Favicon set (16, 32, 180, 192, 512) + `site.webmanifest`.
Proveri OG image rendering na social share.
Fajlovi: `index.html`, `public/`
Režim: STANDARD | Rizik: srednji

### Batch 9 — Accessibility audit `[x]`
ARIA landmarks na svim sekcijama.
Keyboard navigacija kroz mode switch (cl3menza ulaz/izlaz).
Focus management pri mode tranziciji.
Color contrast provera (tamna tema + muted tekst).
Skip-to-content link.
Fajlovi: `Header.tsx`, `App.tsx`, `Layout.tsx`, sekcije
Režim: STANDARD | Rizik: nizak

### Batch 10 — Performance: lazy load i code split `[x]`
`React.lazy` + `Suspense` za cl3menza sekcije (Systems, Projects, Flagship, Anatomy, Process, Stack, Testimonials).
Lazy load HeroCl3menza (iframe + AI chat).
Fajlovi: `App.tsx`, `Hero.tsx`
Režim: STANDARD | Rizik: srednji (LOCK zona)
Verifikacija: prod build potvrđuje 9 odvojenih chunk-ova; `index.js` ne sadrži nijedan cl3menza modul.
Chunk mapa: `HeroCl3menza` 7.35kB · `AnatomyOfBuild` 5.09kB · `Flagship` 4.14kB · ostali 1.6–2.3kB each.

### Batch 11 — CSS modularizacija `[x]`
global.css (1823L) → base.css (92L) + layout.css (140L) + hero.css (553L) + overrides.css (808L) + sections.css (230L).
global.css postaje orkestrator sa 5 @import linija. main.tsx nepromenjen.
Fajlovi: `src/styles/`
Režim: STANDARD | Rizik: srednji

---

## FAZA 3 — Sadržaj i Polish

### Batch 12 — Sadržaj: placeholder popunjavanje `[~]`
12A zatvoren: About neutralni bio, Contact Upwork/Fiverr → non-interactive span, Projects fake kartice uklonjene.
12B pending: finalni About copy + pravi Upwork/Fiverr URL-ovi (čeka Pavle's input).
Fajlovi: `About.tsx`, `Contact.tsx`
Režim: LEAN | Rizik: nizak

### Batch 13 — Testimonials: real ili remove `[defer]`
Realne recenzije trenutno nisu dostupne. Sekcija ostaje u kodu, popunjava se naknadno.
Fajlovi: `Testimonials.tsx`
Režim: LEAN | Rizik: nizak

### Batch 15A — QA audit `[x]`
Lighthouse mobile: Perf 62 / A11y 98 / Best Practices 100 / SEO 100.
TBT 1,370ms (Framer Motion), FCP 2.7s, LCP 3.0s, CLS 0.
Render-blocking Google Fonts: 813ms. Heading order invalid (h3 pre h2 u timeline).
Firefox: not verified (nije dostupan u okruženju).
Findings → Batch 14 targeted fixes.

### Batch 14 — Targeted fixes (iz QA) `[x]`
1. Google Fonts: preload/onload non-blocking pattern — eliminisano 813ms render-blocking
2. HeroNormal.tsx: h3.timeline-title → p.timeline-title — heading order FAIL→PASS
Lighthouse delta: Perf 62→76, A11y 98→100, TBT 1370ms→420ms
Fajlovi: `index.html`, `HeroNormal.tsx`
Režim: LEAN | Rizik: nizak

### Batch 15B — Production gap audit `[x]`
Production bio na b675f643 (12 commit-a iza lokalnog HEAD-a). Smoke na starom production aliasu.
Confirmed: cl3menza.com = ECONNREFUSED (domena nije vezana za Vercel).

### Batch 15C — Push / deploy latest commits `[x]`
git push origin main → b675f64..f2fc700 (12 commit-a).
Vercel auto-deploy triggerovan, READY za ~15s. Production = local HEAD.

### Batch 15D — Final production smoke test `[x]`
Manual browser smoke (Edge) na https://portfolio-seven-eosin-21.vercel.app
- header/nav, normal hero, cl3 switch, projects, contact, footer: ✅ sve OK
- console: 0 errors | network: 0 failed requests
- font fix, heading fix, content batch 12A: ✅ sve potvrđeno vizuelno
- Testimonials placeholder: ℹ️ vidljiv, expected (Batch 13 deferred)
- Firefox: not verified (nije dostupan u okruženju)

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
