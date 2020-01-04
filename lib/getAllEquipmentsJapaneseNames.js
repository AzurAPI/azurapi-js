"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipmentsJapaneseNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipments = _interopRequireDefault(require("./getAllEquipments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllEquipmentsJapaneseNames = (0, _lodash.map)(_getAllEquipments.default, 'names.jp');
exports.getAllEquipmentsJapaneseNames = getAllEquipmentsJapaneseNames;
var _default = getAllEquipmentsJapaneseNames;
exports.default = _default;