'use strict';

const cleanPath = require('../util/clean-path');

/**
  @name req
  @typedef req
  @type {Object}
  @property {Object} body http body object sent by request
  @property {string} method Http method - GET, PUT, POST, DELETE, etc..
  @property {string} path A cleaned url string
  @property {string} resource base resource of url
  @property {Object} headers header object containing all header information
  @property {Object} params parameters object from url path - /resource/{id} = { id: <value> }
  @property {Object} query query parameters object from url - /resource?sort=asc = { sort: 'asc' }
  @property {string} id `AWS Only` string id of the request: AWS.event.requestContext.requestId
  @property {string} apiId `AWS Only` string apiId: AWS.event.requestContext.apiId
  @property {string} stage `AWS Only` api stage from url - /dev/resource = 'dev'
  @property {Object} identity `AWS Only` identity of user: event.requestContext.identity
  @property {function} header value for the header key - header(headerKey)
  @property {function} get value for the header key - get(headerKey)
  @property {function} getOriginalRequest returns the arguments provided to the http function
*/

module.exports = class Req {
  constructor(message) {

    this.params = message.params;
    this.query = message.query;
    this.body = message.body;
    this.method = message.method;
    this.resource = message.resource;
    this.path = cleanPath(message.path, message.query);
    this.headers = message.headers;

    // AWS Only
    this.id = message.id;
    this.apiId = message.apiId;
    this.stage = message.stage;
    this.identity = message.identity;
    this.authorizer = message.authorizer;


    // eslint-disable-next-line no-underscore-dangle
    this.__og = message.og; // { event, context }
    this.provider = message.provider;

    // functions
    this.header = this.get.bind(this);
    this.get = this.get.bind(this);
    this.getOriginalRequest = this.getOriginalRequest.bind(this);
  }

  /**
    Return request header
    Alias as `req.header()`

    @param {String} name
    @return {String}
  */
  get(name) {
    if (!name) {
      throw new TypeError('name argument is required to req.get');
    }

    if (typeof name !== 'string') {
      throw new TypeError('name must be a string to req.get');
    }

    return this.headers[name];
  }

  /**
    Return original parameters sent
    by the Http Trigger (Api Gateway, Google Endpoint... etc)

    Examples:

      // AWS
      req.getOriginalRequest();
      // => { event: {}, context: {} }

    @return {Object}
  */
  getOriginalRequest() {
    // eslint-disable-next-line no-underscore-dangle
    return this.__og;
  }

};
