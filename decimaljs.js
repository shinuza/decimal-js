var that = this;


String.prototype


function Decimal(num) {    
    if(this == that) {
        return new Decimal(num);
    }

    if(num instanceof Decimal) {
	return num
    }

    this.internal = String(num);
}

Decimal._period = function(str, position) {
    position = -1 * position;
    return str.substr(0, str.length - position) + '.' + str.substr( -position )
}

Decimal._zeros = function(str, exp) {
    var zeros = Array(exp + 1).join('0');
    return str + zeros;
}

Decimal.prototype.explode = function() {
    return this.internal.split('.');
}


Decimal.prototype.sign = function() {
    return this.explode()[0].indexOf('-') == 0 ? -1 : 1;
}

Decimal.prototype.exp = function() {
    var exploded = this.explode();
    var decimal = exploded[1] || "";

    return -1 * decimal.length; 
}

Decimal.prototype._to_exp = function(exp) {
    var method = exp >= 0 ? '_zeros' : '_period';
    return Decimal[method](this.internal, exp);
}

Decimal.prototype.add = function(target) {
    target = Decimal(target);
    
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


assert.equals(Decimal(5).explode()[0], '5');
assert.equals(Decimal(5.124).explode()[0], '5');
assert.equals(Decimal(5.124).explode()[1], '124');



assert.equals(Decimal(-5.124).explode()[0], '-5');
assert.equals(Decimal(-5.124).explode()[1], '124');



assert.equals(Decimal(5).exp(), 0)
assert.equals(Decimal(5.124).exp(), -3)
assert.equals(Decimal(5654646.14).exp(), -2)
assert.equals(Decimal(5654646.14000000000).exp(), -2)
assert.equals(Decimal(1.001).exp(), -3)



assert.equals(Decimal(-5).sign(), -1)
assert.equals(Decimal(-5.12).sign(), -1)
assert.equals(Decimal(5.12).sign(), 1)
assert.equals(Decimal(5.12).sign(), 1)



assert.equals(Decimal('1013')._to_exp(3), '1013000')
assert.equals(Decimal('1013')._to_exp(1), '10130')
assert.equals(Decimal('1013')._to_exp(0), '1013')

assert.equals(Decimal('1013')._to_exp(-3), '1.013')
assert.equals(Decimal('1013')._to_exp(-1), '101.3')
assert.equals(Decimal('100135')._to_exp(-4), '10.0135')




//1.2 + 1.001
//1200 + 1001
assert.equals(Decimal(1.2).add(1.001), '2.201')


/*

// 1.2 + 1001
//12 + 10010
assert.equals(Decimal(1.2).add(1001), '1002.2')


*/

assert.summary();