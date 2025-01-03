// Division by zero error

function DivisionByZeroError(message) {
  this.name = 'DivisionByZeroError';
  this.message = message || 'Cannot divide by zero';
}
DivisionByZeroError.prototype = Object.create(Error.prototype);
DivisionByZeroError.prototype.constructor = DivisionByZeroError;

// Exports
export { DivisionByZeroError };
