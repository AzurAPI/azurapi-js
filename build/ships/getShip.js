'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getShip = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ships = require('../../test/ships.json');

var _ships2 = _interopRequireDefault(_ships);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getShip = function getShip(name) {
    return _lodash2.default.filter(_ships2.default, function (ship) {
        return _lodash2.default.lowerCase(ship.names.en) === _lodash2.default.lowerCase(name);
    });
};

exports.default = getShip;
exports.getShip = getShip;