# ESTIMATION.md — Pricing & Time Estimation Framework

> Čitaj u Discovery fazi novog projekta.
> Ažuriraj posle svakog projekta na osnovu stvarnih brojeva iz EVOLUTION.md Sekcija D.

---

## Tipovi projekata — okvirni sati

| Tip | Osnovni opseg | Uključuje |
|-----|--------------|-----------|
| Landing page (1 stranica) | 8–20h | Dizajn, responsive, animacije, deploy |
| Portfolio / prezentacioni sajt (3-6 stranica) | 20–40h | Multi-page, contact form, CMS opciono |
| Web app sa admin panelom | 50–100h | Auth, CRUD, dashboard, roles |
| Food ordering / e-commerce | 80–150h | Meni/katalog, korpa, checkout, admin, notifikacije |
| Existing site redesign | 15–40h | Zavisi od kompleksnosti i stanja koda |

> Ovo su POČETNE procene. Koriguj ih kad imaš 5+ data poena u EVOLUTION.md Sekcija D.

---

## Complexity multiplieri

Dodaj na osnovni scope kad projekat ima:

| Feature | Dodatno (h) | Napomena |
|---------|------------|----------|
| Auth (login/register) | +8–15h | Više ako treba roles/permissions |
| Payments (Stripe/paypal) | +10–20h | Kompleksnije za subscriptions |
| CMS integracija | +5–12h | Sanity/Strapi/custom |
| Multilingual (i18n) | +8–15h | Zavisi od broja jezika i strana |
| Email sistem (transactional) | +5–10h | Resend/SendGrid setup + templates |
| Real-time features (chat, live updates) | +15–25h | WebSocket/SSE |
| Complex animations / microinteractions | +10–20h | Framer Motion, scroll-driven |
| API integracija (3rd party) | +5–15h per API | Zavisi od dokumentacije i složenosti |
| Mobile app (React Native) | 2x web procena | Potpuno odvojen scope |

---

## Buffer pravilo

**UVEK dodaj 25% na finalnu procenu.**

Zašto:
- Scope creep se dešava na svakom projektu
- Bugovi koje ne možeš predvideti
- Client feedback koji zahteva izmene
- "Sitnice" koje pojedu sate

Primer: Proceniš 40h → klijentu kažeš 50h → naplatiš za 50h.

---

## Pricing modeli

### Fixed price (preporučeno za jasne scope-ove)
- Klijent zna koliko plaća unapred
- Ti upravljaš vremenom
- Rizik: ako proceniš loše, radiš više za isto
- Pravilo: fiksna cena = scope mora biti PRECIZAN i potpisan

### Hourly rate
- Naplaćuješ po satu
- Klijent ima fleksibilnost da dodaje/menja
- Rizik: klijent može da se uplaši rastućeg računa
- Pravilo: daj MAX procenu ("max 60h, verovatno manje")

### Milestone-based (preporučeno za veće projekte)
- Podeli na 3-5 milestone-a
- Svaki milestone ima cenu i deliverable
- Plaćanje po milestone-u
- Najbolje od oba sveta: klijent vidi napredak, ti imaš cash flow

### Koji model kad?

| Situacija | Model |
|-----------|-------|
| Landing page, jasan scope | Fixed price |
| Web app, scope se može menjati | Milestone-based |
| Ongoing rad / maintenance | Hourly rate |
| Klijent ne zna tačno šta želi | Hourly (sa cap-om) |
| Veći projekat, nov klijent | Milestone + deposit |

---

## Payment pravila

1. **Deposit:** Uvek uzmi 50% unapred (fixed) ili prvi milestone unapred
2. **Nikad ne počinji bez deposit-a.** Bez izuzetka.
3. **Payment metode:** Lokalni klijenti — banka/gotovina. Internacionalni — Wise/Payoneer
4. **Invoice:** Šalji odmah po završetku milestone-a, net 7 dana
5. **Kasno plaćanje:** Ljubazan reminder posle 3 dana. Pauza rada posle 10 dana.

---

## Hourly rate kalkulacija

```
Ciljna mesečna zarada: ___€
Radnih sati mesečno (realno): ~120h (ne 160 — imaš admin, learning, non-billable)
Billable procenat: ~65% (ne možeš naplatiti svaki sat)
Billable sati mesečno: ~78h

Hourly rate = Ciljna zarada / 78

Primer: 2000€ / 78 = ~26€/h
Primer: 3000€ / 78 = ~38€/h
```

> Ažuriraj ovo kad budeš imao jasniju sliku svojih ciljeva i tržišta.

---

## Quick estimation workflow

1. Identifikuj tip projekta → uzmi bazu iz tabele
2. Dodaj multipliere za extra features
3. Dodaj 25% buffer
4. Pomnoži sa hourly rate = cena
5. Zaokruži na čist broj (klijenti vole čiste brojeve)
6. Prezentiraj kao range kad nisi siguran ("između X i Y")

Primer:
- Portfolio sajt: 25h baza
- + complex animations: +15h
- + CMS: +8h
- = 48h × 1.25 buffer = 60h
- × 30€/h = 1800€
- Klijentu: "1800€, rok 3 nedelje"
