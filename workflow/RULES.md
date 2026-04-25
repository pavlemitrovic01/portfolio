# RULES.md — Pravila rada

> Claude Code čita ovo kad radi execution task.
> Pavle čita ovo kad nije siguran šta je sledeći korak.
> Univerzalno — važi za bilo koji projekat koji uđe u ovaj workflow.

---

## 1. Osnovno

**1 tema = 1 batch.**
**Razumej → planiraj → izvrši → verifikuj.**
**Repo > dokumentacija > memorija.**

---

## 2. Batch tieri

### LEAN
Low-risk: CSS, content, mali UI fix, polish. Max 5 fajlova. Nema lock zona. Nema novih dependency-ja.

```
GOAL:
FILES:
RISK:
VERIFY:
```

### STANDARD
Srednji rizik: component interakcije, više povezanih fajlova, state-aware UI.

```
GOAL:
CORE SCOPE:
FLEX SCOPE:
FORBIDDEN:
FILES:
RISK:
VERIFY:
APPROVAL:
```

### STRICT
Lock zone. Arhitektura. State orchestration. Nejasni bugovi. Kritični tokovi. Jači verify. Češći approval. Nema improvizacije.

**AI bira tier na osnovu rizika. Pavle može override.**

---

## 3. Scope discipline

Svaki task ima:
- **CORE** — šta sigurno radiš
- **FLEX** — smeš dodati samo ako je nužno za correctness
- **FORBIDDEN** — ne diraš bez eksplicitnog OK

---

## 4. Hard zabrane (bez eksplicitnog approval-a)

- ne dodaj nove dependency-je
- ne diraj lock zone
- ne radi env / schema / deploy promene
- ne refaktoriši van scope-a
- ne uvodi random pattern
- ne rešavaj "usput" stvari
- ne razbijaj low-risk temu na mikro korake bez razloga
- ne radi `/compact` ili `/clear` bez upozorenja

---

## 5. Pre izmene

- pročitaj fajl koji menjaš
- pročitaj minimalno potrebne okolne fajlove
- proveri postojeći pattern
- fokus na delta promenu, ne na ceo sistem

---

## 6. Tokom execution-a

- ne re-analiziraj ceo repo bez potrebe
- ne uvodi šire cleanup-e
- menjaj minimalno
- zadrži postojeće ponašanje osim ako je cilj drugačiji

---

## 7. Expansion pravilo

Kad se tokom rada pokaže da originalni scope nije dovoljan:

Ne radi: "kad sam već tu", "usput sam sredio još 4 stvari", "morao sam da refaktorišem".

Radi: stani → objasni problem → navedi tačne dodatne fajlove → razdvoji REQUIRED vs NICE TO HAVE → čekaj approval.

**REQUIRED** = bez toga batch nije ispravan.
**NICE TO HAVE** = lepši refaktor, čišći naming, dodatni polish. Ne ulazi bez approval-a.

---

## 8. Verifikacija — proporcionalna, ne mehanička

| Batch tip | Verifikacija |
|-----------|-------------|
| Docs-only | Tekstualna konzistentnost |
| Mali UI batch | Build + ručni smoke test |
| Interaction batch | Build + typecheck + flow test |
| High-risk batch | Build + typecheck + flow test + manual verify |

Batch nije zatvoren bez verifikacije.

### Verification truth-types (obavezni u svakom verify zapisu)

| Tip | Oznaka | Kada se koristi |
|-----|--------|----------------|
| Machine-verified | `PASS(machine)` | Build/typecheck output viđen i prošao u toj sesiji |
| Human-verified | `PASS(human)` | Pavle vizuelno potvrdio u toj sesiji |
| AI-asserted | `AI-asserted` | AI pretpostavlja bez novog dokaza u sesiji |
| Nije pokrenuto | `NIJE POKRENUTO` | Nije ni pokušano |

**Zabrana:** ne pisati golo `PASS` bez tipa. Ako output nije viđen u tekućoj sesiji → `AI-asserted` ili `NIJE POKRENUTO`.

---

## 9. Stop uslovi

Stani i prijavi pre nego što nastaviš:
- kontradikcija između koda i dokumentacije
- source-of-truth nije jasan ili je zastareo
- scope se proširio van plana
- build/typecheck pukne neočekivano
- promena bi dirala lock zonu
- nije siguran u root cause (debugging)
- treba nova dependency ili env promena

---

## 10. Fail-fast

Kad naiđeš na neočekivanu kontradikciju: ne krpi slepo, ne nastavljaj "da vidiš", ne povećavaj scope tiho.

Stani → prijavi šta si našao → zašto je problem → šta je sledeći siguran korak.

---

## 11. Minimalni fix u debuggingu

1 dokaz → 1 hipoteza → 1 minimalna promena → verifikacija.

Debugging ≠ refactor. Sve "usputno" ide u zaseban batch.

---

## 12. Komunikacija

- Srpski za objašnjenja
- Engleski za kod i tehničke stringove
- Pitaj jedno pitanje, ne pet
- Ne pumpi ego — daj realnu procenu, ne lep tekst
- Ako output "zvuči pametno" ali nisi siguran da je grounded — reci to
- Prijavljuj kratko: DONE / CHANGED / VERIFY / NEXT / LEARNED

---

## 13. Dual-AI model

| Uloga | Ko | Zaduženje |
|-------|-----|-----------|
| Plan / Review / Arhitektura | Opus (chat nalog) | Strategija, batch spec, workflow odluke, second opinion |
| Execution | Claude Code (Sonnet, terminal) | Pisanje koda, approval-gated |
| Final approval | Pavle | Ništa ne ide live bez OK |

Opus piše batch spec → Claude Code izvršava.
Kad Opus i Claude Code konfliktiraju → Pavle pravi finalnu odluku.

---

## 14. Aktivne lekcije (top 10)

1. **AI scope inflation** — svaki plan ima "RADIMO" i "NE RADIMO" sekciju
2. **Source-of-truth drift** — repo > doc; proveri pre rada
3. **1 tema = 1 batch** — ne file-by-file, ne mikro-batch bez razloga
4. **QA pre deploy** — DONE → build → push → smoke
5. **Audit ≠ implementacija** — posle audita trijaž pre akcije: kritično → primetno → polish
6. **CSS shorthand oprez** — `background:` resetuje sve sub-properties; koristi `background-image:` kad dodaješ na postojeći element
7. **Selector logika** — proveri da CSS selektor može matchovati DOM pre commita (pseudo-elementi na body/html — dvostruko proveri)
8. **Prvo stabilnost, pa polish** — zatvori 3-5 ciklusa pre refinisanja
9. **AI mora dobiti ograničenja** — cilj + scope + zabrane + verify + stop uslovi
10. **Minimalni fix → verifikacija → tek onda dalje** — debugging nije mesto za kreativnu optimizaciju

> Kad se nova lekcija pojavi → najslabija ispada ili se arhivira u projekat LESSONS.md.

---

## 15. Šta je automatsko

- **session-bootstrap hook** — `STATE.md` se injektuje na početku svake sesije kao kontekst
- **lock-zone-check hook** — warning pre Edit/Write na lock zone fajlu (warning only, ne blokira)
- **Sve ostalo je manuelno** — AI generiše → Pavle OK → write

---

## 16. Skill arhitektura

Tri komponente, jasna podela:

| Komponenta | Uloga |
|-----------|-------|
| `/plan` | Generiše batch plan (LEAN/STANDARD/STRICT). Ne izvršava. |
| `/close` | Zatvara sesiju ili batch — generiše LOG entry + STATE.md update. Ne planira. |
| `scout` (agent) | Haiku micro-worker za read i dictated-write. Ne odlučuje. |

Plus opciono utility:
- `/doc-lens` — extraction iz velikih dokumenata (Roadmap, Bible)

---

## 17. Scout spawn threshold

Spawn `scout` (Haiku) samo ako važi bar jedno:
- ukupno **>500 linija** za čitanje
- **>3 fajla**
- cross-file grep / search / inventory
- veliki workflow dokument (Roadmap / Bible) — ali tu prvo razmotri `/doc-lens`

Ispod toga: čitaj direktno. Ne spawnuj Haiku za 2 fajla × 50 linija — overhead je veći od dobitka.

**Scout ne odlučuje, ne procenjuje, ne predlaže. Prima tačna uputstva i izvršava.**

---

## 18. Lock zone pravila

LOCK ne znači "ne diraj nikad". Znači:
- diraj samo planski
- preferiraj STANDARD ili STRICT tier
- jači verify
- bez usputnih promena

Svaki projekat definiše svoje lock zone u svom `CONTEXT.md`.

⚠ **Sync required:** lock zone lista u `CONTEXT.md` mora biti identična `LOCK_ZONE` arrayu u `~/.claude/hooks/lock-zone-check.js`. Ako menjaš jedno, menjaj i drugo.
