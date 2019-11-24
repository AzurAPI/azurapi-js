"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByName = exports.default = void 0;

var _lodash = require("lodash");

var _getShipByChineseName = _interopRequireDefault(require("./getShipByChineseName"));

var _getShipByEnglishName = _interopRequireDefault(require("./getShipByEnglishName"));

var _getShipByKoreanName = _interopRequireDefault(require("./getShipByKoreanName"));

var _getShipByJapaneseName = _interopRequireDefault(require("./getShipByJapaneseName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isValid = input => input && ((0, _lodash.isNumber)(input) || (0, _lodash.isString)(input));

const getShipByName = name => {
  if (!isValid(name)) return undefined;
  return (0, _getShipByChineseName.default)(name) || (0, _getShipByEnglishName.default)(name) || (0, _getShipByKoreanName.default)(name) || (0, _getShipByJapaneseName.default)(name) || undefined;
};

exports.getShipByName = getShipByName;
var _default = getShipByName;
exports.default = _default;