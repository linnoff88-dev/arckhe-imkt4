const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeProjectFolder } = require('../telegram/bot-rerun');

test('normalizeProjectFolder resolves project-relative folder shortcuts', () => {
  assert.equal(normalizeProjectFolder('prj/ARCKHÉ', 'imgs/novo_album'), 'prj/ARCKHÉ/imgs/novo_album');
  assert.equal(normalizeProjectFolder('prj/ARCKHÉ', 'assets/fotos'), 'prj/ARCKHÉ/assets/fotos');
  assert.equal(normalizeProjectFolder('prj/ARCKHÉ', 'novo_album'), 'prj/ARCKHÉ/imgs/novo_album');
  assert.equal(normalizeProjectFolder('prj/ARCKHÉ', 'prj/outro/imgs/base'), 'prj/outro/imgs/base');
});
