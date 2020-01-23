"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearVersionData = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './version-info.json');

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const clearVersionData = () => asyncWriteFile(dataFile, JSON.stringify({}));

exports.clearVersionData = clearVersionData;
var _default = clearVersionData;
exports.default = _default;