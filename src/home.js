/** Bosh sahifa mantiqi — DOM'dan mustaqil, shuning uchun testlanadi. */

export function renderHome(state) {
  if (state.loading) return { title: 'Uyqur', body: 'Yuklanmoqda…' };
  if (state.error) return { title: 'Uyqur', body: 'Xatolik yuz berdi' };
  return { title: 'Uyqur', body: state.message };
}

export async function loadMessage(fetchFn) {
  try {
    const res = await fetchFn('/api/hello');
    const data = await res.json();
    return { loading: false, message: data.message };
  } catch {
    return { loading: false, error: true };
  }
}
