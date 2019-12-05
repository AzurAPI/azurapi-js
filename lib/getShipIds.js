"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipIds = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShipsFromJson = _interopRequireDefault(require("./getAllShipsFromJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipIds = (0, _lodash.keys)(_getAllShipsFromJson.default);
exports.getShipIds = getShipIds;
var _default = getShipIds;
exports.default = _default;