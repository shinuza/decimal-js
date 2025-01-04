/*!
 * decimal-js: Decimal Javascript Library v0.0.2
 * https://github.com/shinuza/decimal-js/
 *
 * SPDX-License-Identifier: MIT
 */

import { DivisionByZeroError } from './exceptions.js';

const DECIMAL_SEPARATOR = '.';

// Helper functions
const zero = (exp) => '0'.repeat(exp);

const negExp = (str, position, sign) => {
  position = Math.abs(position);
  const offset = position - str.length;
  let sep = DECIMAL_SEPARATOR;

  if (offset >= 0) {
    str = zero(offset) + str;
    sep = '0.';
  }

  const length = str.length;
  const head = str.slice(0, length - position);
  const tail = str.slice(length - position, length);
  return sign + head + sep + tail;
};

const posExp = (str, exp, sign) => sign + str + zero(exp);

const format = (num, exp) => {
  const isNegative = num < 0;
  num = String(isNegative ? -num : num);
  const formatFn = exp >= 0 ? posExp : negExp;
  return formatFn(num, exp, isNegative ? '-' : '');
};

const asInteger = (number) => {
  number = String(number);
  const [integer, fractional] = number.split(DECIMAL_SEPARATOR);

  if (!fractional) {
    const trailingZeros = integer.match(/0+$/);
    if (trailingZeros) {
      const length = trailingZeros[0].length;
      return {
        value: integer.slice(0, integer.length - length),
        exp: length,
      };
    }
    return { value: integer, exp: 0 };
  }

  return {
    value: parseInt(number.split(DECIMAL_SEPARATOR).join(''), 10),
    exp: fractional.length * -1,
  };
};

class Decimal {
  constructor(num) {
    if (num === undefined) {
      return new Decimal('0');
    }

    if (num instanceof Decimal) {
      return num;
    }

    if (typeof num !== 'string') {
      throw new TypeError('Argument must be a string');
    }

    this.internal = String(num);
    this.as_int = asInteger(this.internal);
  }

  normalizeZero() {
    if (this.internal === '-0') {
      return '0';
    }
    return [...this.internal].every((char) => char === '0') ? '0' : this.internal;
  }

  zeroOperands(a, b) {
    return (a === '0' || a === '-0') && (b === '0' || b === '-0');
  }

  add(target) {
    if (this.zeroOperands(this.internal, target)) {
      return new Decimal('0');
    }

    const operands = [this, new Decimal(target)];
    operands.sort((x, y) => x.as_int.exp - y.as_int.exp);

    const [smallest, biggest] = [operands[0].as_int.exp, operands[1].as_int.exp];
    const x = Number(format(operands[1].as_int.value, biggest - smallest));
    const y = Number(operands[0].as_int.value);

    return new Decimal(format(String(x + y), smallest));
  }

  sub(target) {
    if (this.zeroOperands(this.internal, target)) {
      return new Decimal('0');
    }
    return this.add(new Decimal(String(target)).mul('-1'));
  }

  mul(target) {
    if (this.zeroOperands(this.internal, target)) {
      return new Decimal('0');
    }

    target = new Decimal(target);
    const result = String(this.as_int.value * target.as_int.value);
    const exp = this.as_int.exp + target.as_int.exp;

    return new Decimal(format(result, exp));
  }

  div(target) {
    target = new Decimal(target);

    if (target.internal === '0' || target.internal === '-0') {
      throw new DivisionByZeroError('Division by zero');
    }

    const smallest = Math.min(this.as_int.exp, target.as_int.exp);
    const common = Math.pow(10, Decimal.abs(String(smallest))).toString();
    const x = Decimal.mul(common, this);
    const y = Decimal.mul(common, target);

    return new Decimal(String(x / y));
  }

  abs(num) {
    if (num !== undefined) this.internal = String(num);
    return new Decimal(this.internal.startsWith('-') ? this.internal.slice(1) : this.internal);
  }

  floor(num) {
    if (num !== undefined) this.internal = String(num);
    const [intPart, decPart] = this.internal.split(DECIMAL_SEPARATOR);
    return !this.isNegative() || !decPart || parseInt(decPart) === 0
      ? new Decimal(intPart)
      : new Decimal(intPart).sub(1);
  }

  ceil(num) {
    if (num !== undefined) this.internal = String(num);

    if (this.internal === '0' || this.internal === '-0' || this.internal === '-0.0') {
      return '0';
    }

    const [intPart, decPart] = this.internal.split(DECIMAL_SEPARATOR);
    const result =
      this.isNegative() || !decPart || parseInt(decPart) === 0
        ? new Decimal(intPart).toString()
        : new Decimal(intPart).add('1').toString();

    return result === '-0' ? '0' : result;
  }

  isNegative(num = this.internal) {
    return num.startsWith('-');
  }

  toFixed(x) {
    if (this.internal === '0' || this.internal === '-0') {
      return x > 0 ? `0${DECIMAL_SEPARATOR}${zero(x)}` : '0';
    }

    x = parseInt(x);
    x = isFinite(x) ? x : 0;
    const [intPart, fracPart = ''] = this.internal.split(DECIMAL_SEPARATOR);
    let result = intPart;

    if (x > 0) {
      result += DECIMAL_SEPARATOR;
      let decimal = '';
      for (let i = 0; i < x; i++) {
        decimal += fracPart.charAt(i) || '0';
      }
      // Round the last digit
      if (parseInt(fracPart.charAt(x) || '0') >= 5) {
        const lastDigit = parseInt(decimal.charAt(x - 1) || '0') + 1;
        decimal = decimal.slice(0, -1) + lastDigit;
      }
      result += decimal;
    } else if (x < 0) {
      const isNegative = this.isNegative(result);
      if (isNegative) result = result.slice(1);
      if (-x >= result.length) result = '0';
      else {
        result = [...result];
        for (let i = result.length, end = result.length + x; i-- > end; ) {
          result[i] = '0';
        }
        result = result.join('');
      }
      if (isNegative && result !== '0') result = '-' + result;
    }
    return result;
  }

  toString() {
    return this.normalizeZero();
  }

  toNumber() {
    return Number(this.internal);
  }

  static add(a, b) {
    return new Decimal(a).add(b);
  }
  static mul(a, b) {
    return new Decimal(a).mul(b);
  }
  static sub(a, b) {
    return new Decimal(a).sub(b);
  }
  static div(a, b) {
    return new Decimal(a).div(b);
  }
  static abs(a) {
    return new Decimal(a).abs();
  }
  static floor(a) {
    return new Decimal(a).floor();
  }
  static ceil(a) {
    return new Decimal(a).ceil();
  }
  static toFixed(a, b) {
    return new Decimal(a).toFixed(b);
  }
}

export default Decimal;
