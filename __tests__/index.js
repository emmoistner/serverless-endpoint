'use strict';

/* global describe beforeEach jest test expect */
jest.dontMock('../index.js');

const index = require('../index.js');

describe('index.js', () => {
  test('exposes endpoint function', () => {
    expect(index).toBeInstanceOf(Function);
    expect(index.name).toBe('endpoint');
  });
});
