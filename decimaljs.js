function Decimal(num) {    
    if(!this.config) {
        return new Decimal(num);
    }

    this.internal = String(num);
}



var assert = {
    tests : 0,
    failed : 0,
    equals : function(given, expected) {
	this.tests += 1;
	if(given != expected) {
	    this.failed += 1;
	    print('Failed: "' +given + '" does not equal "' + expected + '"')
	}
    },
    summary : function() {
	print(this.tests + ' tests, ' + this.failed + ' failed')
    }
}



assert.equals(Decimal(5), '5')
assert.equals(Decimal('5'), '5')
assert.equals(Decimal(5) instanceof Decimal, true)


//assert.equals(Decimal(1.2).add(1.001))


assert.summary();