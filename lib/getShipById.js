"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipById = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShipsFromJson = _interopRequireDefault(require("./getAllShipsFromJson"));

var _getShipIds = _interopRequireDefault(require("./getShipIds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getShipById = id => {
  let shipIndex = (0, _lodash.findIndex)(_getShipIds.default, index => (0, _lodash.toNumber)(index) === (0, _lodash.toNumber)(id) || index === id);
  return _getAllShipsFromJson.default[_getShipIds.default[shipIndex]] ? _getAllShipsFromJson.default[_getShipIds.default[shipIndex]] : undefined;
};

exports.getShipById = getShipById;
var _default = getShipById;
exports.default = _default;