"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipName = exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ships = _interopRequireDefault(require("../ships.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getShipName = function getShipName(name) {
  console.log(name);
  console.log(_ships["default"].length);
  return _lodash["default"].filter(_ships["default"], function (ship) {
    return _lodash["default"].lowerCase(ship.names.en) === _lodash["default"].lowerCase(name);
  });
};

exports.getShipName = getShipName;
var _default = getShipName;
exports["default"] = _default;