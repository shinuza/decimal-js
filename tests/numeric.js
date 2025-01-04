import { test } from 'node:test';
import assert from 'node:assert';
import Decimal from '../lib/decimal.js';

test('abs', function (t) {
  assert.equal(new Decimal('0').abs(), '0');
  assert.equal(new Decimal('-0').abs(), '0');
  assert.equal(new Decimal('-123').abs(), '123');
  assert.equal(new Decimal('123').abs(), '123');
  assert.equal(new Decimal('-123.456').abs(), '123.456');
  assert.equal(new Decimal('123.456').abs(), '123.456');
});

test('floor', function (t) {
  assert.equal(new Decimal('123.456').floor(), '123');
  assert.equal(new Decimal('-123.456').floor(), '-124');
  assert.equal(new Decimal('123').floor(), '123');
  assert.equal(new Decimal('-123').floor(), '-123');
  assert.equal(new Decimal('0.456').floor(), '0');
  assert.equal(new Decimal('-0.456').floor(), '-1');
});

test('ceil', function (t) {
  assert.equal(new Decimal('123.456').ceil(), '124');
  assert.equal(new Decimal('-123.456').ceil(), '-123');
  assert.equal(new Decimal('123').ceil(), '123');
  assert.equal(new Decimal('-123').ceil(), '-123');
  assert.equal(new Decimal('0.456').ceil(), '1');
  assert.equal(new Decimal('-0.456').ceil(), '0');
});

test('toFixed', function (t) {
  // Regular cases
  assert.equal(new Decimal('123.456').toFixed(2), '123.46');
  assert.equal(new Decimal('123.456').toFixed(0), '123');
  assert.equal(new Decimal('-123.456').toFixed(2), '-123.46');

  // Padding with zeros
  assert.equal(new Decimal('123').toFixed(2), '123.00');
  assert.equal(new Decimal('-123').toFixed(2), '-123.00');

  // Negative precision
  assert.equal(new Decimal('123').toFixed(-1), '120');
  assert.equal(new Decimal('123').toFixed(-2), '100');
  assert.equal(new Decimal('-123').toFixed(-1), '-120');
  assert.equal(new Decimal('-123').toFixed(-2), '-100');

  // Edge cases
  assert.equal(new Decimal('0').toFixed(2), '0.00');
  assert.equal(new Decimal('-0').toFixed(2), '0.00');
  assert.equal(new Decimal('0.1').toFixed(5), '0.10000');
});
