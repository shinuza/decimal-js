// SPDX-License-Identifier: MIT

class DivisionByZeroError extends Error {
  constructor(message: string = 'Cannot divide by zero') {
    super(message);
  }

  get name() {
    return 'DivisionByZeroError';
  }
}

export { DivisionByZeroError };
