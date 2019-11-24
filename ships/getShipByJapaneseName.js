"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByJapaneseName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

var _getAllShipsJapaneseNames = _interopRequireDefault(require("./getAllShipsJapaneseNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipByJapaneseName = name => {
  let shipId = (0, _lodash.findIndex)(_getAllShipsJapaneseNames.default, shipNameJp => (0, _lodash.toLower)(shipNameJp) === (0, _lodash.toLower)(name));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  return undefined;
};

exports.getShipByJapaneseName = getShipByJapaneseName;
var _default = getShipByJapaneseName;
exports.default = _default;