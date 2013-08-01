/*!
 * decimal-js: Decimal Javascript Library v0.0.2
 * https://github.com/shinuza/decimal-js/
*/
/*
Copyright (c) 2011 Samori Gorse, http://github.com/shinuza/decimal-js

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function() {
    var ROOT = this;
    var DECIMAL_SEPARATOR = '.';

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

            var x = Decimal.mul(Math.pow(10, Decimal.abs(smallest).toNumber()), this);
            var y = Decimal.mul(Math.pow(10, Decimal.abs(smallest).toNumber()), target);

            return Decimal(x / y);
        };
        
        this.abs = function(num) {
            if(typeof num !== 'undefined')
              this.internal = String(num);
              
            return Decimal( this.internal.charAt(0) == '-' ? this.internal.substr(1) : this.internal);
        };

        this.floor = function(num) {
            if(typeof num !== 'undefined')
                this.internal = String(num);
            var isNegative = this.internal.charAt(0) == '-';
            num = this.internal.split(DECIMAL_SEPARATOR);
            return typeof num[1] === 'undefined' || parseInt(num[1]) === 0 || !isNegative ? Decimal(num[0]) : Decimal(num[0]).sub(1);
        };

        this.ceil = function(num) {
            if(typeof num !== 'undefined')
                this.internal = String(num);
            var isNegative = this.internal.charAt(0) == '-';
            
            num = this.internal.split(DECIMAL_SEPARATOR)
            return typeof num[1] === 'undefined' || parseInt(num[1]) === 0 || isNegative ? Decimal(num[0]) : Decimal(num[0]).add(1);
        };

        this.toFixed = function(x) {
            x = parseInt(x);
            x = isFinite(x) ? x : 0;
            var splitNumber = this.internal.split(DECIMAL_SEPARATOR),
                result = splitNumber[0];
            splitNumber[1] || (splitNumber[1] = '');

            if(x > 0) {
                result += DECIMAL_SEPARATOR;
                for(var i = 0; i++ < x;)
                    result += splitNumber[1].charAt(i-1) || '0';
            }
            else if(x < 0) { // 123.0.toFixed(-1) == 120
                var isNegative = result.charAt(0) == '-';
                if(isNegative)
                    result = result.substr(1);
                if(-x >= result.length)
                    result = '0';
                else {
                    result = result.split('');
                    for(var i = result.length, end = result.length + x; i-- > end;)
                        result[i] = '0';
                    result = result.join('');
                }
                if(isNegative && result !== '0')
                    result = '-' + result;
            }
            return result;
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
            tokens = number.split(DECIMAL_SEPARATOR),
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
            value = parseInt(number.split(DECIMAL_SEPARATOR).join(''), 10);
            exp = fractional.length * -1;
        }

        return {
            'value': value,
            'exp': exp
        };
    };


    // Helpers
    var neg_exp = function(str, position) {
        position = Decimal.abs(position).toNumber();

        var offset = position - str.length;
        var sep = DECIMAL_SEPARATOR;

        if(offset >= 0) {
            str = zero(offset) + str;
            sep = '0.';
        }

        var length = str.length;
        var head = str.substr(0, length - position);
        var tail = str.substring(length  - position, length);
        
        // bugfix:
        // Decimal('0.35').sub('0.4').toString(); //returns 0.-5
        if(tail.substr(0,1) == '-') {
          head = '-'+head;
          tail = tail.substr(1);
        }
        return (head + sep + tail).replace('-.', '-0.');
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
    var methods = ['add', 'mul', 'sub', 'div', 'abs', 'floor', 'ceil'];
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
