"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearShipsData = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './ships.json');

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const clearShipsData = () => asyncWriteFile(dataFile, JSON.stringify({}));

exports.clearShipsData = clearShipsData;
var _default = clearShipsData;
exports.default = _default;