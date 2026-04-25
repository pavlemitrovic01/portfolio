---
name: cl3-session-close
description: End-of-session wrap-up. Čita stanje sesije, daje verdict o batch statusu, nudi refresh session-brief.md i opcioni lesson candidate. Ne zatvara batch. Ne piše ništa bez Pavle OK.
---

# cl3-session-close — Session Wrap-Up

## Uloga

Kratak, operativan end-of-session pregled.
Daje verdict o stanju batcha i nudi minimalne write-ove uz Pavle confirmation gate.

**Nije `cl3-done-report`.** Ne zatvara batch. Ne piše CLOSE entry. Ne menja active-batch lifecycle.
**Nije `cl3-batch-planner`.** Ne planira sledeći batch.

## Kako pozvati

```
/cl3-session-close
```

Nema argumenata. Skill sam prikuplja stanje iz fajlova.

---

## Proces

### Korak 1 — Read stanja

Pročitaj redom (direktno, bez spawna):

1. `workflow/projects/cl3menza/active-batch.md` — STATUS, GOAL, TIER, FILES, VERIFY spec, STOP CONDITIONS
2. `workflow/projects/cl3menza/session-brief.md` — trenutni snapshot (Poslednji update, batch status, blockers)
3. `workflow/projects/cl3menza/batch-log.md` — poslednji entry (da li postoji OPEN za aktivni batch)
4. `workflow/projects/cl3menza/BLOCKERS.md` — aktivni blockeri
5. `workflow/projects/cl3menza/CLAUDE.md` — Current status sekcija
6. `workflow/projects/cl3menza/LESSONS.md` — zadnjih 5–10 lekcija (da ne predlaže duplikat)

Opciono — pročitaj ako postoji i korisno je:
- `.claude/workflow-trace.jsonl` (zadnjih ~20 linija) — koji fajlovi su editovani tokom sesije

**Ne izmišljaj šta je rađeno.** Ako nema dokaza → piši UNKNOWN, ne tvrdnji.

---

### Korak 2 — Session verdict

Na osnovu pročitanog daj kratak verdict. Tačno jedan od sledećih:

| Verdict | Kriterijum |
|---------|------------|
| `ACTIVE` | Batch u toku, nije spreman za closure, nema stop condition |
| `BLOCKED` | Postoji open blocker koji sprečava dalje napredovanje |
| `READY FOR DONE-REPORT` | GOAL deluje dostignut, VERIFY spec bi mogao proći — preporuči `/cl3-done-report` |
| `NEEDS SPLIT` | Scope je delimično završen ili nejasan — deo ostaje, deo je gotov |
| `NEEDS FOLLOW-UP` | Sesija je završena ali postoje loose ends van scope-a aktualnog batcha |

**BITNO:**
- `READY FOR DONE-REPORT` ≠ batch je zatvoren. Samo preporuka za sledeći korak.
- Verdict se bazira na čitanju fajlova + sesijskom kontekstu, ne na pretpostavci.
- Ako nema dovoljno dokaza → `ACTIVE` je konzervativni default, ne `READY FOR DONE-REPORT`.

---

### Korak 3 — Output (pre bilo kakvog write-a)

Uvek vrati ovaj format — kratak i operativan:

```
════════════════════════════════
SESSION VERDICT: [ACTIVE / BLOCKED / READY FOR DONE-REPORT / NEEDS SPLIT / NEEDS FOLLOW-UP]

WHY:
  [2–4 rečenice — zašto ovaj verdict, šta je urađeno, šta nije, koji dokaz]

NEXT:
  [Konkretan sledeći korak — primer: "Pokreni /cl3-done-report" ili "Čekaj R4b unblock" ili "Nastavi R7 Phase 1 u sledećoj sesiji"]

LESSON CANDIDATE:
  [Jedna rečenica — samo ako je lekcija stvarno vredna pamćenja i nije već u LESSONS.md]
  [Ako nema: NONE]

WRITE ACTIONS PENDING CONFIRMATION:
  1. session-brief.md refresh — snapshot aktuelnog stanja sesije
  [2. LESSONS.md append — samo ako lesson candidate nije NONE]
════════════════════════════════
```

**Tone pravila:**
- Ne piši eseje. Max 4 rečenice u WHY.
- Budi direktan — ne "možda", ne "verovatno", ne "izgleda da". Ako nisi siguran → napiši to eksplicitno.
- Verdict mora biti jedan od 5 navedenih — ne izmišljaj hibride.

---

### ⚠ CONFIRMATION GATE

Pre bilo kakvog write-a — prezentuj Korak 3 output Pavlu.

**Eksplicitno čekaj signal.** Prihvatljivi: "ok", "piši", "važi", "confirmed" ili ekvivalent.

Dok Pavle ne potvrdi:
- ne piši session-brief.md
- ne appenduj LESSONS.md
- ne menjaj active-batch.md
- ne menjaj batch-log.md
- ne menjaj CLAUDE.md

---

### Korak 4 — Write sekvenca (posle Pavle confirmation)

Izvršavaj samo ono što je Pavle potvrdio. Svaki write je atomičan.

---

#### 4a — session-brief.md refresh

Regeneriši session-brief.md kao čist snapshot trenutnog stanja.

Sadržaj mora odražavati:
- aktivan batch (ID, naziv, tier, status, fajlovi, lock zone, spec)
- open blockers (iz BLOCKERS.md)
- batch status pregled tabela (svi batch-evi, ažuriran status)
- sledeći koraci (po prioritetu, realistično)
- pending (van CL3 reconstruction scope, ako postoji)
- `Poslednji update:` = currentDate

**Format:** zadrži isti markdown layout kao i pre. Ne uvodi nova polja bez razloga.

Spawni cl3-scout za write:
```
OPERATION:  write-spawn (verbatim upis)
WRITE_TO:   workflow/projects/cl3menza/session-brief.md
CONTENT:    [kompletan novi sadržaj session-brief.md — generisan ovde, verbatim prenet]
FORBIDDEN:  ne interpretiraj sadržaj, ne normalizuj, ne dodaj polja
```

**Post-write verifikacija:**
Pročitaj `Poslednji update:` liniju. Mora biti currentDate.
Ako nije → `⚠ session-brief write verify failed.` Čekaj odluku.

---

#### 4b — LESSONS.md append (opciono, samo ako lesson candidate nije NONE i Pavle je odobrio)

Appenduj lekciju na kraj `workflow/projects/cl3menza/LESSONS.md`.

Format lekcije:
```
## YYYY-MM-DD — [Kratki naslov lekcije]

**PROBLEM:** [Šta se desilo]

**LEKCIJA:** [Šta je ispravno / šta smo naučili]

**PRIMENA:** [Kako primenjivati u budućem radu]

**STATUS:** ACTIVE
**NEXT REVIEW:** [currentDate + 3 meseca — YYYY-MM-DD]
```

Spawni cl3-scout sa exact-edit (anchor: poslednji `---` separator pre EOF):
```
TASK:       exact-edit
WRITE_TO:   workflow/projects/cl3menza/LESSONS.md
OLD_STRING: [poslednji entry separator ili EOF marker — verbatim]
NEW_STRING: [separator + novi entry]
FORBIDDEN:  ne menjaj postojeće lekcije, ne reorderuj, ne normalizuj
```

**Post-write verifikacija:**
Pročitaj zadnjih 30 linija LESSONS.md. Potvrdi da novi entry postoji i da datum odgovara.

---

## Pravila

- Ne zatvara batch. Ne piše CLOSE entry. Nikad.
- Ne menja `STATUS:` u active-batch.md. To je isključivo `cl3-done-report` 4f.
- Ne menja CLAUDE.md current status. To je isključivo `cl3-done-report` 4b.
- Ne menja BLOCKERS.md. To je isključivo `cl3-done-report` 4d ili eksplicitan Pavle nalog.
- Lesson candidate: maksimalno 1 po sesiji. Ako nema stvarno vrednu → piši NONE. Ne spamuj.
- Duplikat provera za lekcije: pre predloga lesson candidate, pročitaj LESSONS.md i proveri da tema nije već pokrivena.
- Idempotency: ako pokreneš dva puta bez promena između — session-brief refresh je stabilan (isti sadržaj), lesson se ne duplira jer post-write verify potvrđuje prisustvo.
- Verifikacija je obavezna za svaki izvršeni write.
- Ne izmišljaj šta je rađeno — ako nema dokaza u fajlovima ili sesijskom kontekstu, piši UNKNOWN.
- Verdict mora biti grounded — ne `READY FOR DONE-REPORT` ako VERIFY spec nije dostignut ili postoje open stop conditions.
- `NEEDS SPLIT` verdict protokol: nije dead-end. U NEXT sekciji obavezno navedi:
  1. Koji deo je dovršen i može ići u closure (→ pokreni `/cl3-done-report` za taj deo)
  2. Koji deo ostaje i postaje novi batch (→ pokreni `/cl3-batch-planner` za ostatak)
  Session-close i dalje ne zatvara batch niti menja active-batch.md — samo daje operativni signal. Zatvaranje i otvaranje novog batch-a ostaje u rukama Pavla kroz odgovarajuće skillove.
