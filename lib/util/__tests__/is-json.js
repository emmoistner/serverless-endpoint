'use strict';

/* global describe jest test expect */
jest.dontMock('../is-json');

const isJSON = require('../is-json');

describe('util.is-json.js', () => {
  test('handles stringified json', () => {
    expect(isJSON('{"name": "Dave"}')).toBeTruthy();
  });

  test('handles undefined', () => {
    expect(isJSON()).toBeFalsy();
  });

  test('handles bad json', () => {
    expect(isJSON('Object { name: "Jeff" }')).toBeFalsy();
  });
});
