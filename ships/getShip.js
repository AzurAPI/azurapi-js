"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShip = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShipsFromJson = _interopRequireDefault(require("./getAllShipsFromJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShip = name => {
  let shipId = (0, _lodash.findIndex)((0, _lodash.keys)(_getAllShipsFromJson.default), index => (0, _lodash.lowerCase)(_getAllShipsFromJson.default[index].names.en) === (0, _lodash.lowerCase)(name));
  return _getAllShipsFromJson.default[(0, _lodash.keys)(_getAllShipsFromJson.default)[shipId]] ? _getAllShipsFromJson.default[(0, _lodash.keys)(_getAllShipsFromJson.default)[shipId]] : undefined;
};

exports.getShip = getShip;
var _default = getShip;
exports.default = _default;