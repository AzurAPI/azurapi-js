"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipmentsChineseNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipments = _interopRequireDefault(require("./getAllEquipments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllEquipmentsChineseNames = (0, _lodash.map)(_getAllEquipments.default, 'names.cn');
exports.getAllEquipmentsChineseNames = getAllEquipmentsChineseNames;
var _default = getAllEquipmentsChineseNames;
exports.default = _default;