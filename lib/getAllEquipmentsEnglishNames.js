"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipmentsEnglishNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipments = _interopRequireDefault(require("./getAllEquipments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllEquipmentsEnglishNames = (0, _lodash.map)(_getAllEquipments.default, 'names.en');
exports.getAllEquipmentsEnglishNames = getAllEquipmentsEnglishNames;
var _default = getAllEquipmentsEnglishNames;
exports.default = _default;