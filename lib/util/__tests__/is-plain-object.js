'use strict';

/* global describe jest test expect */
jest.dontMock('../is-plain-object');

const isPlainObject = require('../is-plain-object');

describe('util.is-empty-object.js', () => {
  test('handles empty object', () => {
    expect(isPlainObject({})).toBeTruthy();
  });

  test('handles non empty object', () => {
    expect(isPlainObject({ key: 'value' })).toBeTruthy();
  });

  test('handles array', () => {
    expect(isPlainObject([])).toBeFalsy();
  });

  test('handles string', () => {
    expect(isPlainObject('string')).toBeFalsy();
  });

  test('handles number', () => {
    expect(isPlainObject(55)).toBeFalsy();
  });

  test('handles zero', () => {
    expect(isPlainObject(0)).toBeFalsy();
  });
});
