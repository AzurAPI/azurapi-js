"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShip = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ships = _interopRequireDefault(require("../../test/ships.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShip = name => {
  return _lodash.default.filter(_ships.default, ship => _lodash.default.lowerCase(ship.names.en) === _lodash.default.lowerCase(name));
};

exports.getShip = getShip;
var _default = getShip;
exports.default = _default;