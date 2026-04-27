# ROADMAP.md
**cl3menza.com — Implementation Roadmap**

> Strukturiran plan implementacije VISUAL_LANGUAGE.md kroz Claude Code batch sistem.
> Svaki batch ima jasan scope, verification kriterijume, i estimated effort.

**Status:** v1.0
**Datum:** 27.04.2026
**Reference:** VISUAL_LANGUAGE.md v1.0

---

## Roadmap Filozofija

**Princip 1 — Foundation first.** Sistemi (CSS varijable, type scale, spacing tokens) idu pre featurа. Kasniji batch-evi referiraju te sisteme — ne uvode svoje.

**Princip 2 — Risk ascending.** Najmanji rizik prvo. Ako CSS varijable padnu — lako se vrati. Ako linija refactor padne — pola sajta razbijeno.

**Princip 3 — Verification per batch.** Svaki batch ima konkretnu verifikaciju u browseru pre close-a. Ne ide dalje dok prethodni nije potvrđen.

**Princip 4 — Mega-batch grupisanje.** 8 batch-eva grupisanih u 3 mega-batcha. Svaki mega-batch je smislena celina koja može da bude live deployed kao inkrement.

---

## Mega-Batch 1 — FOUNDATION (Batch 01-04)

**Cilj:** Postaviti vizuelni i sistemski temelj. Posle ovog mega-batcha, sajt vizuelno deluje drugačije ali strukturalno isto. Niko ne prepoznaje "novu funkciju," ali sve "deluje bolje."

**Estimated total effort:** 1.5-2 dana fokusiranog rada
**Tier:** STANDARD (svaki batch)

### Batch 01 — Design Tokens
**Tier:** LEAN
**Effort:** 2-3h
**Risk:** Low

#### Scope
- Update `src/styles/global.css` `:root` blok sa novim color paletom (cyan, blue, warm, bg sloj, text sloj, border sloj)
- Update font import — dodati Geist Mono ako nije već u stack-u
- Dodati spacing tokens (`--s-1` do `--s-8`)
- Dodati type scale custom properties

#### Files affected
- `src/styles/global.css`
- `src/styles/base.css`
- `index.html` (font import ako treba)

#### Verification
- Sve postojeće komponente i dalje renderuju (vizuelni regression test)
- Nove varijable dostupne u DevTools `:root`
- Font Geist Mono se učitava bez 404

#### Close criteria
Sajt izgleda 95% isto kao pre (postojeće komponente koriste stare varijable koje su sad mapped na nove vrednosti).

---

### Batch 02 — Type Scale Migration
**Tier:** STANDARD
**Effort:** 3-4h
**Risk:** Low-Medium

#### Scope
- Migrate sve heading komponente (h1, h2, h3) na nove type scale tokens
- Update H1 letter-spacing sa `-0.07em` na `-0.04em`
- Migrate body copy na `body` token (15px Inter)
- Migrate eyebrow pills na `eyebrow` token
- Audit gde se koristi mono font, ograničiti na system labels samo

#### Files affected
- `src/styles/landing.css`
- `src/styles/hero.css`
- `src/styles/chambers.css`
- `src/components/landing/LandingHero.tsx` (className updates ako treba)
- `src/components/landing/LandingCards.tsx`

#### Verification
- H1 deluje editorial, ne poster
- Body copy konzistentan kroz ceo sajt
- Mono font nigde u body copy-ju
- Vertikalni rhythm bolji (manje "guranja" elemenata)

#### Close criteria
Tipografija oseća se "rezolvirana" — nema ad-hoc font sizes-a u CSS-u.

---

### Batch 03 — Spacing System Migration
**Tier:** STANDARD
**Effort:** 3-4h
**Risk:** Medium

#### Scope
- Audit svih `padding` i `margin` vrednosti u CSS fajlovima
- Migracija na 8px-based tokens
- Section padding standardizacija (mobile/desktop)
- Card padding standardizacija
- Button heights na 8px multiples (40px, 48px, 56px)

#### Files affected
- Svi `src/styles/*.css` fajlovi

#### Verification
- Nigde u CSS-u nema padding/margin van skale (`grep` proveri za "px" vrednosti)
- Vizuelni rhythm konzistentan
- Mobile/desktop razlike čiste

#### Close criteria
Sve dimenzije dele sa 8 ili su iz token sistema.

---

### Batch 04 — Color Migration & Cleanup
**Tier:** STANDARD
**Effort:** 2-3h
**Risk:** Low

#### Scope
- Audit svih color references kroz codebase
- Replace `#5db8ff`, `#7c6dff`, `#78fff0`, `#d9b35b` sa novim varijablama
- Cyan (`#67E8F9`) ekskluzivno na: linija, junction orbovi, cl3menza brand tekst
- Blue (`#5DB8FF`) za sve UI elemente
- Warm (`#F4A261`) samo na 3 mesta (eyebrow dot, reward orb placeholder, mode prelaz placeholder)
- Brisanje violet i gold referenci

#### Files affected
- `src/styles/*.css`
- Sve komponente koje imaju inline color (`src/components/**/*.tsx`)

#### Verification
- Cyan se pojavljuje SAMO na liniji, orbovima i brand tekstu
- Nema više violet ili gold na sajtu
- Eyebrow pulse dot je topao (`#F4A261`)

#### Close criteria
Color audit prošao — `grep` za stare hex vrednosti vraća 0 rezultata.

---

**Mega-Batch 1 Verification (live deploy candidate):**
- Vizuelni "feel" sajta osetno bolji
- Tipografija konzistentna
- Spacing rhythm uredan
- Boje konzistentne i intencionalne
- Sve postojeće funkcionalnosti rade

**Deploy decision:** Da, posle Mega-Batch 1 sajt može da ide na staging.

---

## Mega-Batch 2 — INTERACTION & ATMOSPHERE (Batch 05-08)

**Cilj:** Dodati novu interaktivnost i atmosferu. Posle ovog mega-batcha, sajt prelazi iz "deluje bolje" u "ovo nije običan portfolio."

**Estimated total effort:** 2-3 dana fokusiranog rada
**Tier:** STRICT za većinu (custom cursor, magnetic, refactori)

### Batch 05 — Custom Cursor System
**Tier:** STRICT
**Effort:** 4-5h
**Risk:** Medium

#### Scope
- Nova komponenta `src/components/system/CustomCursor.tsx`
- Mali krug (12px) prati miš sa spring delay
- Glow shadow effect
- Context-aware shape changes:
  - Default: blue dot
  - CTA hover: scale 1.6 + intenzivniji glow
  - Portrait hover: dodaje `+` simbol
  - Reward orb hover: scale 0.8 + warm glow
- Disabled na `@media (pointer: coarse)` (touch devices)
- Disabled za reduced motion users (`prefers-reduced-motion`)

#### Files affected
- `src/components/system/CustomCursor.tsx` (nov)
- `src/App.tsx` (mount globalno)
- `src/styles/cursor.css` (nov)
- Cursor `none` na body kad je custom aktivan

#### Verification
- Cursor smooth prati miš sa minimalnim lag-om
- Hover states rade na CTA, portrait, orb
- Touch uređaji ne vide custom cursor
- Reduced motion koristi default cursor

#### Close criteria
Custom cursor radi besprekorno na desktop-u, gracefully degraduje na touch.

---

### Batch 06 — Magnetic CTAs
**Tier:** STANDARD
**Effort:** 2-3h
**Risk:** Low

#### Scope
- Implementirati magnetic hover na "Step Inside" i drugim primary CTA-ima
- Framer Motion `useMotionValue` + `useSpring`
- 60px radius detection
- Maximum displacement 12px
- Spring config: `{ stiffness: 150, damping: 15 }`

#### Files affected
- `src/components/system/MagneticButton.tsx` (nov, wrapper komponenta)
- `src/components/landing/LandingActivation.tsx` (koristi MagneticButton)

#### Verification
- "Step Inside" se privlači prema kursoru kad miš priđe
- Vraća se smooth na originalnu poziciju kad miš ode
- Ne radi na touch (nema hover)

#### Close criteria
Mikrointerakcija oseća se prirodno, ne over-engineered.

---

### Batch 07 — Starfield Refactor
**Tier:** STRICT
**Effort:** 4-5h
**Risk:** Medium-High (canvas performance)

#### Scope
- Refactor `StarfieldCanvas.tsx`
- Tri sloja zvezda (Far/Mid/Near) sa različitim brzinama, veličinama, brightness
- Brightness varijacija (5-6 accent stars sa povremenim treptanjem)
- Sporiji drift (Far statične, Mid vrlo spore, Near spore-vidljive)
- Mobile optimizacija — 60% manje, bez drift, samo trepnja
- Performance: requestAnimationFrame throttling, off-screen culling

#### Files affected
- `src/components/canvas/StarfieldCanvas.tsx`

#### Verification
- 60fps na desktop-u
- 60fps na mid-range mobile
- Vizuelno daje dubinu (parallax osećaj bez scroll handling-a)
- Accent stars trepnu primetno ali ne distracting

#### Close criteria
Starfield deluje kao stvarno duboko nebo, ne kao TV šum.

---

### Batch 08 — Atmospheric Cleanup (Landing vs Cl3 podela)
**Tier:** STANDARD
**Effort:** 2-3h
**Risk:** Low-Medium

#### Scope
- Brisanje sa landing-a: scanlines, noise overlay, 72px grid, particles canvas, residue tačkice
- Premestiti te elemente u cl3 mode komponente
- Zadržati na landing-u: starfield (refactored), jedan ambient gradient, vignette, custom cursor
- Cl3 mode dobija scanlines + grid + noise + particles

#### Files affected
- `src/components/landing/LandingBackground.tsx`
- `src/styles/landing.css`
- `src/styles/chambers.css`
- `src/components/cl3/Cl3Background.tsx` (možda nov, ili ekstenzija postojeće)

#### Verification
- Landing oseća se "lakše" — manje vizuelnih slojeva
- Cl3 mode oseća se "teže" — više slojeva, atmosferski
- Razlika između dva sloja jasna

#### Close criteria
"Step Inside" prelaz oseća se kao prelazak iz čistog prostora u atmosfersku gustinu.

---

**Mega-Batch 2 Verification (live deploy candidate):**
- Custom cursor + magnetic CTA daju "premium feel"
- Starfield ima dubinu
- Landing/Cl3 razlika jasna
- Performance solidan na svim uređajima

**Deploy decision:** Da, posle Mega-Batch 2 sajt je već daleko od trenutnog stanja.

---

## Mega-Batch 3 — NARRATIVE & SIGNATURE (Batch 09-12)

**Cilj:** Posle ovog mega-batcha, sajt ima dušu. Linija je tvoja priča. Reward sistem skriven. Contact ima karakter. TheBuild radi bez screenshot-a.

**Estimated total effort:** 3-4 dana fokusiranog rada
**Tier:** STRICT za većinu

### Batch 09 — Journey Linija Refactor (story-mapped + new motion)
**Tier:** STRICT
**Effort:** 5-6h
**Risk:** High (centralna komponenta)

#### Scope
- Prepisati `PATH_D` SVG path sa story-mapped krivinama (4 tačke priče)
- Pivot segment najduži vertikalno (7 godina drift dramaturgija)
- Stroke width varijacija duž patha (0.8px → 2px → 1px)
- Glow diferencijacija (linija stdDeviation 2, orbovi sopstveni 8)
- Scroll-driven `pathLength` animacija
- Scroll-driven opacity (0.4 → 0.9 → 0.6)
- Boja update na novi `#67E8F9`
- Comeback orb malo veći radius + intenzivniji glow

#### Files affected
- `src/components/landing/LandingPath.tsx`
- `src/styles/landing.css` (path-related)

#### Verification
- Linija se "crta" kako scroll napreduje
- 4 tačke jasno vidljive sa orbovima
- Pivot segment "diše dugo" — daje dramaturgiju
- Stroke varijacija primetna ali ne distracting
- Orbovi pulsiraju kao energy nodes

#### Close criteria
Linija deluje kao vizuelizacija stvarne priče, ne geometrijski uzorak.

---

### Batch 10 — Cards Surgery (40-word limit + animation)
**Tier:** STANDARD
**Effort:** 3-4h
**Risk:** Medium

#### Scope
- Skratiti tekst svake kartice na max 40 reči
- Originalni tekst migrirati u TheBuild content reserve (za batch 11)
- Pojačati ulaz animaciju: `x: ±40px` umesto `±18px`
- Dodati `scale: 0.6 → 1` na orb pojavi
- Verify glass overlay i right-edge wash i dalje rade
- Hover state: border `--border-cyan`

#### Files affected
- `src/components/landing/LandingCards.tsx`
- `src/styles/landing.css` (card styles)
- `src/data/journey.ts` (text content, ako postoji)

#### Verification
- Svaka kartica je "headline + 2-3 rečenice"
- Ulaz primetan (ne lagan kao pre)
- Orb pali kad scroll dostigne
- Originalni tekst sačuvan za TheBuild

#### Close criteria
Kartice rade kao teaser, TheBuild radi kao detail expansion.

---

### Batch 11 — TheBuild Architecture Flow
**Tier:** STRICT
**Effort:** 5-6h
**Risk:** Medium-High (nova komponenta)

#### Scope
- Brisanje praznog frame placeholder-a
- Nova `BuildArchitectureFlow.tsx` komponenta
- Animated node sequence: `React 19 → Vite → TypeScript → Supabase → Bankart → Telegram Bot → Vercel`
- Stagger animacija pri scroll
- Connector lines kao animated dashes (drawn na scroll)
- Hover na node — pill border `--border-cyan`, tooltip sa tech detail
- Originalni Padrino tekst (iz Batch 10 reserve) ide ispod kao body copy
- Stat strip: "10 nedelja od prvog VS Code-a do live produkcije"

#### Files affected
- `src/components/cl3/BuildArchitectureFlow.tsx` (nov)
- `src/components/cl3/TheBuild.tsx`
- `src/data/projects.ts` (Padrino tech stack data)

#### Verification
- Flow se animira na scroll
- Nodes su čitki, hover radi
- Originalni Padrino tekst i dalje dostupan, ali kao podrška, ne primary
- Stat broj "10 nedelja" istaknut

#### Close criteria
TheBuild više nije placeholder — funkcionalna i karakterna sekcija dok screenshot ne stigne.

---

### Batch 12 — Contact Terminal Treatment + Reward System v1
**Tier:** STRICT
**Effort:** 4-5h
**Risk:** Medium

#### Scope

**Contact:**
- Brisanje "Let's build something serious" centered + email button layout
- Novi terminal-style contact:
  ```
  > signal received.
  > initiating contact protocol...
  > hello@cl3menza.com _
  ```
- Cursor blink animacija
- Klik na email otvara mail client
- Ispod: `Response time: < 24h` i `Available for: local clients · Upwork · Fiverr` u mono fontu

**Reward System v1:**
- 2-3 inicijalne reward lokacije:
  1. Hover-only orb iza portrait-a (10% popust)
  2. Skrivena reč u TheBuild copy-ju koja postaje CTA na hover (20% popust)
  3. Long-press na cl3menza brand tekst u Arrival sekciji (high-priority ticket)
- Reward orb komponenta sa warm `#F4A261` boja
- Discovery animacija: scale `0 → 1.2 → 1` elastic
- localStorage persistence
- Reward popup/notification sa kodom za korišćenje

**Mode prelaz warm flash:**
- Dodati warm `#F4A261` flash u sredini fragment glitch animacije
- 5min posla, ali kompletira "topla iskra" princip

#### Files affected
- `src/components/landing/LandingContact.tsx` (refactor)
- `src/components/system/RewardOrb.tsx` (nov)
- `src/components/system/RewardNotification.tsx` (nov)
- `src/lib/rewards.ts` (logic, localStorage)
- `src/components/transition/ModeTransition.tsx` (warm flash)

#### Verification
- Contact deluje kao deo cl3menza identity-ja, ne generic freelancer kontakt
- 3 reward lokacije rade i otključavaju kodove
- localStorage čuva discovered rewards
- Mode prelaz ima topli moment

#### Close criteria
Sajt ima "potpis" — Contact karakter + reward magic.

---

**Mega-Batch 3 Verification (final v1.0 launch candidate):**
- Sajt ima jedinstveni karakter
- Linija je priča
- TheBuild radi bez screenshot-a
- Contact ima dušu
- Reward sistem skriven i funkcionalan
- Sve top-tier elementi implementirani

**Deploy decision:** Da, ovo je v1.0 launch candidate — domain `cl3menza.com` se kupuje pred ovaj deploy.

---

## v2 Backlog (post-launch)

Ovo NE ulazi u inicijalni roadmap. Implementacija nakon što v1.0 ide live i dobija prve klijente.

### Batch v2.01 — Sound Design (Web Audio API)
- Whoosh pri terminal boot
- Blip pri reward orb discovery
- Click pri magnetic CTA hover
- Muted toggle u corneru, default off

### Batch v2.02 — Cinematic Mode Prelaz
- Particle kondenzacija sequence (linija → particles → tačka → eksplozija)
- Full 2s cinematic moment

### Batch v2.03 — Reward System Expansion
- 5+ dodatnih lokacija
- Konami code sequence
- Rotacija lokacija periodično

### Batch v2.04 — Internationalization
- Engleska + srpska verzija toggle
- Lokalizovan copy za oba jezika

### Batch v2.05 — Project Case Study Templates
- Pasta Bar 2x2 case study
- Template za buduće projekte
- Live screenshots integracija

---

## Workflow Per Batch

**Tooling stack:**
- **Claude (web/desktop app)** — planner & strateg. Donosi se ovde za scope refinement, decisions, blockers.
- **Claude Code** — executor. Radi konkretne fajlove po batch scope-u.
- **Pavle** — vlasnik, donosilac odluka, verifikator.

### Pre-batch
1. Pavle reviews batch scope u ROADMAP.md
2. Claude (web/desktop) generiše konkretne TODO items + acceptance criteria za batch
3. STATE.md update sa current batch
4. Tier confirmation (LEAN/STANDARD/STRICT)

### During batch
1. Claude Code executor radi po TODO items
2. Verification steps po kompletiranju svake komponente
3. Ako se javi blokirajući problem ili scope question —

### Verification Truth Model
Per batch close: "Da li ovo izgleda i radi kako VISUAL_LANGUAGE.md propisuje?"
Ako odgovor nije čisto da — batch nije closed.

---

## Effort Summary

| Mega-Batch | Batches | Effort (hours) | Effort (days @ 6h focus) |
|---|---|---|---|
| Mega-Batch 1 (Foundation) | 4 | 10-14h | 2-2.5 dana |
| Mega-Batch 2 (Interaction & Atmosphere) | 4 | 12-16h | 2-3 dana |
| Mega-Batch 3 (Narrative & Signature) | 4 | 17-21h | 3-3.5 dana |
| **Total v1.0** | **12** | **39-51h** | **7-9 dana** |
| v2 Backlog | 5 | TBD | post-launch |

**Realistic timeline:** 2-3 nedelje od početka do v1.0 launch-a, sa pauzama, life, i drugim projektima.

---

## Risk Register

| Risk | Mitigation |
|---|---|
| Custom cursor performance issues | Throttle requestAnimationFrame, disable na low-end devices |
| Linija refactor breaks postojeću animaciju | Backup branch pre Batch 09, verification per stroke change |
| Type scale migration regression | Visual regression test per batch, screenshot diffing |
| Mobile performance pad sa novim atmospherics | Performance budget per batch, Lighthouse score gate |
| Reward sistem complexity creep | v1 strictly 3 lokacije, expansion u v2 |

---

## Decision Authority

| Decision Type | Authority |
|---|---|
| Visual language changes | Pavle (sa Opus consultation) |
| Implementation approach | Claude Code (po VISUAL_LANGUAGE.md) |
| Batch reordering | ChatGPT planner (sa Pavle approval) |
| Scope expansion mid-batch | Pavle (require ChatGPT planner update) |
| Tier downgrade (STRICT → STANDARD) | Pavle only |

---

**Kraj dokumenta. Lock v1.0.**

Reference: VISUAL_LANGUAGE.md v1.0
Following: STATE.md updates per batch
