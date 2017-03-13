'use strict';

/* global describe jest test expect */
jest.dontMock('../mappers/google-mapper');

const googleMapper = require('../mappers/google-mapper');

describe('mappers.google-mapper.js', () => {
  test('pass args as req and res', () => {
    const req = { method: 'GET' };
    const res = { send: jest.fn() };
    const mappedObject = googleMapper(req, res);

    expect(mappedObject.req).toBe(req);
    expect(mappedObject.res).toBe(res);
  });
});
