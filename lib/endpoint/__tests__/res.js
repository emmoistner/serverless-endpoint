'use strict';

/* global describe jest test expect */
jest.dontMock('../res');

const Res = require('../res');

describe('endpoint.res.js', () => {
  const message = {
    done: jest.fn(),
    error: jest.fn()
  };

  test('creates send and error from message', () => {
    const req = new Res(message);
    expect(req.send).toBeDefined();
    expect(req.error).toBeDefined();
  });

  test('creates send from done function', () => {
    const req = new Res(message);
    const body = { message: 'body' };
    req.send(200, body);
    expect(message.done).toBeCalled();
  });

  test('send stringify body', () => {
    const req = new Res(message);
    const body = { message: 'body' };
    req.send(200, body);
    expect(message.done).toBeCalledWith({ statusCode: 200, body: JSON.stringify(body) });
  });

  test('error calls message.error', () => {
    const error = console.error;
    console.error = jest.fn();
    const req = new Res(message);
    req.error(new Error('something went wrong'));
    expect(message.error).toBeCalled();
    expect(console.error).toMatchSnapshot();
    console.error = error;
  });

});
