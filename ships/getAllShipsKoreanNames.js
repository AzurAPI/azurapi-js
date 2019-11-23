"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsKoreanNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsKoreanNames = (0, _lodash.map)(_getAllShips.default, 'names.kr');
exports.getAllShipsKoreanNames = getAllShipsKoreanNames;
var _default = getAllShipsKoreanNames;
exports.default = _default;