# AUTOMATION.md — Workflow Automation Contract

> **Verzija:** Phase 3 — Hooks (2026-04-20)
> **Status:** POLU-AUTOMATSKI — skills aktivni, hooks aktivni, Pavle confirmation gate ostaje
> **Projekti:** cl3menza.com (prve; više projekata dolazi)
>
> Ovaj fajl opisuje ISTINITO STANJE automatizacije workflow sistema.
> Ne sadrži obećanja ni planove za buduće — samo ono što JE implementovano.
> Planovi za buduće faze žive u sekciji ROADMAP na kraju ovog fajla.

---

## Šta je TRENUTNO automatizovano

**Kratki odgovor: polu-automatski.** Skills + hooks su aktivni. Pavle confirmation gate ostaje za sve write-ove.

| Proces | Stanje | Ko radi |
|--------|--------|---------|
| Session-brief injektovanje na početku turna | AUTOMATSKI — session-bootstrap.js (UserPromptSubmit hook); injection VERIFIED live 2026-04-20 | hooks |
| Lock zone warning na Edit/Write | AUTOMATSKI — lock-zone-check.js (PreToolUse hook, warning only) | hooks |
| Edit/Write trace u workflow-trace.jsonl | AUTOMATSKI — workflow-trace.js (PostToolUse hook) | hooks |
| Turn-end log u workflow-trace.jsonl + kondicionalni session-brief timestamp refresh | AUTOMATSKI — post-turn.js (Stop hook); refresh `Poslednji update:` u session-brief.md samo ako je STATE_FILE (active-batch/BLOCKERS/batch-log/CLAUDE.md) menjan tokom turna | hooks |
| Čitanje active-batch.md na početku sesije | MANUELNO (fallback ako hooks ne injektuju) — Pavle kaže Claude-u da pročita | Pavle + Claude |
| Append OPEN entry u batch-log.md kad batch počne | POLU-AUTOMATSKI — cl3-batch-planner Korak 5, Pavle OK gate | Claude skill + Pavle |
| Append CLOSE entry u batch-log.md kad batch završi | POLU-AUTOMATSKI — cl3-done-report Korak 4a, Pavle confirmation gate | Claude skill + Pavle |
| Ažuriranje BLOCKERS.md kad se blocker promeni | POLU-AUTOMATSKI — cl3-done-report Korak 4d (gated: samo ako blocker stvarno promenjen) | Claude skill + Pavle |
| Session wrap-up verdict + session-brief refresh na kraju sesije | POLU-AUTOMATSKI — cl3-session-close, Pavle confirmation gate; ne zatvara batch | Claude skill + Pavle |
| Ažuriranje session-brief.md kao deo batch closure-a | POLU-AUTOMATSKI — cl3-done-report Korak 4c, Pavle confirmation gate | Claude skill + Pavle |
| Status update u CLAUDE.md na kraju sesije | POLU-AUTOMATSKI — cl3-done-report Korak 4b, Pavle confirmation gate | Claude skill + Pavle |
| Roadmap Section 13 tracking sync | POLU-AUTOMATSKI — cl3-done-report Korak 4e (minimalni — samo status ćelija) | Claude skill + Pavle |
| active-batch.md STATUS: active → closed posle closure | POLU-AUTOMATSKI — cl3-done-report Korak 4f (obavezno, deo confirmed CLOSE sekvence) | Claude skill (bez extra Pavle prompt-a) |
| Context gathering za batch (read fajlova) | POLU-AUTOMATSKI (cl3-scout Haiku za read) | Claude |
| Write u workflow fajlove | POLU-AUTOMATSKI (cl3-scout Haiku za write, Pavle OK gate) | Claude + Pavle |
| Kreiranje batch plana | POLU-AUTOMATSKI (cl3-batch-planner skill) | Claude skill + Pavle |
| Build / typecheck verifikacija | MANUELNO (Pavle pokreće, AI čita output) | Pavle + Claude |

---

## Šta nije automatizovano (još uvek manuelno ili polu-automatski)

| Proces | Napomena |
|--------|----------|
| Auto-read active-batch.md na početku sesije | session-bootstrap injektuje session-brief (koji sadrži batch info) — active-batch.md se ne injektuje direktno |
| Auto-upis u batch-log.md posle batch zatvaranja | Skill-driven + Pavle confirmation gate — ne dogadja se automatski |
| Auto-notify na blocker identifikaciji | Nije implementovano |
| Potpuno auto-generisanje session-brief.md sadržaja | post-turn.js osvežava samo timestamp; pun refresh zahteva `/cl3-session-close` + Pavle OK |
| Consistent document sync (CLAUDE.md ↔ batch-log) | Nije implementovano |

---

## Arhitektura sistema (pun plan — za referencu)

```
Phase 1 — Foundation (DONE)
  batch-log.md       append-only istorija batch-eva
  BLOCKERS.md        strukturisani blocker registry
  session-brief.md   manuelni session dashboard
  AUTOMATION.md      ovaj fajl — contract o stanju

Phase 2 — Skill upgrades (DONE — 2026-04-20)
  cl3-batch-planner  Korak 5: append OPEN entry u batch-log.md posle active-batch write
  cl3-done-report    Korak 1: extended data collection + git evidence
                     Korak 2: FILES schema + verification truth types (machine/human/AI-asserted)
                     Korak 3: eksplicitni confirmation gate za SVE write-ove
                     Korak 4a-4e: CLOSE entry + CLAUDE.md + session-brief + BLOCKERS + Roadmap
                     Korak 5: post-write verify za svaki izvedeni write
  AI_RULES.md        Section 9: verification truth-type subsection dodata

Phase 3 — Hooks infrastructure (DONE — 2026-04-20)
  UserPromptSubmit   session-bootstrap.js: injektuje session-brief.md kao <session-context> blok u Claude
                     ✓ VERIFIED live (2026-04-20) — injection potvrđen u Claude context
  PreToolUse(Edit/Write) lock-zone-check.js: warning ako je target file u lock zoni (exit 0 — ne blokira)
  PostToolUse(Edit/Write) workflow-trace.js: loguje edit/write eventove u .claude/workflow-trace.jsonl
  Stop               post-turn.js: loguje turn-end u workflow-trace.jsonl; kondicionalno refreshuje
                     session-brief.md timestamp ako je STATE_FILE menjan u tom turnu
  ~/.claude/settings.json: hooks sekcija dodata (merged, sačuvan defaultMode i effortLevel)
  Sigurnosni switch: kreirati ~/.claude/hooks.disabled da deaktiviraš sve hookove

  NE RADI automatski: zatvaranje batcha, done-report, session-brief write, blocker sync — sve zahteva Pavle confirmation

Phase 4 — session-close skill (DONE — 2026-04-20)
  cl3-session-close   session verdict (ACTIVE/BLOCKED/READY FOR DONE-REPORT/NEEDS SPLIT/NEEDS FOLLOW-UP)
                      session-brief.md refresh (gated: Pavle OK)
                      lesson candidate predlog, max 1 po sesiji (gated: Pavle OK → LESSONS.md append)
  NE RADI: batch closure, CLOSE entry, active-batch lifecycle, CLAUDE.md status, BLOCKERS sync
  Sve batch closure operacije ostaju isključivo u cl3-done-report.
```

---

## Pravila sistema

### Što se NE menja bez eksplicitne odluke

- `~/.claude/settings.json` — ne menjaj bez konkretnog razloga (hooks su konfigurisani, Phase 3 DONE)
- `~/.claude/` globalni skills — cl3-scout, done-report, batch-planner ostaju na mestu
- Hook scripts — ne menjaj bez konkretnog razloga i testa

### Što je OK ažurirati u bilo kojoj fazi

- Ovaj fajl (AUTOMATION.md) — kad se stanje sistema promeni
- `workflow/projects/cl3menza/batch-log.md` — append entry kad se batch zatvori
- `workflow/projects/cl3menza/BLOCKERS.md` — update kad se blocker otvori/zatvori
- `workflow/projects/cl3menza/session-brief.md` — update na kraju sesije

### Gate princip

Svaki write u workflow fajlove prolazi kroz Pavlov OK gate.
AI generiše sadržaj → Pavle odobrava → tek onda write.
Izuzetak: `post-turn.js` ažurira samo `Poslednji update:` timestamp liniju u session-brief.md automatski (bez Pavle OK) — isključivo taj jedan atribut.

---

## Poznata ograničenja (trajna)

1. **session-brief.md je snapshot** — lako zastari ako se sesija završi bez ažuriranja. Verifikuj uz `active-batch.md` ako postoji sumnja.
2. **batch-log.md retroaktivni unosi su nepotpuni** — R1-R5 nemaju tačne datume ni GOAL spec; to je inherentno ograničenje bootstrap-a.
3. **Nema auto-zatvaranja batch-a** — Claude neće automatski zatvoriti batch; potreban je eksplicitni `/cl3-done-report` poziv.
4. **Session context injection VERIFIED** — session-bootstrap.js injektuje session-brief.md kao context na početku svakog turna. Potvrđeno live 2026-04-20. Fallback: ako hook ne radi, pročitaj `active-batch.md` direktno.
5. **Lock zone je definisan na dve lokacije** — `CLAUDE.md` Lock zone tabela i `lock-zone-check.js` LOCK_ZONE array. Mora se menjati ručno na oba mesta. Obe lokacije imaju sync komentar koji to označava.

---

> Ovaj fajl se ažurira kad nova faza počne. Ne ažuriraj aspiracioni sadržaj — ažuriraj samo kad je implementovano.
