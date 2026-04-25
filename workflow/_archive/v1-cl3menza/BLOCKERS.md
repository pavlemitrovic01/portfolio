# BLOCKERS.md — cl3menza.com Portfolio

> **Tip fajla:** Strukturisani registry aktivnih i zatvorenih blocker-a.
> **Pravilo:** novi blocker se dodaje odmah kad se identifikuje. Zatvoreni blocker se ne briše — dobija `STATUS: RESOLVED` i `RESOLVED:` datum.
> **Owner:** Pavle (identifikacija + unblock odluka), AI (dokumentovanje + tracking)

---

## ACTIVE BLOCKERS

---

### B-001 — R4b: TheBuild screenshots (padrinobudva.com)

```
ID:          B-001
BATCH:       MEGA-R4b
TITLE:       TheBuild Block B — screenshots + proof content
STATUS:      ACTIVE
SEVERITY:    HIGH (blokira Section 14 Final Done Definition)
OWNER:       Pavle
IDENTIFIED:  UNKNOWN (blocker je postojao pre uvođenja ovog sistema; datum nije poznat)
UNBLOCKED:   N/A

DESCRIPTION:
  TheBuild.tsx nema ni jednu <img> sliku. Block B (screenshots padrinobudva.com,
  aperture clip-path reveals, key moments) nije implementovan jer sadržaj nije spreman.
  Pavle mora da pripremi screenshotove pre nego što implementacija može početi.

IMPACT:
  - TheBuild Block B ne postoji u repou
  - Aperture clip-path reveal nema šta da otkriva
  - Key moments (final) nisu finalizovani
  - Roadmap Section 14 Final Done Definition NIJE dostignut
  - R4b batch ne može početi

UNBLOCK CONDITION:
  Pavle priprema screenshotove padrinobudva.com →
  Pavle daje OK →
  AI implementuje R4b batch (TheBuild Block B + aperture reveals + key moments)

EVIDENCE:
  - workflow/projects/cl3menza/CLAUDE.md "Open blockers" sekcija
  - workflow/projects/cl3menza/CL3_Planet_Reconstruction_Master_Roadmap.md (R4b spec + Section 14)
  - Repo: TheBuild.tsx verifikovan — nema <img> elementi (grep-verifikovano)
```

---

## RESOLVED BLOCKERS

*Nema zatvorenih blocker-a (sistem se uvodi 2026-04-20 — pre toga blocker-i nisu bili formalno trackirani).*

---

## TEMPLATE (za budući upis)

```
### B-[XXX] — [kratka fraza]

ID:          B-[XXX]
BATCH:       [ID batcha na koji se odnosi]
TITLE:       [jedna fraza]
STATUS:      [ACTIVE / RESOLVED]
SEVERITY:    [LOW / MEDIUM / HIGH / CRITICAL]
OWNER:       [Pavle / AI / External]
IDENTIFIED:  [YYYY-MM-DD ili UNKNOWN]
UNBLOCKED:   [YYYY-MM-DD ili N/A]

DESCRIPTION:
  [šta tačno blokira i zašto]

IMPACT:
  [šta ne može da se uradi dok je blocker aktivan]

UNBLOCK CONDITION:
  [tačno šta mora da se desi da bi blocker bio otklonjen]

EVIDENCE:
  [fajlovi, commit-i, grep outputi koji potvrđuju blocker]
```
