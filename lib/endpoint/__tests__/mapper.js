'use strict';

/* global describe jest test expect */
jest.dontMock('../mappers');
jest.dontMock('../../util/extendable-error');

const eventMapper = require('../mappers');
const awsMapper = require('../mappers/aws-mapper');
const googleMapper = require('../mappers/google-mapper');

describe('mapper.index.js', () => {
  test('no arguments should throw EndpointError', () => {
    const error = console.error;
    console.error = jest.fn();

    function eventMapperNoArgs() {
      eventMapper();
    }

    expect(eventMapperNoArgs).toThrowErrorMatchingSnapshot();
    expect(console.error).toBeCalledWith('endpoint: Unexpected trigger event. Was the handler called by ApiGateway?');

    // restore
    console.error = error;
  });

  test('AWS event should use awsMapper', () => {
    const succeed = jest.fn();
    const fail = jest.fn();

    const event = {};
    const context = { succeed, fail, awsRequestId: 'uuid' };
    eventMapper(event, context);
    expect(awsMapper).toBeCalledWith(event, context);
  });

  test('Azure Http trigger should throw', () => {
    const done = jest.fn();

    const context = { done };
    const req = {};

    function eventMapperAzure() {
      eventMapper(context, req);
    }

    expect(eventMapperAzure).toThrowErrorMatchingSnapshot();
  });

  test('Google Endpoint event should use googleMapper', () => {
    const req = { method: 'GET' };
    const res = { send: jest.fn() };

    eventMapper(req, res);
    expect(googleMapper).toBeCalledWith(req, res);
  });

  test('Unexpected arguments shapes should throw', () => {
    const error = console.error;
    console.error = jest.fn();

    const context = { id: 'uuid' };
    const event = { finish: jest.fn() };
    const callback = jest.fn();
    const unknown = jest.fn();

    function eventMapperWeirdArgs() {
      eventMapper(context, event, callback, unknown);
    }

    expect(eventMapperWeirdArgs).toThrowErrorMatchingSnapshot();
    expect(console.error).toBeCalledWith('endpoint: Unexpected trigger event. Was the handler called by ApiGateway?');

    // restore
    console.error = error;
  });
});
