"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByKoreanName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

var _getAllShipsKoreanNames = _interopRequireDefault(require("./getAllShipsKoreanNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipByKoreanName = name => {
  let shipId = (0, _lodash.findIndex)(_getAllShipsKoreanNames.default, item => (0, _lodash.includes)((0, _lodash.toLower)(item), (0, _lodash.toLower)(name)));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  return undefined;
};

exports.getShipByKoreanName = getShipByKoreanName;
var _default = getShipByKoreanName;
exports.default = _default;