import Decimal from '../lib/decimal.js';

import assert from 'assert';
import test from 'node:test';

test('chaining', function (t) {
  assert.equal(new Decimal('1.005').mul('50.01').mul('0.03'), '1.5078015');
  assert.equal(new Decimal('1.005').div('50.01').add('0.03'), '0.05009598080383923');
});
