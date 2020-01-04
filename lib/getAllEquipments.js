"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipments = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipmentsFromJson = _interopRequireDefault(require("./getAllEquipmentsFromJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllEquipments = (0, _lodash.toArray)(_getAllEquipmentsFromJson.default);
exports.getAllEquipments = getAllEquipments;
var _default = getAllEquipments;
exports.default = _default;