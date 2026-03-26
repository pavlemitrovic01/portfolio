# AI Lessons Learned

Self-improvement log. Upisuje se samo ono što je:
- trajno korisno
- ponovljivo
- praktično
- vredno budućeg rada

Format: datum → greška/problem → lekcija → primena → status → next review

---

## 2026-03-26 — App terminal timers bez cleanup-a

**PROBLEM:** `App.tsx` cl3menza ulaz pokretao `setInterval` / `setTimeout` bez čišćenja na unmount — StrictMode / lifecycle rizik i moguća upozorenja u konzoli.

**LEKCIJA:** Čuvati id-eve u ref-u (`intervalId` + lista `timeoutIds`), jedna `clearModeTransitionTimers()` funkcija, poziv u cleanup-u efekta zajedno sa `unsubscribe` — isti UX timing, bez redesign-a toka.

**PRIMENA:** Bilo koji orchestration sa više async koraka na `MutationObserver` / body klasi: uvek eksplicitan cleanup.

**STATUS:** RESOLVED (stability follow-up)
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

## 2026-03-24 — AI scope inflation

**PROBLEM:** AI lako predloži veći scope nego što je potreban.

**LEKCIJA:** U svakom planu jasno preseći: šta radimo sada vs šta svesno ostaje za kasnije.

**PRIMENA:** Plan uvek sadrži "radimo" i "ne radimo" sekciju.

**STATUS:** ACTIVE
**NEXT REVIEW:** 2026-04-24
