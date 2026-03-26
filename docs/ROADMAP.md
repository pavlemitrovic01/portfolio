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

### Batch 11 — CSS modularizacija `[ ]`
Razbij `global.css` (1813 linija) u logičke module: `base.css`, `layout.css`, `sections.css`, `animations.css`.
Ili prelaz na CSS modules per-component.
Cilj: održivost, ne redesign.
Fajlovi: `src/styles/`, component fajlovi
Režim: STANDARD | Rizik: srednji

---

## FAZA 3 — Sadržaj i Polish

### Batch 12 — Sadržaj: placeholder popunjavanje `[ ]`
About.tsx: realan Pavle's story.
Contact.tsx: pravi Upwork/Fiverr URL-ovi.
Projects.tsx: realni projekti ili smanjenje grida na 1 (Padrino).
Fajlovi: `About.tsx`, `Contact.tsx`, `Projects.tsx`
Režim: LEAN | Rizik: nizak

### Batch 13 — Testimonials: real ili remove `[ ]`
Ako postoje realne recenzije → ubaci ih.
Ako ne → sakrij sekciju iz renderovanja (bolje ništa nego fake).
Fajlovi: `Testimonials.tsx`, `App.tsx`
Režim: LEAN | Rizik: nizak

### Batch 14 — UI polish final pass `[ ]`
Micro-interakcije, hover stanja, transition timing.
Mobile edge-case provera na više uređaja.
Dark theme doslednost (contrast, readability).
Fajlovi: `global.css`, komponente po potrebi
Režim: STANDARD | Rizik: nizak

### Batch 15 — Final QA i deploy verifikacija `[ ]`
Full Lighthouse audit (Performance, A11y, SEO, Best Practices).
Cross-browser test (Chrome, Firefox, Safari, Edge).
Production build verifikacija.
Vercel deployment smoke test.
Fajlovi: build config, `vercel.json`
Režim: STANDARD | Rizik: nizak
