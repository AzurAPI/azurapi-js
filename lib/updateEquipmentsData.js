"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.updateEquipmentsData = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './equipments.json');

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const updateEquipmentsData = async () => {
  const rawData = await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json').then(res => res.text());
  await asyncWriteFile(dataFile, rawData);
};

exports.updateEquipmentsData = updateEquipmentsData;
var _default = updateEquipmentsData;
exports.default = _default;