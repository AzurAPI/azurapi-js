"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipmentsFromJson = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const equipments = _path.default.join(__dirname, './equipments.json');

const getAllEquipmentsFromJson = JSON.parse(_fs.default.readFileSync(equipments));
exports.getAllEquipmentsFromJson = getAllEquipmentsFromJson;
var _default = getAllEquipmentsFromJson;
exports.default = _default;