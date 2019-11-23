"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsChineseNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsChineseNames = (0, _lodash.map)(_getAllShips.default, 'names.cn');
exports.getAllShipsChineseNames = getAllShipsChineseNames;
var _default = getAllShipsChineseNames;
exports.default = _default;