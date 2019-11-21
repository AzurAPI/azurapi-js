"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShip = exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ships = _interopRequireDefault(require("../ships.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getShip = function getShip(name) {
  console.log(name);
  console.log(_ships["default"].length);
  return _lodash["default"].filter(_ships["default"], function (ship) {
    return _lodash["default"].lowerCase(ship.names.en) === _lodash["default"].lowerCase(name);
  });
};

exports.getShip = getShip;
var _default = getShip;
exports["default"] = _default;