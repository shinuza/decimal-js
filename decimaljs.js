function Decimal(num) {
    
    if(this.constructor == window.constructor ) {
        return new Decimal(num);
    }

    this.num = String(num);
    this.conf = this.config();
    this.repr = this.get_repr();

    this.precision = this.conf[1] ? this.conf[1].length : 0;
    this.intg = this.conf[0];
    this.dec = this.conf[1];
}

Decimal.format = function(d, p) {
    var int = d.slice(0, -p);
    var dec = d.slice(-p);
   

    if(int == '' && dec.length == p) {
        return '0.' + d;
    }

    if(int == '' &&  p == 0) {
        return d;
    }
    
    return int + '.' + dec;
    
}


Decimal.prototype.substract = function(dec_inst) {
    if(dec_inst instanceof Decimal) {
    
        var a  = dec_inst;
        var b = this;
        var precision = a.precision;
       
        
        var result = String(b.repr - a.repr); 
        
        
        return Decimal.format(result, precision)
    } else {
        throw new TypeError(dec_inst + ' is not a Decimal instance')
    }
}

Decimal.prototype.__sub__ = Decimal.prototype.substract


Decimal.prototype.multiply = function(dec_inst) {
    if(dec_inst instanceof Decimal) {
    
        var a  = dec_inst;
        var b = this;
        var precision = a.precision + b.precision;
        var result = String(a.repr * b.repr);        
        
        return Decimal.format(result, precision)
    } else {
        throw new TypeError(dec_inst + ' is not a Decimal instance')
    }
}

Decimal.prototype.__mul__ = Decimal.prototype.multiply


Decimal.prototype.divide = function(dec_inst) {
    if(dec_inst instanceof Decimal) {
        return this.num / dec_inst.num
    } else {
        throw new TypeError(dec_inst + ' is not a Decimal instance')
    }
}

Decimal.prototype.config = function() {
    return this.num.split('.');
}


Decimal.prototype.get_repr = function() {
    return this.num.replace('.', '');
}

console.log(
Decimal('1.2').__sub__(Decimal('1.0'))
)
