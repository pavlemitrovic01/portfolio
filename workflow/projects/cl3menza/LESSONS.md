# AI Lessons Learned

Self-improvement log. Upisuje se samo ono što je:
- trajno korisno
- ponovljivo
- praktično
- vredno budućeg rada

Format: datum → problem → lekcija → primena → status → next review

Deprecated entries → `DECISIONS.md` "Deprecated Lessons" sekcija.

---

## 2026-05-01 — Layered fail-cascade — exit code is truth

**PROBLEM:** B0.3 test restoration — framer-motion mock fajl bio prazan, ali instala-ment skript nije javio grešku. Otkriveno tek kad je test suite pao sa confusing output-om.

**LEKCIJA:** Kad fail-cascade ima više koraka (install → mock → test), exit code na svakom koraku je jedina istina. Logička analiza output-a nije dovoljna.

**PRIMENA:** Multi-step bash chains: `cmd1 && cmd2 && cmd3` umesto `; cmd1; cmd2`. Greška na jednom koraku blokira ostatak. Svaki verifikacioni korak mora imati exit code check.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

## 2026-05-01 — Dirty worktree audit pre remove

**PROBLEM:** B0.4 worktree cleanup — `git worktree remove` javio grešku jer je worktree bio "dirty" (uncommitted changes). Sledilo je investigation pre safe brisanja.

**LEKCIJA:** Pre `git worktree remove`, uvek `git -C <path> status --porcelain`. Ako dirty — prvo istraži: da li su to in-progress changes koje treba sačuvati?

**PRIMENA:** Svaki worktree cleanup: `status check → dirty? → investigate → odluka`. Nikad blind remove. Dirty ne znači "bezbedno obrisati".

**STATUS:** ACTIVE
**NEXT REVIEW:** —
