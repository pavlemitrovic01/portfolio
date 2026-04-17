# AI_RULES.md — Univerzalna pravila za AI rad

> Čita se kad AI radi execution task. Ne čita se za diskusiju ili planiranje.
> Ovo su pravila koja važe za SVAKI projekat bez izuzetka.

---

## 1. Osnovni princip

**1 tema = 1 batch.**

Ne: 1 fajl = 1 batch. Ne: 1 sitnica = 1 approval. Ne: beskrajno seckanje low-risk posla.

Da: zatvoren cilj, više logički povezanih fajlova, jedan verify ciklus, jedan jasan end state.

---

## 2. Batch tiers

### LEAN
Za: low-risk UI, CSS, content, mali responsive pass, polish.
Osobine: 1 tema, 2–5 fajlova, bez LOCK zona, nema novih dependency-ja.

```
GOAL:
FILES:
RISK:
VERIFY:
```

### STANDARD
Za: srednji rizik, component interakcije, više povezanih fajlova, state-aware UI.

```
GOAL:
BATCH TYPE:
CORE SCOPE:
FLEX SCOPE:
FORBIDDEN:
FILES:
RISK:
VERIFY:
APPROVAL:
```

### STRICT
Za: LOCK zone, arhitektura, state orchestration, nejasni bugovi, kritični tokovi.
Detaljniji plan. Jači verify. Češći approval. Nema improvizacije.

AI bira tier na osnovu rizika. Korisnik može da override-uje.

---

## 3. Scope discipline

Svaki task mora imati mentalnu podelu:

- **CORE** — šta sigurno radiš
- **FLEX** — šta smeš dodati samo ako je nužno za correctness
- **FORBIDDEN** — šta ne diraš

---

## 4. Hard zabrane

Bez eksplicitnog approval-a:
- ne dodaj nove dependency-je
- ne diraj LOCK zone
- ne radi env / schema / deploy promene
- ne refaktoriši van scope-a
- ne uvodi random pattern
- ne rešavaj "usput" stvari
- ne radi `/compact` ili `/clear` bez upozorenja
- ne razbijaj low-risk temu na mikro korake bez razloga

---

## 5. Execution pravila

**Pre izmene:**
- pročitaj fajl koji menjaš
- pročitaj minimalno potrebne okolne fajlove
- proveri postojeći pattern
- fokus na DELTA promenu, ne na ceo sistem

**Tokom execution-a:**
- ne re-analiziraj ceo repo bez potrebe
- ne uvodi šire cleanup-e
- menjaj minimalno
- zadrži postojeće ponašanje osim ako je cilj drugačiji

**Ako nešto nije jasno:**
- stani
- postavi jedno konkretno pitanje
- ne nagađaj

---

## 6. Expansion pravilo

Kad se tokom rada pokaže da originalni scope nije dovoljan:

Ne radi: "kad sam već tu", "usput sam sredio još 4 stvari", "morao sam da refaktorišem".

Radi: stani → objasni problem → navedi tačne dodatne fajlove → jasno razdvoji REQUIRED vs NICE TO HAVE → čekaj approval.

**REQUIRED** = bez toga batch nije ispravan (tip greška, state bug, helper mora da se koriguje).
**NICE TO HAVE** = lepši refaktor, čišći naming, dodatni polish. Ne ulazi bez approval-a.

---

## 7. Minimal diff princip

Menjaj samo ono što je potrebno. Izbegavaj: rename bez potrebe, cleanup usput, nova apstrakcija bez koristi, refaktor bez funkcionalne potrebe.

Cilj nije lep diff. Cilj je siguran i tačan diff.

---

## 8. No re-analysis princip

Repo šire analiziraš samo kad:
- prvi put ulaziš u projekat
- radiš audit
- planiraš veću arhitekturu
- rešavaš bug koji prelazi lokalni scope

Inače: pročitaj relevantne fajlove, ne rasipaj kontekst.

---

## 9. Verifikacija — proporcionalna, ne mehanička

| Batch tip | Verifikacija |
|-----------|-------------|
| Docs-only | Tekstualna konzistentnost |
| Mali UI batch | Build + ručni smoke test |
| Interaction batch | Build / typecheck + flow test |
| High-risk batch | Build + typecheck + flow test + manual verify |

Batch nije zatvoren bez verifikacije.

---

## 10. Fail-fast pravilo

Kad naiđeš na neočekivanu kontradikciju: ne krpi slepo, ne nastavljaj "da vidiš", ne povećavaj scope tiho.

Stani i prijavi: šta si našao, zašto je problem, šta je sledeći siguran korak.

---

## 11. Self-review pre DONE

Pre prijave DONE:
- pregledaj diff
- proveri da nisi dirao van scope-a
- proveri side effect-e
- proveri naming / pattern / strukturu
- popravi očigledan problem pre prijave

Završni format:

```
DONE:
CHANGED:
VERIFY:
NEXT:
LEARNED:
```

Ako ništa nije upisano u EVOLUTION.md, reci to eksplicitno.

---

## 12. Source of truth

Prioritet istine:
1. Trenutni repo kod
2. Projekat `CLAUDE.md`
3. Ostali AI docs po potrebi

Pravilo: ne pretpostavljaj stanje fajlova bez čitanja. Ako se repo i dokumentacija razlikuju, repo pobeđuje.

---

## 13. Lock zone pravila

LOCK ne znači "ne diraj nikad". Znači:
- diraj samo planski
- preferiraj Standard ili Strict tier
- jači verify
- bez usputnih promena

Svaki projekat definiše svoje LOCK zone u svom CLAUDE.md.

---

## 14. Task klasifikacija

Svaki task na početku obeleži kao jedan od:

| Tip | Šta znači | Quality gate |
|-----|----------|-------------|
| Bugfix | Izolovano otklanjanje baga | Dokaz → hipoteza → minimalni fix → test |
| Refactor | Poboljšanje strukture bez promene ponašanja | Scope + benefit + risk + build + regression |
| Feature | Nova funkcionalnost | Plan + scope + verify + approval |
| Design review | Vizuelni/UX pregled | Problem → princip → konkretna promena → očekivani efekat |
| Polish | Sitna poboljšanja kvaliteta | Lista promena + before/after + verify |
| Documentation | Ažuriranje dokumenata | Konzistentnost sa kodom |
| Production-risk | Sve što dira live sistem | STRICT tier obavezan |

---

## 15. Stop uslovi

AI MORA da stane i prijavi pre nego što nastavi kad:
- Naiđe na kontradikciju između koda i dokumentacije
- Source-of-truth nije jasan ili je zastareo
- Scope se proširio van originalnog plana
- Build / typecheck pukne neočekivano
- Promena bi dirala LOCK zonu
- Nije siguran u root cause (kod debugginga)
- Treba nova dependency ili env promena

Stani → prijavi šta si našao → čekaj odluku. Nikad ne nastavljaj "da vidiš".

---

## 16. Komunikacija

- Srpski za objašnjenja
- Engleski za kod i tehničke stringove
- Rezultat prijavljuj kratko (DONE format iznad)
- Ne objašnjavaj šta si radio ako se vidi iz diff-a
- Pitaj jedno pitanje, ne pet
- Ne pumpi ego — daj realnu procenu, ne lep tekst
- Ako output "zvuči pametno" ali nisi siguran da je grounded — reci to

---

## 17. Subagenti

Subagenti nisu default. Predlaži ih samo kad:
- postoje prirodno odvojeni delovi
- delovi imaju nisku međuzavisnost
- postoji jasan review point

Ne predlaži ih samo zato što "ima puno fajlova" ili "zvuči napredno".
