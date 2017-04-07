'use strict';

const errors = require('./errors');
const isPlainObject = require('../util/is-plain-object');

module.exports.validateHeaders = function validateHeaders(options) {
  if (!options) {
    return false;
  }

  if (!options.headers) {
    return false;
  }

  if (!isPlainObject(options.headers)) {
    throw new errors.OptionsValidationError();
  }

  return true;
};
