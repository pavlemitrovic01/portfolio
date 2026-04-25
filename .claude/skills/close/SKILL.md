---
name: close
description: Zatvara batch ili sesiju. Generiše DONE report, append CLOSE entry u LOG.md, ažurira STATE.md "Gde sam sada". Confirmation gate pred Pavlom — ne piše ništa bez OK. Spaja ulogu starih cl3-done-report i cl3-session-close skillova u jedan.
---

# close — Batch / Session Closure

## Uloga

Formalizuje kraj batch-a ili sesije. Sprečava da sesije ostaju "otvorene" bez jasnog statusa.
Generiše DONE report → Pavle odobrava → izvršava tačno **2 write-a**: LOG entry append + STATE.md "Gde sam sada" overwrite.

**Nije /plan.** Ne planira sledeći batch. Samo zatvara trenutni.

## Kako pozvati

```
/close
```

Nema obaveznih argumenata. Skill sam prikuplja podatke iz sesijskog konteksta i fajlova.

---

## Proces

### Korak 1 — Prikupljanje podataka

Pročitaj direktno (bez spawna ako je ispod threshold-a):

1. `workflow/STATE.md` — aktivan batch (ID, GOAL, TIER, FILES iz plana), lock zone
2. `workflow/LOG.md` — zadnjih ~50 linija (dedup provera + poslednji entry)
3. `workflow/projects/[aktivni-projekat]/CONTEXT.md` — projekat istine

**Iz sesijskog konteksta izvuci:**
- Koji fajlovi su menjani u ovoj sesiji (Edit/Write tool pozivi)
- Build / typecheck output (ako je pokrenuto i viđeno)
- Manual verify rezultati (ako je Pavle vizuelno potvrdio nešto)

**Ako nema dokaza za FILES** → označi `AI-asserted (bez git dokaza)`. Nikad ne izmišljaj listu fajlova.

**Ako STATE.md kaže `Aktivan batch: NONE`:**
- Verovatno je session-close case (nije bio formalan batch, samo rad)
- Generiši DONE report kao SESSION CLOSE (ne BATCH CLOSE)
- LOG entry je opciono — pitaj Pavla da li želi entry za session ili samo STATE refresh

---

### Korak 2 — DONE report

Svako polje obavezno. Ako nema sadržaja → `NONE`.

**Verification truth-types su obavezne:**
- `PASS(machine)` — build/typecheck output viđen i prošao u ovoj sesiji
- `PASS(human)` — Pavle vizuelno potvrdio u ovoj sesiji
- `AI-asserted` — pretpostavka bez novog dokaza
- `NIJE POKRENUTO` — nije ni pokušano

```
════════════════════════════════
DONE:     [jedna rečenica — šta je zatvoreno]

BATCH ID: [ID iz STATE.md ili "SESSION (no formal batch)"]

FILES:
  - [src/path/fajl.tsx] — [šta je promenjeno]
  (ako nema: NONE)
  (ako nema git dokaza: AI-asserted — [verovatni fajlovi bez potvrde])

VERIFY:
  - build:     [PASS(machine) / FAIL / AI-asserted / NIJE POKRENUTO]
  - typecheck: [PASS(machine) / FAIL / AI-asserted / NIJE POKRENUTO]
  - manual:    [PASS(human): šta je Pavle proverio / AI-asserted / NONE]

COMMIT:   [SHA-ovi iz sesije — ili NONE / UNKNOWN]

BLOCKERS:
  - [otvoren: B-XXX (opis) / zatvoren: B-XXX / NONE]

NEXT:     [sledeći konkretan task ili batch]

LEARNED:  [jedna rečenica vredna pamćenja — ili NONE]
════════════════════════════════
```

---

### ⚠ CONFIRMATION GATE

Pre bilo kakvog write-a — prezentuj DONE report Pavlu.

**Eksplicitno čekaj signal:** "ok", "piši", "važi", "confirmed" ili ekvivalent.

Dok Pavle ne potvrdi → ne piši ništa:
- ne CLOSE entry u LOG.md
- ne STATE.md update
- ne LESSONS.md append (čak i ako LEARNED nije NONE)

**Ako batch nije spreman za closure** (BUILD FAIL, VERIFY nije prošao, scope nije zatvoren, open stop condition):
→ reci to eksplicitno. **Ne prikazuj confirmation prompt.** Čekaj Pavlovu odluku.

**Ako Pavle želi LEARNED da se upiše u LESSONS.md** → eksplicitno mora da kaže "upiši u lessons". Default: ne dira LESSONS.md.

---

### Korak 3 — Write sekvenca (posle Pavle OK)

Tačno **2 write-a**. Atomski. Ako prvi pukne — stani, ne pokušavaj drugi.

---

#### Write 1 — Append CLOSE entry u LOG.md

**Pre-write dedup provera (obavezna):**
Pročitaj zadnjih 80 linija `workflow/LOG.md`.
Traži entry koji sadrži i `[Batch ID]` i `[CLOSE]` u headeru.
Ako postoji → **STOP. Ne piši ništa.**
Prijavi: `⚠ CLOSE entry za [batch ID] već postoji u LOG.md — /close je verovatno već bio pokrenut.`
Ako ne postoji → nastavi.

Construiši CLOSE entry:

```
### [YYYY-MM-DD] — [Batch ID] — [Naziv] [CLOSE]

STATUS:   [DONE / DONE(technical only) / BLOCKED / ABANDONED]
TIER:     [iz aktivnog batcha]
GOAL:     [verbatim iz plana]
FILES:    [iz DONE reporta — sa truth-type oznakom ako AI-asserted]
COMMIT:   [iz DONE reporta]
VERIFY:
  - build:     [iz DONE reporta]
  - typecheck: [iz DONE reporta]
  - manual:    [iz DONE reporta]
LEARNED:  [iz DONE reporta]
NOTES:    [opciono — šta je ostalo van scope-a, sledeći batch]
```

Spawn `scout` sa append operacijom:

```
TASK:      append
WRITE_TO:  workflow/LOG.md
POSITION:  end-of-file
CONTENT:   [CLOSE entry — verbatim]
FORBIDDEN: ne menjaj ništa van append pozicije, ne interpretiraj sadržaj, ne normalizuj whitespace
```

**Ako ima blocker promena (otvoren ili zatvoren):**
Append i BLOCKER entry kao zaseban entry u istom write-u (jedan append, dva entry-ja jedan za drugim).

```
### [YYYY-MM-DD] — BLOCKER OPEN — [B-XXX]
[ili]
### [YYYY-MM-DD] — BLOCKER RESOLVED — [B-XXX]

[polja iz LOG.md format-a za blocker]
```

**Post-write verifikacija:**
Pročitaj zadnjih 50 linija LOG.md. Potvrdi da CLOSE entry postoji i da Batch ID odgovara.
Ako ne → `⚠ CLOSE entry write verify failed.` Stani, ne pokušavaj Write 2.

---

#### Write 2 — STATE.md "Gde sam sada" overwrite

Pre spawna:
1. Pročitaj `workflow/STATE.md`, izvuci tačan `## Gde sam sada` blok (verbatim, do sledećeg `##` headera).
2. Generiši nov "Gde sam sada" blok:

```
## Gde sam sada

**Poslednji završen:** [Batch ID] — [naziv] ([datum])
**Sledeći:** [iz NEXT polja DONE reporta]
**Aktivan batch:** NONE (čeka /plan)
**Blocker:** [ažurirano stanje — ili NONE]
```

Spawn `scout` sa exact-edit:

```
TASK:       exact-edit
WRITE_TO:   workflow/STATE.md
OLD_STRING: [tačan postojeći "## Gde sam sada" blok — verbatim]
NEW_STRING: [novi blok — verbatim]
FORBIDDEN:  ne menjaj ništa van OLD_STRING → NEW_STRING zamene, ne interpretiraj sadržaj, ne normalizuj whitespace
```

**Post-write verifikacija:**
Pročitaj STATE.md "Gde sam sada" sekciju. Potvrdi da `Poslednji završen:` polje sada sadrži batch koji je upravo zatvoren.
Ako ne → `⚠ STATE.md write verify failed.` Prijavi i čekaj odluku.

---

### Korak 4 — Final report Pavlu

Posle uspešnih oba write-a, prijavi kratko:

```
✅ CLOSED: [Batch ID]
  - LOG.md: CLOSE entry appended
  - STATE.md: "Gde sam sada" updated → "Poslednji završen: [Batch ID]"
  - Sledeći: [iz NEXT polja]
```

Ako bilo koji write nije uspeo → ne prijavljuj ✅. Prijavi tačno koji korak je pukao i zašto.

---

## Pravila

- Tačno 2 write-a. Ne više, ne manje.
- Ne piši ništa pre Pavlovog confirmation signala.
- Ne izmišljaj šta je urađeno — FILES mora biti pokriven dokazom ili `AI-asserted`.
- Verification truth-type oznake su obavezne — ne piši golo `PASS`.
- `scout` dobija sadržaj verbatim — nikakve izmene između generisanja i write-a.
- Ne diraj LESSONS.md osim ako Pavle eksplicitno traži.
- Ako batch nije spreman za closure → ne prikazuj confirmation prompt, objasni zašto.
- Ne zatvaraj batch samo zato što skill to "ume" — uvek je potrebna Pavle confirmation.
- Datum mora biti tačan (today's date).
- Ako Write 1 pukne → ne pokušavaj Write 2.
