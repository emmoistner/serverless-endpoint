'use strict';

const endpoint = require('../index.js');
const eventObject = require('../lib/endpoint/__tests__/api-gateway-event.json');

function createFakeUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function handler(req, res) {
  res.send(200, { message: req.body.name });
}

const endpointHandler = endpoint(handler);

const event = Object.assign({}, eventObject);

const context = {
  succeed: params => console.log('SUCCESS', params),
  fail: error => console.log('FAILURE', error),
  awsRequestId: createFakeUUID()
};

// AWS Api Gateway Event
endpointHandler(event, context);
