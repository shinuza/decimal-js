function Decimal(num) {
    if(this.constructor != Decimal) {
        return new Decimal(num);
    }

    if(num instanceof Decimal) {
	return num
    }

    this.internal = String(num);
    this.repr = this._get_repr();
}

Decimal.prototype._get_repr = function() {
    var tokens = this.internal.split('.');

    var post = tokens[0];
    var pre = tokens[1];
    var value = '';
    var exp = '';


    if(!pre) {
	var trailing_zeros = post.match(/0+$/);

	if(trailing_zeros) {
	    var l = trailing_zeros[0].length;
	    value = post.substr(0, post.length - l);
	    exp = l;
	} else {
	    value = post;
	    exp = 0;
	}
    } else {
	value = parseInt(this.internal.split('.').join(''), 10);
	exp = pre.length * -1;
    }


    return {'value':value, 'exp':exp};
}


Decimal.prototype.add = function(target) {
    target = Decimal(target);
    
    var ops = [this, target];
    ops.sort(function(x, y) { return x.repr.exp - y.repr.exp });
    
    var tiniest = ops[0].repr.exp;
    var biggest = ops[1].repr.exp;

    var fst = Decimal._format(ops[1].repr.value, biggest - tiniest) * 1;
    var snd = ops[0].repr.value * 1;
    var calc = String(fst + snd);
   

    return Decimal._format(calc, tiniest);
}

Decimal.prototype.sub = function(target) {
    return this.add(target * -1)
}

Decimal.prototype.mul = function(target) {
    target = Decimal(target);
    
    var ops = [this, target];
    var fst = ops[0].repr.value;
    var snd = ops[1].repr.value;
    var calc = String(fst * snd)

    return Decimal._format(calc, ops[0].repr.exp + ops[1].repr.exp);
}


Decimal.prototype.toString = function() {
    return this.internal;
}


Decimal._neg_exp = function(str, position) {
    position = Math.abs(position);
    var offset = position - str.length;
    var sep = '.'

    if(offset >= 0) {
	str = Decimal.__zero(offset) + str;
	sep = 0 + '.';
    }

    return str.substr(0, str.length - position) + sep + str.substr(-position)
}

Decimal._pos_exp = function(str, exp) {
    var zeros = Decimal.__zero(exp);
    return str + zeros;
}

Decimal._format = function(num, exp) {
    var method = exp >= 0 ? '_pos_exp' : '_neg_exp';
    return Decimal[method](String(num), exp);
}

Decimal.__zero = function(exp) {
    return new Array(exp + 1).join('0');
};


//Generics
['add','mul', 'sub'].forEach(function(method) {
    Decimal[method] = function(a, b) {
	return Decimal(a)[method](b);
    }
});



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
assert.equals(Decimal._neg_exp('100135',-1), '10013.5')
assert.equals(Decimal._neg_exp('100135',-3), '100.135')
assert.equals(Decimal._neg_exp('100135',-4), '10.0135')
assert.equals(Decimal._neg_exp('100135',-5), '1.00135')
assert.equals(Decimal._neg_exp('100135',-6), '0.100135')
assert.equals(Decimal._neg_exp('100135',-9), '0.000100135')


assert.equals(Decimal._pos_exp('1013',0), '1013')
assert.equals(Decimal._pos_exp('1013',1), '10130')
assert.equals(Decimal._pos_exp('1013',3), '1013000')
assert.equals(Decimal._pos_exp('1013',4), '10130000')
assert.equals(Decimal._pos_exp('1013',5), '101300000')
assert.equals(Decimal._pos_exp('1013',6), '1013000000')
assert.equals(Decimal._pos_exp('1013',9), '1013000000000')

assert.equals(Decimal._format('1013',0), '1013')
assert.equals(Decimal._format('1013',1), '10130')
assert.equals(Decimal._format('1013',3), '1013000')
assert.equals(Decimal._format('1013',-1), '101.3')
assert.equals(Decimal._format('1013',-3), '1.013')
assert.equals(Decimal._format('1013',-5), '0.01013')


// Instanciation
assert.equals(Decimal(5) instanceof Decimal, true)
assert.equals(Decimal(5), '5')
assert.equals(Decimal('5'), '5')
assert.equals(Decimal(5.1), '5.1')
assert.equals(Decimal(Decimal(5.1)) instanceof Decimal, true)


// Private methods

assert.equals(Decimal('0.2').repr.value, '2')
assert.equals(Decimal('0.2').repr.exp, '-1')

assert.equals(Decimal('0.02').repr.value, '2')
assert.equals(Decimal('0.02').repr.exp, '-2')

assert.equals(Decimal('0.2').repr.value, '2')
assert.equals(Decimal('0.2').repr.exp, '-1')

assert.equals(Decimal('2').repr.value, '2')
assert.equals(Decimal('2').repr.exp, '0')

assert.equals(Decimal('20').repr.value, '2')
assert.equals(Decimal('20').repr.exp, '1')

assert.equals(Decimal('200').repr.value, '2')
assert.equals(Decimal('200').repr.exp, '2')

assert.equals(Decimal('2000000').repr.value, '2')
assert.equals(Decimal('2000000').repr.exp, '6')

assert.equals(Decimal('243000').repr.value, '243')
assert.equals(Decimal('243000').repr.exp, '3')

assert.equals(Decimal('243').repr.value, '243')
assert.equals(Decimal('243').repr.exp, '0')

assert.equals(Decimal('24301').repr.value, '24301')
assert.equals(Decimal('24301').repr.exp, '0')

assert.equals(Decimal('24301.12').repr.value, '2430112')
assert.equals(Decimal('24301.12').repr.exp, '-2')


// Addition
assert.equals(Decimal('123000').add('123.456'), '123123.456')
assert.equals(Decimal('123.456').add('123000'), '123123.456')
assert.equals(Decimal('100.2').add('1203.12'), '1303.32')
assert.equals(Decimal('1203.12').add('100.2'), '1303.32')
assert.equals(Decimal('123000').add('-123.456'), '122876.544')
assert.equals(Decimal('123.456').add('-123000'), '-122876.544')
assert.equals(Decimal('100.2').add('-1203.12'), '-1102.92')
assert.equals(Decimal('1203.12').add('-100.2'), '1102.92')
assert.equals(Decimal('1.2').add('1000'), '1001.2')
assert.equals(Decimal('1.245').add('1010'), '1011.245')
assert.equals(Decimal('5.1').add('1.901'), '7.001')
assert.equals(Decimal('1001.0').add('7.12'), '1008.12')

assert.equals(Decimal('1001.0').add('7.12'), Decimal.add('1001.0', '7.12'))
assert.equals(Decimal('1001.0').add('-7.12'), Decimal.add('1001.0', '-7.12'))

// Subtraction
assert.equals(Decimal('123000').sub('123.456'), '122876.544')
assert.equals(Decimal('123.456').sub('123000'), '-122876.544')
assert.equals(Decimal('100.2').sub('1203.12'), '-1102.92')
assert.equals(Decimal('1203.12').sub('100.2'), '1102.92')
assert.equals(Decimal('-1203.12').sub('-100.2'), '-1102.92')

assert.equals(Decimal('123.456').sub('123000'), Decimal.sub('123.456','123000'))
assert.equals(Decimal('100.2').sub('1203.12'), Decimal.sub('100.2', '1203.12'))


// Multiplication
assert.equals(Decimal('50').mul('2.901'), '145.05')
assert.equals(Decimal('-50').mul('2.901'), '-145.05')
assert.equals(Decimal('-50').mul('-2.901'), '145.05')
assert.equals(Decimal('50').mul('2901'), '145050')
assert.equals(Decimal('-50').mul('2901'), '-145050')
assert.equals(Decimal('-50').mul('-2901'), '145050')
assert.equals(Decimal('1.125').mul('0.1201'), '0.1351125');
assert.equals(Decimal('01.125').mul('0.1201'), '0.1351125');

assert.equals(Decimal('1.125').mul('0.1201'), Decimal.mul('1.125', '0.1201'));
assert.equals(Decimal('01.125').mul('0.1201'), Decimal.mul('01.125', '0.1201'));


assert.summary(); 