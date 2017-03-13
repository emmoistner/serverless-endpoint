'use strict';

const url = require('url');

module.exports = function cleanPath(pathname, query) {
  pathname = pathname || '';
  query = query || {};

  return url.format({ pathname, query });
};
