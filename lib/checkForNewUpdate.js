"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkForNewUpdate = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _updateShipsData = require("./updateShipsData");

var _clearShipsData = require("./clearShipsData");

var _updateEquipmentsData = require("./updateEquipmentsData");

var _clearEquipmentsData = require("./clearEquipmentsData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionFile = _path.default.join(__dirname, './version-info.json');

const updateVersionFile = responseJSON => {
  _fs.default.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
    if (err) console.log(err);
  });
};

const isUpToDate = async dataType => !getLastDownloadedVersionJson[dataType] || responseJSON[dataType]['version-number'] != getLastDownloadedVersionJson[dataType]['version-number'] || responseJSON[dataType]['last-data-refresh-date'] != getLastDownloadedVersionJson[dataType]['last-data-refresh-date'];

const getLastDownloadedVersionJson = async () => {
  try {
    let res = await JSON.parse(_fs.default.readFileSync(versionFile));
    console.log('A version file was found, checking if the version is the same...');
    return res;
  } catch (error) {
    console.log('An error has been throwed while trying to parse JSON data in \'version-info.json\' version file.');
    return {};
  }
};

const checkForNewUpdate = async () => {
  await (0, _nodeFetch.default)('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json').then(resp => resp.json()).then(async responseJSON => {
    let fileExists = await _fs.default.existsSync(versionFile, exists => exists);

    if (fileExists) {
      console.log('A version file was found, checking if the version is the same...');

      if (isUpToDate("ships")) {
        await (0, _clearShipsData.clearShipsData)();
        await (0, _updateShipsData.updateShipsData)();
        console.log('New ships data detected, started updating ships data from source...');
        updateVersionFile(responseJSON);
      } else {
        console.log('Ships data is already up-to-date.');
      }

      if (isUpToDate("equipments")) {
        await (0, _clearEquipmentsData.clearEquipmentsData)();
        await (0, _updateEquipmentsData.updateEquipmentsData)();
        console.log('New equipments data detected, started updating equipments data from source...');
        updateVersionFile(responseJSON);
      } else {
        console.log('Equipments data is already up-to-date.');
      }
    } else {
      console.log('No version file found, started downloading ships and equipments data from source...');
      await (0, _clearShipsData.clearShipsData)();
      await (0, _updateShipsData.updateShipsData)();
      await (0, _clearEquipmentsData.clearEquipmentsData)();
      await (0, _updateEquipmentsData.updateEquipmentsData)();
      updateVersionFile(responseJSON);
    }
  });
};

exports.checkForNewUpdate = checkForNewUpdate;
var _default = checkForNewUpdate;
exports.default = _default;