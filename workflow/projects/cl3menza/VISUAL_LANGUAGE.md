# VISUAL_LANGUAGE.md
**cl3menza.com — Premium Product Engineer Portfolio**

> Izvor istine za sve vizuelne odluke u rekonstrukciji portfolia.
> Sve buduće Claude Code batch-eve referiraju ovaj dokument.

**Status:** v1.0 — locked
**Datum:** 27.04.2026
**Vlasnik:** Pavle Mitrović (cl3menza)

---

## 0. Centralna napetost

Portfolio je dvoslojni:

- **Landing (Pavle)** — suzdržan, čist, tipografski-vođen. Heynesh DNA. Govori "ovde radi neko ozbiljan, ima nešto ispod."
- **cl3menza mode** — cinematic, atmosferski, system-thinker jezik. Wearebrand DNA. Druga planeta.

Cosmic estetika je **metafora za prelaz**, ne konstantni dekor. Ako je svuda cosmic, prelaz nestaje.

**Centralni vizuelni motiv:** **orb.** Pojavljuje se na liniji u journey zoni kao junction point. Transformiše se u custom cursor pri ulasku u cl3 mode. Posetilac postaje deo sistema koji je gledao izvana.

---

## 1. Color Palette

### Primarni paleta

| Varijabla | Hex | Uloga | Pravilo korišćenja |
|---|---|---|---|
| `--cyan` | `#67E8F9` | Linija, junction orbovi, cl3menza brand tekst, custom cursor u cl3 modu | **EKSKLUZIVNO** za ovih 4 elementa. Nikad za UI. |
| `--blue` | `#5DB8FF` | CTA, borders, links, ikone, focus states, UI elementi | Generalni accent za sve interakcije |
| `--warm` | `#F4A261` | Reward orb, eyebrow pulse dot, mode prelaz flash | **MAKSIMALNO 3 pojave** na celom sajtu. Topla iskra, ne dekoracija. |

### Background sloj

| Varijabla | Hex | Uloga |
|---|---|---|
| `--bg` | `#06070A` | Background base — landing |
| `--bg-2` | `#0B0E14` | Background elevated, cl3 mode base |
| `--bg-3` | `#101622` | Surface elevated — cards, panels |

### Text sloj

| Varijabla | Hex | Uloga |
|---|---|---|
| `--text` | `#F5F7FB` | Primary text |
| `--text-2` | `#C8CFDC` | Secondary, body emphasis |
| `--muted` | `#98A2B3` | Captions, eyebrow text, mono labels |
| `--dim` | `#5B6473` | Disabled, footnotes |

### Border sloj

| Varijabla | Vrednost | Uloga |
|---|---|---|
| `--border` | `rgba(255,255,255,0.06)` | Default tihi border |
| `--border-s` | `rgba(255,255,255,0.12)` | Hover/emphasized border |
| `--border-cyan` | `rgba(103,232,249,0.18)` | Cyan accent border |
| `--border-blue` | `rgba(93,184,255,0.24)` | Blue CTA border |

### Izbačeno

- `#7C6DFF` violet — razbija fokus, drugi cool accent slabi cyan
- `#D9B35B` gold — dekorativan luksuz vibe, ne odgovara tonu
- `#78FFF0` electric mint — previše zeleno, gaming/hacker estetika

### Warm accent — gde se koristi (3 mesta, nigde više)

1. **Eyebrow pulse dot** na hero-u — subtilno disanje
2. **Reward orb** (10/20% popust easter egg) — diferencira od cyan junction orbova, vizuelno govori "ovo je drugačije"
3. **Mode prelaz fragment glitch** — topli flash u sredini animacije pre nego što cyan preuzme. Daje dramaturški kontrast pri prelazu.

---

## 2. Tipografija

### Font stack

| Tip | Font | Upotreba |
|---|---|---|
| **Display & Headings** | Space Grotesk | Headlines, eyebrow pills, brand tekst, card titles |
| **Body** | Inter | Body copy, sub copy, opisi, paragraf tekst |
| **Mono** | Geist Mono (fallback `monospace`) | `STATE.md` style labele, stack nazive, timestamps, terminal strings, system labels |

### Type scale (kompletna)

| Token | Size | Font | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `display` | `clamp(3rem, 8vw, 8rem)` | Space Grotesk | 600 | 0.92 | -0.04em |
| `h1` | `clamp(2.5rem, 5vw, 4.5rem)` | Space Grotesk | 600 | 0.95 | -0.04em |
| `h2` | `clamp(1.75rem, 3.5vw, 2.5rem)` | Space Grotesk | 600 | 1.05 | -0.03em |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Space Grotesk | 500 | 1.2 | -0.02em |
| `eyebrow` | `13px` | Space Grotesk | 500 | 1 | 0.04em |
| `body-lg` | `17px` | Inter | 400 | 1.7 | -0.01em |
| `body` | `15px` | Inter | 400 | 1.65 | 0 |
| `caption` | `13px` | Inter | 400 | 1.5 | 0 |
| `mono` | `13px` | Geist Mono | 400 | 1.5 | 0.03em |
| `mono-sm` | `11px` | Geist Mono | 500 | 1.4 | 0.06em |

### Pravila

- **H1 letter-spacing promenjen** sa `-0.07em` na `-0.04em`. Razlog: editorial osećaj umesto poster osećaja. Heynesh DNA.
- **Display rezervisan** za hero brand naziv "Pavle Mitrović" i Arrival "cl3menza" tekst. Nigde drugde.
- **Mono nikad za body copy.** Samo za tehničke labele — `STATE.md → CLAUDE.md → batch:STRICT`, timestamps, terminal stringovi.
- **Italic skoro nikad** — koristi se za citate i jednu reč emfaze, ne za naglašavanje.

---

## 3. Spacing System

8px base unit. Sve dimenzije se dele sa 8.

| Token | Vrednost | Tipična upotreba |
|---|---|---|
| `--s-1` | `8px` | Tight gaps, icon margins |
| `--s-2` | `16px` | Default element gaps |
| `--s-3` | `24px` | Card padding, section internal |
| `--s-4` | `40px` | Block separation |
| `--s-5` | `64px` | Sub-section gaps |
| `--s-6` | `96px` | Section padding (mobile) |
| `--s-7` | `144px` | Section padding (desktop) |
| `--s-8` | `200px` | Major section breaks |

### Section vertical rhythm

```
section-y-sm:    96px / 144px   (utility sections)
section-y-md:    144px / 200px  (default content sections)
section-y-lg:    200px / 280px  (hero, journey, activation)
```

### Pravilo

**Nikad** ne koristi `padding: 47px` ili bilo koju dimenziju van skale. Premium sajt nikad ne koristi proizvoljne brojeve.

---

## 4. Motion Principles

### Globalna pravila

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` za sve UI prelaze (Apple-style smooth out)
- **Duration cap:** ništa ne traje duže od `0.7s`. Iznad toga = animacija radi animacije.
- **Stagger default:** `0.07s` između serijskih elemenata (kartice, list items)

### Specifične animacije

#### Hero ulaz
```
staggerChildren: 0.07
duration: 0.55
ease: [0.22, 1, 0.36, 1]
```

#### Kartice ulaz (journey)
```
x: ±40px → 0    (POJAČANO sa ±18px — bilo neprimetno)
opacity: 0 → 1
duration: 0.65
ease: [0.22, 1, 0.36, 1]
```

#### Junction orbovi
```
opacity: 0 → 1
scale: 0.6 → 1   (NOVO — orb "pali" kad ga scroll dostigne)
duration: 0.4
```

#### Magnetic CTA (NOVO)
- "Step Inside" dugme se privlači prema kursoru na 60px radijusu
- Implementacija: Framer Motion `useMotionValue` + `useSpring`
- Spring config: `{ stiffness: 150, damping: 15 }`
- Maximum displacement: `12px` u smeru kursora

#### Custom cursor (NOVO)
- Mali krug, 12px diameter
- Glow: `box-shadow: 0 0 12px rgba(103,232,249,0.4)`
- Boja varira po kontekstu:
  - Default landing: `#5DB8FF` (blue accent)
  - Cl3 mode: `#67E8F9` (cyan, tip orba) — **TRANSFORMACIJA**
- Shape varira na hover:
  - CTA elements: scale 1.6, glow intenzivnije
  - Portrait: dodaje `+` simbol u centru
  - Reward orb hover: scale 0.8, warm glow
- Disabled na `@media (pointer: coarse)` — touch uređaji

### Linija — scroll-driven motion

- **Stroke width:** varira duž patha
  - Start: `0.8px`
  - Sredina: `2px`
  - Kraj: `1px`
  - Kreira osećaj "disanja"
- **Opacity:** scroll-driven
  - Vrh viewporta: `0.4`
  - Sredina (active zone): `0.9`
  - Dno: `0.6`
- **Glow diferencijacija:**
  - Glavna linija: `feGaussianBlur stdDeviation: 2`
  - Orbovi (svaki sopstveni glow): `stdDeviation: 8`
- **Scroll-driven `pathLength`** — linija se "crta" kako scroll napreduje, ne pojavljuje odjednom

---

## 5. Atmospheric Elements

### Landing (Pavle layer) — zadrži

- **Starfield canvas** (refactored — videti sekciju 9)
- **Jedan ambient nebula gradient** — radial, vrlo tih, max opacity 0.06
- **Vignette** — radial gradient od edges, transparent → `rgba(6,7,10,0.7)`
- **Custom cursor** sa glow-om

### Cl3menza mode — dobija

- **Scanlines** (prebačeno sa landing-a)
- **Noise overlay** (prebačeno)
- **72px grid** sa mask fade (prebačeno)
- **Particles canvas** (prebačeno)
- **Matrix rain** — već postoji, ostaje za prelaz i jedan trenutak u Arrival
- **Scroll-progress glow** — tih cyan trag duž levog edge-a kako scroll napreduje

### Izbačeno zauvek

- 18 residue tačkice uz liniju (vizuelno smetanje)
- Fragment glitch overlay van mode prelaza
- Bilo kakav noise/scanlines na landing layeru

---

## 6. Transformation Rules (NOVO — kritično)

**Šta vezuje landing i cl3 mode u jedno iskustvo.** Ne samo terminal prelaz — vizuelni motivi koji se transformišu.

### Orb → Cursor transformacija

| Stanje | Vizuelni element |
|---|---|
| Landing | Junction orbovi sede na liniji u journey zoni (cyan, glow) |
| Mode prelaz | Linija fragmentuje, particles lete u centar, kondenzuju se u jednu tačku |
| Cl3 mode | Custom cursor postaje cyan orb sa identičnim glow-om kao junction orbovi |

**Posetilac ne mora svesno da prati.** Mozak prepoznaje da je isti vizuelni jezik — postao je deo sistema koji je gledao izvana.

### Tipografska transformacija

| Stanje | Brand tekst |
|---|---|
| Landing | "Pavle Mitrović / **cl3menza**" — cyan deo je samo accent reč |
| Arrival (cl3 mode) | "**cl3menza**" — full screen, display size, cyan dominira |

Ista reč, ali u cl3 modu preuzima ceo prostor. Identitet se otkriva.

### Linija → Path transformacija

| Stanje | Forma |
|---|---|
| Landing journey | SVG linija sa orbovima, story-mapped krivinama |
| Mode prelaz | Linija se ne briše — fragmentuje u particles |
| Cl3 mode | Particles se preraspoređuju kao subtle background drift |

Energija linije se nikad ne gubi — preraspoređuje se.

---

## 7. Journey Path — Story-Mapped Geometry

**Linija nije matematička S-kriva. Svaka krivina predstavlja konkretan period.**

### 4 tačke priče

| Tačka | Period | Vizuelni karakter krivine |
|---|---|---|
| **Origin** | 2012 (11 god) — CS server admin, plugins | Početak gore. Oštra, kratka krivina — dete nagle upalo u sistem. |
| **Pivot** | 2019 — kraj srednje, kuvanje, recruiting | Krivina se izravnava, ide skoro horizontalno, **traje dugo** (vertikalno se proteže preko najveće dužine viewporta). 7 godina drift-a se vizuelno prikazuje kao linija koja se odbija da se vrati gore. |
| **Comeback** | Januar 2026 — otkaz, prvi VS Code | Naglo penjanje. Linija dobija energiju. Krivina se zaokreće naglo iz pada u uspon. |
| **Now** | 10 nedelja kasnije — Padrino live, pipeline raste | Stabilan ushodeći put. Manje dramatičan ali konsistentan. |

### Implementacija

- `PATH_D` SVG konstanta se prepisuje sa story-mapped krivinama
- 4 tačke priče = 4 junction orba na inflection tačkama
- "Pivot → Comeback" segment — najduži vertikalni segment, dramaturški namerno (osećaj "kad će se ovo završiti")
- Comeback orb može imati malo veći radijus i intenzivniji glow — vizuelni vrhunac

### Stat koji se vezuje

**"10 nedelja od prvog VS Code-a do live produkcije sa Bankart payment integracijom."**
Ovaj broj ide u stat strip i TheBuild copy.

---

## 8. Hijerarhija — šta dominira

### Po sekciji

| Sekcija | Šta dominira | Šta je suzdržano |
|---|---|---|
| Hero | H1 tipografija + cl3menza accent | Portrait (atmosferski, opacity 0.72), CTAs, eyebrow |
| Journey | **Linija + orbovi** | Kartice (40-rečni teaseri, ne eseji) |
| Activation | "Step Inside" CTA + magnetic interakcija | Sve drugo (manjak teksta) |
| Arrival (cl3) | "cl3menza" display tekst | Sve drugo na ekranu |
| TheBuild | Architecture flow vizualizacija | Body copy ispod |
| Contact | Terminal copy + cursor blink | Bez dugmeta, bez forme |

### Globalno pravilo

**Sve što nije linija ili cl3menza brand tekst je sluga ovih elemenata.** Linija je zvezda landing-a. cl3menza tekst je zvezda cl3 moda.

---

## 9. Starfield Refactor

### Trenutni problem
Uniform tačke iste brzine i veličine = TV šum, ne dubina svemira.

### Tri sloja

| Sloj | Count | Size | Speed | Brightness |
|---|---|---|---|---|
| **Far** | 60% (~70 zvezda) | 0.4-0.8px | Static | 0.2-0.4 |
| **Mid** | 30% (~35 zvezda) | 0.8-1.4px | Vrlo spor drift | 0.4-0.6 |
| **Near** | 10% (~12 zvezda) | 1.4-2.2px | Spor drift, vidljiv | 0.6-0.9 |

### Accent stars (5-6 ukupno)

- Significantly svetlije (`opacity: 0.85-1`)
- Povremeno trepnu (sin wave, period 4-6s)
- Nasumično raspoređene preko sva tri sloja
- Daje osećaj "ima zvezda koje stvarno sijaju"

### Mobile (videti sekciju 11)

60% manje zvezda, **bez drift animacije** (samo statične zvezde sa trepnom).

---

## 10. Mode Prelaz — Cinematic Moment (v2 backlog, ali specificiran)

**Dokument specificira ali implementacija ide u v2 batch nakon launch-a.**

### Sequence (ukupno ~2s)

1. **0-300ms:** Linija na journey zoni gubi trajektoriju, fragmentuje se u particles
2. **300-500ms:** Particles lete prema centru ekrana, kondenzuju se u jednu tačku gravitacije
3. **500-700ms:** Tačka eksplodira — fragment glitch + warm flash (`#F4A261`)
4. **700-2100ms:** Cyan preuzima, terminal boot animacija starts
5. **Završava:** "// welcome to cl3menza mode" + custom cursor menja boju u cyan

### Trenutna implementacija (v1)

- Fragment glitch + terminal boot (postoji)
- Bez particle kondenzacije (v2)
- Warm flash boja se može dodati odmah u v1 — to je 5min posla

---

## 11. Mobile Principles (375px+)

### Opšte pravilo

**Atmosferski elementi se prigušuju, tipografija i narativ ostaju puni.**

### Konkretne odluke

| Element | Desktop | Mobile (≤768px) |
|---|---|---|
| Starfield count | 100% | 60% |
| Starfield drift | Aktivan | **Disabled** (samo trepnja) |
| Custom cursor | Aktivan | **Disabled** (`@media pointer: coarse`) |
| Hero portrait | Side-by-side, opacity 0.72 | **Iza copy-ja**, opacity 0.3, kao atmospheric bg |
| H1 size | `clamp(3rem, 8vw, 8rem)` | `clamp(2.5rem, 10vw, 4rem)` |
| Journey linija | SVG sa orbovima | **Cyan left-border** na karticama, opacity 0.4 |
| Matrix rain | Aktivan u prelazu | **Disabled** ispod 768px |
| Cards | Side-positioned uz liniju | Stack centrirano sa cyan left-border |
| Section padding | 144-200px vert | 96-144px vert |
| Magnetic CTA | Aktivan | Disabled (touch nema hover) |

### Pravilo za grafiku

Sve `<canvas>` elemente proveriti sa `requestAnimationFrame` throttling na mobile-u. Performance > visual fidelity.

---

## 12. Reward System — Easter Egg

### Funkcija

Skriveni elementi po sajtu koji otključavaju popuste/perks za pažljive posetioce. Konvertuje "klijent koji čita pažljivo" u "klijent sa nagradom."

### Tipovi reward-a

- 10% popust na prvi projekat
- 20% popust na prvi projekat
- High-priority ticket status
- Free initial consultation (1h)

### Vizuelni karakter

- **Reward orb:** koristi warm `#F4A261` boju (NE cyan) — diferencira se od junction orbova
- **Glow:** `box-shadow: 0 0 16px rgba(244,162,97,0.4)`
- **Veličina:** ista kao junction orbovi (~12-14px diameter)
- **Animacija pri otkriću:** scale `0 → 1.2 → 1` sa elastic ease, duration 0.5s

### Lokacije (rotirane povremeno)

- Hover-only orb negde u atmosferi (npr. iza portrait-a, pojavljuje se na mouse over)
- Skrivena reč u TheBuild copy-ju koja postaje CTA na hover
- Klik na specifičan deo terminal boot teksta
- Konami code style sequence (opcionalno)
- Long-press na cl3menza brand tekst u Arrival sekciji

### Persistance

`localStorage` — jednom otključan reward ostaje, ne ponavlja se isti.

### Pravilo

**Sve mora biti suptilno.** Reward orb se ne pojavljuje na default state — samo na specifičnu interakciju. Ko nađe — našao je. Ko ne nađe — ne zna da postoji. To je poenta.

---

## 13. Component Treatment Rules

### Kartice (journey)

- **Max 40 reči po kartici** — naslov + 2-3 rečenice. Esej ide u TheBuild.
- Background: `--bg-3` (`#101622`)
- Border: `--border` default, `--border-cyan` na hover
- Padding: `--s-3` (24px)
- Radius: `16px`
- Glass overlay: heavy levo, opens desno (postojeće rešenje, zadržati)
- Right-edge light wash koji vezuje za beam (postojeće, zadržati)

### CTAs

- **Primary** ("Step Inside", "Pogledaj rad"): blue background `rgba(93,184,255,0.12)`, blue border `--border-blue`
- **Secondary**: surface background, default border
- Magnetic hover (videti motion sekciju)
- Custom cursor scale 1.6 na hover

### Input fields (chat terminal u cl3 modu)

- Background: `rgba(11,14,20,0.6)` sa backdrop-blur
- Border: `rgba(103,232,249,0.18)` cyan tint
- Focus: border postaje `rgba(103,232,249,0.5)`, subtle glow

### Mono labels (system strings)

- Font: Geist Mono `13px`
- Color: `--muted`
- Letter-spacing: `0.03em`
- Format primer: `STATE.md → CLAUDE.md → batch:STRICT`
- Optional: prefix `// ` za komentar style

---

## 14. Anti-Patterns — šta se NE radi nikad

1. **Nikad** ticker traka sa marketing buzzwords
2. **Nikad** prazan placeholder frame na live verziji (TheBuild ima flow vizualizaciju dok nema screenshot-a)
3. **Nikad** "Let's build something serious" generic copy
4. **Nikad** više od 3 atmosferska sloja istovremeno na istoj površini
5. **Nikad** padding/margin van 8px skale
6. **Nikad** `#FFFFFF` čisto belo — uvek `--text` (`#F5F7FB`)
7. **Nikad** gold ili violet boja
8. **Nikad** body copy u mono fontu
9. **Nikad** italic za naglašavanje (samo za citate i jednu reč emfaze)
10. **Nikad** custom cursor na touch uređajima
11. **Nikad** više od jednog CTA per "ekrana" pažnje (hero ima 2 jer su komplementarni — primary + secondary)
12. **Nikad** matrix rain ili scanlines na landing layeru

---

## 15. v2 Backlog (nakon launch-a)

- **Sound design** — Web Audio API generisani zvukovi (whoosh, blip, click)
- **Cinematic mode prelaz** — full particle kondenzacija sequence
- **Reward system v2** — Konami code, expanded locations
- **Internationalization** — engleska + srpska verzija prebacivanje
- **Project case study templates** — kad Pasta Bar i sledeći projekti budu live

---

## 16. Decision Log (zašto ove odluke)

| Odluka | Razlog |
|---|---|
| Hladan dominant + topli `#F4A261` accent | Hladan = heynesh DNA, kosmički osećaj. Topli accent daje dramaturgiju prelazu. Bez njega paleta je emocionalno jednostrana. |
| Cyan ekskluzivno za 4 elementa | Kad je svuda, gubi ekskluzivitet. Kad je samo na liniji + brand-u + cursor-u u cl3, postaje potpis. |
| 8px spacing system | Premium sajt nikad ne koristi proizvoljne brojeve. Sistematizacija = "intentional" osećaj. |
| Story-mapped path geometry | Matematička S-kriva = generička. Krivine vezane za priču = lično. |
| Orb → cursor transformacija | Vezuje dva sloja u jedno iskustvo. Mozak prepoznaje motiv. |
| Mono samo za system strings | Body u mono = developer template trope. Mono kao accent = system thinker karakter. |
| Reward sistem warm boja | Diferencira od junction orbova. Topli accent ima funkciju, nije dekoracija. |
| Pivot najduži vertikalni segment | 7 godina drift-a vizuelno = dugačka linija koja se odbija da se vrati gore. Dramaturgija dužine. |

---

**Kraj dokumenta. Lock v1.0.**

Sve buduće Claude Code batch-eve referiraju ovaj fajl. Bilo koja izmena ide kroz update-ovani v1.1, v1.2, etc. — ne ad-hoc.
