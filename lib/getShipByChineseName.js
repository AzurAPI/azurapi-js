"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByChineseName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

var _getAllShipsChineseNames = _interopRequireDefault(require("./getAllShipsChineseNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipByChineseName = name => {
  let shipId = (0, _lodash.findIndex)(_getAllShipsChineseNames.default, item => (0, _lodash.includes)((0, _lodash.toLower)(item), (0, _lodash.toLower)(name)));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  return undefined;
};

exports.getShipByChineseName = getShipByChineseName;
var _default = getShipByChineseName;
exports.default = _default;