# Decimal.js

Simple decimal arithmetic for the browser _and_ node.js!

# Why?

    Why don't my numbers, like 0.1 + 0.2 add up to a nice round 0.3,
    and instead I get a weird result like 0.30000000000000004?

    Because internally, computers use a format (binary floating-point)
    that cannot accurately represent a number like 0.1, 0.2 or 0.3 at all.

Source : http://floating-point-gui.de/

I wrote this because I needed to do simple computation in the browser
and I couldn't find a lightweight library to do it.

## How to use?

#### In the browser

```html
<script src="lib/decimal.js"></script>
```

#### In Node.js / Deno

```bash
    npm install decimal
```

then in your program

```js
let Decimal = require('decimal');
```

# Examples

```js
    >>> 1.1 + 2.2
    3.3000000000000003
```

```js
    >>> Decimal('1.1').add('2.2').toNumber()
    3.3
```

```js
    >>> 4.01 * 2.01
    8.060099999999998
```

```js
    >>> Decimal('4.01').mul('2.01').toNumber()
    8.0601
```

```js
    >>> Decimal.mul('4.01', '2.01').toNumber()
    8.0601
```

## Can I help?

Of course you can, I suck at math, and this implementation is very naive.
If you are a math Guru and you see something wrong or a
way to simplify things you can send in a pull request.

## Methods

### Decimal(n)

Create a new `Decimal` from `n`. `n` can be a string, integer, or
another `Decimal`.

### Basic Operations

#### .toString()

Returns the `Decimal` instance as a string.

#### .toNumber()

Turn a `Decimal` into a `Number`.

#### .add(n)

Return a new `Decimal` containing the instance value plus `n`.

#### .sub(n)

Return a new `Decimal` containing the instance value minus `n`.

#### .mul(n)

Return a new `Decimal` containing the instance value multiplied by `n`.

#### .div(n)

Return a new `Decimal` containing the instance value integrally divided by `n`.

### Numeric Operations

#### .abs()

Returns a new `Decimal` containing the absolute value.

```js
>>> Decimal('-123.456').abs().toString()
'123.456'
```

#### .floor()

Returns a new `Decimal` rounded down to the nearest integer.

```js
>>> Decimal('123.456').floor().toString()
'123'
>>> Decimal('-123.456').floor().toString()
'-124'
```

#### .ceil()

Returns a new `Decimal` rounded up to the nearest integer.

```js
>>> Decimal('123.456').ceil().toString()
'124'
>>> Decimal('-123.456').ceil().toString()
'-123'
```

#### .toFixed(decimals)

Returns a string representation of the decimal with a fixed number of decimal places. Rounds the last decimal place.

```js
>>> Decimal('123.456').toFixed(2)
'123.46'
>>> Decimal('123').toFixed(2)
'123.00'
```

### Static Methods

All instance methods are also available as static methods:

```js
>>> Decimal.add('1.1', '2.2').toString()
'3.3'
>>> Decimal.abs('-123.456').toString()
'123.456'
```
