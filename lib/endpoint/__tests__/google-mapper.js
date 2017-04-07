'use strict';

/* global describe jest test expect beforeEach afterEach */
jest.dontMock('../mappers/google-mapper');
jest.dontMock('../options-validator');

const googleMapper = require('../mappers/google-mapper');
const validator = require('../options-validator');

describe('mappers.google-mapper.js', () => {
  let validateHeaders;

  beforeEach(() => {
    validateHeaders = validator.validateHeaders;
    validator.validateHeaders = jest.fn();
  });

  afterEach(() => {
    validator.validateHeaders = validateHeaders;
  });

  test('pass args as req and res', () => {
    validator.validateHeaders = jest.fn(() => false);
    const req = { method: 'GET' };
    const res = { send: jest.fn(), header: jest.fn() };
    const mappedObject = googleMapper.apply(this, [req, res]);

    expect(mappedObject.req).toBe(req);
    expect(mappedObject.res).toBe(res);
  });

  test('pass args as req and res', () => {
    validator.validateHeaders = jest.fn(() => true);
    const req = { method: 'GET' };
    const res = { send: jest.fn(), header: jest.fn() };
    const configOptions = {
      options: {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8;',
          'Access-Control-Allow-Origin': '*'
        }
      }
    };

    googleMapper.apply(configOptions, [req, res]);

    expect(res.header).toBeCalledWith(configOptions.options.headers);

  });
});
