import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderHome, loadMessage } from '../src/home.js';

const fakeFetch = (body) => async () => ({ json: async () => body });

test('CU-DEMO201 AC-1: bosh sahifa API xabarini ko`rsatadi', async () => {
  const state = await loadMessage(fakeFetch({ message: 'Hello, Uyqur!' }));
  assert.equal(renderHome(state).body, 'Hello, Uyqur!');
});

test('CU-DEMO201 AC-2: yuklanayotganda "Yuklanmoqda…" ko`rsatiladi', () => {
  assert.equal(renderHome({ loading: true }).body, 'Yuklanmoqda…');
});

test('CU-DEMO201 AC-3: API xato bersa xato xabari ko`rsatiladi', async () => {
  const state = await loadMessage(async () => { throw new Error('tarmoq'); });
  assert.equal(renderHome(state).body, 'Xatolik yuz berdi');
});
