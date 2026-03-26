# AI Workflow Rules — Extended Reference

Ovo je šira referenca za rad.
Ne služi da se čita stalno od početka do kraja pri svakom tasku.
Primarno za:
- složenije planiranje
- pojašnjenje režima rada
- rešavanje nejasnih situacija
- usklađivanje batch filozofije

---

## 1. Osnovni princip

**1 tema = 1 batch**

Ne:
- 1 fajl = 1 batch
- 1 sitnica = 1 approval
- beskrajno seckanje low-risk posla

Da:
- zatvoren cilj
- više logički povezanih fajlova kad je rizik nizak/srednji
- jedan build / verify ciklus
- jedan jasan end state

---

## 2. Batch tiers

### LEAN / Micro-lean

Za: low-risk UI, CSS, content truth, mali responsive pass, male polish taskove.

Tipične osobine:
- 1 tema, 2–5 fajlova
- bez LOCK zona, nema novih dependency-ja, nema refaktora
- minimalan plan, brz execution

Format:

```text
GOAL:
FILES:
RISK:
VERIFY:
```

Dobar primer: mobile footer link polish, copy cleanup, sitan hero spacing fix.

Loš primer: mešanje mobile nav, Hero state, AI chat i App orchestration u jednom lean batch-u.

### STANDARD

Za: zatvorene teme srednjeg rizika, component-level interakcije, više povezanih fajlova, mode-aware UI ponašanje.

Format:

```text
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

Dobar primer: mobile header navigation, Hero interaction polish, mode-aware nav sync.

### STRICT

Za: LOCK zone, architecture, state orchestration, nejasne bugove, složen expansion, kritične tokove.

Ovde:
- plan detaljniji
- verify jači
- approval češći
- nema improvizacije

Dobar primer: App mode orchestration promena, Hero AI chat tok, api/claude.ts ponašanje.

---

## 3. Scope discipline

Svaki task mora da bude razbijen na:

- **CORE** — šta sigurno radiš
- **FLEX** — šta smeš da dodaš samo ako je nužno za correctness
- **FORBIDDEN** — šta ne diraš

Ovo je obavezna mentalna podela, čak i kad nije formalno napisana.

---

## 4. Expansion pravilo

Ako se tokom execution-a pokaže da originalni scope nije dovoljan:

Ne radi ovo:
- "kad sam već tu"
- "usput sam sredio još 4 stvari"
- "morao sam malo da refaktorišem"

Radi ovo:
- stani
- objasni problem
- navedi tačne dodatne fajlove
- jasno reci šta je REQUIRED
- jasno reci šta je NICE TO HAVE
- čekaj approval

---

## 5. Required vs Nice to have

**REQUIRED** — bez toga batch nije ispravan.
Primeri: tip greška, state bug, helper mora da se koriguje da bi glavni fix radio, UI ostaje broken bez korekcije.

**NICE TO HAVE** — nije neophodno za correctness.
Primeri: lepši refaktor, čišći naming, generičkiji helper, dodatni polish, usputna optimizacija.

Pravilo: NICE TO HAVE ne ulazi u batch bez approval-a.

---

## 6. Minimal diff princip

Menjaj samo ono što je potrebno.

Izbegavaj:
- rename bez potrebe
- cleanup usput
- novu apstrakciju bez stvarne koristi
- helper koji postoji samo da "izgleda čistije"
- refaktor bez jasne funkcionalne potrebe

Cilj nije lep diff. Cilj je siguran i tačan diff.

---

## 7. No re-analysis princip

Nemoj skenirati ceo repo po navici.

Repo šire analiziraš samo kad:
- prvi put ulaziš u projekat
- radiš audit
- planiraš veću arhitekturu
- rešavaš bug koji prelazi lokalni scope

Inače: pročitaj relevantne fajlove, minimalno potrebne okolne fajlove, ne rasipaj kontekst.

---

## 8. Verifikacija — proporcionalna, ne mehanička

| Batch tip | Verifikacija |
|---|---|
| Docs-only | Tekstualna konzistentnost |
| Mali UI batch | Build + ručni smoke test |
| Interaction batch | Build / typecheck + flow test |
| High-risk batch | Strongest available: build + typecheck + flow test + manual verify |

---

## 9. Fail-fast pravilo

Kad naiđeš na neočekivanu kontradikciju:
- ne krpi slepo
- ne nastavljaj "da vidiš"
- ne povećavaj scope tiho

Stani i prijavi: šta si našao, zašto je problem, šta je sledeći siguran korak.

---

## 10. Ažuriranje AI docs

- **CLAUDE.md** — ažuriraj kad se menja hard pravilo, active focus, lock zone, ključna project truth
- **docs/ai/rules.md** — ažuriraj kad se promeni workflow filozofija ili batch sistem
- **docs/ai/lessons.md** — ažuriraj kad naučiš nešto trajno i ponovljivo korisno

Ne upisuj šum.

---

## 11. Subagenti

Subagenti nisu default. Predlaži ih samo kad:
- postoje prirodno odvojeni delovi
- delovi imaju nisku međuzavisnost
- postoji jasan review point

Ne predlaži ih samo zato što "ima puno fajlova" ili "zvuči napredno".

---

## 12. Komunikacija

- Srpski za objašnjenja
- Engleski za kod i tehničke stringove kad treba

Rezultat prijavljuj kratko:

```text
DONE:
CHANGED:
VERIFY:
NEXT:
LEARNED:
```

---

## 13. Zabrane

Bez approval-a:
- nema novih paketa
- nema env/schema/deploy akcija
- nema LOCK diranja bez plana
- nema random refaktora
- nema scope creep-a
- nema "usput sam sredio još nešto"
- nema mehaničkog seckanja low-risk teme na mikro korake

---

## 14. Portfolio-specifične napomene

Ključni fajlovi:
- `src/App.tsx` — mode orchestration
- `src/components/sections/Hero.tsx` — centralna kompleksna sekcija
- `api/claude.ts` — AI endpoint
- `src/styles/global.css` — glavni vizuelni sistem

Mode flow:
- Ulaz u cl3menza mode: TrustSignals → **Genius builder vibe**
- Izlaz iz cl3menza mode: Header badge

Kod UI polish batch-eva:
- preferiraj tematske batch-eve
- ne uvodi desktop redesign ako je cilj mobile
- ne mešaj content cleanup sa state radom osim ako je baš potrebno
