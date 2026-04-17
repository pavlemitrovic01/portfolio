# EVOLUTION.md — Self-Improvement Engine

> Ovo nije pasivan log. Ovo je aktivan sistem koji te čini boljim sa svakim projektom.
> Sekcija A se čita svaku sesiju (preko SYSTEM.md). Ostalo na kraju projekta.

---

## Sekcija A: Aktivne lekcije (max 10)

> Top 10 najvažnijih lekcija koje važe SADA.
> AI proverava ovih 10 na početku svakog execution taska.
> Kad naučiš novu — najslabija ispada ili se arhivira u Sekciju B.

### 1. AI scope inflation
**Pravilo:** U svakom planu jasno preseći: šta radimo SADA vs šta svesno ostaje za KASNIJE.
**Primer:** AI predloži 8 batch-eva za "mali CSS fix". Zapravo trebaš 2.
**Primena:** Plan uvek sadrži "RADIMO" i "NE RADIMO" sekciju.

### 2. Source-of-truth drift
**Pravilo:** Kad doc i kod ne pričaju istu priču, AI radi po pogrešnim pretpostavkama.
**Primer:** CLAUDE.md kaže Hero ima 3 CTA-a, repo ima 1.
**Primena:** Pri većim nastavcima rada — proveri da li CLAUDE.md i repo pričaju istu priču.

### 3. 1 tema = 1 batch
**Pravilo:** Za low/medium-risk rad, tema-based batching, ne file-by-file.
**Primer:** 5 mikro batch-eva za mobile footer → 1 batch "mobile footer polish".
**Primena:** Standard batch kao default za zatvorene UI teme.

### 4. QA pre deploy
**Pravilo:** Push je deo verify faze, ne opcija. DONE → build → push → smoke.
**Primer:** 12 commit-a ostalo lokalno jer push nije bio u workflow-u.
**Primena:** Svaki batch koji menja runtime završava sa push + smoke.

### 5. Audit ≠ implementacija
**Pravilo:** Posle audita trijaž pre implementacije: kritično → primetno → polish.
**Primer:** Audit nađe 20 problema, AI krene da rešava sve odjednom.
**Primena:** Uvek razdvoji audit findings od execution plana. Najmanji siguran batch prvi.

### 6. CSS shorthand oprez
**Pravilo:** `background:` shorthand resetuje sve sub-properties. Koristi `background-image:` kad dodaješ na postojeći element.
**Primer:** Dodao gradient sa `background:` — resetovao postojeći bg-color.
**Primena:** Svaki batch koji dodaje gradient na element koji već ima bg — koristi longhand.

### 7. Selector logika pre commit-a
**Pravilo:** Pre CSS override-a proveri da selektor uopšte može da matchuje DOM.
**Primer:** `body.cl3menza-mode body::after` — nemoguć selektor (body ne može biti descendant sam sebi).
**Primena:** Svaki override na pseudo-element body/html — dvostruko proveri selektorsku logiku.

### 8. Prvo stabilnost, pa polish
**Pravilo:** Ne juri peak rezultat pre nego što su osnove zatvorene. Prvo operativno pouzdano, pa onda savršeno.
**Primer:** Više iteracija oko workflow sistema pre nego što se osnovne rutine do kraja zaključaju.
**Primena:** Zatvori 3-5 realnih ciklusa, izvuci pattern, tek onda refiniši pravila.

### 9. AI mora dobiti ograničenja, ne samo cilj
**Pravilo:** Samo "šta hoću" nije dovoljno. Mora i: šta ne sme, iz čega radi, kojim redosledom, kako potvrđuje, kako prijavljuje rizik.
**Primer:** Claude dobiješ cilj bez scope-a → širi se, nagađa, optimizuje van zahteva.
**Primena:** Svaki prompt za execution mora imati: cilj + scope + zabrane + verify + stop uslove.

### 10. Minimalni fix → verifikacija → tek onda dalje
**Pravilo:** U debuggingu: 1 dokaz → 1 hipoteza → 1 minimalna promena → verifikacija. Debugging nije mesto za kreativnu optimizaciju.
**Primer:** Bugfix postane refactor jer AI "usput sredi" okolni kod.
**Primena:** Kad radiš bugfix, SAMO bugfix. Sve "usputno" ide u zaseban batch.

---

## Sekcija B: Projekat retrospektive

> Popunjavas posle SVAKOG završenog projekta. Nema preskakanja.

### Template za retrospektivu:

```
### [Ime projekta] — [datum završetka]

**Šta je išlo dobro:**
-

**Šta je išlo loše:**
-

**Šta bih uradio drugačije:**
-

**Estimation accuracy:** Procenio [X]h → stvarno [Y]h → razlika [Z]%

**Nova lekcija za Sekciju A:**
[Da/Ne — ako da, koja zamenjuje koju?]

**Client satisfaction:** [1-5 + komentar]
```

---

### cl3menza portfolio — [u toku]

**Šta je išlo dobro:**
- Batch sistem sprečio scope chaos
- Layered AI docs (CLAUDE.md → rules → lessons) radio dobro
- 53/53 testova zeleno pre svake faze
- Lighthouse: A11y 100, SEO 100, Best Practices 100

**Šta je išlo loše:**
- 12 commit-a ostalo nepush-ovano — production bio daleko iza
- Creative Bible narastao na 700+ linija — teško za čitanje
- CL3 Roadmap 1600+ linija — prevelik za jedan dokument
- Nema estimation tracking-a — ne znam koliko sati je uloženo

**Šta bih uradio drugačije:**
- Push posle svakog batch-a od prvog dana
- Creative Bible razbiti na manje sekcije po temi
- Voditi time tracking od početka
- Razdvojiti univerzalna pravila od projekat-specifičnih ranije

**Estimation accuracy:** Nije praćeno — ovo je prvi projekat.

**Nova lekcija za Sekciju A:** Više lekcija već migrirano (1-7 iznad).

---

## Sekcija C: Workflow changelog

> Kad god menjaš sam workflow sistem, upiši šta, zašto, efekat.

### 2026-04-15 — v2.0: Kompletna rekonstrukcija workflow-a

**Šta:** Razdvojen univerzalni workflow od projekat-specifičnih fajlova. Kreiran SYSTEM.md, AI_RULES.md, PLAYBOOK.md, EVOLUTION.md, ESTIMATION.md. Templates za kickoff, brief, closeout, CLAUDE.md. cl3menza fajlovi arhivirani u projects/cl3menza/.

**Zašto:** Stari sistem bio hardkodiran za jedan projekat. Nije prenosiv. Nema client workflow-a. Nema estimation-a. Self-improvement bio pasivan log.

**Očekivani efekat:** Svaki novi projekat kreće za 15 min umesto sat vremena. Lekcije se aktivno primenjuju. Estimation postaje preciznija sa svakim projektom.

---

## Sekcija D: Estimation metrike

> Popunjavaj posle svakog projekta. Vremenom daje sve precizniju procenu.

| Projekat | Tip | Procena (h) | Stvarno (h) | Razlika (%) | Napomena |
|----------|-----|-------------|-------------|-------------|----------|
| cl3menza portfolio | Portfolio sajt | — | — | — | Nije praćeno |
| | | | | | |

> Kad skupiš 5+ projekata, izračunaj prosečnu razliku i koriguj ESTIMATION.md.
