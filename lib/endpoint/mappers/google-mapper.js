'use strict';

const validator = require('../options-validator');

// Pass through parameters
module.exports = function googleMapper(req, res) {

  // Default response headers
  if (validator.validateHeaders(this.options)) {
    res.header(this.options.headers);
  }

  return { req, res };
};
