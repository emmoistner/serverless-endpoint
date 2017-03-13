'use strict';

/* global describe jest test expect */
jest.dontMock('../index.js');
jest.setMock('../mappers/index.js', jest.fn(() => ({
  req: jest.fn(),
  res: jest.fn()
})));

const endpoint = require('../index.js');
const eventMapper = require('../mappers');

describe('endpoint.index.js', () => {
  test('export endpoint function', () => {
    expect(endpoint).toBeInstanceOf(Function);
    expect(endpoint.name).toBe('endpoint');
  });

  test('return of endpoint', () => {
    const mockHandler = jest.fn();

    expect(endpoint(mockHandler)).toBeInstanceOf(Function);
  });

  test('eventMapper should be called with HOC arguments', () => {
    const mockHandler = jest.fn();
    const succeed = jest.fn();
    const fail = jest.fn();

    const event = {};
    const context = { succeed, fail };

    endpoint(mockHandler)(event, context);
    expect(eventMapper).toBeCalledWith(event, context);
  });

});
