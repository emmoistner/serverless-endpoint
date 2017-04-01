'use strict';

/* global describe jest test expect */
jest.dontMock('../is-empty-object');

const isEmptyObject = require('../is-empty-object');

describe('util.is-empty-object.js', () => {
  test('handles empty object', () => {
    expect(isEmptyObject({})).toBeTruthy();
  });

  test('handles non empty object', () => {
    expect(isEmptyObject({ key: 'value' })).toBeFalsy();
  });

  test('handles array', () => {
    expect(isEmptyObject([])).toBeFalsy();
  });

  test('handles string', () => {
    expect(isEmptyObject('string')).toBeFalsy();
  });

  test('handles number', () => {
    expect(isEmptyObject(55)).toBeFalsy();
  });

  test('handles zero', () => {
    expect(isEmptyObject(0)).toBeFalsy();
  });
});
