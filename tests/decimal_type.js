// Instanciation
assert.equals(Decimal(5) instanceof Decimal, true);
assert.equals(Decimal(5), '5');
assert.equals(Decimal('5'), '5');
assert.equals(Decimal(5.1), '5.1');
assert.equals(Decimal(Decimal(5.1)) instanceof Decimal, true);
