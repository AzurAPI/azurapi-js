"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsFromJson = exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = _interopRequireDefault(require("fs"));

var _ships = _interopRequireDefault(require("./ships.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllShipsFromJson = _ships.default;
exports.getAllShipsFromJson = getAllShipsFromJson;
var _default = getAllShipsFromJson;
exports.default = _default;