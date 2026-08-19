/**
 * Tasodifiy rang oqimi. DOM'dan mustaqil, shuning uchun testlanadi.
 *
 * Kontrakt manbasi: agent-standards → tasks/CU-86eyp5fw1-random-rang-api/backend.md
 */

const HEX = /^[0-9a-f]{6}$/;

const FALLBACK = "Ulanmadi. Keyinroq urinib ko'ring";

/**
 * Kod matni va rang qiymati — ikki alohida narsa.
 *
 *   matn = color          → ekranga, o'zgartirilmaydi
 *   rang = "#" + color    → CSS ga
 *
 * `#` faqat ikkinchisida qo'shiladi (backend.md, dev-rules §10).
 */
export function swatchStyle(color) {
  return {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: `#${color}`,
  };
}

export function toView(status, body) {
  const color = body && body.color;

  // Uzunlik yoki registr kontraktdan farq qilsa — bu server xatosi.
  // Klient uni to'ldirib yoki tuzatib qo'ymaydi (backend.md).
  if (status === 200 && typeof color === 'string' && HEX.test(color)) {
    return { kind: 'ok', text: color, style: swatchStyle(color) };
  }

  return { kind: 'error', text: FALLBACK };
}

export async function loadColor(fetchFn) {
  try {
    const res = await fetchFn('/api/v1/color');
    return toView(res.status, await res.json());
  } catch {
    // Tarmoq yiqilsa ham natija maydoni bo'sh qolmaydi (AC-6).
    return { kind: 'error', text: FALLBACK };
  }
}
