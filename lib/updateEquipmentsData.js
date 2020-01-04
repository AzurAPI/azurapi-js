"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.updateEquipmentsData = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './equipments.json');

const updateEquipmentsData = async () => {
  await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json').then(resp => resp.json()).then(async responseJSON => {
    _fs.default.writeFile(dataFile, JSON.stringify(responseJSON), function (err) {
      if (err) console.log(err);
    });
  });
};

exports.updateEquipmentsData = updateEquipmentsData;
var _default = updateEquipmentsData;
exports.default = _default;