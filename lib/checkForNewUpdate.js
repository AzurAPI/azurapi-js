"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkForNewUpdate = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _updateShipsData = require("./updateShipsData");

var _clearShipsData = require("./clearShipsData");

var _updateEquipmentsData = require("./updateEquipmentsData");

var _clearEquipmentsData = require("./clearEquipmentsData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionFile = _path.default.join(__dirname, './version-info.json');

const githubLink = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json';
const asyncReadFile = (0, _util.promisify)(_fs.default.readFile);
const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const asyncExistsFile = path => {
  return (0, _util.promisify)(_fs.default.access)(path, _fs.default.constants.F_OK | _fs.default.constants.W_OK).then(() => true).catch(error => {
    if (error.code === 'ENOENT') return false;
    throw error;
  });
};

const AzurAPIValidator = function () {
  this.dataType = null;
  this.local = null;
  this.remote = null;

  this.setDataType = dataType => {
    this.dataType = dataType;
    return this;
  };

  this._getCurrentDownloadedData = async () => {
    if (await this.versionFileExists()) {
      const rawFile = await asyncReadFile(versionFile);
      this.local = JSON.parse(rawFile);
    }
  };

  this._getCurrentGithubData = async () => {
    const response = await (0, _nodeFetch.default)(githubLink);
    this.remote = await response.json();
  };

  this._parseVersion = prop => {
    let version = this[prop][this.dataType];
    version = version && version['version-number'] ? version['version-number'] : 'Unknown';
    return {
      type: this.dataType || 'ship & equipment',
      version
    };
  };

  this.needsUpdate = () => {
    return !this.local[this.dataType] || this.local[this.dataType]['version-number'] !== this.remote[this.dataType]['version-number'] || this.local[this.dataType]['last-data-refresh-date'] !== this.remote[this.dataType]['last-data-refresh-date'];
  };

  this.versionFileExists = () => {
    return asyncExistsFile(versionFile);
  };

  this.updateVersionFile = () => {
    let toBeWritten;
    if (this.dataType) toBeWritten = {
      [this.dataType]: this.remote[this.dataType]
    };
    return asyncWriteFile(versionFile, JSON.stringify(toBeWritten || this.remote));
  };

  this.fetch = async () => {
    await this._getCurrentDownloadedData();

    const currentVersion = this._parseVersion('local');

    console.log(`Current downloaded ${currentVersion.type} version: ${currentVersion.version}`);
    await this._getCurrentGithubData();

    const githubVersion = this._parseVersion('remote');

    console.log(`Github current ${githubVersion.type} version: ${githubVersion.version}`);
  };
};

const checkForNewUpdate = async () => {
  const AzurValidator = new AzurAPIValidator();

  if (await AzurValidator.versionFileExists()) {
    // if versionfile exists
    console.log('A version file was found, checking if the version is the same...'); // ship updater stuff

    await AzurValidator.setDataType('ships').fetch();

    if (AzurValidator.needsUpdate()) {
      await (0, _clearShipsData.clearShipsData)();
      await (0, _updateShipsData.updateShipsData)();
      console.log('New ships data detected, started updating ships data from source...');
      await AzurValidator.updateVersionFile();
    } else console.log('Ships data is already up-to-date.'); // weapons updater stuff


    await AzurValidator.setDataType('equipments').fetch();

    if (AzurValidator.needsUpdate()) {
      await (0, _clearEquipmentsData.clearEquipmentsData)();
      await (0, _updateEquipmentsData.updateEquipmentsData)();
      console.log('New equipments data detected, started updating equipments data from source...');
      await AzurValidator.updateVersionFile();
    } else console.log('Equipments data is already up-to-date.');
  } else {
    // if version file dont exists, just update everything
    console.log('No version file found, started downloading ships and equipments data from source...');
    await (0, _clearShipsData.clearShipsData)();
    await (0, _updateShipsData.updateShipsData)();
    await (0, _clearEquipmentsData.clearEquipmentsData)();
    await (0, _updateEquipmentsData.updateEquipmentsData)();
    await AzurValidator.fetch();
    await AzurValidator.updateVersionFile();
    console.log('Update done, equipment and ships are now updated');
  }
};

exports.checkForNewUpdate = checkForNewUpdate;
var _default = checkForNewUpdate;
exports.default = _default;