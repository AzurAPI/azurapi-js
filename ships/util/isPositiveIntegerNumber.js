"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveIntegerNumber = exports.default = void 0;

var _lodash = require("lodash");

const isPositiveIntegerNumber = input => !(0, _lodash.isNaN)(input * 1) && input % 1 == 0 && input > -1;

exports.isPositiveIntegerNumber = isPositiveIntegerNumber;
var _default = isPositiveIntegerNumber;
exports.default = _default;