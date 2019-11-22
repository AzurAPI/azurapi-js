"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShips = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShipsFromJson = _interopRequireDefault(require("./getAllShipsFromJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShips = (0, _lodash.toArray)(_getAllShipsFromJson.default);
exports.getAllShips = getAllShips;
var _default = getAllShips;
exports.default = _default;