(function() {
    var ROOT = this;
    var RADIX = '.';

    // Decimal
    var Decimal = function(num) {
        if(this.constructor != Decimal) {
            return new Decimal(num);
        }

        if(num instanceof Decimal) {
            return num;
        }

        this.internal = String(num);
        this.as_int = as_integer(this.internal);

        this.add = function(target) {
            var operands = [this, new Decimal(target)];
            operands.sort(function(x, y) { return x.as_int.exp - y.as_int.exp });

            var smallest = operands[0].as_int.exp;
            var biggest = operands[1].as_int.exp;

            var x = Number(format(operands[1].as_int.value, biggest - smallest));
            var y = Number(operands[0].as_int.value);

            var result = String(x + y);

            return Decimal(format(result, smallest));
        };

        this.sub = function(target) {
            return Decimal(this.add(target * -1));
        };

        this.mul = function(target) {
            target = new Decimal(target);
            var result = String(this.as_int.value * target.as_int.value);
            var exp = this.as_int.exp + target.as_int.exp;

            return Decimal(format(result, exp));
        };

        this.div = function(target) {
            target = new Decimal(target);

            var smallest = Math.min(this.as_int.exp, target.as_int.exp);

            var x = Decimal.mul(Math.pow(10, Math.abs(smallest)), this);
            var y = Decimal.mul(Math.pow(10, Math.abs(smallest)), target);

            return Decimal(x / y);
        };

        this.toString = function() {
            return this.internal;
        };

        this.toNumber = function() {
            return Number(this.internal);
        }
    };

    var as_integer = function(number) {
        number = String(number);

        var value,
            exp,
            tokens = number.split(RADIX),
            integer = tokens[0],
            fractional = tokens[1];

        if(!fractional) {
           var trailing_zeros = integer.match(/0+$/);

            if(trailing_zeros) {
                var length = trailing_zeros[0].length;
                value = integer.substr(0, integer.length - length);
                exp = length;
            } else {
                value = integer;
                exp = 0;
            }
        } else {
            value = parseInt(number.split(RADIX).join(''), 10);
            exp = fractional.length * -1;
        }

        return {
            'value': value,
            'exp': exp
        };
    };


    // Helpers
    var neg_exp = function(str, position) {
        position = Math.abs(position);

        var offset = position - str.length;
        var sep = RADIX;

        if(offset >= 0) {
            str = zero(offset) + str;
            sep = '0.';
        }

        var length = str.length;
        var head = str.substr(0, length - position);
        var tail = str.substring(length  - position, length);
        return head + sep + tail;
    };

    var pos_exp = function(str, exp) {
        var zeros = zero(exp);
        return String(str + zeros);
    };

    var format = function(num, exp) {
        num = String(num);
        var func = exp >= 0 ? pos_exp : neg_exp;
        return func(num, exp);
    };

    var zero = function(exp) {
        return new Array(exp + 1).join('0');
    };

    // Generics
    var methods = ['add', 'mul', 'sub', 'div'];
    for(var i = 0; i < methods.length; i++) {
        (function(method) {
            Decimal[method] = function(a, b) {
                return new Decimal(a)[method](b);
            }
        })(methods[i]);
    }

    // Module
    if(typeof module != 'undefined' && module.exports) {
        module.exports = Decimal;
    } else {
        ROOT.Decimal = Decimal;
    }
})();
