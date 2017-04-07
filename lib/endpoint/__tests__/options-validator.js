'use strict';

/* global describe jest test expect */
jest.dontMock('../options-validator');
jest.dontMock('../../util/is-plain-object');
jest.dontMock('../errors');
jest.dontMock('../../util/extendable-error');

const validator = require('../options-validator');

describe('options-validator.js', () => {

  describe('validateHeaders', () => {
    const validateHeaders = validator.validateHeaders;
    test('handles empty options object', () => {
      const options = {};

      expect(validateHeaders(options)).toBeFalsy();
    });

    test('handles empty options.headers object', () => {
      const options = {
        headers: {}
      };

      expect(validateHeaders(options)).toBeTruthy();
    });

    test('should throw options.headers non object', () => {
      const error = console.error;
      console.error = jest.fn();
      const options = {
        headers: []
      };

      function callValidateHeaders() {
        validateHeaders(options);
      }

      expect(callValidateHeaders).toThrowErrorMatchingSnapshot();
      expect(console.error).toBeCalledWith('endpoint: Unexpected options.headers format. endpoint options only supports headers as an object');
      console.error = error;
    });

  });

});
