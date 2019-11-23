"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

var _getAllShipsChineseNames = _interopRequireDefault(require("./getAllShipsChineseNames"));

var _getAllShipsEnglishNames = _interopRequireDefault(require("./getAllShipsEnglishNames"));

var _getAllShipsKoreanNames = _interopRequireDefault(require("./getAllShipsKoreanNames"));

var _getAllShipsJapaneseNames = _interopRequireDefault(require("./getAllShipsJapaneseNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipByName = name => {
  let shipId = (0, _lodash.findIndex)(_getAllShipsChineseNames.default, shipNameCn => (0, _lodash.toLower)(shipNameCn) === (0, _lodash.toLower)(name));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  shipId = (0, _lodash.findIndex)(_getAllShipsEnglishNames.default, shipNameEn => (0, _lodash.toLower)((0, _lodash.replace)(shipNameEn, '.', '')) === (0, _lodash.toLower)((0, _lodash.replace)(name, '.', '')));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  shipId = (0, _lodash.findIndex)(_getAllShipsKoreanNames.default, shipNameKr => (0, _lodash.toLower)(shipNameKr) === (0, _lodash.toLower)(name));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  shipId = (0, _lodash.findIndex)(_getAllShipsJapaneseNames.default, shipNameJp => (0, _lodash.toLower)(shipNameJp) === (0, _lodash.toLower)(name));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  return undefined;
};

exports.getShipByName = getShipByName;
var _default = getShipByName;
exports.default = _default;