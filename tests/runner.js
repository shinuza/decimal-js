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
	        this.log('Failed: "' + given + '" does not equal "' + expected + '"');
	    }
    },
    summary : function() {
	    this.log();
	    this.log(this.tests + ' tests, ' + this.failed + ' failed');
    }
};

load(
    './decimaljs.js',
    'tests/addition.js',
    'tests/decimal_type.js',
    'tests/format.js',
    'tests/multiplication.js',
    'tests/neg_exp.js',
    'tests/pos_exp.js',
    'tests/repr.js',
    'tests/subtraction.js'
);

setTimeout(function() {
    assert.summary()
}, 2000);
