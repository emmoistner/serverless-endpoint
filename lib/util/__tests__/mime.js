'use strict';

/* global describe jest test expect */
jest.dontMock('../mime');

const mime = require('../mime');

describe('util.is-json.js', () => {
  test('handles text', () => {
    expect(mime.charsets.lookup('text/html')).toEqual('UTF-8');
  });

  test('handles non text', () => {
    expect(mime.charsets.lookup('application/json')).toBeUndefined();
  });

  test('handles fallback', () => {
    expect(mime.charsets.lookup('application/javascript', 'UTF-8')).toEqual('UTF-8');
  });
});
