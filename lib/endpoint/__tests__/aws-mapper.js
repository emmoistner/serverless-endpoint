'use strict';

/* global describe jest test expect */
jest.dontMock('../mappers/aws-mapper');
jest.dontMock('../../util/is-json');

const awsMapper = require('../mappers/aws-mapper');
const eventObject = require('./api-gateway-event.json');
const Req = require('../req');
const Res = require('../res');

describe('mappers.aws-mapper.js', () => {
  test('convertEventToRequest should map event to an object res can consume', () => {
    expect(awsMapper.convertEventToRequest(eventObject)).toMatchSnapshot();
  });

  test('convertEventToRequest should apply sensible defaults for empty event object', () => {
    expect(awsMapper.convertEventToRequest()).toMatchSnapshot();
  });

  test('convertContextToResponse should map event to an object req can consume', () => {
    const context = { succeed: function succeed() {}, fail: function fail() {} };
    const preResObject = awsMapper.convertContextToResponse(context);
    expect(preResObject.done).toBeInstanceOf(Function);
    expect(preResObject.error).toBeInstanceOf(Function);
  });

  test('convertContextToResponse should map event to an object req can consume', () => {
    const context = { succeed: function succeed() {}, fail: function fail() {} };
    const event = eventObject;
    const mappedObject = awsMapper(event, context);
    expect(mappedObject.req).toBeInstanceOf(Req);
    expect(mappedObject.res).toBeInstanceOf(Res);
  });


  test('convertBody should handle stringified json', () => {
    // eslint-disable-next-line quotes
    expect(awsMapper.convertBody("{\"name\": \"Dave\"}")).toMatchSnapshot();
  });

  test('convertBody should handle object', () => {
    // eslint-disable-next-line quotes
    expect(awsMapper.convertBody({ name: 'Dave' })).toEqual({ name: 'Dave' });
  });

  test('convertBody should handle undefined', () => {
    // eslint-disable-next-line quotes
    expect(awsMapper.convertBody()).toEqual({});
  });
});
