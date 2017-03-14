'use strict';

/* global describe jest test expect */
jest.dontMock('../extendable-error');

const ExtendableError = require('../extendable-error');

describe('util.extendable-error.js', () => {
  test('constructor', () => {
    function extendableError() {
      throw new ExtendableError();
    }

    expect(extendableError).toThrowErrorMatchingSnapshot();
  });
});
