# PLAYBOOK.md — Projekat Lifecycle Vodič

> Kompletna mapa od prvog kontakta do handoff-a.
> Čitaj kompletno na početku prvog projekta. Posle toga — čitaj samo aktivnu fazu.

---

## Faza 0: Lead Qualification

Pre nego što kažeš da — proveri:

**Go signali:**
- Klijent zna šta želi (makar okvirno)
- Budžet je realan za scope
- Timeline je realan (min 1-2 nedelje za landing, 4+ za app)
- Klijent je responsivan (odgovara u roku od 24h)
- Projekat je u tvom skill range-u

**Red flags:**
- "Nemam budžet ali može equity/exposure"
- "Treba mi za sutra"
- "Napravi mi nešto kao Instagram ali bolje"
- Nejasan scope + fiksna cena + kratak deadline = bež
- Klijent ne može da objasni ko su mu korisnici
- "Ti samo napravi, ja ću reći šta ne valja"

**Odluka:** Go → Faza 1. No-go → ljubazno odbij, opcionalno preporuči nekoga.

---

## Faza 1: Discovery

Cilj: razumeti šta klijent treba, definisati scope, dati cenu.

### Korak 1: Client brief
- Popuni `templates/CLIENT_BRIEF.md` kroz razgovor sa klijentom
- Ključna pitanja: šta radi biznis, ko su korisnici, šta je cilj sajta/app-a, reference, must-have vs nice-to-have, budget, timeline

### Korak 2: Competitor/reference analiza
- Pogledaj 3-5 sajtova iz iste branše
- Zapiši šta rade dobro, šta loše
- Identifikuj šta tvoj klijent može da bude bolje

### Korak 3: Tech stack odluka
- Default: React + Vite + TS + Vercel (dokazan stack)
- Pogledaj `ESTIMATION.md` za decision tree kad treba nešto drugo
- Dokumentuj odluku u PROJECT_KICKOFF

### Korak 4: Scope + estimation
- Razbi projekat na milestone-e
- Za svaki milestone: okvirni sati
- Koristi `ESTIMATION.md` za procenu
- Dodaj 25% buffer (uvek)
- Prezentiraj klijentu: scope + cena + timeline

### Korak 5: Dogovor
- Scope potpisan (makar u poruci/email-u)
- Cena dogovorena
- Deposit primljen (50% unapred za fiksnu cenu, ili prva milestone uplata)
- Tek onda → Faza 2

**Quality gate:** Ne prelazi u Fazu 2 bez: potpisan scope, dogovorena cena, primljen deposit.

---

## Faza 2: Setup

Cilj: sve spremno za build.

### Korak 1: Projekat folder
```
projects/[ime-projekta]/
├── CLAUDE.md          ← kopiraj templates/CLAUDE_PROJECT.md i popuni
├── ROADMAP.md         ← napravi batch plan iz scope-a
├── DESIGN_SPEC.md     ← ako treba (vizuelni projekti)
└── LESSONS.md         ← prazan, popunjava se tokom rada
```

### Korak 2: Repo
- `git init` ili clone starter
- Inicijalni commit sa basic strukurom
- Vercel/hosting connected
- CI/CD radi (deploy on push)

### Korak 3: Design osnova
- Color paleta definisana
- Font izbor
- Basic component tokens (spacing, radii, shadows)
- Responsive breakpoints

### Korak 4: Ažuriraj SYSTEM.md
- Upisi novi aktivni projekat
- Link na CLAUDE.md

**Quality gate:** Ne prelazi u Fazu 3 bez: repo + hosting radi, CLAUDE.md popunjen, ROADMAP.md ima bar prvu fazu batch-eva.

---

## Faza 3: Build

Cilj: implementiraj scope batch po batch.

### Daily workflow
1. Pročitaj SYSTEM.md → top 5 lekcija
2. Pročitaj projekat CLAUDE.md → current status
3. Uzmi sledeći batch iz ROADMAP.md
4. Izvrši po AI_RULES.md (tier, scope, verify)
5. Prijavi DONE format
6. Ažuriraj CLAUDE.md status

### Client checkpoints
- Posle svake završene faze → pošalji preview link
- Ne čekaj kraj projekta za feedback
- Format: "Evo šta je urađeno, evo preview, evo šta je sledeće"
- Klijentov feedback ide kao novi batch (ne šteluj u toku)

### Scope change protocol (klijent traži novo)
1. Zapiši šta klijent traži
2. Proceni uticaj: sati + rizik
3. Odgovori klijentu: "Ovo je X sati dodatnog rada, košta Y, pomera deadline za Z"
4. Klijent odobri → novi batch u ROADMAP
5. Klijent ne odobri → ide u "future work" listu za posle

### Pravilo: nikad ne radi van-scope besplatno. Čak ni "sitnice". Sitnice se akumuliraju.

**Quality gate:** Ne prelazi u Fazu 4 bez: sve core features rade, nema critical bugova, klijent video preview.

---

## Faza 4: Polish + QA

Cilj: production-ready kvalitet.

### Pre-launch checklist
- [ ] Lighthouse mobile: Performance >80, A11y >95, SEO >90, Best Practices >90
- [ ] Responsive: testirano na 375px, 768px, 1024px, 1440px
- [ ] Cross-browser: Chrome, Safari, Firefox (minimum)
- [ ] Forms: validacija, error states, success states
- [ ] Loading states: skeleton/spinner gde treba
- [ ] Error handling: 404 stranica, API error fallback
- [ ] SEO: meta tags, OG image, sitemap, robots.txt
- [ ] Favicon set
- [ ] Analytics setup (GA4 ili alternativa)
- [ ] Legal: privacy policy link ako treba

### Client UAT
- Pošalji staging/preview link
- Daj klijentu checklist šta da testira
- Bugove iz UAT-a rešavaj kao LEAN batch-eve
- Max 2 runde UAT revizija (dogovoreno u scope-u)

**Quality gate:** Ne prelazi u Fazu 5 bez: Lighthouse passing, client UAT approved, 0 critical bugs.

---

## Faza 5: Launch + Handoff

### Deploy checklist
- [ ] Production env varijable postavljene
- [ ] Custom domain connected + SSL
- [ ] DNS propagacija OK
- [ ] Smoke test: key flows rade na produkciji
- [ ] OG share test (Facebook debugger, Twitter card validator)
- [ ] Analytics prima podatke

### Client handoff
- Pristup repo-u (ako je dogovoreno)
- Pristup hosting-u
- Dokumentacija: šta je gde, kako se menja content
- Instrukcije za CMS ako postoji

### Zatvaranje
- Popuni `templates/PROJECT_CLOSEOUT.md`
- Retrospektiva → ide u EVOLUTION.md
- Estimation accuracy → ide u EVOLUTION.md Sekcija D
- Finalna faktura
- Ponudi maintenance paket ako ima smisla

---

## Client komunikacijski šabloni

### Kickoff poruka
"Zdravo [ime], sve je spremno za početak. Evo šta radimo: [scope summary]. Prva verzija za pregled biće spremna do [datum]. Javljam se čim bude gotova."

### Progress update
"Evo update: [šta je urađeno]. Preview: [link]. Sledeće: [šta dolazi]. Očekivano do: [datum]."

### Scope change
"Razumem šta želiš — [opis]. To je dodatnih ~[X] sati rada, što je [cena]. Pomera finalni rok za [Y dana]. Da li da uključim?"

### Launch
"Sajt je live na [domen]! Sve radi kako je dogovoreno. Evo pristupnih podataka: [detalji]. Ako treba nešto posle launcha, tu sam."

### Post-launch maintenance ponuda
"Sad kad je sajt live, ponuđam maintenance paket: [opis — monthly updates, bug fixes, performance monitoring]. [Cena/mesec]. Zainteresovan?"
