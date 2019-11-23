"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsJapaneseNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsJapaneseNames = (0, _lodash.map)(_getAllShips.default, 'names.jp');
exports.getAllShipsJapaneseNames = getAllShipsJapaneseNames;
var _default = getAllShipsJapaneseNames;
exports.default = _default;