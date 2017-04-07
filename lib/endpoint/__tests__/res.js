'use strict';

/* global describe jest test expect */
jest.dontMock('../res');
jest.dontMock('../../util/is-empty-object');
jest.dontMock('../../util/is-plain-object');
jest.dontMock('../../util/mime');
jest.dontMock('../../util/extendable-error');
jest.dontMock('../errors');
jest.dontMock('../options-validator');

const Res = require('../res');

describe('endpoint.res.js', () => {
  const message = {
    done: jest.fn(),
    error: jest.fn()
  };

  test('creates send and error from message', () => {
    const res = new Res(message);
    expect(res.send).toBeDefined();
    expect(res.error).toBeDefined();
  });

  test('creates send from done function', () => {
    const res = new Res(message);
    const body = { message: 'body' };
    res.send(200, body);
    expect(message.done).toBeCalled();
  });

  test('send stringify body', () => {
    const res = new Res(message);
    const body = { message: 'body' };
    res.send(200, body);
    expect(message.done).toBeCalledWith({ statusCode: 200, body: JSON.stringify(body) });
  });

  test('send headers with stringified body', () => {
    const res = new Res(message);
    const body = { message: 'body' };
    const headers = { 'Content-Type': 'application/json; charset=UTF-8;' };
    res.header(headers);
    res.send(200, body);
    expect(message.done).toBeCalledWith({ statusCode: 200, body: JSON.stringify(body), headers });
  });

  test('send handles bad headers and has valid stringified body', () => {
    const res = new Res(message);
    const body = { message: 'body' };
    const badHeaders = 'This is a string not a map of headers';
    res.headers = badHeaders;
    res.send(200, body);
    expect(message.done).toBeCalledWith({ statusCode: 200, body: JSON.stringify(body) });
  });

  test('send handles already undefined body', () => {
    const res = new Res(message);
    res.send(200);
    expect(message.done).toBeCalledWith({ statusCode: 200 });
  });

  test('error calls message.error', () => {
    const error = console.error;
    console.error = jest.fn();
    const res = new Res(message);
    res.error(new Error('something went wrong'));
    expect(message.error).toBeCalled();
    expect(console.error).toBeCalledWith('Lambda function execution failed', new Error('something went wrong'));
    console.error = error;
  });

  test('Res handles options.headers as object', () => {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8;',
        'Access-Control-Allow-Origin': '*'
      }
    };

    const res = new Res(message, options);
    expect(res.headers).toEqual(options.headers);
  });

  test('Res should throw options.headers as non plain object', () => {
    const error = console.error;
    console.error = jest.fn();
    const options = {
      headers: []
    };

    function newRes() {
      return new Res(message, options);
    }

    expect(newRes).toThrowErrorMatchingSnapshot();
    expect(console.error).toBeCalledWith('endpoint: Unexpected options.headers format. endpoint options only supports headers as an object');
    console.error = error;
  });

  describe('#header', () => {
    test('should set headers with object', () => {
      const res = new Res(message);
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8;',
        'Access-Control-Allow-Origin': '*'
      };
      res.header(headers);
      expect(res.headers).toEqual(headers);
    });

    test('should set headers with key, value', () => {
      const res = new Res(message);
      const key = 'Content-Type';
      const value = 'application/json; charset=UTF-8;';

      res.header(key, value);
      expect(res.headers).toEqual({ [key]: value });
    });

    test('should set Content-Type charset if missing', () => {
      const res = new Res(message);
      const key = 'Content-Type';
      const value = 'text/html';

      res.header(key, value);
      expect(res.headers).toEqual({ [key]: `${value}; charset=utf-8;` });
    });

    test('should not set Content-Type charset not `text` Content-Type', () => {
      const res = new Res(message);
      const key = 'Content-Type';
      const value = 'application/json';

      res.header(key, value);
      expect(res.headers).toEqual({ [key]: `${value}` });
    });

    test('should set headers with key, value array', () => {
      const res = new Res(message);
      const key = 'x-cookie';
      const value = ['foo', 'bar'];

      res.header(key, value);
      expect(res.headers).toEqual({ [key]: value });
    });
  });

  describe('#set', () => {
    test('should be a function', () => {
      const res = new Res(message);
      expect(res.set).toBeInstanceOf(Function);
    });
  });

  describe('#getHeader', () => {
    test('should return a header value by key', () => {
      const res = new Res(message);
      res.headers = {
        'Content-Type': 'application/json; charset=UTF-8;',
        'Access-Control-Allow-Origin': '*'
      };
      expect(res.getHeader('Content-Type')).toEqual('application/json; charset=UTF-8;');
    });
  });

  describe('#get', () => {
    test('should be a function', () => {
      const res = new Res(message);
      expect(res.get).toBeInstanceOf(Function);
    });
  });

});
