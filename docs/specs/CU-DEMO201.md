---
clickup: CU-DEMO201
layers: [FE]
status: approved
approved_by: pm@uyqur-lab
---

# Bosh sahifa — API xabarini ko'rsatish

## Muammo
Frontend'da API bilan ulanishni tekshiradigan minimal sahifa yo'q.

## Foydalanuvchi hikoyasi
Foydalanuvchi sifatida men bosh sahifada tizim javobini ko'rmoqchiman.

## Qabul mezonlari

- AC-1 [FE] EVENT: QACHONKI sahifa yuklansa, `/api/hello` javobidagi `message` ko'rsatiladi
- AC-2 [FE] STATE: AGAR javob hali kelmagan bo'lsa, "Yuklanmoqda…" ko'rsatiladi
- AC-3 [FE] UNWANTED: AGAR so'rov xato bersa, "Xatolik yuz berdi" ko'rsatiladi
- AC-4 [FE] manual: sahifa mobil brauzerda ham o'qiladi

## API kontrakti
```
GET /api/hello → 200 { "message": "Hello, Uyqur!" }
```
Kontrakt manbasi: `uyqur-lab/contracts`

## Ko'lamdan tashqari
- Routing, dizayn tizimi

## Test ma'lumotlari
Backend `demo-backend` lokal 3000-portda.
