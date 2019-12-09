"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsFromJson = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ships = _path.default.join(__dirname, './ships.json');

const getAllShipsFromJson = JSON.parse(_fs.default.readFileSync(ships));
exports.getAllShipsFromJson = getAllShipsFromJson;
var _default = getAllShipsFromJson;
exports.default = _default;