"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearEquipmentsData = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './equipments.json');

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const clearEquipmentsData = () => asyncWriteFile(dataFile, JSON.stringify({}));

exports.clearEquipmentsData = clearEquipmentsData;
var _default = clearEquipmentsData;
exports.default = _default;