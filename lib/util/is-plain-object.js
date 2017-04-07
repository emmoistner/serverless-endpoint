'use strict';

module.exports = function isPlainObject(object) {
  if (!(object instanceof Object)) {
    return false;
  }

  if (object instanceof Array) {
    return false;
  }

  return true;
};
