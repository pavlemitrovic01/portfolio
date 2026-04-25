---
name: cl3-done-report
description: Formalizuje zatvaranje taska ili sesije. Prikuplja dokaze, generiše DONE report i predlog sync-a za CLAUDE.md/batch-log/session-brief/BLOCKERS/Roadmap. Confirmation gate pred Pavlom — tek onda piše, u ispravnom redosledu.
---

# cl3-done-report — Task Closure Report

## Uloga

Formalizuje kraj taska. Sprečava da sesije ostaju "otvorene" bez jasnog statusa.
Generiše report — Pavle odobrava — zatim izvršava sve write-ove u ispravnom redosledu.

## Kako pozvati

```
/cl3-done-report
```

Nema obaveznih argumenata. Skill sam prikuplja podatke iz sesijskog konteksta i fajlova.

---

## Proces

### Korak 1 — Prikupljanje podataka

Pročitaj sledeće fajlove (direktno — bez spawna ako su ispod threshold-a):

1. `workflow/projects/cl3menza/active-batch.md` — GOAL, FILES, TIER, VERIFY spec
2. `workflow/projects/cl3menza/batch-log.md` — postoji li OPEN entry za ovaj batch? (ID)
3. `workflow/projects/cl3menza/CLAUDE.md` — `## Current status` blok (target za update)
4. `workflow/projects/cl3menza/BLOCKERS.md` — da li je ovaj batch otvorio ili zatvorio blocker
5. `workflow/projects/cl3menza/session-brief.md` — trenutno stanje (za post-closure update)
6. Roadmap Section 13 tracking tabela — da li treba ažurirati status ćeliju zatvorenog batch-a

**Git evidence — pokušaj, ne izmišljaj:**
- Pokuša prikupiti stvarno menjane fajlove iz sesijskog konteksta (tool pozivi, Edit/Write calls, diff output).
- Ako nema dokaza → FILES polje u DONE reportu označiti sa `AI-asserted (bez git dokaza)`.
- Nikad ne izmišljati listu fajlova kao da je machine-verified.

**Ako sesijski kontekst nije dovoljan** (posle compact-a):
- `active-batch.md` je primarna fallback tačka za GOAL/FILES/TIER
- Ako `STATUS: bootstrap` u active-batch.md → nema realnih podataka → rekonstruiši iz razgovora
- Nikad ne izmišljaj GOAL — pitaj Pavla
- Ako fajl ne postoji ili je prazan → batch je bio LEAN → rekonstruiši iz konteksta

Ako nešto nije jasno → postavi jedno konkretno pitanje pre nastavka.

---

### Korak 2 — DONE report

Svako polje je obavezno. Ako nema sadržaja → `NONE`.

**VERIFY polje — verification truth-type oznake su obavezne:**
- `PASS(machine)` — build/typecheck output viđen i prošao u ovoj sesiji
- `PASS(human)` — Pavle vizuelno potvrdio u ovoj sesiji
- `AI-asserted` — AI pretpostavlja bez novog dokaza u ovoj sesiji
- `NIJE POKRENUTO` — nije ni pokušano

```
════════════════════════════════
DONE:
  [Jedna rečenica — šta je zatvoreno]

FILES:
  - [src/path/fajl.tsx] — [šta je promenjeno]
  (ako nema: NONE)
  (ako nema git dokaza: AI-asserted — [verovatni fajlovi bez potvrde u sesiji])

VERIFY:
  - build:     [PASS(machine) / PASS(human) / FAIL / AI-asserted / NIJE POKRENUTO]
  - typecheck: [PASS(machine) / PASS(human) / FAIL / AI-asserted / NIJE POKRENUTO]
  - manual:    [PASS(human): šta je Pavle proverio — ili AI-asserted — ili NONE]

BATCH-LOG STATUS:
  - OPEN entry: [DA — ID: [X] / NE — nema OPEN entry / RETROACTIVE_BOOTSTRAP]

BLOCKERS:
  - [otvoren: B-XXX / zatvoren: B-XXX / NONE]

NEXT:
  - [sledeći konkretan task ili batch]
  - blocker: [ako postoji — ili NONE]

LEARNED:
  [Jedna rečenica vredna pamćenja — ili "ništa za ovaj task"]
════════════════════════════════
```

**LEARNED destinacija:**
- Report-only — ne upisuje se nigde automatski.
- Ako Pavle eksplicitno kaže "ovo upiši u lessons" → spawni cl3-scout sa `OPERATION: append` u `workflow/projects/cl3menza/LESSONS.md`.
- Default: ne diraj LESSONS.md.

---

### Korak 3 — Predlog CLAUDE.md status update-a

Odmah nakon DONE reporta, generiši kompletan tekst za `Current status` sekciju:

```
════════════════════════════════
PREDLOG ZA CLAUDE.md STATUS UPDATE

## Current status (YYYY-MM-DD)

**Fokus:** [aktivan fokus]
**Poslednji završen:** [šta je zatvoreno u ovoj sesiji]
**Aktivni plan:** `CL3_Planet_Reconstruction_Master_Roadmap.md`

**[naziv batch-a ili sesije] — CLOSED:**
- [bullet: šta je završeno]

**Sledeći korak:** [konkretan sledeći task ili batch]

> Ažuriraj ovo na kraju SVAKE sesije.
════════════════════════════════
```

**Format napomene:**
- `## Current status` — h2 markdown, ne bold
- Trailing `> Ažuriraj...` linija je obavezna (anchor za verify)
- Pending sekcija opciona — dodaj samo ako postoji relevantan pending iz prethodnog statusa

---

### ⚠ CONFIRMATION GATE

Pre bilo kakvog write-a — prezentuj Pavlu DONE report i CLAUDE.md predlog.

**Eksplicitno čekaj signal.** Prihvatljivi signali: "ok", "piši", "važi", "confirmed" ili ekvivalent.

Dok Pavle ne potvrdi → ne piši ništa:
- ne CLOSE entry u batch-log.md
- ne CLAUDE.md sync
- ne session-brief.md sync
- ne BLOCKERS.md sync
- ne Roadmap sync

**Ako batch nije spreman za closure** (BUILD FAIL, VERIFY nije prošao, scope nije zatvoren, open stop condition):
→ reci to eksplicitno, ne prikazuj confirmation prompt. Čekaj Pavlovu odluku.

---

### Korak 4 — Write sekvenca (posle Pavle confirmation)

Izvršavaj u ovom redosledu. Svaki korak je atomičan — ako pukne, zaustavi se i prijavi pre nastavka.

---

#### 4a — Append CLOSE entry u batch-log.md

**Pre-write CLOSE dedup provera (obavezna):**
Pročitaj zadnjih 80 linija `workflow/projects/cl3menza/batch-log.md`.
Traži entry koji sadrži i `ID:` vrednost aktivnog batch-a i `[CLOSE]` u naslovu ili `STATUS: DONE`.
Ako takav entry postoji → **STOP. Ne piši ništa.**
Prijavi: `⚠ CLOSE entry za [batch ID] već postoji u batch-log.md — done-report je verovatno već bio pokrenut. Verifikuj stanje pre nastavka.`
Ako ne postoji → nastavi.

Proveri pre pisanja: postoji li OPEN entry za ovaj batch u batch-log.md?
- Ako DA → ID u CLOSE entry-ju = isti ID kao OPEN entry
- Ako NE (retroaktivni batch bez OPEN) → dodaj CLOSE entry; u NOTES napomeni `Nema OPEN parnjaka`

Construiši CLOSE entry:

```
### [BATCH_ID] — [TITLE] [CLOSE]

ID:          [isti ID kao OPEN entry]
STATUS:      [DONE / DONE(technical only) / BLOCKED / ABANDONED]
CLOSED:      [currentDate — YYYY-MM-DD]
SOURCE:      LIVE
COMMIT(S):   [SHA-ovi iz sesijskog konteksta — ili UNKNOWN]
FILES:       [iz DONE reporta — sa truth-type oznakom ako AI-asserted]
VERIFY:      [iz DONE reporta — sa truth-type oznakama]
LEARNED:     [iz DONE reporta]
NOTES:       [opciono — šta je ostalo van scope-a, sledeći batch itd.]
```

Spawni cl3-scout u write-spawn modu:
```
TASK:       exact-edit
WRITE_TO:   workflow/projects/cl3menza/batch-log.md
OLD_STRING: [tačan `---\n\n## ENTRY TEMPLATES` blok — verbatim iz fajla]
NEW_STRING: [---\n\n### [BATCH_ID] — [TITLE] [CLOSE]\n\n[CLOSE entry sadržaj]\n\n---\n\n## ENTRY TEMPLATES]
FORBIDDEN:  ne diraj stare entry-je, ne menjaj ništa van INSERT tačke
```

---

#### 4b — CLAUDE.md current status sync

Pre spawna:
1. Pročitaj `workflow/projects/cl3menza/CLAUDE.md`, izvuci tačan `## Current status` blok (verbatim, uključujući whitespace i newline-ove).
2. Pripremi NEW_STRING iz Koraka 3.

Proveri koliko `## Current status` blokova postoji u fajlu:

| Case | Stanje | Akcija |
|------|--------|--------|
| **A** | Tačno jedan | Standardni exact-edit spawn |
| **B** | Nijedan | Direktan Write od Sonnet/Opus-a, ubaci na kraj fajla pre EOF. Prijavi: "Prvi status write — pišem direktno." |
| **C** | Više od jednog | **STOP.** Prijavi: "⚠ Više `## Current status` blokova — manualno čišćenje pre write-a." Čekaj odluku. |

Za Case A — spawni cl3-scout:
```
TASK:       exact-edit
WRITE_TO:   workflow/projects/cl3menza/CLAUDE.md
OLD_STRING: [tačan postojeći blok — verbatim]
NEW_STRING: [novi status tekst iz Koraka 3 — verbatim]
FORBIDDEN:  ne menjaj ništa van OLD_STRING → NEW_STRING zamene, ne interpretiraj sadržaj, ne normalizuj whitespace
```

---

#### 4c — session-brief.md sync

Ažuriraj session-brief.md da odražava novo stanje posle closure:
- "Aktivni batch" sekcija: ažuriraj na sledeći batch ako je poznat, ili napiši `NONE — čeka se sledeći batch`
- "Batch status pregled" tabela: ažuriraj status red za zatvoreni batch
- "Sledeći koraci": ažuriraj po prioritetu
- Header "Poslednji update": currentDate

Spawni cl3-scout sa exact-edit za svaku promenjenu sekciju posebno. Ne radi bulk rewrite celog fajla.

---

#### 4d — BLOCKERS.md sync (gated)

Piši SAMO ako važi bar jedno:
- batch je otvorio novi blocker (potvrđeno u DONE reportu — BLOCKERS polje)
- batch je zatvorio postojeći blocker (Pavle je eksplicitno potvrdio u closure confirmation-u)

Ako ni jedno ne važi → preskoči 4d u potpunosti.

Ako piše:
- **Novi blocker:** dodaj B-XXX entry u `## ACTIVE BLOCKERS` sekciju
- **Zatvoren blocker:** ažuriraj STATUS → `RESOLVED`, dodaj `UNBLOCKED: [currentDate]`

Spawni cl3-scout sa exact-edit.

---

#### 4e — Roadmap Section 13 tracking sync (minimalni)

Ažuriraj samo status ćeliju u tabeli za zatvoreni batch.
Primer: `| ACTIVE |` → `| DONE |` ili `| DONE (technical only) |`

```
TASK:       exact-edit
WRITE_TO:   workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md
OLD_STRING: [tačan red tabele iz Section 13 — verbatim]
NEW_STRING: [isti red sa ažuriranom Status ćelijom]
FORBIDDEN:  ne diraj ostale redove, ne menjaj strukturu tabele, ne diraj ništa van Section 13 tracking tabele
```

---

#### 4f — active-batch.md post-close state (obavezno)

Ažuriraj samo `STATUS:` polje u active-batch.md:

```
TASK:       exact-edit
WRITE_TO:   workflow/projects/cl3menza/active-batch.md
OLD_STRING: STATUS: active
NEW_STRING: STATUS: closed
FORBIDDEN:  ne menjaj nijedno drugo polje
```

Fajl ostaje kao referenca za zatvoreni batch. Jedino `STATUS: closed` signalizira da batch nije aktivan.

**Ovo se izvršava automatski kao deo confirmed CLOSE sekvence — ne čeka poseban Pavle prompt.**
Jedini izuzetak: ako active-batch.md STATUS već nije `active` (npr. već `closed` ili `bootstrap`) → preskoči i prijavi: `active-batch STATUS je već [vrednost] — 4f preskočen.`

---

### Korak 5 — Post-write verifikacija

Verifikuj redom svaki izvršeni write. Ako korak nije bio izvršen (preskočen) → ne verifikuj ga.

**4a — batch-log CLOSE:**
Pročitaj zadnjih 50 linija batch-log.md. Potvrdi da CLOSE entry postoji i da `ID:` odgovara.
- OK → nastavi
- FAIL → `⚠ CLOSE entry nije u batch-log.md — failed write.` Čekaj odluku.

**4b — CLAUDE.md:**
Pročitaj `## Current status` blok (anchor: `## Current status` → `> Ažuriraj ovo na kraju SVAKE sesije.`).
Uporedi sa NEW_STRING karakter po karakter.

| Ishod | Stanje | Akcija |
|-------|--------|--------|
| **V-OK** | Slaže se | Potvrdi: "Status upisan i verifikovan." |
| **V-MISMATCH** | Postoji ali se ne slaže | `⚠ CLAUDE.md verify mismatch — [razlika].` Čekaj odluku. |
| **V-GHOST** | Scout OK ali blok ne postoji | `⚠ Haiku OK ali blok ne postoji.` Čekaj odluku. |
| **V-DOUBLE** | Više blokova posle write-a | `⚠ Više blokova posle write-a.` Čekaj odluku. |

**4c — session-brief.md:**
Pročitaj "Aktivni batch" i "Batch status pregled" sekcije. Potvrdi da odražavaju novo stanje.
- OK → nastavi
- MISMATCH → `⚠ session-brief verify mismatch.` Čekaj odluku.

**4d/4e — BLOCKERS i Roadmap:**
Ako su bili izvršeni — pročitaj relevantnu sekciju i potvrdi da je izmena prisutna.

**4f — active-batch.md:**
Pročitaj active-batch.md, proveri da `STATUS: closed` postoji.
- OK → nastavi
- FAIL → `⚠ active-batch.md STATUS nije ažuriran — batch može biti pogrešno čitan kao active.` Čekaj odluku.

**Ako cl3-scout vrati FAILED na bilo kom koraku:**
```
⚠ WRITE-SPAWN FAILED
step:     [4a / 4b / 4c / 4d / 4e]
file:     [ciljni fajl]
reason:   [reason iz FAILED output-a]
```
Ne pokušavaj automatski fix. Ne širi pretragu. Čekaj Pavlovu odluku.

---

## Pravila

- Ne piši ništa pre Pavlovog confirmation signala (Korak 3 gate).
- Ne izmišljaj šta je urađeno — FILES mora biti pokriven dokazom ili označen `AI-asserted`.
- Verification truth-type oznake su obavezne — ne piši golo `PASS` bez tipa za build/typecheck.
- cl3-scout dobija sadržaj verbatim — nikakve izmene između Koraka 3 i write-a.
- Post-write verifikacija (Korak 5) je obavezna za svaki izvršeni write.
- Ako batch nije spreman za closure → ne prikazuj confirmation prompt, objasni zašto.
- Ne zatvori batch samo zato što skill to "ume" — uvek je potrebna Pavle confirmation.
- Datum mora biti tačan (koristi currentDate iz memorije ako je dostupan).
