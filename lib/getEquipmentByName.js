"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEquipmentByName = exports.default = void 0;

var _lodash = require("lodash");

var _getEquipmentByOfficialName = _interopRequireDefault(require("./getEquipmentByOfficialName"));

var _getEquipmentByChineseName = _interopRequireDefault(require("./getEquipmentByChineseName"));

var _getEquipmentByEnglishName = _interopRequireDefault(require("./getEquipmentByEnglishName"));

var _getEquipmentByKoreanName = _interopRequireDefault(require("./getEquipmentByKoreanName"));

var _getEquipmentByJapaneseName = _interopRequireDefault(require("./getEquipmentByJapaneseName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isValid = input => input && ((0, _lodash.isNumber)(input) || (0, _lodash.isString)(input));

const getEquipmentByName = name => {
  if (!isValid(name)) return undefined;
  return (0, _getEquipmentByOfficialName.default)(name) || (0, _getEquipmentByChineseName.default)(name) || (0, _getEquipmentByEnglishName.default)(name) || (0, _getEquipmentByKoreanName.default)(name) || (0, _getEquipmentByJapaneseName.default)(name) || undefined;
};

exports.getEquipmentByName = getEquipmentByName;
var _default = getEquipmentByName;
exports.default = _default;