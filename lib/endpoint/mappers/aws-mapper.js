'use strict';

const Req = require('../req');
const Res = require('../res');

function convertEventToRequest(event, context) {
  event = event || {};

  // requestContext
  const requestContext = event.requestContext || {};
  const identity = requestContext.identity || {};

  const headers = event.headers || {};
  const pathParameters = event.pathParameters || {};
  const queryStringParameters = event.queryStringParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};
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
