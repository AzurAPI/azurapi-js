"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.updateShipsData = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataFile = _path.default.join(__dirname, './ships.json');

const updateShipsData = async () => {
  await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json').then(resp => resp.json()).then(async responseJSON => {
    _fs.default.writeFile(dataFile, JSON.stringify(responseJSON), function (err) {
      if (err) console.log(err);
    });
  });
};

exports.updateShipsData = updateShipsData;
var _default = updateShipsData;
exports.default = _default;