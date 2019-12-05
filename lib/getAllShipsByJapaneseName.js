"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsByJapaneseName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsByJapaneseName = (0, _lodash.sortBy)(_getAllShips.default, ['names.jp']);
exports.getAllShipsByJapaneseName = getAllShipsByJapaneseName;
var _default = getAllShipsByJapaneseName;
exports.default = _default;