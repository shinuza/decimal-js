import Decimal from '../lib/decimal.js';

import assert from 'assert';
import test from 'node:test';

test('Decimal type', function (t) {
  assert.equal(new Decimal('5') instanceof Decimal, true);
  assert.equal(new Decimal('5'), '5');
  assert.equal(new Decimal('5'), '5');
  assert.equal(new Decimal('5.1'), '5.1');
  assert.equal(new Decimal(new Decimal('5.1')) instanceof Decimal, true);
});
