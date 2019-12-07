"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateShipsData = exports.default = void 0;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const path = require('path');

const updateShipsData = async () => {
  var publicFolder = path.join(__dirname, '../lib/ships.json')
  await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json').then(resp => resp.json()).then(responseJSON => {
    _fs.default.writeFile(publicFolder, JSON.stringify(responseJSON), function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

exports.updateShipsData = updateShipsData;
var _default = updateShipsData;
exports.default = _default;
