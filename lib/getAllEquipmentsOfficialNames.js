"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEquipmentsOfficialNames = exports.default = void 0;

var _lodash = require("lodash");

var _getAllEquipmentsFromJson = _interopRequireDefault(require("./getAllEquipmentsFromJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getEquipmentsOfficialNames = (0, _lodash.keys)(_getAllEquipmentsFromJson.default);
exports.getEquipmentsOfficialNames = getEquipmentsOfficialNames;
var _default = getEquipmentsOfficialNames;
exports.default = _default;