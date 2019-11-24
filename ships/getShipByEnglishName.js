"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipByEnglishName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

var _getAllShipsEnglishNames = _interopRequireDefault(require("./getAllShipsEnglishNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const escapeLatinString = string => (0, _lodash.toLower)((0, _lodash.replace)((0, _lodash.deburr)(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''));

const getShipByEnglishName = name => {
  let shipId = (0, _lodash.findIndex)(_getAllShipsEnglishNames.default, shipNameEn => escapeLatinString(shipNameEn) === escapeLatinString(name));
  if (_getAllShips.default[shipId]) return _getAllShips.default[shipId];
  return undefined;
};

exports.getShipByEnglishName = getShipByEnglishName;
var _default = getShipByEnglishName;
exports.default = _default;