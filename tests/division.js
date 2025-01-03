import Decimal from '../lib/decimal.js';

import assert from 'assert';
import test from 'node:test';

test('division', function(t) {
    assert.equal(Decimal('50').div('2.901'), '17.23543605653223');
    assert.equal(Decimal('20.3344').div('2.901'), '7.00944501895898');
});

test('division toString conversion', function(t) {
    assert.equal(Decimal('50').div('2.901'), Decimal.div('50', '2.901').toString());
    assert.equal(Decimal('20.3344').div('2.901'), Decimal.div('20.3344', '2.901').toString());
});
