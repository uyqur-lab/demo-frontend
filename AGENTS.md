# Agent konteksti — demo-frontend

Qatlam: **FE**. Faqat `[FE]` yorlig'idagi AC'lar ustida ishlaysiz.

## Majburiy o'qish

| Fayl | Qachon |
|---|---|
| `~/.uyqur/agent-standards/rules/dev-rules.md` | har ish boshida |
| `~/.uyqur/agent-standards/tasks/CU-<id>-*/` — **barcha** `.md` | task boshida |

`backend.md` sizga API kontraktini beradi. **Backend kodini ko'rmaysiz** —
kontraktga tayanasiz. U yozilmagan bo'lsa, BE devini kutasiz.

## Ish tartibi

1. `/task-start <CU-id>` — hujjatlar o'qiladi, brief beriladi, branch ochiladi
2. Kod va `<CU-id> AC-<n>:` bilan boshlanadigan testlar birga
3. `/task-check` → `GATE: OCHIQ` va `front.md` yoziladi
4. `gh pr create`

## Testlanadigan kod

Mantiq DOM'dan ajratiladi: `src/*.js` da toza funksiyalar, `src/index.html`
faqat ularni ulaydi. Sabab — DOM'siz test yozish mumkin bo'lsin.

## Taqiqlar

- Himoyalangan branch'larga to'g'ridan-to'g'ri yetkazish yo'q
- Lokal birlashtirish va PR'ni yopish — inson qarori
- ClickUp'ga yozish yo'q — dev faqat o'qiydi
- Boshqa qatlamning `<stack>.md` fayliga yozish yo'q — u faqat o'qish uchun
