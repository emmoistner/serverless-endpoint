'use strict';

// Condensed version of https://github.com/broofa/node-mime

module.exports.charsets = {
  lookup(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};
