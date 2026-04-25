# CLAUDE.md — cl3menza.com Portfolio

## OBAVEZNO NA POČETKU SVAKE SESIJE

Pre bilo kakvog rada prvo pročitaj ova 3 fajla:

1. `workflow/SYSTEM.md`
2. `workflow/projects/cl3menza/CLAUDE.md`
3. `workflow/AI_RULES.md`

Ako bilo koji od ova 3 fajla ne postoji ili je u konfliktu sa realnim stanjem repoa:
- STOP
- prijavi tačan problem
- ne nagađaj

---

## ROOT ULOGA OVOG FAJLA

Ovaj root `CLAUDE.md` je **bootstrap fajl** — ništa više.

Njegova jedina uloga:
- da te usmeri na aktivni workflow sistem
- da definišu source-of-truth hijerarhiju
- da spreči oslanjanje na stari keš, staru memoriju i zastarele dogovore

Ovaj fajl **ne drži** detaljan current status, ključne fajlove, lock zone ni projektne istine.
To sve živi u `workflow/projects/cl3menza/CLAUDE.md`.

---

## SOURCE OF TRUTH

Radi isključivo po sledećem redosledu:

1. **Trenutni repo kod**
2. `workflow/SYSTEM.md`
3. `workflow/projects/cl3menza/CLAUDE.md`
4. `workflow/AI_RULES.md`

Za CL3 rad dodatno važi:

5. `workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md`
6. `workflow/projects/cl3menza/Creative_Bible.md`

Pravilo:
- **Repo > dokumentacija > memorija**
- ne pretpostavljaj stanje fajlova bez čitanja
- ne koristi staru sesijsku memoriju ako je u konfliktu sa realnim fajlovima

---

## HIJERARHIJA

- `workflow/SYSTEM.md` = master workflow entry point
- `workflow/AI_RULES.md` = univerzalna AI pravila, batch pravila, zabrane, stop uslovi
- `workflow/projects/cl3menza/CLAUDE.md` = projekat config, current status, lock zone, ključni fajlovi, aktivni fokus
- `workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md` = aktivni execution plan za CL3
- `workflow/projects/cl3menza/Creative_Bible.md` = globalni identitet, landing pravac, hard locks, shared DNA

Ako postoji konflikt za CL3:
- Roadmap ima prioritet za CL3 execution
- Creative_Bible ostaje autoritativan za globalni identitet i shared DNA (boja, tipografija, anti-ciljevi)

---

## AKTIVNI PROJEKAT

**Ime:** cl3menza.com portfolio
**Stack:** React 19 + TypeScript + Vite + Framer Motion + Vercel
**Production:** `https://portfolio-seven-eosin-21.vercel.app`

Detaljan current status proveravaj u:
→ `workflow/projects/cl3menza/CLAUDE.md`

---

## SESSION PRAVILO

Na početku sesije:
1. pročitaj ovaj fajl
2. pročitaj `workflow/SYSTEM.md`
3. pročitaj `workflow/projects/cl3menza/CLAUDE.md`
4. pročitaj `workflow/AI_RULES.md`
5. tek onda radi

Ako task dira CL3:
- pročitaj i Roadmap

Ako task dira vizuelni pravac:
- pročitaj i Creative_Bible

---

## LEGACY / ARCHIVE PRAVILO

Ako u repou postoje stari `docs/` fajlovi ili arhive:
- tretiraj ih kao **legacy / archive / backup**
- ne tretiraj ih kao primarni aktivni workflow
- ne proglašavaj ih obrisanim ako to nisi proverio u realnom repou

---

## ZABRANA NAGAĐANJA

Ako root fajl, workflow fajlovi, realni repo ili current status nisu međusobno usklađeni:

- STOP
- prijavi tačan konflikt
- ne nastavljaj na osnovu pretpostavke
