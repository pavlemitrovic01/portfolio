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
| Aktivni plan | `workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md` |
| Kontekst | `workflow/projects/cl3menza/CONTEXT.md` |

---

## Gde sam sada

**Poslednji završen:** Batch 05 — Custom Cursor System (2026-04-28)
**Sledeći:** Batch 06 — Magnetic CTAs
**Aktivan batch:** NONE (čeka /plan)
**Blocker:** B-001 — TheBuild screenshots padrinobudva.com (owner: Pavle) — blokira R4b, ne blokira Batch 06

---

## Lock zone

⚠ Ne dirati bez STRICT tier plana. Lista mora biti identična `LOCK_ZONE` arrayu u `~/.claude/hooks/lock-zone-check.js`.

- `src/App.tsx`
- `api/claude.ts`

---

## Aktivni plan — kratko

**Sledeći batch:** Batch 06 — Magnetic CTAs (Tier: STRICT)
- Magnetic pull efekat na primary CTA-e pri hover-u (Framer Motion useSpring)
- "Step Inside" button + Contact mailto kao primarni targets
- Koordinacija sa Batch 05 custom cursor (cursor scale + magnetic move istovremeno)
- Disable na touch uređajima i prefers-reduced-motion

**Pending van CL3 reconstruction scope:**
- R4b (BLOCKED — B-001)
- P-OG meta tagovi, P-Content, P-API integracije
- Domain config, GA4 real ID
- ⚠️ Pavle rotira ANTHROPIC_API_KEY (manuelno)

---

> Pavle: ako ovaj fajl ne odražava stvarno stanje, prijavi pre nego što počneš rad.
