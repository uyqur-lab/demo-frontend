import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toView, swatchStyle, loadColor } from '../src/color.js';

function fakeFetch({ status, body, throws = false }) {
  return async () => {
    if (throws) throw new Error('tarmoq');
    return { status, json: async () => body };
  };
}

test('CU-86eyp5fw1 AC-4: color qiymati matn sifatida o`zgartirilmasdan ko`rsatiladi', async () => {
  const view = await loadColor(fakeFetch({ status: 200, body: { color: 'ffffff' } }));
  assert.equal(view.kind, 'ok');
  assert.equal(view.text, 'ffffff');
});

test('CU-86eyp5fw1 AC-4: matnga # qo`shilmaydi', async () => {
  const view = await loadColor(fakeFetch({ status: 200, body: { color: '00ff2a' } }));
  assert.equal(view.text, '00ff2a');
  assert.ok(!view.text.includes('#'), 'matnda # bo`lmasligi kerak');
});

test('CU-86eyp5fw1 AC-4: harf registri o`zgartirilmaydi', async () => {
  // Server kichik harf qaytaradi; klient uni ko'tarmasligi ham,
  // tushirmasligi ham kerak (backend.md → "Kod matni — o'zgartirmang").
  const view = await loadColor(fakeFetch({ status: 200, body: { color: 'abcdef' } }));
  assert.equal(view.text, 'abcdef');
});

test('CU-86eyp5fw1 AC-4: boshidagi nollar saqlanadi', async () => {
  const view = await loadColor(fakeFetch({ status: 200, body: { color: '000000' } }));
  assert.equal(view.text, '000000');
  assert.equal(view.text.length, 6);
});

test('CU-86eyp5fw1 AC-5: namuna 48×48 va radius 8 bo`ladi', () => {
  const style = swatchStyle('ffffff');
  assert.equal(style.width, '48px');
  assert.equal(style.height, '48px');
  assert.equal(style.borderRadius, '8px');
});

test('CU-86eyp5fw1 AC-5: rang qiymati # bilan quriladi', () => {
  // Matnga emas, faqat rang qiymatiga.
  assert.equal(swatchStyle('00ff2a').background, '#00ff2a');
});

test('CU-86eyp5fw1 AC-6: tarmoq xatosida matn bo`sh qolmaydi', async () => {
  const view = await loadColor(fakeFetch({ throws: true }));
  assert.equal(view.kind, 'error');
  assert.ok(view.text.length > 0);
});

test('CU-86eyp5fw1 AC-6: 404 javobda ham xato matni chiqadi', async () => {
  const view = await loadColor(fakeFetch({ status: 404, body: { error: 'not_found' } }));
  assert.equal(view.kind, 'error');
  assert.ok(view.text.length > 0);
  assert.ok(!view.text.includes('not_found'), 'xom kod ko`rsatilmaydi');
});

test('CU-86eyp5fw1 AC-6: 200 lekin color naqshga mos emas — xato', async () => {
  // backend.md: uzunlik 6 dan farq qilsa bu server xatosi, klient
  // o'zi to'ldirmaydi.
  const view = await toView(200, { color: 'ff2a' });
  assert.equal(view.kind, 'error');
});
