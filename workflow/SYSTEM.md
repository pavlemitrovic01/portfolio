# SYSTEM.md — Master Workflow Entry Point

> **Ovo je jedini fajl koji se čita na početku SVAKE sesije.**
> Sve ostalo se čita po potrebi — nikad sve odjednom.

---

## Ko sam ja

Pavle Mitrović — solo freelance web developer, handle **cl3menza**.
Background: chef → self-taught dev → production apps za 42 dana.
Fokus: web aplikacije, portfolio sajtovi, food ordering sistemi.
Lokacija: Niš, Srbija.

### Moj profil kao developer (za AI kontekst)

**Najjače strane:**
- Jak product sense — ne gledam kod kao kod, nego kako korisnik doživljava flow
- Odličan radar za scope creep i lažnu produktivnost AI-ja
- Visok prag za "dovoljno dobro" — ne prihvatam mlake rezultate
- Prirodno dizajniram sisteme rada, ne samo output
- Jak instinkt za kvalitet čak i kad fali formalan vokabular

**Poznate slabe tačke (AI treba da pomaže, ne da pogoršava):**
- Ponekad jurim savršenstvo pre nego što se zaključa osnova — AI treba da me vrati na prioritete
- Nekad pretpostavim da je "očigledno" šta hoću — AI treba da traži pojašnjenje umesto da nagađa
- Frustracija sa lošim output-om može da me odvede u prečestu promenu sistema — AI treba da predloži zatezanje jedne karike, ne redizajn celog sistema
- Jaz između ukusa i formalnog izražavanja — AI treba da pomogne artikulaciju, ne da ignoriše moj input

**Šta me motiviše:**
1. Ozbiljnost i nivo — ne zanima me prosečno
2. Osećaj da sistem radi kako treba
3. Izgradnja stvarne vrednosti i izlaz iz proseka

---

## Kako radim sa AI-jem

| Uloga | Alat | Zaduženje |
|-------|------|-----------|
| Planiranje / review / eskalacija | Claude Opus (Claude Code, plan mode) | Strategija, arhitektura, decision-making |
| Execution | Claude Sonnet (Claude Code, execution mode) | Pisanje koda, approval-gated |
| **Oversight / review / second opinion** | **ChatGPT** | **Provera Claude-ovog output-a, scope creep detekcija, merge instrukcija** |
| Final approval | Pavle | Ništa ne ide live bez mog OK |

Princip: **razumej → planiraj → izvrši → verifikuj → ne nagađaj**.

### AI oversight model
- Claude radi — GPT proverava. Ne obrnuto.
- Kad Claude predloži plan ili veliki batch → opcionalno pošalji GPT-u za review pre execution-a.
- Kad instrukcije od Claude-a i GPT-a konfliktiraju → Pavle pravi finalnu odluku na osnovu oba input-a.
- GPT ne vidi repo direktno — koristi ga za strategiju, ne za execution.

**GPT-ova uloga (formalizovano):**
- Sanity check — da li plan ima smisla?
- Risk filter — šta može da pukne?
- Scope creep detekcija — da li Claude radi previše?
- Articulation layer — prevodi Pavlov ukus/intuiciju u precizne smernice
- Workflow architect — pomaže u dizajniranju i unapređenju sistema rada
- Post-mortem partner — posle bitnih taskova: šta je dobro, šta loše, šta zaključavamo

**Kako koristiti GPT efikasno (format za GPT):**
- Uvek navedi tip zadatka: `REVIEW ONLY` / `PLAN ONLY` / `PROMPT ZA CLAUDE` / `ROOT CAUSE ONLY` / `DECISION MEMO`
- Za tehničke taskove daj: cilj, source-of-truth, current issue, scope, šta ne diramo
- Koristi GPT za post-mortem posle svakog bitnog taska

---

## File map — šta se čita i kada

### Univerzalni sistem (važi za SVE projekte)

| Fajl | Kada se čita | Svrha |
|------|-------------|-------|
| `SYSTEM.md` | ⚡ SVAKA sesija | Ulazna tačka, file map, aktivne lekcije |
| `AI_RULES.md` | Kad AI radi execution task | Batch sistem, zabrane, verifikacija |
| `PLAYBOOK.md` | Početak projekta + po fazama | Lifecycle vodič: lead → delivery → handoff |
| `EVOLUTION.md` | Kraj projekta + kad dodaješ lekciju | Self-improvement engine |
| `ESTIMATION.md` | Discovery faza novog projekta | Pricing i procena vremena |
| `GROWTH.md` | ⚡ Jednom nedeljno (nedelja/ponedeljak) | Growth engine, client excellence, skill tracking, pipeline |

### Templates (kopiraju se per-project)

| Template | Kada se koristi |
|----------|---------------|
| `templates/PROJECT_KICKOFF.md` | Kad pokrećeš nov projekat |
| `templates/CLIENT_BRIEF.md` | Discovery faza — prikupljanje zahteva |
| `templates/PROJECT_CLOSEOUT.md` | Zatvaranje projekta + retrospektiva |
| `templates/CLAUDE_PROJECT.md` | Init CLAUDE.md za nov projekat (kopiraš u repo) |

### Projekat-specifični fajlovi (žive u `projects/[ime]/`)

| Fajl | Svrha |
|------|-------|
| `CLAUDE.md` | Runtime config za taj projekat (u repo-u) |
| `ROADMAP.md` | Batch plan za taj projekat |
| `DESIGN_SPEC.md` | Dizajn specifikacija (ako treba) |
| `LESSONS.md` | Lekcije specifične za taj projekat |

---

## Aktivni projekat

**Projekat:** cl3menza.com portfolio

Sve projekat-specifične istine (status, sledeći korak, aktivni plan) žive u:
→ `workflow/projects/cl3menza/CLAUDE.md`

Ne duplirati ovde — svaki update u SYSTEM.md znači dve lokacije za održavanje.

---

## Top 5 aktivnih lekcija (iz EVOLUTION.md)

1. **AI mora dobiti ograničenja, ne samo cilj:** Svaki prompt: cilj + scope + zabrane + verify + stop uslovi. Bez toga AI nagađa i širi se.
2. **Prvo stabilnost, pa polish:** Ne juri savršenstvo pre zatvorene osnove. Zatvori 3-5 ciklusa, pa tek onda refiniši.
3. **Scope discipline:** U svakom planu jasno preseći šta radimo SADA vs šta ostaje za KASNIJE. AI lako napuva scope.
4. **Minimalni fix u debuggingu:** 1 dokaz → 1 hipoteza → 1 minimalna promena → verifikacija. Debugging ≠ refactor.
5. **Source-of-truth drift:** Kad doc i kod ne pričaju istu priču, AI radi po pogrešnim pretpostavkama. Proveri pre rada.

> Ažuriraj ovu listu kad se nova lekcija pojavi u EVOLUTION.md Sekcija A.

---

## Session protocol

**Početak sesije:**
1. Pročitaj ovaj `SYSTEM.md`
2. Pročitaj aktivni projekat `CLAUDE.md`
3. Proveri top 5 lekcija iznad
4. Pročitaj poslednji status u CLAUDE.md
5. Tek onda radi

**Kraj sesije:**
1. Ažuriraj `Current status` u projekat CLAUDE.md
2. Ako si naučio nešto → upiši u EVOLUTION.md
3. Ako se workflow promenio → upiši u EVOLUTION.md Sekcija C
