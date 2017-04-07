'use strict';

const ExtendableError = require('../util/extendable-error');

class OptionsValidationError extends ExtendableError {
  constructor() {
    super('Unexpected options.headers format. endpoint options only supports headers as an object');
    console.error('endpoint: Unexpected options.headers format. endpoint options only supports headers as an object');
  }
}

module.exports = {
  OptionsValidationError
};
