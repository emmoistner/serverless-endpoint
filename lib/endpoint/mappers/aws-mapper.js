'use strict';

const Req = require('../req');
const Res = require('../res');
const isJSON = require('../../util/is-json');

function convertBody(body) {
  // Handle invoking lambda directly
  if (typeof body === 'string' && isJSON(body)) {
    return JSON.parse(body);
  }

  return body || {};
}

function convertEventToRequest(event, context) {
  event = event || {};

  // requestContext
  const requestContext = event.requestContext || {};
  const identity = requestContext.identity || {};
  const authorizer = requestContext.authorizer || {};

  const headers = event.headers || {};
  const pathParameters = event.pathParameters || {};
  const queryStringParameters = event.queryStringParameters || {};
  const body = convertBody(event.body);
  const og = { event, context };

  // massage event data to req format
  return {
    body,
    og,
    method: event.httpMethod,
    resource: event.resource,
    headers: Object.assign({}, headers),
    params: Object.assign({}, pathParameters),
    query: Object.assign({}, queryStringParameters),
    id: requestContext.requestId,
    apiId: requestContext.apiId,
    stage: requestContext.stage,
    identity: Object.assign({}, identity),
    authorizer: Object.assign({}, authorizer),
    provider: 'aws'
  };
}

function convertContextToResponse(context) {
  return {
    done: context.succeed,
    error: context.fail
  };
}

function awsMapper(event, context) {
  const req = new Req(convertEventToRequest(event, context));
  const res = new Res(convertContextToResponse(context));

  return {
    req,
    res
  };
}

module.exports = awsMapper;
module.exports.convertEventToRequest = convertEventToRequest;
module.exports.convertContextToResponse = convertContextToResponse;
module.exports.convertBody = convertBody;
