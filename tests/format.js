assert.equals(Decimal._format('1013',0), '1013');
assert.equals(Decimal._format('1013',1), '10130');
assert.equals(Decimal._format('1013',3), '1013000');
assert.equals(Decimal._format('1013',-1), '101.3');
assert.equals(Decimal._format('1013',-3), '1.013');
assert.equals(Decimal._format('1013',-5), '0.01013');
