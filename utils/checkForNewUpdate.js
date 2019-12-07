"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkForNewUpdate = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionFile = _path.default.join(__dirname, '../lib/version-info.json');

const checkForNewUpdate = async () => {
  await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json').then(resp => resp.json()).then(responseJSON => {
    if (_fs.default.existsSync(versionFile)) {
      let lastDownloadedVersion = _fs.default.readFileSync(versionFile);

      let lastDownloadedVersionJson = JSON.parse(lastDownloadedVersion);
      console.log('A version file was found, checking if the version is the same...');
      if (responseJSON['version-number'] != lastDownloadedVersionJson['version-number'] || responseJSON['last-data-refresh-date'] != lastDownloadedVersionJson['last-data-refresh-date']) {
        (0, _index.updateShipsData)();
        console.log('New data detected, started updating ships data from source...');
        _fs.default.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
      else {
          console.log('Ships data is already up-to-date.')
      }
    } else {
        console.log('No version file found, started downloading last ships data from source...');
      (0, _index.updateShipsData)();
      _fs.default.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

exports.checkForNewUpdate = checkForNewUpdate;
var _default = checkForNewUpdate;
exports.default = _default;