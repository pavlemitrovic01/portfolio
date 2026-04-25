---
name: plan
description: Generiše LEAN/STANDARD/STRICT batch plan za konkretan task. Primenjuje RULES.md disciplinu — tier, scope, forbidden, verify, rizici. Koristi scout za context gathering samo iznad threshold-a (>500 linija, >3 fajla, cross-file). Ne izvršava — samo planira.
---

# plan — Batch Plan Generator

## Uloga

Pretvara opis taska u kompletan execution brief po RULES.md sistemu.
Sprečava scope creep i nedefinisane granice pre nego što execution počne.

## Kako pozvati

```
/plan [opis taska]
```

Opciono: navedi tip taska (`bugfix`, `feature`, `polish`, `refactor`, `docs`).

---

## Proces

### Korak 0 — Read STATE i CONTEXT

Pre planiranja **uvek** pročitaj direktno:
1. `workflow/STATE.md` — aktivan batch (mora biti NONE pre planiranja novog), lock zone
2. `workflow/projects/[aktivni-projekat]/CONTEXT.md` — projekat istine, ključni fajlovi

Ako STATE.md pokazuje aktivan batch (`Aktivan batch:` ≠ NONE) → **STOP. Prijavi:**
`⚠ Aktivan batch detektovan u STATE.md. Pokreni /close pre planiranja novog batch-a.`

### Korak 1 — Context check (scout spawn samo ako je opravdano)

Spawn `scout` (Haiku) samo ako važi bar jedno:
- ukupno **>500 linija** za čitanje
- **>3 fajla**
- cross-file grep / search / inventory
- veliki workflow dokument (Roadmap / Bible) — koristi `/doc-lens` umesto direktnog spawna

Ispod toga: čitaj direktno sa `view` tool-om. Nemoj spawnovati Haiku za 2 fajla × 50 linija — overhead je veći od dobitka.

**Threshold u praksi:**

| Case | Odluka |
|------|--------|
| 2 fajla × 60 linija | direktno |
| 3 fajla × 100 linija | direktno (na granici, ne preko) |
| 4 fajla × 50 linija | spawn (>3 fajla) |
| 1 fajl × 800 linija | spawn (>500 linija) |
| Grep simbola kroz src/ | spawn (cross-file) |
| Roadmap (1600 linija) | `/doc-lens` |
| 1 fajl × 200 linija targeted | direktno |

Threshold je mehanički, ne judgment call.

### Korak 2 — Tier klasifikacija

| Tier | Kriterijumi |
|------|-------------|
| LEAN | Low-risk: CSS, content, mali fix, polish. Max 5 fajlova. Nema lock zona. Nema novih dependency-ja. |
| STANDARD | Srednji rizik: component interakcije, više povezanih fajlova, state-aware UI. |
| STRICT | Lock zone. Arhitektura. State orchestration. Nejasni bugovi. Kritični tokovi. |

**Ako task dotiče lock zonu → automatski STRICT, bez exception-a.**
Pavle može override.

### Korak 3 — Scope definicija

- **CORE** — šta sigurno radiš
- **FLEX** — smeš dodati samo ako je nužno za correctness
- **FORBIDDEN** — ne diraš

### Korak 4 — Output

Svako polje obavezno. Ako nema sadržaja → `NONE`.

---

**LEAN output:**

```
────────────────────────────────
TIER:      LEAN
GOAL:      [jedna rečenica — šta se zatvara]
FILES:     [lista]
RISK:      [jedan konkretan rizik]
VERIFY:    [build / smoke / vizuelno]
FORBIDDEN: [šta ne diraš — ili NONE]
────────────────────────────────
```

---

**STANDARD output:**

```
────────────────────────────────
TIER:         STANDARD
BATCH TYPE:   [bugfix / feature / polish / refactor / docs]
BATCH ID:     [npr. Batch-R7-Phase-2]
GOAL:         [jedna rečenica]

CORE SCOPE:
  - [šta sigurno radiš]

FLEX SCOPE:
  - [šta smeš ako je nužno — ili NONE]

FORBIDDEN:
  - [šta ne diraš]

FILES:
  - [fajl1]
  - [fajl2]

RISK:
  1. [konkretan rizik]
  2. [konkretan rizik]

VERIFY:
  - build:     [šta očekuješ]
  - typecheck: [šta očekuješ]
  - manual:    [šta Pavle treba da proveri]

APPROVAL: [šta Pavle mora odobriti pre početka — ili NONE]
────────────────────────────────
```

---

**STRICT output:**

```
────────────────────────────────
TIER:              STRICT
BATCH TYPE:        [bugfix / feature / polish / refactor / docs]
BATCH ID:          [npr. Batch-R7-Phase-2]
GOAL:              [jedna rečenica]
LOCK ZONES HIT:    [lista lock zona — ili NONE]

CORE SCOPE:
  - [detaljan opis šta radiš]

FLEX SCOPE:
  - [samo uz eksplicitno odobrenje — ili NONE]

FORBIDDEN:
  - [šta ne diraš — uključi sve lock zone]

FILES:
  - [fajl1]
  - [fajl2]

RISK:
  1. [šta može pući i zašto]
  2. [šta može pući i zašto]

VERIFY:
  - [detaljan verify plan — korak po korak]

APPROVAL:
  - [šta mora biti odobreno pre svakog koraka]

STOP CONDITIONS:
  - [kada staneš i prijaviš pre nego što nastaviš]
────────────────────────────────
```

---

### ⚠ CONFIRMATION GATE

Posle generisanog plana — **stani**. Ne kreni execution. Ne piši u STATE.md.

Čekaj Pavlov signal:
- "ok", "piši", "važi" → nastavi sa Korak 5 (persist u STATE.md)
- "menjaj X" → koriguj plan i ponovo prezentuj
- bilo šta drugo → tretiraj kao odbacivanje, ne nastavljaj

---

### Korak 5 — Persist u STATE.md (samo STANDARD i STRICT, posle Pavle OK)

Za **LEAN** → preskoči ovaj korak. LEAN batch živi samo u sesijskom kontekstu i zatvara se kroz `/close` direktno.

Za **STANDARD** i **STRICT** → ažuriraj STATE.md "Gde sam sada" sekciju:

```
## Gde sam sada

**Poslednji završen:** [iz prethodnog stanja, ne menjaš]
**Sledeći:** [naziv batch-a]
**Aktivan batch:** [Batch ID] — [TIER] — [GOAL ukratko]
**Blocker:** [iz prethodnog stanja, ne menjaš]
```

Spawn `scout` u write-spawn modu sa `exact-edit`:

```
TASK:       exact-edit
WRITE_TO:   workflow/STATE.md
OLD_STRING: [tačan postojeći "## Gde sam sada" blok — verbatim, do sledećeg ## headera]
NEW_STRING: [novi "## Gde sam sada" blok sa ažuriranim "Aktivan batch" poljem]
FORBIDDEN:  ne menjaj ništa van OLD_STRING → NEW_STRING zamene, ne interpretiraj sadržaj, ne normalizuj whitespace
```

**Post-write verifikacija:**
Pročitaj STATE.md "Gde sam sada" sekciju. Potvrdi da `Aktivan batch:` polje sada sadrži novi batch ID.
Ako ne → `⚠ STATE.md write verify failed.` Čekaj odluku.

### Korak 6 — Append OPEN entry u LOG.md (samo STANDARD i STRICT)

Posle uspešnog STATE.md update-a — append OPEN entry u `workflow/LOG.md`:

```
### [YYYY-MM-DD] — [Batch ID] — [Naziv] [OPEN]

STATUS:   ACTIVE
TIER:     [LEAN/STANDARD/STRICT]
GOAL:     [verbatim iz plana]
FILES:    [lista iz plana]
COMMIT:   N/A (batch tek počinje)
NOTES:    OPEN entry. CLOSE entry ide kroz /close skill kad batch završi.
```

Spawn `scout` sa append operacijom:

```
TASK:      append
WRITE_TO:  workflow/LOG.md
POSITION:  end-of-file
CONTENT:   [OPEN entry — verbatim]
FORBIDDEN: ne menjaj ništa van append pozicije, ne interpretiraj sadržaj
```

**Post-write verifikacija:**
Pročitaj zadnjih 30 linija LOG.md. Potvrdi da OPEN entry postoji sa tačnim Batch ID.

---

## Pravila

- Nikad ne počinji execution. Samo planiraj.
- Ako task nije jasan → postavi **jedno** konkretno pitanje pre planiranja.
- Ako task dotiče lock zonu → automatski STRICT tier.
- Ako scope nije definisan → ne nagađaj. Pitaj.
- `scout` smeš spawnovati samo za read / grep / extract / dictated-write — nikad za odlučivanje.
- Persist (Korak 5+6) se radi SAMO za STANDARD i STRICT — LEAN preskače.
- Datum mora biti tačan (today's date).
