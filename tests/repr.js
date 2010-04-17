assert.equals(Decimal('0.2').repr.value, '2');
assert.equals(Decimal('0.2').repr.exp, '-1');

assert.equals(Decimal('0.02').repr.value, '2');
assert.equals(Decimal('0.02').repr.exp, '-2');

assert.equals(Decimal('0.2').repr.value, '2');
assert.equals(Decimal('0.2').repr.exp, '-1');

assert.equals(Decimal('2').repr.value, '2');
assert.equals(Decimal('2').repr.exp, '0');

assert.equals(Decimal('20').repr.value, '2');
assert.equals(Decimal('20').repr.exp, '1');

assert.equals(Decimal('200').repr.value, '2');
assert.equals(Decimal('200').repr.exp, '2');

assert.equals(Decimal('2000000').repr.value, '2');
assert.equals(Decimal('2000000').repr.exp, '6');

assert.equals(Decimal('243000').repr.value, '243');
assert.equals(Decimal('243000').repr.exp, '3');

assert.equals(Decimal('243').repr.value, '243');
assert.equals(Decimal('243').repr.exp, '0');

assert.equals(Decimal('24301').repr.value, '24301');
assert.equals(Decimal('24301').repr.exp, '0');

assert.equals(Decimal('24301.12').repr.value, '2430112');
assert.equals(Decimal('24301.12').repr.exp, '-2');
