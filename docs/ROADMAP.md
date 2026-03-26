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

### Batch 14 — Targeted fixes (iz QA) `[ ]`
1. `preconnect` + `font-display: swap` za Google Fonts → ~800ms FCP gain
2. Heading order fix u Hero timeline (h3 → semantic) → A11y 98→100
Fajlovi: `index.html`, `Hero.tsx`
Režim: LEAN | Rizik: nizak

### Batch 15B — Final QA i deploy verifikacija `[ ]`
Re-run Lighthouse post Batch 14 fixes.
Vercel deployment smoke test.
Cross-browser: Chrome + Edge (Firefox pending).
Fajlovi: build config, `vercel.json`
Režim: STANDARD | Rizik: nizak
