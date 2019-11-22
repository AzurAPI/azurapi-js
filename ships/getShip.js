"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShip = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ships = _interopRequireDefault(require("./ships.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShip = name => {
  let shipId = _lodash.default.filter(Object.keys(_ships.default), index => _lodash.default.lowerCase(_ships.default[index].names.en) === _lodash.default.lowerCase(name));

  return _ships.default[shipId] || false;
};

exports.getShip = getShip;
var _default = getShip;
exports.default = _default;