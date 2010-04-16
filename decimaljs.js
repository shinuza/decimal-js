function Decimal(num) {
    if(this.constructor != Decimal) {
        return new Decimal(num);
    }

    if(num instanceof Decimal) {
	return num
    }

    this.internal = String(num);
    this.exp = this.get_exp();
    this.repr = this._get_repr();
}

Decimal.global = this;

Decimal.prototype._as_exp = function(exp) {
    var exp = exp + this.repr.exp;
    return parseInt(Decimal._zeros(this.repr.value, exp),10);
}

Decimal.prototype._get_repr = function() {
    var value = parseInt(this.internal.split('.').join(''), 0);

    return {'value':value.toString(), 'exp':this.exp};
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

    var fst = ops[0]._as_exp(Math.abs(tiniest));
    var snd = ops[1]._as_exp(Math.abs(tiniest));
    var calc = String(fst * 1 + snd * 1);

    return Decimal._format(calc, tiniest);
}


Decimal.prototype.toString = function() {
    return this.internal;
}


Decimal._period = function(str, position) {
    position = -1 * position;
    return str.substr(0, str.length - position) + '.' + str.substr( -position )
}

Decimal._zeros = function(str, exp) {
    var zeros = Array(exp + 1).join('0');
    return str + zeros;
}

Decimal._format = function(str, exp) {
    var method = exp >= 0 ? '_zeros' : '_period';
    return Decimal[method](str, exp);
}


var assert = {
    log : function() {
	//FIX ME
	return typeof(console) != 'undefined' ? console.log : print;
    }(),
    tests : 0,
    failed : 0,
    equals : function(given, expected) {
	this.tests += 1;
	if(given != expected) {
	    this.failed += 1;
	    this.log('Failed: "' + given + '" does not equal "' + expected + '"')
	}
    },
    summary : function() {
	this.log()
	this.log(this.tests + ' tests, ' + this.failed + ' failed')
    }
}





// Static methods
assert.equals(Decimal._period('100135',-1), '10013.5')
assert.equals(Decimal._period('100135',-3), '100.135')
assert.equals(Decimal._period('100135',-4), '10.0135')


assert.equals(Decimal._zeros('1013',0), '1013')
assert.equals(Decimal._zeros('1013',1), '10130')
assert.equals(Decimal._zeros('1013',3), '1013000')



// Instanciation
assert.equals(Decimal(5) instanceof Decimal, true)
assert.equals(Decimal(5), '5')
assert.equals(Decimal('5'), '5')
assert.equals(Decimal(5.1), '5.1')
assert.equals(Decimal(Decimal(5.1)) instanceof Decimal, true)


// Private methods
assert.equals(Decimal('100.2')._as_exp(2), '10020')
assert.equals(Decimal('0.2')._as_exp(2), '20')
assert.equals(Decimal('0.2')._as_exp(3), '200')
assert.equals(Decimal('0.02')._as_exp(3), '20')

assert.equals(Decimal('100.2')._get_repr(2).value, '1002')
assert.equals(Decimal('100.2')._get_repr(2).exp, '-1')

assert.equals(Decimal('0.2')._get_repr(2).value, '2')
assert.equals(Decimal('0.2')._get_repr(2).exp, '-1')

assert.equals(Decimal('0.02')._get_repr(2).value, '2')
assert.equals(Decimal('0.02')._get_repr(2).exp, '-2')

assert.equals(Decimal('2000000')._get_repr(2).value, '2000000')
assert.equals(Decimal('2000000')._get_repr(2).exp, '0')



// Addition

assert.equals(Decimal('100.2').add('1203.12'), '1303.32')
assert.equals(Decimal('1.2').add('1000'), '1001.2')
assert.equals(Decimal('1.245').add('1010'), '1011.245')
assert.equals(Decimal('5.1').add('1.901'), '7.001')
assert.equals(Decimal('1001.0').add('7.12'), '1008.12')


assert.summary(); 