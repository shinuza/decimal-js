import { test } from 'node:test';
import assert from 'node:assert';
import Decimal from '../lib/decimal.js';
import { DivisionByZeroError } from '../lib/exceptions.js';

test('zero addition', function (t) {
  assert.equal(new Decimal('0').add('0').toString(), '0');
  assert.equal(new Decimal('-0').add('0').toString(), '0');
  assert.equal(new Decimal('0').add('-0').toString(), '0');
  assert.equal(new Decimal('-0').add('-0').toString(), '0');

  // Static method
  assert.equal(Decimal.add('0', '0').toString(), '0');
  assert.equal(Decimal.add('-0', '0').toString(), '0');
});

test('zero subtraction', function (t) {
  assert.equal(new Decimal('0').sub('0').toString(), '0');
  assert.equal(new Decimal('-0').sub('0').toString(), '0');
  assert.equal(new Decimal('0').sub('-0').toString(), '0');
  assert.equal(new Decimal('-0').sub('-0').toString(), '0');

  // Static method
  assert.equal(Decimal.sub('0', '0').toString(), '0');
  assert.equal(Decimal.sub('-0', '0').toString(), '0');
});

test('zero multiplication', function (t) {
  assert.equal(new Decimal('0').mul('0').toString(), '0');
  assert.equal(new Decimal('-0').mul('0').toString(), '0');
  assert.equal(new Decimal('0').mul('-0').toString(), '0');
  assert.equal(new Decimal('-0').mul('-0').toString(), '0');

  // Static method
  assert.equal(Decimal.mul('0', '0').toString(), '0');
  assert.equal(Decimal.mul('-0', '0').toString(), '0');
});

test('zero division', function (t) {
  // Division by zero should throw an error
  assert.throws(() => new Decimal('0').div('0'), DivisionByZeroError);
  assert.throws(() => new Decimal('-0').div('0'), DivisionByZeroError);
  assert.throws(() => new Decimal('0').div('-0'), DivisionByZeroError);
  assert.throws(() => new Decimal('-0').div('-0'), DivisionByZeroError);

  // Static method
  assert.throws(() => Decimal.div('0', '0'), DivisionByZeroError);
  assert.throws(() => Decimal.div('-0', '0'), DivisionByZeroError);
});
