import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestBody, toView, sendHi } from '../src/hi.js';

/** Soxta fetch — tarmoqqa chiqmaydi (loyihada mocking kutubxonasi yo'q). */
function fakeFetch({ status, body, throws = false }) {
  const calls = [];
  const fn = async (path, opts) => {
    calls.push({ path, opts });
    if (throws) throw new Error('tarmoq');
    return { status, json: async () => body };
  };
  fn.calls = calls;
  return fn;
}

test('CU-86eyp4nmg AC-5: javobdagi message ekranda ko`rsatiladi', async () => {
  const f = fakeFetch({ status: 200, body: { message: 'hi Alisher' } });
  const view = await sendHi(f, { name: 'Alisher', omitName: false });
  assert.equal(view.kind, 'ok');
  assert.equal(view.text, 'hi Alisher');
});

test('CU-86eyp4nmg AC-5: bo`sh ism javobi trim qilinmaydi', async () => {
  // backend.md: bo'sh ism uchun javob "hi " — orqasidagi bo'shliq bilan.
  // Trim qilsak BE testi kutgan natija bilan ekrandagi natija farq qiladi.
  const f = fakeFetch({ status: 200, body: { message: 'hi ' } });
  const view = await sendHi(f, { name: '', omitName: false });
  assert.equal(view.text, 'hi ');
});

test('CU-86eyp4nmg AC-5: so`rov POST va JSON tana bilan yuboriladi', async () => {
  const f = fakeFetch({ status: 200, body: { message: 'hi Ali' } });
  await sendHi(f, { name: 'Ali', omitName: false });
  assert.equal(f.calls[0].path, '/api/v1/hi');
  assert.equal(f.calls[0].opts.method, 'POST');
  assert.equal(f.calls[0].opts.body, '{"name":"Ali"}');
});

test('CU-86eyp4nmg AC-6: name_required xatosi o`z matni bilan ko`rsatiladi', async () => {
  const f = fakeFetch({ status: 400, body: { error: 'name_required' } });
  const view = await sendHi(f, { name: '', omitName: true });
  assert.equal(view.kind, 'error');
  assert.equal(view.text, 'Ism yuborilmadi');
});

test('CU-86eyp4nmg AC-6: invalid_body xatosi o`z matni bilan ko`rsatiladi', async () => {
  const f = fakeFetch({ status: 400, body: { error: 'invalid_body' } });
  const view = await sendHi(f, { name: 'x', omitName: false });
  assert.equal(view.text, "So'rov noto'g'ri yuborildi");
});

test('CU-86eyp4nmg AC-6: tarmoq xatosida ham matn bo`sh qolmaydi', async () => {
  const f = fakeFetch({ throws: true });
  const view = await sendHi(f, { name: 'x', omitName: false });
  assert.equal(view.kind, 'error');
  assert.ok(view.text.length > 0);
});

test('CU-86eyp4nmg AC-6: noma`lum error kodi ham matn beradi', async () => {
  const f = fakeFetch({ status: 500, body: { error: 'boshqa_narsa' } });
  const view = await sendHi(f, { name: 'x', omitName: false });
  assert.equal(view.kind, 'error');
  assert.ok(view.text.length > 0);
  // Xom kod foydalanuvchiga ko'rsatilmaydi (backend.md ko'rsatmasi).
  assert.ok(!view.text.includes('boshqa_narsa'));
});

test("CU-86eyp4nmg AC-6: omitName bo`lsa tana bo`sh obyekt bo`ladi", () => {
  assert.equal(requestBody({ name: 'Ali', omitName: true }), '{}');
  assert.equal(requestBody({ name: 'Ali', omitName: false }), '{"name":"Ali"}');
});

test('CU-86eyp4nmg AC-6: 200 lekin message yo`q — xato deb qaraladi', () => {
  const view = toView(200, {});
  assert.equal(view.kind, 'error');
  assert.ok(view.text.length > 0);
});
