'use strict';

/**
  @name res
  @typedef res
  @type {Object}
  @property {function} send Sends the HTTP response.
  @property {function} error Returns an error to api gateway.
  @property {function} header Set header `key` to `value`, or pass an object of header fields.
  @property {function} set Alias for `header`.
  @property {function} getHeader Get value for header `key`.
  @property {function} get Alias for `getHeader'.
*/

const mime = require('../util/mime');
const isEmptyObject = require('../util/is-empty-object');

const CHARSET_REG_EXP = /;\s*charset\s*=/;

/**
  Formats statusCode, body to be sent as a HTTP response back to Api Gateway.
  The body parameter can be a a String, an object, or an Array.
  @name send
  @function
  @param {number} statusCode Http Response code - https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
  @param {string|Object|Object[]} body string, Object, or Array
*/
function send(statusCode, body) {

  if (body) {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body
  };
}

/**
  Formats statusCode, body to be sent as a HTTP response back to
  api consumer (Api Gateway, Google Endpoint).
  The body parameter can be a a String, an object, or an Array.
  @name send
  @function
  @param {Object} err Caught javascript error

  @returns {Object} returns error to api gateway to handle
*/
function error(err) {
  console.error('Lambda function execution failed', err);
  return err;
}

/**
  Formats statusCode, body to be sent as a HTTP response back to Api Gateway.
  The body parameter can be a a String, an object, or an Array.
  @name finishCallback
  @function
  @param {Object} err Caught javascript error

  @returns {Object} returns error to api gateway to handle
*/

function finishCallback(callback, f, res) {
  return function callbackWithArgs() {
    const response = f.apply(this, arguments);
    if (res && !isEmptyObject(res.headers)) {
      response.headers = res.headers;
    }
    callback(response);
  };
}

module.exports = class Res {
  constructor(message) {
    // Aliases
    this.set = this.header.bind(this);
    this.get = this.getHeader.bind(this);

    // Response headers
    this.headers = {};

    // Aws Callback Functions
    this.send = finishCallback(message.done, send, this);
    this.error = finishCallback(message.error, error);
  }

  /**
    Sets value for header `key`.
    @param {String} key
    @param {String} value

    @return {String}
    @private
  */
  setHeader(key, value) {
    this.headers[key] = value;
  }

  /**
    Get value for header `key`.
    @param {String} key

    @return {String}
    @public
  */
  getHeader(key) {
    return this.headers[key];
  }

  /**
    Set header `key` to `value`, or pass
    an object of header fields.

    Examples:
      res.header('Foo', ['bar', 'baz']);
      res.header('Accept', 'application/json');
      res.header({ Accept: 'text/plain', 'X-API-Key': 'tobi' });

    Aliased as `res.set()`.

    @param {String|Object} field
    @param {String|Array} val

    @return {Res} for chaining
    @public
  */
  header(field, val) {
    if (arguments.length === 2) {
      let value = Array.isArray(val)
        ? val.map(String)
        : String(val);

      // add charset to content-type
      if (field.toLowerCase() === 'content-type' && !CHARSET_REG_EXP.test(value)) {
        const charset = mime.charsets.lookup(value.split(';')[0]);
        if (charset) value += `; charset=${charset.toLowerCase()};`;
      }

      this.setHeader(field, value);
    } else {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in field) {
        this.set(key, field[key]);
      }
    }

    // chainable
    return this;
  }
};
