# MEGA 1 — Visual Engine

**Status: COMPLETE**
**Datum: 2026-04-11**

---

## Šta je urađeno

### LandingPath.tsx — 7-layer beam
- Layer 5: Carrier haze (`#0d3a6b`, 50px, stdDev 15, opacity 0.09)
- Layer 4: Outer aura (`#1a6baa`, 28px, stdDev 13, opacity 0.22)
- Layer 3: Inner glow (`#00E5FF`, 14px, stdDev 9, opacity 0.45)
- Layer 2: Core ribbon (`#00E5FF`, 6px, stdDev 4.5, opacity 0.78)
- Layer 1: White-hot spine (`#E8F9FF`, 2.5px, stdDev 1.5, opacity 0.90)
- Ghost guide: beli trace, opacity 0.05 (bez animacije)

### Filamenti
- 2 offset paths (±12px X od main path)
- Segmentni `strokeDasharray` (ne pathLength — izbegnuta kolizija sa Framer Motion)
- Opacity-driven fade: 0→0.14 i 0→0.11 tokom prva 30% scrolla

### Cosmic residue
- 18 SVG circles distribuiranih duž path-a
- CSS `beam-residue-flicker` animacija (3.5s alternate)
- Negativni `animationDelay` po čestici — prirodna varijacija od starta
- Isključeni kada `prefers-reduced-motion` (conditional render + CSS fallback)

### Orb Faza A (3-layer struktura)
- Outer bloom: `#0a4a8a`, r=32, stdDev 12, bloom opacity transform (0→0.28)
- Inner halo: `#00E5FF`, r=15, stdDev 6, tied na `orbProgress`
- White-hot center: `#FFFFFF`, r=4, stdDev 2.5, scale + opacity tied na `orbProgress`
- Bloom transforms pre-computed kao zasebne hook deklaracije (React rules compliance)

### StarfieldCanvas.tsx (nova komponenta)
- Canvas-based: 60–100 zvezda, varijabilne veličine (0.4–1.8px) i opacitnosti
- 9 bright accent stars sa radial micro-glow
- Breathing animacija ~30fps, Page Visibility API pause
- `prefers-reduced-motion`: breathing = 0 (zvezde statične)

### LandingBackground.tsx
- Zamenjeni CSS dots/grid sa `StarfieldCanvas`
- Zadržani: nebula, depth, zones, vignette

### landing.css
- `.starfield-canvas` — `position: absolute; top: 0; height: 100vh`
- `@keyframes beam-residue-flicker`
- `.beam-residue { animation: none }` dodat u `prefers-reduced-motion` blok
- Uklonjen `.landing-bg-dots` i `.landing-bg-grid`

---

## Šta je provereno

- TypeCheck: čist (0 grešaka)
- Tests: 57/57 zeleno
- Build: čist, 1.41s
- Mobile fallback: `journey-svg` i `.journey-junction` su `display: none` ispod 1080px (pre-existing CSS, nije polomljeno)
- Reduced-motion: filamenti i residue ne renderuju se (`!reduceMotion` conditional), StarfieldCanvas bez breathing, CSS fallback dodat
- Vizuelno (desktop 1440px): beam ima layere, orbovi imaju bloom+halo+center, starfield aktivan, kartice se reveal-uju

---

## Šta je popravljano tokom batch-a

- `fetchpriority` → `fetchPriority` (React camelCase, console error fix)
- `beam-residue` dodat u `prefers-reduced-motion` CSS blok

---

## Napomene

- Filamenti koriste opacity-driven pristup (ne pathLength) — jedini način da `strokeDasharray` ostane netaknut
- Bloom opacity transforms moraju biti pre-computed zasebno (ne u loopu) zbog React hooks pravila
- Performance: max stdDeviation 15 po svim beam filterima (per Creative Bible spec)
- Particles: 18 residue dots (unutar specifikovanog 15-25 opsega)
