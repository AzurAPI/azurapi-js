"use strict";

var fs = require('fs');

var shipsPath = '';

module.exports = function () {
  try {
    var res = fs.readFileSync(shipsPath);
    var json = JSON.parse(res);
    return json;
  } catch (error) {
    return false;
  }
};