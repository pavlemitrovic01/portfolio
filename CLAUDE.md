# CLAUDE.md

Bootstrap fajl. Nista vise.

---

## Na početku svake sesije pročitaj:

1. **`workflow/STATE.md`** — gde si i šta sledi (auto-injektuje se kroz session-bootstrap hook)
2. **`workflow/RULES.md`** — kako radiš
3. **`workflow/projects/[aktivni-projekat]/CONTEXT.md`** — projekat specifičnosti

Aktivni projekat naveden je u STATE.md → "Aktivan projekat" → "Kontekst" polje.

---

## Source of truth

**Repo > dokumentacija > memorija.**

Ako root fajl, workflow fajlovi, realni repo ili STATE.md nisu međusobno usklađeni:
- STOP
- prijavi tačan konflikt
- ne nastavljaj na osnovu pretpostavke

---

## Skills

- `/plan [opis taska]` — generiše batch plan (LEAN/STANDARD/STRICT)
- `/close` — zatvara batch ili sesiju (LOG entry + STATE.md update)
- `/doc-lens [roadmap|bible] [fokus]` — extraction iz velikih dokumenata

Detalji u `workflow/RULES.md` sekcija 16.

---

## Legacy

Stari workflow sistem živi u `workflow/_archive/`. Ne čitaj ga, ne referiraj ga, ne tretiraj kao aktivan.
