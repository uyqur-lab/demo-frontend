import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadStatus, toIndicator } from '../src/status.js';

const fetchOk = (body) => async () => ({ json: async () => body });

test('CU-86eynqgxa AC-3: status=ok bo`lganda yashil indikator', async () => {
  const state = await loadStatus(fetchOk({ status: 'ok' }));
  assert.equal(toIndicator(state).color, 'green');
});

test('CU-86eynqgxa AC-4: status=down bo`lganda qizil indikator', async () => {
  const state = await loadStatus(fetchOk({ status: 'down' }));
  assert.equal(toIndicator(state).color, 'red');
});

test('CU-86eynqgxa AC-4: so`rov yiqilsa qizil indikator', async () => {
  const state = await loadStatus(async () => { throw new Error('tarmoq'); });
  assert.equal(toIndicator(state).color, 'red');
});

test('CU-86eynqgxa AC-4: kutilmagan status qiymatida ham qizil', async () => {
  const state = await loadStatus(fetchOk({ status: 'maintenance' }));
  assert.equal(toIndicator(state).color, 'red');
});
