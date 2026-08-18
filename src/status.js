/**
 * Server holati indikatori mantiqi — DOM'dan mustaqil.
 * Kontrakt: uyqur-lab/contracts → GET /api/status → { "status": "ok" | "down" }
 */

export const INDICATOR = {
  ok:   { color: 'green', label: 'Server ishlayapti' },
  down: { color: 'red',   label: 'Server bilan aloqa yo`q' },
};

/** AC-3 / AC-4: javobdan indikator holatini aniqlaydi. */
export function toIndicator(state) {
  return state.ok ? INDICATOR.ok : INDICATOR.down;
}

/** So'rov bir marta, sahifa yuklanganda (PM qarori). */
export async function loadStatus(fetchFn) {
  try {
    const res = await fetchFn('/api/status');
    const data = await res.json();
    return { ok: data.status === 'ok' };
  } catch {
    return { ok: false };
  }
}
