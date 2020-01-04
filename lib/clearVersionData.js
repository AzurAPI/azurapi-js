"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearVersionData = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './version-info.json');

const clearVersionData = async () => {
  _fs.default.writeFile(dataFile, JSON.stringify({}), function (err) {
    if (err) console.log(err);
  });
};

exports.clearVersionData = clearVersionData;
var _default = clearVersionData;
exports.default = _default;