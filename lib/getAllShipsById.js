"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsById = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsById = (0, _lodash.sortBy)(_getAllShips.default, ['id']);
exports.getAllShipsById = getAllShipsById;
var _default = getAllShipsById;
exports.default = _default;