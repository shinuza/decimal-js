import Decimal from '../lib/decimal.js';

import assert from 'assert';
import test from 'node:test';

test('subtraction', function (t) {
  assert.equal(new Decimal('123000').sub('123.456'), '122876.544');
  assert.equal(new Decimal('123.456').sub('123000'), '-122876.544');
  assert.equal(new Decimal('100.2').sub('1203.12'), '-1102.92');
  assert.equal(new Decimal('1203.12').sub('100.2'), '1102.92');
  assert.equal(new Decimal('-1203.12').sub('-100.2'), '-1102.92');
});

test('subtraction toString conversion', function (t) {
  assert.equal(new Decimal('123.456').sub('123000'), Decimal.sub('123.456', '123000').toString());
  assert.equal(new Decimal('100.2').sub('1203.12'), Decimal.sub('100.2', '1203.12').toString());
});

test('subtraction zero', function (t) {
  assert.equal(new Decimal('0').sub('123000'), '-123000');
  assert.equal(new Decimal('123000').sub('0'), '123000');
  assert.equal(new Decimal('0.92').sub('1'), '-0.08');
  assert.equal(new Decimal('1').sub('0.92'), '0.08');
  assert.equal(new Decimal('1').sub('1'), '0');

  assert.equal(new Decimal('0').sub('0.01'), '-0.01');
  assert.equal(new Decimal('0').sub('0.09'), '-0.09');
  assert.equal(new Decimal('0.01').sub('0'), '0.01');
});
