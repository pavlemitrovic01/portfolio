# BIBLE.md — cl3menza Brand & Visual System

Source-of-truth za brand pravac, vizuelni jezik, prostornu filozofiju i tehničke specifikacije.
Replaces: `Creative_Bible.md`, `VISUAL_LANGUAGE.md`, §1-12 of `CL3_Planet_Reconstruction_Master_Roadmap.md`.
Target: max 1200 lines.

See [ROADMAP.md](ROADMAP.md) for current execution plan and §14 Final Done Definition.
See [DECISIONS.md](DECISIONS.md) for deprecated specs and closed design decisions.

---

## PART A — Brand & Tone

*Izvor: Creative_Bible.md. Važi za obe planete.*

### A.1 North Star

Ne pravimo običan dev portfolio. Pravimo: **premium, dark, cinematic, intelligent, systems-driven portfolio** koji deluje kao da si ušao u luksuzan futuristički svemirski sistem.

**Ciljani osećaji:** prisustvo · autoritet · ukus · builderski identitet · systems thinking · tihi WOW

**Idealna reakcija:** "ovo deluje skupo" · "ovo deluje autorski" · "ovaj čovek razmišlja dublje" — NE "cool animacije"

**Litmus testovi:**
- Ako neko kaže "cool animacije" umesto "cool sajt" — promašili smo
- Ako orbovi privlače više pažnje od sadržaja kartica — preterali smo
- Ako efekat može da se izdvoji kao "glavna stvar" — verovatno je prejak
- Ako neko kaže "dobra animacija, ali ne znam ko si" — sajt nije gotov

### A.2 Hard Locks

*Ne diramo bez eksplicitne odluke da menjamo pravac.*

**Identitet:** premium · dark · cinematic · intelligent · futuristic · čist i kontrolisan
Ne sme otići u: gaming · synthwave · generic cyberpunk · startup SaaS · "look at my animations"

**Struktura scene:** Hero → Journey → Activation → cl3menza mode = osnovna dramaturgija. Ceo landing mora delovati kao jedna povezana scena.

| Element | Uloga |
|---|---|
| Path | Conductor — nervni sistem scene |
| Orbovi | Junction intelligence — energetski čvorovi |
| Kartice | Narrative payload — recipient-i toka |
| Quote | Editorial counterweight — manifestni stav |
| Activation | Klimaks / handoff |
| cl3menza mode | Planeta 2 — underground megastructure, chamber-based descent |

**CTA odluke:** "Explore the Build" se ne vraća. "Step Inside" = hidden/info layer. "Curious? Scroll down" = tihi directional cue.

**Reward logika:** Rewardovi ostaju discoverable. Step Inside = samo assist/hint layer. Ne uvodimo nove rewardove sada. Ne radimo full backend reward sistem sada.

**Kontakt:** Ne izbacujemo korisnika van sajta. Inquiry flow ostaje unutar iskustva.

**Journey story core — 4 kartice (ne rušimo, možemo zategnuti formu):**
1. CS serveri i početak (rani builderski instinkt)
2. Minecraft, skripte, bagovi, upornost (opsesija i dubina)
3. Škola / posao / udaljavanje (prekid, ali instinkt ostaje)
4. Comeback, Padrino kao proof (dokaz kroz rad)

**Motion pravilo:** Motion mora biti tih · razlogom vođen · sistemski · premium. Ne sme biti flashy · gimmick · random · tech-demo.

### A.3 Central Thesis

> Portfolio ne sme delovati kao niz lepih blokova, nego kao živi inteligentan sistem koji predstavlja tvoj način razmišljanja.

svetlo = carrier of structure · path = nervni sistem · orb = energetski čvor · kartica = recipient of flow · animation = objašnjenje scene · copy = autorski signal

### A.4 Path Spec

**Šta path mora da bude:** Controlled celestial current in deep space.
NE: neon line · SVG trail · glow border · loading line · tech decoration

| Sloj | Ime | Opis | Parametri |
|---|---|---|---|
| 1 | White-hot spine | Najtanji energetski centar | 2-3px, #E0F7FF→#FFFFFF, blur 1-2, opacity 0.85-0.95 |
| 2 | Core ribbon | Hladno belo-cyan telo | 5-7px, #00E5FF, blur 4-5, opacity 0.7-0.8 |
| 3 | Inner glow | Uski icy-cyan bloom | 10-14px, cyan, blur 8-10, opacity 0.4-0.5 |
| 4 | Outer aura | Duboki plavi svetlosni omotač | 20-30px, #1a6baa, blur 12-15, opacity 0.15-0.25 |
| 5 | Carrier haze | Jedva vidljiv luminous vacuum | 40-50px, #0d3a6b, blur 20+, opacity 0.06-0.10 |
| 6 | Side filaments | Sekundarne struje uz tok | 0.5-1px, cyan 0.12-0.20, offset 5-15px |
| 7 | Cosmic residue | Mikro trag energije | 1-2px, 15-25 komada, opacity 0.1-0.3 |

**Filamenti pravila:** Segmentni (ne pune paralelne linije). Jači oko krivina i orb zona, tiši u content zonama.

**Residue pravila:** Ne random noise. Max 25 čestica. Jače oko orbova. Cilj: ukloniti sterilnost, ne privući pažnju.

**Lokalno pojačanje oko orbova:** Kad beam prilazi junction-u glow se širi, core svetliji, filamenti bliže. Orbovi nisu samo markeri — utiču na beam.

**Performance:** SVG blur stdDev max 15 po sloju, particles max 25. `prefers-reduced-motion`: samo core path bez slojeva.

### A.5 Orb Spec

**Uloga:** energetski čvor — ne marker, ne loading indicator. Mesto gde se energija koncentrisala.

**Faze:** Dormant (faint glow) → Active (pojačan bloom, ~300-500ms tranzicija)

**Vizuelna struktura (Faza A — implementirano):**
- White-hot center 4-6px, inner halo 12-16px cyan, outer bloom 30-50px low opacity
- Lokalni glow pojačava beam oko junction-a

**Faza B (samo ako fali posle A):** Horizontalni light streak, 4 radijalna zraka, veoma spora rotacija.

**Ograničenje:** Ako orb privlači više pažnje od kartice ili path toka — preterali smo.

### A.6 Background / Space

**Uloga:** Prostor u kome se sve dešava, ne wallpaper.

**Mora da nosi:** deep-space osećaj · slojeve dubine · svetlosnu atmosferu · osećaj vakuuma · cinematic controlled darkness

**Starfield:** Canvas-based, 50-100 zvezda, varijabilne veličine (1-3px), 5-10 bright stars sa micro glow. Bez kič twinkle show-a.

**Path-background integracija:** Beam i background moraju delovati kao isti fizički prostor. Beam ne sme delovati zalepljeno.

### A.7 Scene Direction

| Zona | Cilj | Ne sme |
|---|---|---|
| Hero | Ulaz u svet — prisustvo, autoritet, znatiželja | prenatrpan · startup hero · statičan |
| Journey | Narativni energetski tok, ne timeline | CV timeline · blog kartice · motivacioni poster |
| Quote | Editorial counterweight — pauza u narativu | više od 1-2 quote-a na stranici |
| Activation | Klimaks — kulminacija energije | jump scare · gaming portal · prenaglašen bootup |
| CL3 mode | Druga planeta istog kosmosa | dashboard · services page · samo pojačan mode |

**Journey reveal sekvencu:** orb se aktivira → connector se iscrtava → kartica fade-in + blagi translate (ne scale). Ukupno 600-800ms.

**Hero:** portret = deo scene (suptilna interakcija, ambient light na ivicama, 2-4px parallax samo desktop). Floating badge = mali, staklen, monospace, blag pulse.

**Activation buildup:** Pozadina tamnija, vignette jača, path završava u centralnom orbu (2x veći, jači glow), ambient glow raste od 0.

### A.8 Motion Spec

**Hijerarhija:** Path vodi → Orb reaguje → Kartica dolazi → Background podržava → Hero/Activation mikro prisustvo

**Easing:**
- Reveal-ovi (landing): `cubic-bezier(0.22, 1, 0.36, 1)` — brz start, mekana deceleracija
- CL3 chamber reveals: `cubic-bezier(0.16, 1, 0.3, 1)` — sporija inicijalna akceleracija, duži deceleration tail (gravity easing)
- CL3 duration range: 0.7–1.2s
- Hover-i svuda: 0.22s brzi ease
- NIKADA spring physics na ovom sajtu

**Istovremeni pokret:** max 2-3 elementa aktivno u svakom trenutku.

**Dozvoljeno:** scroll-driven conduction · tihi fade/translate · suptilan atmospheric drift · restrained breathing · local intensification · editorial reveal

**Zabranjeno:** bounce · previše scale · rotating gimmicks · random pulsing svuda · hover showoff · springy "UI kit" osećaj · eksplozije/burst reveal · stalni glitch svuda

### A.9 Copy Spec

**Ton:** Samouvereno miran. Ne prodajni, ne hype, ne skroman. Kao neko ko zna šta radi.

| Zona | Ton |
|---|---|
| Hero | Malo, teško, sigurno |
| Journey kartice | Istinito, precizno, narativno kontrolisano |
| Quote | Editorial, manifestno |
| Activation | Težak poziv, ne prodajni pritisak |
| CL3 mode | Dublje, sistemskije, monumentalnije, editorijalno |

**Format kartica:** Headline (jak, 2-4 reči, statement) + body max 40 reči. Dugačke priče → About ili cl3 mode.

**Ne komunicira:** "molim te angažuj me" · genije kompleks · generički motivation copy · previše objašnjavanja · AI generika

### A.10 Anti-Goals

Nikad: generičan cyberpunk · gaming UI · synthwave · laser tube look · previše ljubičaste · previše blur-a · particle spam · full-screen moving wallpaper · previše terminal teatra · "WOW" po cenu poverenja · replika reference umesto originalnog identiteta

---

## PART B — Visual Language System

*Izvor: VISUAL_LANGUAGE.md v1.0. v2 backlog i decision log → DECISIONS.md.*

### B.1 Centralna napetost

Portfolio je dvoslojni:
- **Landing (Pavle)** — suzdržan, čist, tipografski-vođen. Heynesh DNA. "Ovde radi neko ozbiljan."
- **cl3menza mode** — cinematic, atmosferski, system-thinker jezik. Wearebrand DNA. Druga planeta.

Cosmic estetika je **metafora za prelaz**, ne konstantni dekor. Ako je svuda cosmic, prelaz nestaje.

**Centralni vizuelni motiv:** orb. Junction point u journey zoni, transformiše se u custom cursor pri ulasku u cl3 mode.

### B.2 Color Palette

#### Primarna paleta

| Varijabla | Hex | Uloga | Pravilo |
|---|---|---|---|
| `--cyan` | `#67E8F9` | Linija, junction orbovi, cl3menza brand tekst, custom cursor u cl3 | **EKSKLUZIVNO** za ova 4 elementa. Nikad za UI. |
| `--blue` | `#5DB8FF` | CTA, borders, links, ikone, focus states, UI elementi | Generalni accent za sve interakcije |
| `--warm` | `#F4A261` | Reward orb, eyebrow pulse dot, mode prelaz flash | **MAKSIMALNO 3 pojave** na sajtu |

#### Background sloj

| Varijabla | Hex | Uloga |
|---|---|---|
| `--bg` | `#06070A` | Background base — landing |
| `--bg-2` | `#0B0E14` | Background elevated, cl3 mode base |
| `--bg-3` | `#101622` | Surface elevated — cards, panels |

#### Text sloj

| Varijabla | Hex | Uloga |
|---|---|---|
| `--text` | `#F5F7FB` | Primary text |
| `--text-2` | `#C8CFDC` | Secondary, body emphasis |
| `--muted` | `#98A2B3` | Captions, eyebrow text, mono labels |
| `--dim` | `#5B6473` | Disabled, footnotes |

#### Border sloj

| Varijabla | Vrednost | Uloga |
|---|---|---|
| `--border` | `rgba(255,255,255,0.06)` | Default tihi border |
| `--border-s` | `rgba(255,255,255,0.12)` | Hover/emphasized border |
| `--border-cyan` | `rgba(103,232,249,0.18)` | Cyan accent border |
| `--border-blue` | `rgba(93,184,255,0.24)` | Blue CTA border |

**Izbačeno:** `#7C6DFF` violet · `#D9B35B` gold · `#78FFF0` electric mint

**Warm accent — tačno 3 mesta:**
1. Eyebrow pulse dot na hero-u — suptilno disanje
2. Reward orb (easter egg) — diferencira od cyan junction orbova
3. Mode prelaz fragment glitch — topli flash pre nego što cyan preuzme

### B.3 Tipografija

| Tip | Font | Upotreba |
|---|---|---|
| Display & Headings | Space Grotesk | Headlines, eyebrow pills, brand tekst, card titles |
| Body | Inter | Body copy, sub copy, opisi, paragraf tekst |
| Mono | Geist Mono | Sistem labele, stack nazive, timestamps, terminal strings |

#### Type Scale

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

**Pravila:** H1 letter-spacing `-0.04em` (editorial, ne poster). Display rezervisan za hero "Pavle Mitrović" i Arrival "cl3menza". Mono nikad za body copy. Italic skoro nikad — samo citat i jedna reč emfaze.

### B.4 Spacing System

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

**Section vertical rhythm:** sm: 96/144px · md: 144/200px · lg: 200/280px (hero, journey, activation)

**Pravilo:** Nikad van skale. Premium sajt nikad ne koristi proizvoljne brojeve (ne `padding: 47px`).

### B.5 Motion Principles

**Globalna pravila:** Easing `cubic-bezier(0.22, 1, 0.36, 1)`, duration cap 0.7s (landing), stagger default 0.07s.

| Animacija | Spec |
|---|---|
| Hero ulaz | stagger 0.07, duration 0.55, ease [0.22,1,0.36,1] |
| Kartice ulaz | x ±40px→0, opacity 0→1, duration 0.65, ease landing |
| Junction orbovi | opacity 0→1, scale 0.6→1, duration 0.4 |
| Magnetic CTA | useMotionValue + useSpring, stiffness 150, damping 15, max 12px displacement |
| Custom cursor | 12px diameter, `box-shadow: 0 0 12px rgba(103,232,249,0.4)` |

**Linija scroll-driven:** stroke width 0.8→2→1px (disanje). Opacity 0.4→0.9→0.6. `pathLength` scroll-driven.

**Glow diferencijacija:** Glavna linija `feGaussianBlur stdDeviation 2`. Orbovi (sopstveni glow) `stdDeviation 8`.

### B.6 Atmospheric Elements

| Layer | Landing | CL3 |
|---|---|---|
| Starfield canvas | 3 sloja zvezda (Far/Mid/Near) | Onemogućen u cl3 |
| Ambient nebula | Jedan radial, max 0.06 opacity, 80px blur | Onemogućen |
| Vignette | Tiha ivica | Strukturalni zidovi |
| Scanlines | Ne postoji na landing | Samo ako premium, 3-5% max |
| Grid overlay | ~3%, 72px | Samo ako arhitekturno, 5-7% max |
| Particles canvas | Prebačen u cl3 | Aktivan u cl3 |
| Matrix rain | Ne postoji na landing | Deep background texture 15-25% |
| Scroll-progress glow | — | Tih cyan trag uz levi edge |

**Izbačeno zauvek:** 18 residue tačkice uz liniju · fragment glitch van mode prelaza · scanlines/noise na landing-u

### B.7 Transformation Rules

| Stanje | Vizuelni element |
|---|---|
| Landing — journey zona | Junction orbovi (cyan glow) sede na liniji |
| Mode prelaz | Linija fragmentuje, particles lete ka centru, kondenzuju u tačku |
| CL3 mode — cursor | Custom cursor postaje cyan orb sa identičnim glow-om kao junction orbovi |

Posetilac ne mora svesno da prati — mozak prepoznaje isti vizuelni jezik.

**Tipografska transformacija:** "cl3menza" u landing = cyan accent reč. U Arrival = full screen display, dominira ceo prostor.

**Path transformacija:** Linija se ne briše u prelazu — fragmentuje u particles koji se preraspoređuju kao background drift. Energija se nikad ne gubi.

### B.8 Journey Path — Story-Mapped Geometry

**Linija nije matematička S-kriva. Svaka krivina = konkretan period priče.**

| Tačka | Period | Vizuelni karakter |
|---|---|---|
| Origin | 2012 — CS server admin, plugins | Oštra, kratka krivina — dete naglo upalo u sistem |
| Pivot | 2019 — kraj škole, kuvanje, drift | Dugačak skoro-horizontalni segment — 7 godina drift = linija koja se odbija da se vrati |
| Comeback | Jan 2026 — otkaz, prvi VS Code | Naglo penjanje, krivina se zaokreće iz pada u uspon |
| Now | +10 nedelja — Padrino live | Stabilan ushodeći put, manje dramatičan ali konsistentan |

**Comeback orb:** malo veći radijus + intenzivniji glow — vizuelni vrhunac.

**Stat:** "10 nedelja od prvog VS Code-a do live produkcije sa Bankart payment integracijom" → stat strip i TheBuild copy.

### B.9 Hijerarhija po sekciji

| Sekcija | Šta dominira | Šta je suzdržano |
|---|---|---|
| Hero | H1 tipografija + cl3menza accent | Portrait (opacity 0.72), CTAs, eyebrow |
| Journey | **Linija + orbovi** | Kartice (40-rečni teaseri) |
| Activation | "Step Inside" CTA + magnetic interakcija | Sve drugo |
| Arrival (cl3) | "cl3menza" display tekst | Sve ostalo na ekranu |
| TheBuild | Architecture flow vizualizacija | Body copy ispod |
| Contact | Terminal copy + cursor blink | Bez dugmeta, bez forme |

### B.10 Starfield Spec (3 sloja)

| Sloj | Count | Size | Speed | Brightness |
|---|---|---|---|---|
| Far | 60% (~70 zvezda) | 0.4-0.8px | Static | 0.2-0.4 |
| Mid | 30% (~35 zvezda) | 0.8-1.4px | Velmi spor drift | 0.4-0.6 |
| Near | 10% (~12 zvezda) | 1.4-2.2px | Spor drift, vidljiv | 0.6-0.9 |

**Accent stars (5-6):** opacity 0.85-1, sin wave trepnja period 4-6s. Mobile: 60% manje, bez drift.

### B.11 Mode Prelaz Sequence

| Faza | Trajanje | Šta se dešava |
|---|---|---|
| 0–300ms | — | Linija na journey zoni fragmentuje u particles |
| 300–500ms | — | Particles lete prema centru, kondenzuju u jednu tačku |
| 500–700ms | — | Eksplozija: fragment glitch + warm flash `#F4A261` |
| 700–2100ms | — | Cyan preuzima, terminal boot animacija starts |
| Završava | — | "// welcome to cl3menza mode" + cursor → cyan orb |

**v1 impl:** Fragment glitch + terminal boot postoje. Warm flash dodat u Batch 12a. Particle kondenzacija = v2 backlog.

### B.12 Mobile Principles

| Element | Desktop | Mobile (≤768px) |
|---|---|---|
| Starfield count | 100% | 60% |
| Starfield drift | Aktivan | Disabled (samo trepnja) |
| Custom cursor | Aktivan | Disabled (`pointer: coarse`) |
| Hero portrait | Side-by-side, opacity 0.72 | Iza copy-ja, opacity 0.3 (atmospheric bg) |
| H1 size | `clamp(3rem, 8vw, 8rem)` | `clamp(2.5rem, 10vw, 4rem)` |
| Journey linija | SVG sa orbovima | Cyan left-border na karticama, opacity 0.4 |
| Matrix rain | Aktivan | Disabled <768px |
| Magnetic CTA | Aktivan | Disabled |
| Section padding | 144-200px vert | 96-144px vert |

**Canvas pravilo:** `requestAnimationFrame` throttling na mobile-u. Performance > visual fidelity.

### B.13 Reward System

**Tipovi:** 10% popust · 20% popust · high-priority ticket · free 1h consultation

**Vizuelni karakter:** warm `#F4A261` (NE cyan). `box-shadow: 0 0 16px rgba(244,162,97,0.4)`. ~12-14px diameter. Discovery: `scale 0→1.2→1` elastic ease, 0.5s.

**Lokacije v1:**
1. Hover-only orb iza portrait-a (10% popust)
2. Skrivena reč u TheBuild copy-ju → CTA na hover (20% popust)
3. Long-press na cl3menza brand tekst u Arrival (high-priority ticket)

**Persistence:** localStorage. Jednom otključan — ne ponavlja se.

**Pravilo:** Ne pojavljuje se na default state. Ko nađe — našao je. Ko ne nađe — ne zna da postoji.

### B.14 Component Treatment

**Kartice (journey):** Max 40 reči, `--bg-3`, radius 16px, hover `--border-cyan`. Glass overlay heavy levo, right-edge light wash.

**CTAs:** Primary = `rgba(93,184,255,0.12)` + `--border-blue`. Magnetic hover. Cursor scale 1.6.

**Chat terminal / Input:** `rgba(11,14,20,0.6)` + backdrop-blur. Focus: border → `rgba(103,232,249,0.5)` + glow.

**Mono labels:** Geist Mono 13px, `--muted`, tracking 0.03em. Format: `STATE.md → CLAUDE.md → batch:STRICT`. Prefix `// `.

### B.15 Anti-Patterns (nikad)

1. Ticker traka sa marketing buzzwords
2. Prazan placeholder frame na live verziji
3. "Let's build something serious" generic copy
4. Više od 3 atmosferska sloja istovremeno na istoj površini
5. Padding/margin van 8px skale
6. `#FFFFFF` čisto belo — uvek `--text` (`#F5F7FB`)
7. Gold ili violet boja
8. Body copy u mono fontu
9. Italic za naglašavanje (samo za citat i jednu reč emfaze)
10. Custom cursor na touch uređajima
11. Više od jednog CTA per "ekrana" pažnje
12. Matrix rain ili scanlines na landing layeru

---

## PART C — Two-Planet Spatial Philosophy

*Izvor: CL3_Planet_Reconstruction_Master_Roadmap.md §1-3.*

### C.1 Dijagnoza — Zašto CL3 zaostao

**Koren problema:** Atmosfera umire na portalu. Landing ima 10+ atmospheric layers. CL3 je imao: CSS variable swap, MatrixRain na 55% opacity, i content boxes sa identičnim MotionReveal-om.

**9 konkretnih grešaka (pre rekonstrukcije R1-R6):**
1. Spatial physics collapse — nema fizičkog prostora, nema dubine
2. Atmosphere evaporates — jedini layer MatrixRain kao dekoracija, ne environment
3. Section-wall syndrome — 8 stacked sekcija sa identičnim reveal-om (monotony)
4. Content redundancy — 3 sekcije za isti projekat, nema kumulativnog efekta
5. Hero overload — iframe + chat + pills + 2 kolone = dashboard, ne arrival
6. Proof fragmentation — dezorganizovano, ne kumulativno
7. Generic contact dead-end — disabled Upwork/Fiverr buttons = "nisam spreman"
8. Motion monotony — 20+ elemenata, identičan MotionReveal
9. Performance friction — iframe + ResizeObserver + sve mountuje odjednom

*Rekonstrukcija (MEGA-R1 → Batch-R6) je ove probleme adresirala.*

### C.2 Dve planete — Prostorna filozofija

Portfolio je dve planete u istom kosmosu — ne jedan sajt sa dva moda.

#### Planeta 1 — Landing

**Prostorni model:** Otvoreni svemir. Signal koji putuje kroz vakuum. Putovanje kroz kosmičku distancu ka odredištu.

**Fizika:** Open, airy, weightless. Svetlo putuje daleko (beam spans 3200px of scroll). Objekti plutaju. Kretanje lateralno i zakrivljeno (S-curve). Negativni prostor dominira. Gravitacija blaga — stvari lebde.

**Emocionalni registar:** Znatiželja · Privlačnost · Elegancija · Inteligencija · Pozivanje

**Arhitektura:** Linearni cinematic scroll. Jedna kontinualna scena od hero-a do aktivacije. Nema čvrstih sekcijskim granica. **Path je struktura.**

#### Portal

Portal nije toggle. Nije CSS class swap. To je **compression point** — ritualni prelaz gde se fizika prostora menja.

| Aspekt | Landing | Portal | CL3 |
|---|---|---|---|
| Svetlo | Distant, ambient, svuda | Izvori se bliže | Close, directional, 1-2 po komori |
| Gustina | Low (open space) | Raste 0.6-0.8s | High (enclosed medium) |
| Edge feeling | Open, bez granica | Vignette jača | Structural walls, containment |
| Dubina | Parallax, beam distance | Compression | Inter-chamber darkness |

#### Planeta 2 — CL3

**Prostorni model:** Underground megastructure. Deep-core citadel. Spuštanje kroz komore sve specifičnosti i dokaza.

**Fizika:** Enclosed, dense, heavy. Svetlo je blisko i usmereno. Objekti imaju težinu — ne plutaju, sidre se. Vertikalno kretanje (descent). Gustina visoka. Gravitacija jaka — stvari se slegnu.

**Emocionalni registar:** Težina · Poštovanje · Dokaz · Gravitacija · Inner sanctum · Kontrola · Deep focus

**Arhitektura:** Chamber-based descent. 4 komore sa atmosferskim tranzicijama. Scroll deluje kao silazak, ne čitanje stranice.

#### Odnos

Landing = signal. CL3 = izvor.
Landing = pozivnica. CL3 = dokaz.
Landing = površina. CL3 = jezgro.

Dele DNA (color family, tipografija, premium restraint) ali imaju fundamentalno različitu prostornu fiziku.

### C.3 Shared DNA — Locked Constants

*Važi za obe planete. Non-negotiable.*

**Tipografija:** Space Grotesk + Inter + Geist Mono. Nema novih font familija.

**Color family:** Iste planete koriste cold palette: cyan / blue / violet. CL3 pomera unutar familije (detailed u D.1). Bez toplih boja osim gold/warm kao retki accent.

**Premium Restraint:** Svaki vizuelni element mora imati strukturnu svrhu. Glow je arhitektura. Animacija je posledica, ne spektakl. Odsustvo efekta je skuplje od prisustva.

**Anti-Goals (permanent):** No gaming · no cheap cyberpunk · no synthwave · no flashy UI demo · no random wow effects · no dribbble sci-fi bez težine · no dashboard/SaaS layout · no freelancer services wall · no aggressive self-promotion

| Texture | Landing | CL3 |
|---|---|---|
| Noise | 6% screen blend | 6-8% screen blend |
| Scanlines | Ne postoji | Samo ako premium, 3-5% max. Ako izgleda kao filter — ukloni. |
| Grid overlay | ~3%, 72px | Samo ako arhitekturno, 5-7% max. Mora delovati kao blueprint, ne tech-demo. |

| Border | Landing | CL3 |
|---|---|---|
| Color | White | Cyan-tinted |
| Opacity | ~8% (`rgba(255,255,255,.08)`) | 11-15% (`rgba(120,255,240,.11-.15)`) |
| Purpose | Subtle glass edge | Structural enclosure, chamber boundary |

| Radius | Landing | CL3 |
|---|---|---|
| Panels/Cards | 22-30px (glass float) | 8-12px (architectural, sturdier) |
| Small elements | 16px | 8-10px |

---

## PART D — System Specifications

*Izvor: CL3_Planet_Reconstruction_Master_Roadmap.md §4-12.*

### D.1 Color System — CL3 Palette

**Landing Palette:** Referisa B.2. No changes.

#### CL3 Palette — Shifted, Not New

CL3 color shift je tonalni produbljivanje unutar iste color familije. Kao spuštanje u dublje vode — isti okean, drugačiji pritisak.

| Role | Landing | CL3 | Shift |
|---|---|---|---|
| Background primary | `#06070a` | `#020408` | Deeper, closer to true black |
| Background secondary | `#0b0e14` | `#040810` | Darker |
| Background tertiary | `#101622` | `#06090f` | Darker |
| Text primary | `#f5f7fb` | `#f5f7fb` | No change |
| Text muted | `#98a2b3` | `#8090a8` | Cooler, more blue |
| Primary accent | `#5db8ff` (blue) | `#78fff0` (cyan) | Blue → Cyan |
| Secondary accent | `#7c6dff` (violet) | `#c678ff` (magenta) | Violet → Magenta |
| Tertiary accent | `#78fff0` (cyan) | `#ff78c4` (pink) | Pink micro-accent samo |
| Panel | `rgba(16,22,34,.62)` | `rgba(8,18,32,.72)` | Darker, less glass |
| Panel dense | `rgba(11,16,24,.78)` | `rgba(4,12,24,.88)` | Nearly opaque (wall) |
| Line | `rgba(255,255,255,.08)` | `rgba(120,255,240,.11)` | Cyan tint |
| Line strong | `rgba(255,255,255,.16)` | `rgba(120,255,240,.22)` | Stronger cyan |
| Brand glow | `rgba(93,184,255,.55)` | `rgba(120,255,240,.6)` | Cyan glow |

**CL3 Color Rules:**
1. Cyan (`#78fff0`) je dominantna strukturna boja — koristi tamo gde blue na landing-u
2. Magenta (`#c678ff`) je sekundarna atmosferska — nikad dominantna, nikad za tekst
3. Deep teal (`#0a3a4a`–`#0d5060`) atmosferski mid-tone — nikad flat fill
4. Pink (`#ff78c4`) = micro-accent, max 2 elementa per komore
5. Shift mora delovati skupo, ne dramatično — prostorna promena se primeti pre boje

**Ne sme:** No RGB rainbow · no warm colors (osim nasleđeni pink) · no green · no white glow sources

### D.2 Atmosphere System — Layer Blueprint

**Landing atmosfera:** 10+ aktivnih layera (Starfield canvas, Nebula, Depth zones, Vignette, Particle network, Beam 7-layer, Cosmic residue, Ambient body glow) — referisa B.6.

#### CL3 Atmosfera — minimum 7 layera

| Layer | Implementacija | Spec |
|---|---|---|
| 1. Dense Fog Base | CSS pseudo-element, full viewport, fixed | Radial gradient deep teal→bg, 8-15% per gradient, blur 100-140px. Static — fog ne animira. |
| 2. Directional Glow | 1-2 radial gradients per komore, off-center | Ch1: top-left cyan 6-10%. Ch2: center-right teal 8-12%. Ch3: dual cyan+magenta cross-light. Ch4: rising from below 5-8%. Blur 80-120px. |
| 3. Structural Vignette | CSS pseudo-elements, edge-darkening | Left/right 12-18%, top/bottom 8-12%. Structural walls, ne gentle fade. Jači u Ch2+Ch3, slabiji u Ch4. |
| 4. Depth Gradient | CSS bands između content blokova | 30-40% darker između komora, height 120-200px. "You are descending." |
| 5. MatrixRain | Canvas | 15-25% opacity (was 55%). Column density -40%. Slower. No bright white top chars — sve u cyan opsegu. |
| 6. Structural Lines | CSS borders / thin SVG | Horizontalni dividers 1px cyan 8-12%. Optional vertical edge lines 1px cyan 4-6%. |
| 7. Micro-Glow Accents | CSS box-shadow | Cyan `rgba(120,255,240,0.04-0.08)`, 8-16px blur. Static ili hover-triggered 0.3s. Nikad pulsing. |

**Intensity progression:** Ch1 → Ch2 → Ch3 (peak density) → Ch4 (release). Dublje i dublje, pa otpuštanje.

### D.3 Visual Language — Planet 2

**Form language:** Monolithic, heavy, grounded. Panels 8-12px radius. Straight edges. Wide horizontal panels. Vertical columns. Inset frames. Things are built, not floating.

**Volume language:** 72-88% opacity panels = zidovi, ne staklo. Dubina kroz glow direction i shadow, ne kroz transparentnost.

**Spacing language:** 24-40px within chambers. 120-200px dark transitions between. Less air inside, more darkness between.

**Panel Treatment:**
- Background: `rgba(8,18,32,0.72-0.88)`. Radius: 8-12px. Border: `rgba(120,255,240,0.11-0.15)` 1px.
- Optional inset glow (top ili left edge): `rgba(120,255,240,0.04-0.06)`, 8-12px blur.
- Ne svaki panel dobija inset glow — rezervisano za primarne panele.
- Bez stacked borders, double borders, gradient borders.

**Shadow language:** CL3 je shadow-shaped (tama definiše). Soft directional shadow: `0 12px 48px rgba(0,0,0,0.35)`. Pure black opacity, nikad colored shadows.

**Architecture language:** Telemetry vaults, deep-core research facilities, Tadao Ando concrete. Large quiet surfaces. Light as material. Heavy horizontal proportions.

**Premium boundaries (ne sme postati):** No gaming HUD · no cyberpunk neon strip · no synthwave grid · no hacker cringe ("ACCESS GRANTED") · no demo dashboard · no dribbble sci-fi

### D.4 Portal Transition Specification

#### Current Portal (existing — no changes to phases 1-3)

Phase 1: Activation buildup (scroll-driven glow). Phase 2: Terminal boot (11 lines × 100ms). Phase 3: Fragment explosion (48-tile scatter, 1.05s).

#### Phase 4: Atmospheric Compression (NEW — ključni deo, implementiran u R1)

Traje 0.6-0.8s, preklapa se sa krajem fragment scatter-a:
1. Landing nebula collapse: opacity → 0 over 0.6s
2. Starfield fade: → 0 over 0.4s (dimming, ne pop out)
3. Particles dissolve: → 0 over 0.5s (fade while still in motion)
4. Dense fog fades in: → target opacity over 0.6s
5. Structural glow sources emerge: → target over 0.6-0.8s (directional, from one side)
6. Vignette strengthens: over 0.5s
7. MatrixRain fades in: → 15-25% over 0.8s (poslednji layer koji stiže)

#### Phase 5: Arrival Hold (NEW)

200-400ms pause između atmosphere settling i content appearing. User sedi u novoj atmosferi pre nego što se išta pojavi. Ovo je trenutak osećaja dolaska.

### D.5 Chamber Architecture

#### CHAMBER 1 — ARRIVAL

**Svrha:** Establish presence. Announce identity. "I have arrived." Gravity. Stillness. Monumentality.

**Content (3 elementa max):**
- Monumentalni identity statement (Space Grotesk 700, `clamp()`, ne header — monument)
- Positioning statement (Short, definitive, max 2 lines, Inter 400, muted)
- AI chat terminal (strukturni element, minimal chrome, prazno na startu)

**Uklonjena iz HeroCl3menza:** Live iframe · trust pills ("4.9★ Upwork") · badge status indicators · stack pills · 2-kolona grid layout · sample chat messages

**Vizuelno:** Dense fog, single top-left directional glow, strongest vignette. Nema decorative elements, pills, badges.

**Spatial spec:** ~100vh na arrival. 15-20vh breathing room ispod. Content na golden ratio (~38% od vrha).

#### ATMOSPHERIC PAUSE — PULL QUOTE

**Between Chamber 1 and 2.** 15-25vh near-empty space. One sentence (truth, ne testimonial). Space Grotesk 500, centered, muted + cyan highlighted words. Glow breathing ±1.5% over 6-8s (imperceptible as animation — felt as life). No boxes, no containers.

#### CHAMBER 2 — THE BUILD

**Svrha:** Proof. Jedan projekat, puna dubina. Editorijalni narativ koji kaže "I built this, here is how."

**Content blocks (4 max):**
- Block A: Context — šta je Padrino Budva, za koga, koji problem rešava (1 pasus)
- Block B: Visual — 2-3 curated screenshots, full-width, architectural frames (8-12px radius, cyan border 13%, directional shadow). NE live iframe.
- Block C: Key Moments — 3-4 proof points (Cart→Order→Payment in one flow / Real-time Telegram / Bankart HMAC / Admin dashboard). Sequential, ne grid.
- Block D: Architecture — simplified flow diagram (max 5 nodes, functional labels "Order Processing" ne "create-order.ts", scroll-driven activation)

**Merged u TheBuild:** Projects card (→ Block A) · Flagship feature matrix (→ Block C) · AnatomyOfBuild interactive SVG (→ Block D)

**Vizuelno:** Glow center-right, vignette, inter-chamber darkness. Panels opaque 80-88%.

#### CHAMBER 3 — THE SYSTEM

**Svrha:** Capabilities and methodology. "This is repeatable, not accidental."

**Content (3 blocks max):**
- Block A: Capabilities (vertical list, ne grid): 1. Premium Business Websites 2. Custom Web Products 3. Ordering & Payment Systems 4. Admin & Operational Layers. Heading + evidence per item. No icons. No tiles.
- Process: Integrisan kao jedan red — "Discovery → Structure → Build → Polish → Ship" — ne 5 kutija
- Block B: Stack Signal — "React · TypeScript · Supabase · Framer Motion" — tekst, secondary, muted

**Vizuelno:** Dual glow sources (cross-lighting), peak atmospheric density. Capabilities left-edge line accent (1px cyan 10%, 80% block height).

#### CHAMBER 4 — SIGNAL OUT

**Svrha:** Resolution. Contact. "The descent ends. Here is how to engage."

**Content (2 max):**
- One heading (statement, ne "Get In Touch" ili "Let's Work Together")
- One CTA: `hello@cl3menza.com`. Clean. Prominent. To je to.
- Testimonials: empty slot dok real ne postoje. Blank > fake.

**Uklonjena:** Disabled Upwork/Fiverr buttons · "soon" labels · placeholder testimonials

**Vizuelno:** Glow rising from below, vignette loosens, atmosphere releases. Full viewport height. CTA na upper-third.

### D.6 Animation & VFX Bible

#### Easing Family

| Kontekst | Easing | Duration | Feeling |
|---|---|---|---|
| Landing reveals | `cubic-bezier(0.22, 1, 0.36, 1)` | 0.5-0.6s | Floating, light |
| CL3 reveals | `cubic-bezier(0.16, 1, 0.3, 1)` | 0.7-1.2s | Weighted, pressure-driven |
| Hover interakcije (oba moda) | Landing easing | 0.2-0.3s | Responsive |
| Chat messages | Landing easing | natural | Conversational |

**Landing motion:** "Follow me." **CL3 motion:** "I am showing you."

#### Chamber-Specific Motion

**Arrival:**
- Identity: exposure from darkness — non-linear opacity curve: slow 0→0.15, fast 0.15→0.85, gentle 0.85→1.0. `translateY: 8px→0` (max). Duration 1.0-1.2s. Gravity easing. Delay 200-400ms posle atmospheric compression.
- Positioning: 0.8s, 300-400ms delay after identity, `translateY: 6px→0`
- Chat terminal: 0.6s, materializes in place (no translate), 500-600ms delay. Border glow fade 0.8s.

**Pull-quote:** opacity 0→1 over 1.0s (no translate — materializes). Highlighted words 200ms delay. Glow breathing: ambient, imperceptible.

**The Build:**
- Context: `opacity 0→1, translateY 30px→0`, 0.8s, gravity easing
- Screenshots: aperture clip-path `inset(50% 50% 50% 50%)→inset(0%)`, 0.9-1.1s + border glow fade synchronized. Stagger 0.3s između multiple screenshots.
- Key moments: 0.7s each, stagger 0.25-0.3s
- Architecture: scroll-driven, nodes `opacity 0.12→1.0` over 0.5s, line-draw `strokeDashoffset` 0.4s/segment. Total activation 1.5-2.0s.

**The System:** Capabilities cascade — `opacity 0→1, translateY 20px→0`, 0.6s, stagger 0.15-0.2s. Left-edge line: `scaleY 0→1` (transform-origin top), 0.4s synchronized. Stack/process simple opacity 0.5-0.6s.

**Signal Out:** Heading 1.0s + `translateY 12px→0`. Button 0.8s, 400ms delay, materializes (no translate). Border glow 1.0s. Atmospheric vignette release: scroll-driven.

#### Zabranjeno u CL3 (permanent)

| Zabranjeno | Zašto |
|---|---|
| Infinite bounce | Childish, breaks gravity |
| Identičan MotionReveal 20+ elemenata | Template feeling |
| Parallax | Landing: ±3px na portretu. CL3: nema — gravity, ne float |
| Glitch na čitljivom sadržaju | Rezervisan za surname hover i terminal boot |
| Particles/sparkles na hover | Gaming aesthetic |
| Fast stagger >5 items | Cascade waterfall animation demo look |
| CSS blur/filter transitions | Animating `blur()` causes paint storms |
| Spring physics / bouncy easing | CL3 = gravity easing, nikad overshoot |
| Constant pulsing borders | Borders su strukturalni, ne animiraju |

**Motion test:** "If I remove this animation and show the element at final state, does the page lose meaning?" Ako ne — dekorativno, ukloni.

### D.7 Content & UX Logic

**One message per chamber:** Arrival = "I am here." · Pull-quote = "This is the standard." · The Build = "I built this." · The System = "I can build more." · Signal Out = "Let's work."

**Maximum density:** Arrival 3 · Pull-quote 1 · The Build 4 · The System 3 · Signal Out 2

**Focus progression:**

| Chamber | Primary Focus | Absent |
|---|---|---|
| Arrival | Identity, presence | Proof, capabilities, trust signals |
| Pull-quote | Tone, authority | Everything else |
| The Build | Proof of execution | Services, methodology |
| The System | Breadth, methodology | Proof detail |
| Signal Out | Contact action | Everything above |

**Trust Logic:** Zero placeholder testimonials. Zero disabled buttons. Zero "soon" labels. Blank > fake. Proof je primarni trust signal.

**AI Chat target:** Integrated terminal below identity, empty start state, minimal chrome, no sample messages, no bounce animation. Backend (`/api/claude.ts`) solidan — samo frontend redesign.

**Atmospheric transitions između komora:** 120-200px dark transitions su dizajnirani. Nikad ih ne popunjavati dekorativnim elementima.

### D.8 Removal / Merge Matrix

| Element | Odluka | Gde sada |
|---|---|---|
| Live iframe (padrinobudva.com) | Remove | Screenshots u TheBuild |
| Trust pills ("4.9★ Upwork") | Remove | Gone entirely |
| CTA buttons iz Arrival zone | Remove (Arrival) | "Build Together" → Signal Out |
| AI chat interface | Transform | Structural terminal, prazno na startu |
| Systems tile grid | Transform+Merge | Capabilities list u TheSystem |
| Projects card | Merge | Context block u TheBuild |
| Flagship feature matrix + accordion | Merge | Key Moments u TheBuild |
| AnatomyOfBuild interactive SVG | Transform+Merge | Architecture flow u TheBuild |
| Process tile grid (5 steps) | Lower+Merge | One-line principle u TheSystem |
| Stack tile grid | Lower+Merge | Secondary signal line u TheSystem |
| Testimonials | Remove | Empty slot dok real ne postoje |
| Contact disabled buttons | Remove | Single email CTA |
| MatrixRain 55% | Transform | 15-25% opacity, deep background texture |
| Fragment explosion | Keep | Threshold ceremony, no changes |
| Terminal boot | Keep | Entry ritual, no changes |
| MotionReveal (uniform) | Transform | Chamber-specific motion per D.6 |
| cl3-mode-badge | Keep | Exit mechanism |

### D.9 Performance Specification

| Metric | Target |
|---|---|
| LCP (CL3 entry) | < 1.5s posle portal |
| First Input Delay | < 100ms |
| CLS | < 0.05 |
| Scroll frame rate | 60fps desktop, 30fps mobile min |
| JS task per scroll | No single task > 50ms |
| External resources u CL3 | Zero (no iframes, no external images) |
| Canvas layers u CL3 | Max 1 (MatrixRain reduced) |
| Simultaneous animated elements | Max 5 na ekranu |
| Lighthouse | ≥ 85 mobile, ≥ 90 desktop (achieved: 99/88 u Batch-R6) |
| Main JS bundle | ≤ 300K |

**Operational rules:**
- `will-change: transform` samo na elements koji animiraju u sledećem frame-u. Remove posle animacije. Max 3 simultano.
- Scroll handlers: `passive: true` ili Framer `useScroll`. Nikad `getBoundingClientRect()` u scroll handler-ima.
- Chamber loading: Ch1 immediate, Ch2 pre-render posle Ch1 mount, Ch3 kad Ch2 ulazi u viewport, Ch4 kad Ch3 ulazi.
- Images: WebP + JPEG fallback, `loading="lazy"`, serve at display size.
- Mobile: MatrixRain disabled <768px, fog layers reduce na 1, glow blur -40%, animation durations -20%.
- `prefers-reduced-motion`: all content visible at final state immediately. No animations. MatrixRain disabled. Fog/glow static.

---

*Last updated: 2026-05-02.*
*See [ROADMAP.md](ROADMAP.md) for current execution plan.*
*See [DECISIONS.md](DECISIONS.md) for deprecated specs, closed decisions, and phase history.*
