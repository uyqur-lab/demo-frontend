/**
 * Salomlashish oqimi. DOM'dan mustaqil, shuning uchun testlanadi.
 *
 * Kontrakt manbasi: agent-standards → tasks/CU-86eyp4nmg-salomlashish-api/backend.md
 */

const ERROR_TEXT = {
  name_required: 'Ism yuborilmadi',
  invalid_body: "So'rov noto'g'ri yuborildi",
};

const FALLBACK = "Ulanmadi. Keyinroq urinib ko'ring";

/**
 * So'rov tanasi.
 *
 * `omitName` — `name` maydonini butunlay yubormaslik uchun. Bo'sh input bo'sh
 * matn yuboradi, `null` emas; shuning uchun 400 yo'lini sinash uchun alohida
 * boshqaruv kerak (doc.md, PM qarori 2).
 */
export function requestBody({ name, omitName }) {
  return omitName ? JSON.stringify({}) : JSON.stringify({ name });
}

/** Javobni ekranga tushadigan holatga aylantiradi. */
export function toView(status, body) {
  if (status === 200 && body && typeof body.message === 'string') {
    // Trim qilinmaydi: bo'sh ism uchun javob "hi " va u shundayligicha
    // ko'rsatiladi (backend.md → "Qayerda ko'rsatiladi").
    return { kind: 'ok', text: body.message };
  }

  // Xom `error` kodi foydalanuvchiga ko'rsatilmaydi.
  const code = body && typeof body.error === 'string' ? body.error : null;
  return { kind: 'error', text: ERROR_TEXT[code] ?? FALLBACK };
}

export async function sendHi(fetchFn, { name, omitName }) {
  try {
    const res = await fetchFn('/api/v1/hi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody({ name, omitName }),
    });
    return toView(res.status, await res.json());
  } catch {
    // Tarmoq yiqilsa ham natija maydoni bo'sh qolmaydi (AC-6).
    return { kind: 'error', text: FALLBACK };
  }
}
