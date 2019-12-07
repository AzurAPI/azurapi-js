"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearShipsData = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clearShipsData = () => {
  _fs.default.writeFile("./lib/ships.json", JSON.stringify({}), function (err) {
    if (err) {
      console.log(err);
    }
  });
  _fs.default.writeFile("./lib/version-info.json", JSON.stringify({}), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

exports.clearShipsData = clearShipsData;
var _default = clearShipsData;
exports.default = _default;