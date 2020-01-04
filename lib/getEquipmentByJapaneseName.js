"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEquipmentByJapaneseName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipments = _interopRequireDefault(require("./getAllEquipments"));

var _getAllEquipmentsJapaneseNames = _interopRequireDefault(require("./getAllEquipmentsJapaneseNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const escapeLatinString = string => (0, _lodash.toLower)((0, _lodash.replace)((0, _lodash.deburr)(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''));

const getEquipmentByJapaneseName = name => {
  let equipmentId = (0, _lodash.findIndex)(_getAllEquipmentsJapaneseNames.default, item => (0, _lodash.includes)(escapeLatinString(item), escapeLatinString(name)));
  if (_getAllEquipments.default[equipmentId]) return _getAllEquipments.default[equipmentId];
  return undefined;
};

exports.getEquipmentByJapaneseName = getEquipmentByJapaneseName;
var _default = getEquipmentByJapaneseName;
exports.default = _default;