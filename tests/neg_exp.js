assert.equals(Decimal._neg_exp('100135',-1), '10013.5');
assert.equals(Decimal._neg_exp('100135',-3), '100.135');
assert.equals(Decimal._neg_exp('100135',-4), '10.0135');
assert.equals(Decimal._neg_exp('100135',-5), '1.00135');
assert.equals(Decimal._neg_exp('100135',-6), '0.100135');
assert.equals(Decimal._neg_exp('100135',-9), '0.000100135');
