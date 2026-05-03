# workflow-v3-plan.md

> **Status:** DRAFT za Pavle review pre execution
> **Created:** 2026-05-01
> **Tier:** STRICT
> **Trajanje:** 3-4h u jednoj sesiji
> **Scope:** Workflow v3 redesign — pravi enforcement, real hooks, stvarno korišćeno

---

## Filozofija v3 — šta menjamo i zašto

**Problem v2:** sistem ima dobar mozak (RULES.md, scope discipline) ali slabe reflekse. Verifikacija je honor system. PASS(machine) je bila labela koju AI sam piše bez pokretanja. 8 batch-eva je prošlo sa lažnim PASS-om za testove.

**Princip v3:** verifikacija je shell exit code. Mehanizmi koji ne stane sistem kada se prekrše nisu mehanizmi.

**Šta zadržavamo iz v2:**
- 3-tier sistem (LEAN/STANDARD/STRICT) — radi
- 1 tema = 1 batch — radi
- Lock zone koncept — radi
- Scope discipline u RULES.md sekcije 1-13 — radi
- Dual-AI razdvoj (Opus plan, Claude Code execute, Pavle gate) — radi

**Šta menjamo:**
- Doc layer: 6 fajlova → 4 fajla, hard cap
- Skills: rewrite postojeća 3 + nova 2 (`/kickoff`, `/audit`)
- Hooks: jedan pravi SessionStart hook (ne dekoracija)
- Verification: shell command + exit code, ne labela
- Plan format: strukturirani header za handoff

---

## Šta sam istražio i potvrdio (tehnička osnova)

Pre pisanja plana, proverio sam Claude Code dokumentaciju za 2026-04 i 2026-05 stanje:

**Hooks su realni.** `.claude/settings.json` sa `SessionStart`, `PreToolUse`, `PostToolUse`, `Stop`. Mogu da blokiraju execution sa exit 2. SessionStart stdout postaje deo Claude context-a. Snapshot na startu sesije, nema hot-reload.

**Skills i slash commands su isto.** `.claude/commands/X.md` i `.claude/skills/X/SKILL.md` oba prave `/X`. Skills imaju 3 prednosti: supporting files, frontmatter control, lazy loading.

**Bug koji moramo da izbegnemo:** `disable-model-invocation: true` ima poznati bug (Issue #26251) gde Claude ponekad odbije da pokrene skill čak i kad ti tipuješ `/skill-name`. Zato **ne koristimo taj flag.** Disciplinu skill-a osiguravamo kroz sadržaj, ne flag.

**PreCommit hook ne postoji** kao explicit event. Ali postoji `PreToolUse` matcher za `Bash` koji vidi `tool_input.command` — ako command sadrži "git commit", možemo da blokujemo sa exit 2. **Ali** to je opasno — komplikovani regex može da blokuje legitne git operacije. Zato u v3.0 ne idemo na auto-block. Idemo na `/close` skill koji forsira gate disciplinom skripte, ne hook-om. Hook za commit-block ostavljamo za v3.1 ako se pokaže da `/close` discipline nije dovoljna.

---

## Doc layer redesign

**Pre:** 6 fajlova, 3675 linija total
**Posle:** 4 active + 1 historical, max 1500 active linija

```
workflow/
├── STATE.md          (max 100 linija)
├── LOG.md            (append-only, no cap, history)
├── RULES.md          (max 400 linija)
├── cleanroadmap.md   (zadržavamo, source-of-truth za stabilizaciju)
└── projects/cl3menza/
    ├── CONTEXT.md      (max 100 linija — tech, lock, files, brzi pointeri)
    ├── ROADMAP.md      (max 600 linija — current/upcoming, Final Done Definition)
    ├── BIBLE.md        (max 600 linija — kreativni pravac, merge VISUAL_LANGUAGE u sebe)
    ├── LESSONS.md      (max 200 linija — incoming buffer, max 7 active sa rotation)
    └── DECISIONS.md    (append-only — closed decisions, deprecated lessons, no cap)
```

**Migracije (1 commit):**
1. `VISUAL_LANGUAGE.md` → merge u `BIBLE.md` (sažetak, ne verbatim)
2. `ROADMAP.md` (legacy, 538 linija) → arhivirati u `_archive/v2-roadmap-legacy.md`
3. `CL3_Planet_Reconstruction_Master_Roadmap.md` → razdvoji na:
   - `ROADMAP.md` (current/upcoming, max 600 linija — Phase D + Final Done Definition)
   - `DECISIONS.md` (closed decisions log, append-only)
4. `LESSONS.md` zadržati, ali ograničiti na 7 active entries

**Šta gubimo:** detalji u arhivu (CL3_Planet 1651 linija → 600 + 800 split = 1400, gubimo ~250 linija decision context-a koji je verovatno nebitan).

**Šta dobijamo:** doc cap koji se enforce-uje u skills. Ako `/plan` vidi da `ROADMAP.md > 600 linija`, refuse to plan.

---

## Skills v3 — kompletan set

5 skills total. Sve u `.claude/skills/<name>/SKILL.md`. Bez `disable-model-invocation` (zbog Issue #26251).

### `/kickoff` — start sesije, lov na drift (NOV)

**Šta radi:**
1. Pokreće 3 git provere: `git status`, `git log @{u}..`, `git worktree list`
2. Pokreće `npm run typecheck` (brza provera, ~2s)
3. Pročita STATE.md, LESSONS.md (top 7), cleanroadmap.md (current Faza)
4. Prijavi konsolidovan status — gde si, šta je stale, koje lekcije važe
5. Ako je išta drift (dirty tree, unpushed, typecheck fail) → traži od Pavla potvrdu pre nastavka

**Pravilo:** ako Pavle nije pokrenuo `/kickoff` na startu sesije, prvi sledeći skill (`/plan` ili `/close`) će ga forsirati.

### `/plan` — generiše batch plan (REWRITE)

**Šta menjamo u odnosu na v2:**
- Pre planiranja, refuse ako: working tree nije clean ILI postoji aktivni batch ILI ROADMAP.md > 600 linija
- Generiše plan u **strukturiranom formatu** sa header-om koji `/close` može mašinski da poredi
- Ne spawn-uje scout ako je context manji od threshold-a (zadržano)
- Ne piše ništa do Pavlove "ok"

**Strukturirani header (novo):**
```
BATCH-ID: B2.3
TIER: STRICT
EXPECTED-FILES:
  - src/hooks/useRewardState.ts
  - src/components/landing/LandingScene.tsx
  - src/components/sections/TheBuild.tsx
EXPECTED-COMMITS: 1
SCOPE-EXPANSION-RULE: STOP and report, not autonomous
```

`/close` će poredi `git diff --name-only HEAD~N..HEAD` sa `EXPECTED-FILES`. Razlika = SCOPE_DRIFT, traži priznanje.

### `/close` — zatvara batch sa REAL gate-om (REWRITE)

**Šta menjamo u odnosu na v2:**

1. **Interno pokreće verify komande** — ne čeka Pavlu da kaže šta je rezultat:
   - LEAN: `npm run build` + `npm run typecheck`
   - STANDARD: + `npm run test`
   - STRICT: + manual smoke checklist (Pavle potvrđuje)

2. **Refuse PASS(machine) bez exit-0 dokaza.** Ako exit ≠ 0 → upisuje `FAIL(<command>)` u LOG, batch je `BLOCKED`, ne `DONE`.

3. **SCOPE_DRIFT detection.** Compare `git diff --name-only` sa `EXPECTED-FILES` iz plana. Ako mismatch → `SCOPE_DRIFT: <list>` u LOG, traži Pavle priznanje pre DONE.

4. **Forsira commit STATE + LOG.** Ne više "2 write-a u fajlove". 3 write-a: LOG append, STATE overwrite, **`git add workflow/STATE.md workflow/LOG.md && git commit -m "workflow: close <batch-id>"`**.

5. **LESSONS.md rotation check.** Ako `LESSONS.md` ima 7 active entries, refuse to close until najslabija ide u DECISIONS.md kao "deprecated lesson".

### `/audit` — manual cross-check (NOV)

**Šta radi:**
1. Pokreće isti set git provera kao `/kickoff`
2. Plus: `npm run build && typecheck && test`
3. Plus: cross-check STATE.md "Poslednji završen" sa zadnjim LOG entry-jem (mora se poklapati)
4. Plus: cross-check git log poslednji commit message sa LOG.md zadnjim CLOSE entry-jem (Batch ID mora se poklapati)
5. Plus: ako u poslednjih 7 dana nije pokrenut `/audit`, podsetnik
6. Emit drift report

**Kada se zove:** on-demand kad Pavle sumnja da je nešto otišlo van kolosijeka. Ili kad `/kickoff` detektuje "prošlo > 7 dana od poslednjeg audit-a" — onda `/kickoff` automatski poziva `/audit`.

### `/doc-lens` — postoji, zadržati (UNCHANGED)

Ne diramo. Radi.

---

## Hooks v3 — minimalan, real

### Hook 1 — `SessionStart` (idemo SAD)

**Cilj:** Claude Code na startu sesije zna gde si, bez da ti moraš da paste-uješ STATE.md.

**Mehanika:**

`.claude/settings.json`:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/session-bootstrap.sh"
          }
        ]
      }
    ]
  }
}
```

`.claude/hooks/session-bootstrap.sh` (real fajl, ne 0 bytes):
```bash
#!/bin/bash
# Outputs structured status to stdout — becomes Claude context

echo "═══ SESSION BOOTSTRAP ══════════════════════════════"
echo ""
echo "## Git status"
git status --short || echo "  (git status failed)"
echo ""
echo "## Unpushed commits"
git log --oneline @{u}.. 2>/dev/null || echo "  (no upstream)"
echo ""
echo "## Active worktrees"
git worktree list 2>/dev/null
echo ""
echo "## STATE.md"
cat workflow/STATE.md 2>/dev/null | head -40 || echo "  (STATE.md not readable)"
echo ""
echo "═══════════════════════════════════════════════════"
exit 0
```

**Šta ovo rešava:**
- Pavle ne mora da paste-uje STATE u svaku novu sesiju
- Claude Code odmah zna ako je dirty tree
- Ako script pukne (exit ≠ 0), session start ne pukne (exit 0 na kraju)

**Šta NE radi (limit):**
- Ne hot-reload-uje. Ako menjaš STATE u toku sesije, hook ne ide opet.
- Snapshot na startu sesije, ne refresh.

### Hook 2 — `PreToolUse` Bash protect (idemo SAD)

**Cilj:** sprečiti accidental dangerous komande (rm -rf, git push --force, npm install u worktree).

`.claude/settings.json` (dodatak):
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "bash .claude/hooks/protect-bash.sh"
      }
    ]
  }
]
```

`.claude/hooks/protect-bash.sh`:
```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block force push
if echo "$COMMAND" | grep -qE 'git push.*-(-force|f\b)'; then
  echo "BLOCKED: force push not allowed via Claude Code. Use manual git." >&2
  exit 2
fi

# Block rm -rf without explicit confirm
if echo "$COMMAND" | grep -qE '^\s*rm\s+-r?f\s'; then
  if ! echo "$COMMAND" | grep -q "/tmp/\|/home/claude/"; then
    echo "BLOCKED: rm -rf outside /tmp or scratch dirs requires manual run." >&2
    exit 2
  fi
fi

# Block .env modifications
if echo "$COMMAND" | grep -qE '(\.env\b|\.env\.(local|production))' ; then
  if echo "$COMMAND" | grep -qE '(rm|>|cat\s+>|echo\s+>)'; then
    echo "BLOCKED: .env modification via Bash not allowed. Use manual edit." >&2
    exit 2
  fi
fi

exit 0
```

**Šta ovo rešava:**
- Ako neki budući prompt traži od Claude Code-a `git push --force`, hook blokira
- Ako traži `rm -rf src/` (worst case scenario), hook blokira
- Ako traži `cat secrets > .env`, hook blokira

### Hook 3 — `PostToolUse` git commit verify (ODLOŽEN za v3.1)

**Razlog odlaganja:** PreToolUse za commit-block je opasno — komplikovani regex može da blokuje legitne komande. Hoćemo prvo da vidimo kako se `/close` ponaša pre nego što stavimo hook koji autonomno utiče na git operations. Ako se ispostavi da `/close` discipline radi, hook ne treba. Ako ne radi, dodajemo.

---

## RULES.md update

Dodaju se 4 nova `§`. Postojeće `§1-13` ostaju neizmenjene osim §8 (verification).

**§8 Verification (REWRITE):**
- PASS(machine) zahteva da je shell command pokrenut **u sesiji** sa exit 0. AI ne sme da označi PASS bez exit code dokaza.
- PASS(human) zahteva eksplicitnu Pavle confirmation poruku, citiranu u DONE reportu (ne parafraziranu).
- AI-asserted je zabranjen za STANDARD i STRICT batch-eve. Dozvoljen samo za LEAN sa Pavle eksplicitnim "ok skip verify".
- NIJE POKRENUTO ostaje validno za korake gde komanda nije relevantna.
- FAIL(<command>) je nova oznaka — kada exit ≠ 0. Ne briše se iz LOG-a, ostaje kao istorija.

**§19 Doc cap (NOV):**
- Per-project active doc layer ne sme preći 4 fajla (ne računajući DECISIONS.md i _archive)
- Per-project active total: max 1500 linija
- ROADMAP.md: max 600 linija
- BIBLE.md: max 600 linija
- LESSONS.md: max 200 linija (max 7 active entries)
- CONTEXT.md: max 100 linija
- Ako prelaziš → razdvajaš ili arhiviraš pre nego što commituješ

**§20 Lessons rotation (NOV):**
- LESSONS.md: max 7 active entries
- Kad bi 8. ušla, najslabija (po LAST RELEVANT datumu) ide u DECISIONS.md kao "Deprecated lesson"
- `/kickoff` čita LESSONS na startu sesije, displays top 7
- Lekcija se ne markira "RESOLVED" — ili je active, ili je deprecated u DECISIONS.md
- Distillacija u RULES.md je opciona — ako je lekcija dovoljno generalizovana da postane pravilo, dodaje se u RULES §14

**§21 Workflow change discipline (NOV):**
- Workflow strukturna izmena (skills, hooks, doc layout, RULES novi §) je STRICT tier
- Mora biti zaseban batch, ne mešati sa feature work
- Mora biti svaki put posle `/audit` koji potvrđuje da je trenutni state stabilan
- Workflow change ne sme biti tokom otvorenog batcha
- Frequency: nema tvrdo pravilo — ali svaki workflow change zahteva opravdanje "šta tačno ne radi u trenutnom"

**§22 Plan format (NOV):**
- Strukturirani header (BATCH-ID, TIER, EXPECTED-FILES, EXPECTED-COMMITS, SCOPE-EXPANSION-RULE) je obavezan za svaki batch plan koji ide Claude Code-u
- `/close` poredi EXPECTED-FILES sa stvarnim diff-om, SCOPE_DRIFT je loud signal

---

## Plan handoff format Opus → Claude Code

Ja (Opus) pišem prompt sa strukturiranim header-om:

```
═══════════════════════════════════════════════════════
BATCH-ID: B2.3
TIER: STRICT
EXPECTED-FILES:
  - src/hooks/useRewardState.ts
  - src/components/landing/LandingScene.tsx
EXPECTED-COMMITS: 1
SCOPE-EXPANSION-RULE: STOP and report, not autonomous
═══════════════════════════════════════════════════════

KONTEKST
[opis]

CILJ
[opis]

[Korak 1, 2, 3...]

[ZABRANE]

[OUTPUT FORMAT]
```

Claude Code u `/close` parse-uje header, snima EXPECTED-FILES, na close vreme poredi sa stvarnim diff-om.

Ovo je strukturirano i mašinski proverljivo. Bez hash-a (over-engineering).

---

## Migration plan — 1 STRICT batch, 5 commit-a

### Pre starta — pre-flight (Claude Code)
- `npm run build/typecheck/test` exit 0 (regression baseline)
- `git status` clean
- Backup: `git branch workflow-v2-backup` (lokalni backup pre rewrite-a)

### Commit 1 — Doc consolidation
**Files:**
- `workflow/projects/cl3menza/VISUAL_LANGUAGE.md` → merge u `BIBLE.md`, brisanje VL fajla
- `workflow/projects/cl3menza/ROADMAP.md` (legacy 538) → premesti u `workflow/_archive/v2-roadmap-legacy.md`
- `workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md` → split na:
  - `ROADMAP.md` (current Phase D + Final Done Definition, max 600 linija)
  - `DECISIONS.md` (closed decisions log)
- `workflow/projects/cl3menza/LESSONS.md` → trim na 7 active, premesti deprecated u `DECISIONS.md`

**Commit msg:**
```
docs(workflow): v3 consolidate per-project docs to 4-file cap

- Merge VISUAL_LANGUAGE.md into BIBLE.md (sažetak, ne verbatim)
- Archive legacy ROADMAP.md (duplikat Reconstruction roadmap)
- Split Reconstruction roadmap into ROADMAP.md (current) + DECISIONS.md (closed)
- Trim LESSONS.md to 7 active, move deprecated to DECISIONS.md

Per-project active doc layer: 4 files, ~1500 lines (was 6 files, 3675).
Implements RULES §19 doc cap.
```

### Commit 2 — Hooks setup
**Files:**
- `.claude/settings.json` (postojeći — dodaj hooks sekciju)
- `.claude/hooks/session-bootstrap.sh` (nov, executable)
- `.claude/hooks/protect-bash.sh` (nov, executable)
- `.gitignore` (verifikuj da je `.claude/settings.local.json` gitignored)

**Verify:** restart Claude Code session, vidi da li session-bootstrap output dolazi u context. Sa Pavlovom potvrdom.

**Commit msg:**
```
feat(workflow): v3 add SessionStart + PreToolUse Bash hooks

SessionStart hook:
- Outputs git status, unpushed commits, worktrees, STATE.md head
- Replaces manual STATE paste at session start
- Snapshot on session start, no hot-reload

PreToolUse Bash protect hook:
- Blocks force push, rm -rf outside /tmp, .env writes
- exit 2 with stderr message returns to Claude

Implements RULES §8 (machine-verified gates).
```

### Commit 3 — Skills v3
**Files:**
- `.claude/skills/plan/SKILL.md` (rewrite)
- `.claude/skills/close/SKILL.md` (rewrite — biggest change)
- `.claude/skills/kickoff/SKILL.md` (NOV)
- `.claude/skills/audit/SKILL.md` (NOV)
- `.claude/skills/doc-lens/SKILL.md` (unchanged, samo confirm)

**Verify:** `/kickoff` u novoj sesiji daje očekivan output. `/plan` test sa fake task — vidi format. `/close` se ne testira u ovom batch-u (testiraće se na sledećem real batchu).

**Commit msg:**
```
feat(workflow): v3 skill rewrite — real verify gates + 2 new skills

/plan rewrite:
- Refuse if working tree dirty or active batch exists
- Generates structured header (BATCH-ID, TIER, EXPECTED-FILES, etc.)

/close rewrite:
- Internally runs npm run build/typecheck/test, captures exit codes
- Refuses PASS(machine) without exit-0 evidence — writes FAIL(<cmd>) instead
- SCOPE_DRIFT detection: diff --name-only vs EXPECTED-FILES
- Forces commit of STATE + LOG (not just write to fajl)
- Enforces LESSONS.md 7-entry cap

/kickoff (NEW):
- Session start drift hunter
- Reads STATE, LESSONS top 7, cleanroadmap current Faza
- If >7 days since last /audit, prompts to run

/audit (NEW):
- On-demand cross-check git ↔ STATE ↔ LOG ↔ ROADMAP
- Drift report

Implements RULES §22 (plan format) and §20 (lessons rotation).
```

### Commit 4 — RULES.md update + cleanroadmap revision log
**Files:**
- `workflow/RULES.md` (§8 rewrite, §19/20/21/22 nova)
- `workflow/cleanroadmap.md` (revision log update sa Faza 0 lessons)

**Commit msg:**
```
docs(workflow): v3 RULES.md §19-22 + cleanroadmap revision log

RULES.md changes:
- §8 Verification rewrite — shell exit code is the truth
- §19 Doc cap — per-project 4 files, 1500 active lines
- §20 Lessons rotation — 7 active, deprecated to DECISIONS
- §21 Workflow change discipline — STRICT tier, post-audit
- §22 Plan format — structured header for Opus→Code handoff

cleanroadmap.md:
- Revision log: Faza 0 lessons (B0.3 fail cascade, B0.4 dirty audit,
  scope expansion in commit messages, single commit for related fixes)
- Faza 1 status: COMPLETE
- Faza 2 ready for /plan
```

### Commit 5 — Workflow v3 smoke test
**Files:** none (validation only)

**Steps:**
1. Restart Claude Code session — verify SessionStart hook fires
2. Run `/kickoff` — verify output
3. Run `/audit` — verify drift report
4. Test `/plan` sa fake task description (ne stvarno planiranje, samo format check)
5. Sve ovo Pavle gleda i potvrđuje

**Ako bilo koji korak failuje:** stop, prijavi, ne commit-uj nikakve fix-eve u ovom batchu (ide u v3.0.1 hotfix).

**Commit msg (samo ako sve prođe):**
```
chore(workflow): v3 smoke test verified

SessionStart hook: fires correctly, STATE displayed in context.
/kickoff: outputs git/STATE/LESSONS as expected.
/audit: emits drift report (clean).
/plan: structured header format confirmed.

Workflow v3 is live. Faza 1 of cleanroadmap.md COMPLETE.
```

---

## Šta posle Faze 1

Faza 2 starts sa `/plan` za **B2.1 — Roadmap §14 Reconciliation**. Prvi pravi test v3 sistema. Plan dolazi sa strukturiranim header-om. Claude Code `/close` mora da poredi EXPECTED-FILES. Ako sve prođe — sistem je proven.

---

## Šta NE radimo u ovom batchu

- Ne diramo Faza 2 batch-eve (Reward, domain, og meta)
- Ne otvaramo Roadmap §14 reconciliation
- Ne diramo source code projekta
- Ne pravimo Hook 3 (PostToolUse commit gate) — ostavlja se za v3.1
- Ne pravimo `/loop` ili druge advanced skills

---

## Rizici i mitigacije

**R1 — SessionStart hook ne radi na Windows-u**
Pavle je na Windows-u. `bash` u `command` polju može da ne radi izvan WSL/Git Bash. Mitigacija: Test pre commit-a 2. Ako ne radi, pisem hook kao Node.js script (`node .claude/hooks/session-bootstrap.js`).

**R2 — `/close` skill diff comparison sa EXPECTED-FILES failuje na simple types**
Ako Claude Code-ovo razumevanje glob-a/path-a se razlikuje od mog. Mitigacija: tačno path matching, no globs u EXPECTED-FILES. Apsolutni path-ovi od repo root-a.

**R3 — Doc consolidation gubi važne decision context iz CL3_Planet roadmap-a**
1651 linija → 600 + ostalo. Mitigacija: pažljiv split, ne brisanje. Sve što ne ide u ROADMAP.md ide u DECISIONS.md (no cap). Ništa se ne briše. Sve je preserved, samo restructured.

**R4 — Skill rewrite breaks existing /plan i /close u toku Faze 2**
Mitigacija: `git branch workflow-v2-backup` pre starta. Ako v3 ne radi, revert. Ali Faza 2 ne kreće dok v3 smoke test ne prođe.

**R5 — Pavle ne stigne u 3-4h, batch ostaje nedovršen**
Ovo je strukturni rizik za ovako velike batch-eve. Mitigacija: posle svakog commit-a, batch je _resumable_. Ako Pavle stane posle commit 2 (Hooks), nastavi posle pauze. Commit 5 (smoke test) je jedini "completion gate" — pre toga, sistem je u međustanju ali stabilan.

---

## Final question — pre execution

Pre nego što ti pošaljem prompt za Claude Code, treba mi tvoja potvrda za 3 stvari:

**1. Doc layer split — OK po predlogu?**
- ROADMAP.md (current/upcoming, max 600)
- DECISIONS.md (append-only, no cap)
- BIBLE.md (merge VISUAL_LANGUAGE)
- LESSONS.md (7 active)
- CONTEXT.md (100)

**2. Skill set — OK po predlogu?**
5 skills: `/plan`, `/close`, `/kickoff`, `/audit`, `/doc-lens`. Bez `disable-model-invocation`.

**3. Hook ambicija — OK po predlogu?**
SessionStart hook (real fajl, real value) + PreToolUse Bash protect (blok force push, rm -rf, .env writes). Bez auto-block PostToolUse za commit (ostavljamo za v3.1).

Reci OK na sve tri ili daj kontra-predlog.

---

## Trajanje — realna procena

- Pre-flight: 10 min
- Commit 1 (doc consolidation): 60 min — najdelikatniji posao, treba pažljiv split
- Commit 2 (hooks): 30 min
- Commit 3 (skills): 90 min — najveći commit, 4 SKILL.md fajla rewrite/new
- Commit 4 (RULES + cleanroadmap): 30 min
- Commit 5 (smoke test): 20 min

**Total: ~4h.** Ako sve teče bez surprises.

Ako ti odgovaraju ova tri pitanja, pišem finalni copy/paste prompt za Claude Code i krećemo. Ako hoćeš još da diskutujemo neki detalj, sad je trenutak.
