# STATE.md — Trenutno stanje

> Jedini source of truth za "gde sam sada".
> Claude Code čita ovo na početku svake sesije (auto-inject via session-bootstrap hook).
> Overwrituje se na kraju svake sesije kroz `/close` skill.
> **Ne ažuriraj ručno** — ide samo kroz `/close`.

---

## Aktivan projekat

| Polje | Vrednost |
|-------|----------|
| Ime | cl3menza.com portfolio |
| Stack | React 19 + TypeScript + Vite 5 + Framer Motion + Vercel |
| Repo | lokalni, branch: main |
| Production | https://portfolio-seven-eosin-21.vercel.app |
| Aktivni plan | `workflow/projects/cl3menza/ROADMAP.md` |
| Kontekst | `workflow/projects/cl3menza/CONTEXT.md` |

---

## Gde sam sada

**Poslednji završen:** B2.0 — Workflow v3 honesty pass (2026-05-03)
**Sledeći:** B2.1 — Roadmap §14 Reconciliation (čeka /plan)
**Aktivan batch:** NONE
**Blocker:** NONE

**Faza progres:**
- Faza 0 (cleanup) — DONE 2026-05-01 (B0.1-B0.5)
- Faza 1 (workflow v3) — DONE 2026-05-02 (F1.0-F1.5 + F1.6)
- Faza 2 (finish & launch) — ready, B2.1 first (posle B2.0 honesty pass)

**Workflow v3 status:** live i verifikovan
- Doc layer: 4 active + DECISIONS (1138 active linija)
- Hooks: SessionStart + protect-bash (cross-platform Node.js)
- Skills: 5 (plan, close, kickoff, audit, doc-lens)
- RULES: §1-22 sa shell-exit-code verifikacijom

---

## Lock zone

⚠ Ne dirati bez STRICT tier plana. Lista mora biti identična `LOCK_ZONE` arrayu u `.claude/hooks/lock-zone-check.js`.

- `src/App.tsx`
- `api/claude.ts`

---

> Pavle: ako ovaj fajl ne odražava stvarno stanje, prijavi pre nego što počneš rad.
