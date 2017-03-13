'use strict';

/**
  @name res
  @typedef res
  @type {Object}
  @property {send} send Sends the HTTP response.
  @property {error} error Returns an error to api gateway
*/

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

function finishCallback(callback, f) {
  return function callbackWithArgs() {
    const response = f.apply(this, arguments);
    callback(response);
  };
}

module.exports = class Res {
  constructor(message) {
    this.send = finishCallback(message.done, send);
    this.error = finishCallback(message.error, error);
  }
};
