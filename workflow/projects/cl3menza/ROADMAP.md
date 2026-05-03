# ROADMAP.md — cl3menza Execution Plan

Current and upcoming work.
For closed decisions and phase history, see [DECISIONS.md](DECISIONS.md).
For brand/visual specs, see [BIBLE.md](BIBLE.md).
Target: max 600 lines.

---

## Current Phase

**Phase D — Workflow v3 + Finish & Launch** (Faza 1 DONE, Faza 2 ready)

**Faza 0 — Cleanup & Stabilization — DONE 2026-05-01**
Sve 5 batch-eva (B0.1-B0.5) prošle. Repo stabilizovan: 0 unpushed,
čist working tree, 1 worktree, testovi zeleni, og-image 120KB WebP.

**Faza 1 — Workflow v3 — DONE 2026-05-02**
Sve 6 batch-eva (F1.0-F1.5 + F1.6 catch-up) prošle. Workflow v3 live:
doc layer 4 active + DECISIONS, 2 hooks, 5 skills, RULES §1-22 sa
shell-exit-code verifikacijom. Prvi mehanički gate-ovi rade u realnom
radu (verifikovano kroz F1.5 /audit + /kickoff drift detection).

**Faza 2 — Finish & Launch — Ready**
Prvi batch: B2.1 Roadmap §14 Reconciliation (čeka /plan).
Pre Reward System (B2.3) i drugih feature batch-eva, treba audit
Final Done Definition da znamo šta je realno DONE / SKIPPED / POSTPONED.

---

## Phase History (high-level)

| Phase | Period | Status |
|---|---|---|
| Phase A — CL3 Reconstruction (MEGA-R1 → Batch-R7) | 2026-04-13 → 2026-04-22 | DONE |
| Phase B — Visual Polish (Batch 01-12a) | 2026-04-25 → 2026-05-01 | DONE |
| Phase C — Workflow Stabilization (Faza 0) | 2026-05-01 | DONE |
| Phase D — Workflow v3 + Finish | 2026-05-02 → | IN PROGRESS |

*Detaljan batch log: `workflow/LOG.md`*
*Zatvorene batch specifikacije i decision log: `DECISIONS.md`*

---

## Upcoming — Faza 2 (Feature work)

| ID | Naslov | Tier | Estimate |
|---|---|---|---|
| B2.1 | Roadmap §14 Reconciliation | STANDARD | ~1h |
| B2.2 | TheBuild Iframe Decision | STANDARD | ~1h |
| B2.3 | Reward System v1 | STRICT | ~2h |
| B2.4 | TheSystem Chamber Polish | STANDARD | ~1.5h |
| B2.5 | Domain Activation | STANDARD | ~30min |
| B2.6 | OG Meta Tags + GA4 | LEAN | ~30min |
| B2.7 | PATH_D Refinement | STRICT | ~2h |
| B2.8 | Final Production Smoke | STANDARD | ~30min |

**Napomene:**
- B2.1 (§14 Reconciliation) treba pre B2.3 — §14 definiše šta je "done" za Reward System
- B2.2 (TheBuild Iframe Decision) blokiran na Padrino screenshots — Pavle mora snimiti
- B2.7 (PATH_D) je deferred geometry, može doći i posle launch-a ako ostalo isporuči

---

## §14 Final Done Definition

*Verbatim iz CL3_Planet_Reconstruction_Master_Roadmap.md §14.*
*Živa lista — update-uje se kroz B2.1 Roadmap §14 Reconciliation batch.*

### CL3 is DONE when:

**Visual Done:**
- [ ] CL3 has minimum 7 active atmospheric layers
- [ ] Each chamber has its own glow source and spatial character
- [ ] Inter-chamber transitions create visible descent progression
- [ ] Vignette creates structural enclosure, not gentle fade
- [ ] MatrixRain is deep background texture at 15–25% opacity, not foreground feature
- [ ] All panels use CL3 treatment: tight radius, cyan-tinted border, opaque background
- [ ] No element floats in void — everything exists within atmospheric context

**Motion Done:**
- [ ] No two adjacent chambers share identical reveal animation
- [ ] All CL3 motion uses gravity easing `cubic-bezier(0.16, 1, 0.3, 1)` (except hover interactions)
- [ ] All durations in 0.7–1.2s range (except micro-interactions)
- [ ] Arrival reveal uses exposure-from-darkness technique
- [ ] Build screenshots use aperture clip-path reveal
- [ ] Architecture flow activates sequentially on scroll
- [ ] System capabilities cascade with weighted timing + edge-line draw
- [ ] Signal Out CTA reveals with deliberate delay and gravity
- [ ] No uniform MotionReveal applied identically to multiple elements

**Atmosphere Done:**
- [ ] Portal atmospheric compression is implemented (0.6–0.8s, bridges ceremony into new world)
- [ ] Landing atmosphere fades during compression (starfield, nebula, particles)
- [ ] CL3 atmosphere emerges during compression (fog, directional glow, vignette)
- [ ] Arrival hold: 200–400ms pause between atmosphere settling and content appearing
- [ ] Atmospheric Pause between Chamber 1 and 2: 15–25vh with pull-quote and breathing glow
- [ ] Atmospheric arc: dense → denser → densest → release across four chambers

**Proof Done:**
- [ ] One project, one editorial narrative (The Build)
- [ ] Curated screenshots, not live iframe
- [ ] 3–4 key moments with specific, meaningful content
- [ ] Architecture diagram readable by non-developers
- [ ] No redundant proof sections (Projects, Flagship, Anatomy merged into one)

**Trust Done:**
- [ ] Zero placeholder testimonials
- [ ] Zero disabled buttons
- [ ] Zero "soon" labels
- [ ] Real email CTA working
- [ ] If no real testimonials exist, the slot is empty — not fake

**Performance Done:**
- [ ] Lighthouse Performance ≥ 85 mobile, ≥ 90 desktop
- [ ] No iframe in CL3
- [ ] CLS < 0.05
- [ ] 60fps scroll on desktop
- [ ] MatrixRain disabled on mobile < 768px
- [ ] No `backdrop-filter` on scrolling elements
- [ ] Main JS bundle ≤ 300K

**UX Done:**
- [ ] Each chamber has one clear message
- [ ] Maximum density rules respected (3/1/4/3/2 elements per zone)
- [ ] Arrival fills viewport on entry — only identity visible
- [ ] CTA is email only, no disabled states
- [ ] AI chat is structural, not widget
- [ ] Mobile: full experience, clean layout, accessible

### Negative Tests — How We Know CL3 Has Failed

**CL3 je i dalje previše demo-like ako:**
- Scrolling through feels like component showcase
- Više od 3 distinct animation techniques vidljivo na bilo kom ekranu
- Hovering over elements triggers showpiece animations
- MatrixRain je prvo što primeti
- Više od 2 looping animations vidljivo u svakom trenutku

**CL3 je i dalje services-page ako:**
- Bilo koja komora ima grid of identical-styled tiles
- Icons za differentiation capabilities
- Numbered process flow
- Capabilities liče na pricing page bez cena

**CL3 je prava druga planeta kada:**
- Posetilac oseća fizičku kompresiju na ulasku — prostor se sužava, vazduh gustira, svetlo se menja
- Scroll kroz CL3 deluje kao spuštanje, ne čitanje
- Svaka komora ima arhitekturnu težinu — zidovi, ivice, volumen, containment
- Proof u The Build deluje monumentalno, ne nabrojanom
- Atmosfera ima sopstveni život — glow sources, fog, strukturna tama
- Povratak na landing deluje kao surfacing iz dubine — prostor se otvara, vazduh čisti
- Potencijalni klijent dostiže Signal Out misleći "ovaj čovek gradi na nivou koji mi treba"
- Celokupni utisak: "premium, serious, expensive" — nikad "cool portfolio" ili "nice effects"

---

*Last updated: 2026-05-02.*
*See [BIBLE.md](BIBLE.md) for brand/visual specs.*
*See [DECISIONS.md](DECISIONS.md) for phase history and closed decisions.*
