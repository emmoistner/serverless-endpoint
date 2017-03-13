'use strict';

const awsMapper = require('./aws-mapper');
const googleMapper = require('./google-mapper');

const ExtendableError = require('../../util/extendable-error');

class EndpointError extends ExtendableError {
  constructor() {
    super('Unexpected trigger event. Was the handler called by ApiGateway?');
    console.error('endpoint: Unexpected trigger event. Was the handler called by ApiGateway?');
  }
}

function eventMapper() {
  const args = Array.prototype.slice.call(arguments);

  if (!args.length > 1) {
    throw new EndpointError();
  }

  if (typeof args[1] === 'object' && args[1].awsRequestId) {
    // AWS Api Gateway
    return awsMapper.apply(this, arguments);
  } else if (typeof args[0] === 'object' && args[0].done) {
    // Azure Function
    throw new Error('Azure is currently unsupported. Open a PR?');
  } else if (typeof args[0] === 'object' && args[0].method) {
    // Google Cloud Function
    return googleMapper(args[0], args[1]);
  } else {
    throw new EndpointError();
  }
}

module.exports = eventMapper;
