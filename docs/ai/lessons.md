# AI Lessons Learned

Self-improvement log. Upisuje se samo ono što je:
- trajno korisno
- ponovljivo
- praktično
- vredno budućeg rada

Format: datum → greška/problem → lekcija → primena → status → next review

---

## 2026-03-26 — QA pre deploy, ne posle

**PROBLEM:** 12 commit-a ostalo lokalno nekoliko sesija — production bio daleko iza. Otkriveno tek u Batch 15B.

**LEKCIJA:** Na kraju svakog batch-a koji menja runtime: `git push` je deo verify faze, ne opcija. Vercel auto-deploy je brz (~15s) — nema razloga čekati.

**PRIMENA:** Batch workflow: DONE → build → push → smoke. Posebno za LOCK zone i API promene.

**STATUS:** RESOLVED
**NEXT REVIEW:** —

---

## 2026-03-26 — Lighthouse via Edge kad Chrome nije dostupan

**PROBLEM:** `npx lighthouse` nije pronašao Chrome na Windows mašini.

**LEKCIJA:** Postaviti `CHROME_PATH` na Edge (`/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`) — Lighthouse radi normalno. EPERM cleanup error na kraju je benigan, report se upisuje.

**PRIMENA:** Svaki Lighthouse run na ovoj mašini: koristiti Edge path.

**STATUS:** RESOLVED
**NEXT REVIEW:** —

---

## 2026-03-26 — App terminal timers bez cleanup-a → Batch 19 ekstrakcija

**PROBLEM:** `App.tsx` cl3menza ulaz pokretao `setInterval` / `setTimeout` bez čišćenja na unmount — StrictMode / lifecycle rizik i moguća upozorenja u konzoli.

**LEKCIJA:** Čuvati id-eve u ref-u (`intervalId` + lista `timeoutIds`), jedna `clearModeTransitionTimers()` funkcija, poziv u cleanup-u efekta zajedno sa `unsubscribe` — isti UX timing, bez redesign-a toka. Batch 19 kompletno ekstrahovao logiku u `useTerminalBoot` hook — stress test (rapid toggle, reload mid-boot, deactivate mid-glitch) prošao bez ikakvih grešaka.

**PRIMENA:** Bilo koji orchestration sa više async koraka na `MutationObserver` / body klasi: uvek eksplicitan cleanup, best u zasebnom hooku.

**STATUS:** RESOLVED
**NEXT REVIEW:** —

---

## 2026-03-24 — Mikro-batch overhead

**GREŠKA:** Previše mikro-batch-eva za low-risk UI / CSS temu.

**LEKCIJA:** Za low/medium-risk portfolio rad, 1 tema = 1 batch. Više logički povezanih fajlova u jednom verify ciklusu.

**PRIMENA:** Standard batch kao default za zatvorene UI teme.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-03-24 — CLAUDE.md bloat

**PROBLEM:** Predugačak CLAUDE.md sa duplikatima troši kontekst i slabi fokus.

**LEKCIJA:** Runtime CLAUDE.md mora biti kratak i operativan. Šira pravila i lekcije u zasebnim fajlovima.

**PRIMENA:** Layered pristup: CLAUDE.md (runtime) → rules.md (referenca) → lessons.md (log).

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-03-24 — Source-of-truth drift

**PROBLEM:** Dokumentacija bila delimično zastarela u odnosu na realni repo.

**LEKCIJA:** AI radi po pogrešnim pretpostavkama kad doc i kod ne pričaju istu priču.

**PRIMENA:** Pri većim nastavcima rada prvo proveri da li CLAUDE.md i repo pričaju istu priču.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-03-24 — cl3menza trigger pogrešno internalizovan

**PROBLEM:** cl3menza mode trigger bio pogrešno zapamćen kao klik na ime/prezime.

**LEKCIJA:** Ne oslanjati se na staro sećanje kad repo pokazuje drugačiju istinu. Uvek proveri kod.

**PRIMENA:** Ulaz = TrustSignals kartica "Genius builder vibe". Izlaz = Header badge.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-03-24 — Audit → scope explosion

**PROBLEM:** Audit lako sklizne u prevelik implementation scope.

**LEKCIJA:** Posle audit-a trijaž pre implementacije: kritično → primetno → polish. Najmanji siguran batch prvi.

**PRIMENA:** Uvek razdvoji audit findings od execution plana.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-03-24 — Mode-aware nav desinhronizacija

**PROBLEM:** Footer i header navigacija mogu da odstupe od stvarno renderovanih sekcija po modu.

**LEKCIJA:** Mode-aware navigation mora da prati stvarno renderovane sekcije, ne statičku listu linkova.

**PRIMENA:** Kad se menja nav, proveri anchor tok u oba moda (normal + cl3menza).

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24

---

## 2026-04-01 — CSS selector specificity trap u cl3 mode

**PROBLEM:** `body.cl3menza-mode body::after` — nemoguć selektor. `body` ne može biti descendant `body.cl3menza-mode` jer je isti element. Ambient blob layer nikad nije prelazio na teal paletu.

**LEKCIJA:** Pseudo-elementi na `body` u mode overrides pišu se kao `body.cl3menza-mode::after`, ne kao `body.cl3menza-mode body::after`. Pre override-a proveri da selektor uopšte može matchovati DOM strukturu.

**PRIMENA:** Svaki override koji targetuje pseudo-element na `body` ili `html` — dvostruko proveri selektorsku logiku pre commita.

**STATUS:** RESOLVED
**NEXT REVIEW:** —

---

## 2026-04-01 — background vs background-image na elementima s postojećim bg

**PROBLEM:** Korišćenje `background:` shorthand na elementu koji već ima background property može resetovati sve sub-properties (color, position, size, repeat, attachment, origin, clip) na default vrednosti.

**LEKCIJA:** Kad dodaješ samo novi gradient na postojeći element, koristi `background-image:` umesto `background:`. Shorthand je bezbedan samo kad svesno pišeš kompletan novi background od nule.

**PRIMENA:** L-Bridge batch — `.landing-activation` dobio `background-image:` umesto `background:`. Proveriti svaki batch koji dodaje gradient na element koji već ima bg definisan drugde.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-07-01

---

## 2026-04-01 — AI scope inflation

**PROBLEM:** AI lako predloži veći scope nego što je potreban.

**LEKCIJA:** U svakom planu jasno preseći: šta radimo sada vs šta svesno ostaje za kasnije.

**PRIMENA:** Plan uvek sadrži "radimo" i "ne radimo" sekciju.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24
