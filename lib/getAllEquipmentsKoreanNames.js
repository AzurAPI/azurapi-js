"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipmentsKoreanNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipments = _interopRequireDefault(require("./getAllEquipments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllEquipmentsKoreanNames = (0, _lodash.map)(_getAllEquipments.default, 'names.kr');
exports.getAllEquipmentsKoreanNames = getAllEquipmentsKoreanNames;
var _default = getAllEquipmentsKoreanNames;
exports.default = _default;