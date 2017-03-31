'use strict';

/* global describe jest test expect */
jest.dontMock('../req');
jest.dontMock('../../util/clean-path');

const Req = require('../req');

describe('endpoint.req.js', () => {
  const setupData = {
    params: { base: 'lorem' },
    query: { sort: 'asc' },
    body: { doot: 'bod' },
    method: 'GET',
    resource: '/user',
    path: '/user',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      Host: 'xxxxxxxxxx.execute-api.us-east-1.amazonaws.com',
      'X-Forwarded-For': '11.111.111.111, 11.111.111.111'
    },
    provider: 'AWS',
    og: { event: { complex: 1 }, context: { succeed: jest.fn() } }
  };

  test('creation of basic properties', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);

    expect(req.params).toBe(mappedData.params);
    expect(req.query).toBe(mappedData.query);
    expect(req.body).toBe(mappedData.body);
    expect(req.method).toBe(mappedData.method);
    expect(req.resource).toBe(mappedData.resource);
    expect(req.path).toBeDefined();
    expect(req.headers).toBe(mappedData.headers);
    expect(req.provider).toBe(mappedData.provider);
  });

  test('creation aws properties', () => {
    const mappedData = Object.assign({
      id: 'uuid',
      apiId: 'apiUUID',
      stage: 'dev',
      identity: {
        cognitoId: 'uuid',
        userIP: '192.168.144.144'
      },
      authorizer: {
        principleId: '44223232'
      }
    }, setupData);
    const req = new Req(mappedData);

    expect(req.id).toBe(mappedData.id);
    expect(req.apiId).toBe(mappedData.apiId);
    expect(req.stage).toBe(mappedData.stage);
    expect(req.identity).toBe(mappedData.identity);
    expect(req.authorizer).toBe(mappedData.authorizer);
  });

  test('get function', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);
    expect(req.get('Accept')).toBe(mappedData.headers.Accept);
  });

  test('header alias function', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);
    expect(req.header('Accept')).toBe(mappedData.headers.Accept);
  });

  test('get throws when no param passed', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);
    function getNoParam() {
      req.get();
    }

    expect(getNoParam).toThrow();
  });

  test('get throws when non string param passed', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);
    function getNonStringParam() {
      req.get(() => {});
    }

    expect(getNonStringParam).toThrow();
  });

  test('getOriginalRequest returns req.__og', () => {
    const mappedData = Object.assign({}, setupData);
    const req = new Req(mappedData);

    expect(req.getOriginalRequest()).toBe(mappedData.og);
  });


});
