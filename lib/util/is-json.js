'use strict';

function isJSON(data) {
  let isJson = true;
  try {
    JSON.parse(data);
  } catch(e) {
    isJson = false;
  }

  return isJson;
}

module.exports = isJSON;
