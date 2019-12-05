"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsByEnglishName = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsByEnglishName = (0, _lodash.sortBy)(_getAllShips.default, ['names.en']);
exports.getAllShipsByEnglishName = getAllShipsByEnglishName;
var _default = getAllShipsByEnglishName;
exports.default = _default;