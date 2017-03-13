'use strict';

/* global describe jest test expect */
jest.dontMock('../clean-path');

const cleanPath = require('../clean-path');

describe('util.clean-path.js', () => {
  test('test single query string', () => {
    expect(cleanPath('/user', { name: 'Dan' })).toBe('/user?name=Dan');
  });

  test('test multiple query string', () => {
    expect(cleanPath('/user', { name: 'Dan', age: '20' })).toBe('/user?name=Dan&age=20');
  });

  test('no query strings', () => {
    expect(cleanPath('/user', { })).toBe('/user');
  });

  test('weird query strings', () => {
    expect(cleanPath('/user', { name: "M'a Jaon" })).toBe('/user?name=M\'a%20Jaon');
  });
});
