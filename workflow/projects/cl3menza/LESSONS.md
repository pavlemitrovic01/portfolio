# AI Lessons Learned

Self-improvement log. Upisuje se samo ono što je:
- trajno korisno
- ponovljivo
- praktično
- vredno budućeg rada

Format: datum → problem → lekcija → primena → status → next review

Deprecated entries → `DECISIONS.md` "Deprecated Lessons" sekcija.

---

## 2026-03-26 — QA pre deploy, ne posle

**PROBLEM:** 12 commit-a ostalo lokalno nekoliko sesija — production bio daleko iza. Otkriveno tek u Batch 15B.

**LEKCIJA:** Na kraju svakog batch-a koji menja runtime: `git push` je deo verify faze, ne opcija. Vercel auto-deploy je brz (~15s) — nema razloga čekati.

**PRIMENA:** Batch workflow: DONE → build → push → smoke. Posebno za LOCK zone i API promene.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

## 2026-03-24 — Source-of-truth drift

**PROBLEM:** Dokumentacija bila delimično zastarela u odnosu na realni repo.

**LEKCIJA:** AI radi po pogrešnim pretpostavkama kad doc i kod ne pričaju istu priču.

**PRIMENA:** Pri većim nastavcima rada prvo proveri da li CLAUDE.md i repo pričaju istu priču.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

## 2026-03-24 — Audit → scope explosion

**PROBLEM:** Audit lako sklizne u prevelik implementation scope.

**LEKCIJA:** Posle audit-a trijaž pre implementacije: kritično → primetno → polish. Najmanji siguran batch prvi.

**PRIMENA:** Uvek razdvoji audit findings od execution plana.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

## 2026-04-01 — AI scope inflation

**PROBLEM:** AI lako predloži veći scope nego što je potreban za task.

**LEKCIJA:** U svakom planu jasno preseći: šta radimo sada vs šta svesno ostaje za kasnije.

**PRIMENA:** Plan uvek sadrži "radimo" i "ne radimo" sekciju. Scope expansion zahteva eksplicitnu odluku.

**STATUS:** ACTIVE
**NEXT REVIEW:** —

---

## 2026-04-01 — background vs background-image

**PROBLEM:** Korišćenje `background:` shorthand na elementu koji već ima background property može resetovati sve sub-properties (color, position, size, repeat, attachment, origin, clip) na default vrednosti.

**LEKCIJA:** Kad dodaješ samo novi gradient na postojeći element, koristi `background-image:` umesto `background:`. Shorthand je bezbedan samo kad svesno pišeš kompletan novi background od nule.

**PRIMENA:** Proveriti svaki batch koji dodaje gradient na element koji već ima bg definisan drugde.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-07-01

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
