import Decimal from '../lib/decimal.js';

import assert from 'assert';
import test from 'node:test';

test('multiplication', function (t) {
  assert.equal(Decimal('50').mul('2.901'), '145.05');
  assert.equal(Decimal('-50').mul('2.901'), '-145.05');
  assert.equal(Decimal('-50').mul('-2.901'), '145.05');
  assert.equal(Decimal('50').mul('2901'), '145050');
  assert.equal(Decimal('-50').mul('2901'), '-145050');
  assert.equal(Decimal('-50').mul('-2901'), '145050');
  assert.equal(Decimal('1.125').mul('0.1201'), '0.1351125');
  assert.equal(Decimal('01.125').mul('0.1201'), '0.1351125');
});

test('multiplication toString conversion', function (t) {
  assert.equal(Decimal('1.125').mul('0.1201'), Decimal.mul('1.125', '0.1201').toString());
  assert.equal(Decimal('01.125').mul('0.1201'), Decimal.mul('01.125', '0.1201').toString());
});
