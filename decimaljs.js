var that = this;


function Decimal(num) {    
    if(this == that) {
        return new Decimal(num);
    }

    if(num instanceof Decimal) {
	return num
    }

    this.internal = String(num);
    this.exp = this.get_exp();
    this.repr = this.get_repr();
}

Decimal._period = function(str, position) {
    position = -1 * position;
    return str.substr(0, str.length - position) + '.' + str.substr( -position )
}

Decimal._zeros = function(str, exp) {
    var zeros = Array(exp + 1).join('0');
    return str + zeros;
}


Decimal.prototype.as_exp = function(exp) {
    var exp = exp + this.repr.exp;
    return Decimal._zeros(this.repr.value, exp);
}

Decimal._format = function(str, exp) {
    var method = exp >= 0 ? '_zeros' : '_period';
    return Decimal[method](str, exp);
}


Decimal.prototype.get_repr = function() {
    var value = this.internal.split('.').join('');

    return {'value':value, 'exp':this.exp};
}

Decimal.prototype.get_exp = function() {
    var decimal = this.internal.split('.')[1] || "";
    return -1 * decimal.length; 
}

Decimal.prototype.add = function(target) {
    target = Decimal(target);
    
    var ops = [this, target];
    ops.sort(function(x, y) {
	if(x.exp > y.exp) {
	    return -1;
	}
	if(x.exp < y.exp) {
	    return 1;
	}
	if(x.exp == y.exp) {
	    return 0;
	}
    });

    var tiniest = ops[1].exp;

    var fst = ops[0].as_exp(Math.abs(tiniest));
    var snd = ops[1].as_exp(Math.abs(tiniest));
    var calc = String(fst * 1 + snd * 1);

    return Decimal._format(calc, tiniest);

}


Decimal.prototype.toString = function() {
    return this.internal;
}




var assert = {
    tests : 0,
    failed : 0,
    equals : function(given, expected) {
	this.tests += 1;
	if(given != expected) {
	    this.failed += 1;
	    print('Failed: "' + given + '" does not equal "' + expected + '"')
	}
    },
    summary : function() {
	print()
	print(this.tests + ' tests, ' + this.failed + ' failed')
    }
}





//TESTS Decimal


assert.equals(Decimal._period('100135',-1), '10013.5')
assert.equals(Decimal._period('100135',-3), '100.135')
assert.equals(Decimal._period('100135',-4), '10.0135')


assert.equals(Decimal._zeros('1013',0), '1013')
assert.equals(Decimal._zeros('1013',1), '10130')
assert.equals(Decimal._zeros('1013',3), '1013000')



assert.equals(Decimal(5) instanceof Decimal, true)



assert.equals(Decimal(5), '5')
assert.equals(Decimal('5'), '5')
assert.equals(Decimal(5.1), '5.1')
assert.equals(Decimal(Decimal(5.1)), '5.1')


assert.equals(Decimal('100.2').as_exp(2), '10020')


assert.equals(Decimal('100.2').add('1203.12'), '1303.32')
assert.equals(Decimal('1.2').add('1000'), '1001.2')
assert.equals(Decimal('1.245').add('1010'), '1011.245')



assert.summary();