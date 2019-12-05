"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsByChineseName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsByChineseName = (0, _lodash.sortBy)(_getAllShips.default, ['names.cn']);
exports.getAllShipsByChineseName = getAllShipsByChineseName;
var _default = getAllShipsByChineseName;
exports.default = _default;