# Active Batch
DATE: 2026-04-19
TIER: STANDARD
STATUS: active
BATCH TYPE: polish
ROADMAP BATCH: R7 Phase 1 (subset originalnog Roadmap R7)
GOAL: CL3 chambers mobile-responsive i motion-safe — layout verifikovan na breakpointima, reduced-motion pokrivenost kompletna, placeholder MotionReveal inventarisan i uklonjen (samo niskog rizika instance). Ovo je Phase 1 od originalnog Roadmap R7 scope-a. Touch targets (44px), screen reader audit i keyboard nav ostaju za R7 Phase 2.
FILES:
- src/components/sections/TheSystem.tsx
- src/components/sections/Contact.tsx
- src/components/sections/Arrival.tsx
- src/components/sections/PullQuote.tsx
- src/components/sections/TheBuild.tsx
- src/styles/chambers.css
- src/styles/overrides.css
RISK:
- Mobile CSS menja desktop layout (fix: sve unutar max-width media query)
- RM fallback krije sadržaj (stop kondition)
- Placeholder MotionReveal remove otkriva unstyled sadržaj (stop kondition)
VERIFY:
- Build PASS + typecheck PASS
- Chrome DevTools: 360, 390, 414, 768, 1024px bez horizontal scroll i overlap
- Desktop (1280px+) vizuelno identičan pre/posle
- prefers-reduced-motion ON: sav sadržaj vidljiv, glow/fog prisutni, nema animacije
- Pavle: iPhone 13+ mobile visual check PASS
FORBIDDEN:
- Touch targets, screen reader, keyboard nav, inter-chamber transitions (R7 Phase 2 scope — ne dira se ovde)
- Desktop layout izmene
- Content izmene
- Lock zone: src/App.tsx, api/claude.ts
APPROVAL: Pavlov per-item OK za placeholder MotionReveal remove; per-item OK za FLEX RM fixes
STOP CONDITIONS:
- Desktop layout promena detektovana
- Build ili typecheck FAIL
- RM stanje krije sadržaj
- Placeholder instance nisu low-risk
LOG: workflow/projects/cl3menza/batch-log.md (entry: Batch-R7-Phase-1)
