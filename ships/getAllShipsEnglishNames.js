"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsEnglishNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsEnglishNames = (0, _lodash.map)(_getAllShips.default, 'names.en');
exports.getAllShipsEnglishNames = getAllShipsEnglishNames;
var _default = getAllShipsEnglishNames;
exports.default = _default;