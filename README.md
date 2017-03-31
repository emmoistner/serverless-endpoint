# serverless-endpoint
> Dependency-less express like wrapper for serverless functions.

[![Build Status](https://travis-ci.org/emmoistner/serverless-endpoint.svg?branch=master)](https://travis-ci.org/emmoistner/serverless-endpoint) [![npm version](https://badge.fury.io/js/serverless-endpoint.svg)](https://badge.fury.io/js/serverless-endpoint) [![Coverage Status](https://coveralls.io/repos/github/emmoistner/serverless-endpoint/badge.svg?branch=master)](https://coveralls.io/github/emmoistner/serverless-endpoint?branch=master)

## Support
✔️️ AWS Api Gateway |
✔️ Google Cloud Functions |
❌ Azure functions |
❌ IBM OpenWhisk

## Install
```bash
npm install --save serverless-endpoint
```
## usage
**Basic Example**
```js
// handler

const endpoint = require('serverless-endpoint');

function getHelloWorld(req, res) {

  res.send(200, { message: 'Hello World!' })
}

module.exports.handler = endpoint(getHelloWorld)
```
**Path Parameter Example**
```js
// endpoint /hello/{value}

// handler

const endpoint = require('serverless-endpoint');

function getHelloWorld(req, res) {

  res.send(200, { message: `Hello world! ${req.params.value}` })
}

module.exports.handler = endpoint(getHelloWorld)
```

**Query Parameter Example**
```js
// endpoint /hello/?timestamp=true

// handler

const endpoint = require('serverless-endpoint');

function getHelloWorld(req, res) {

  const timestamp = req.query.timestamp ? new Date() : ''

  res.send(200, { message: `Hello World! ${timestamp}` })
}

module.exports.handler = endpoint(getHelloWorld)
```

**Body Example**
```js
// endpoint /hello/, { data: 'lorem' }

// handler

const endpoint = require('serverless-endpoint');

function getHelloWorld(req, res) {

  res.send(200, { message: `Hello World! ${req.body.data}` })
}

module.exports.handler = endpoint(getHelloWorld)
```

# Api

## req : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | http body object sent by request |
| method | <code>string</code> | Http method - GET, PUT, POST, DELETE, etc.. |
| path | <code>string</code> | A cleaned url string |
| resource | <code>string</code> | base resource of url |
| headers | <code>Object</code> | header object containing all header information |
| params | <code>Object</code> | parameters object from url path - /resource/{id} = { id: <value> } |
| query | <code>Object</code> | query parameters object from url - /resource?sort=asc = { sort: 'asc' } |
| id | <code>string</code> | `AWS Only` string id of the request: AWS.event.requestContext.requestId |
| apiId | <code>string</code> | `AWS Only` string apiId: AWS.event.requestContext.apiId |
| stage | <code>string</code> | `AWS Only` api stage from url - /dev/resource = 'dev' |
| identity | <code>Object</code> | `AWS Only` identity of user: event.requestContext.identity |
| authorizer | <code>Object</code> | `AWS Only` object returned from custom authorizer: event.requestContext.authorizer |
| header | <code>function</code> | value for the header key - header(headerKey) |
| get | <code>function</code> | value for the header key - get(headerKey)
| getOriginalRequest | <code>function</code> | `AWS Only`returns the arguments provided to the http function |

## res : <code>Object</code>
**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| send | <code>[send](#send)</code> | Sends the HTTP response. |
| error | <code>error</code> | `AWS Only` Returns an error to api gateway |

## res.send(statusCode, body)
Formats statusCode, body to be sent as a HTTP response back to
api consumer (Api Gateway, Google Endpoint).
  The body parameter can be a a String, an object, or an Array.

**Kind**: global function
**Returns**: <code>Object</code> - response HTTP response object formatted for Api Gateway.

| Param | Type | Description |
| --- | --- | --- |
| statusCode | <code>number</code> | [Http Response code]( https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) |
| body | <code>string</code> &#124; <code>Object</code> &#124; <code>Array</code> | Response body

## res.error(error) `AWS Only`
returns error to api gateway

**Kind**: global function
**Returns**: <code>Object</code> - Error to be handed to ApiGateway

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Object</code> | Caught javascript error |
