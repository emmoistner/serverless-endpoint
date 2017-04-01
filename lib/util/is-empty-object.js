'use strict';

module.exports = function isEmptyObject(object) {
  if (typeof object !== 'object') {
    return false;
  }

  if (object instanceof Array) {
    return false;
  }

  if (Object.keys(object).length === 0) {
    return true;
  }

  return false;
};
