assert.equals(Decimal._pos_exp('1013',0), '1013');
assert.equals(Decimal._pos_exp('1013',1), '10130');
assert.equals(Decimal._pos_exp('1013',3), '1013000');
assert.equals(Decimal._pos_exp('1013',4), '10130000');
assert.equals(Decimal._pos_exp('1013',5), '101300000');
assert.equals(Decimal._pos_exp('1013',6), '1013000000');
assert.equals(Decimal._pos_exp('1013',9), '1013000000000');
