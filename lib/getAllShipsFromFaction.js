"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllShipsFromFaction = exports.default = void 0;

var _lodash = require("lodash");

var _getAllShips = _interopRequireDefault(require("./getAllShips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FACTION_EAGLEUNION = ['USS', 'Eagle Union'];
const FACTION_ROYALNAVY = ['HMS', 'Royal Navy'];
const FACTION_SAKURAEMPIRE = ['IJN', 'Sakura Empire'];
const FACTION_IRONBLOOD = ['KMS', 'Ironblood'];
const FACTION_EASTERNRADIANCE = ['ROC', 'Eastern Radiance'];
const FACTION_NORTHUNION = ['SN', 'North Union'];
const FACTION_IRISLIBRE = ['FFNF', 'Iris Libre'];
const FACTION_VICHYADOMINION = ['MNF', 'Vichya Dominion'];
const FACTION_SARDEGNAEMPIRE = ['RN', 'Sardegna Empire'];
const FACTION_NEPTUNIA = ['HDN', 'Neptunia'];
const FACTION_BILIBILI = ['Bilibili'];
const FACTION_UTAWARERUMONO = ['Utawarerumono'];
const FACTION_KISUNAAI = ['KizunaAI'];
const getFactions = {
  'Eagle Union': FACTION_EAGLEUNION,
  'Royal Navy': FACTION_ROYALNAVY,
  'Sakura Empire': FACTION_SAKURAEMPIRE,
  'Ironblood': FACTION_IRONBLOOD,
  'Eastern Radiance': FACTION_EASTERNRADIANCE,
  'North Union': FACTION_NORTHUNION,
  'Iris Libre': FACTION_IRISLIBRE,
  'Vichya Dominion': FACTION_VICHYADOMINION,
  'Sardegna Empire': FACTION_SARDEGNAEMPIRE,
  'Neptunia': FACTION_NEPTUNIA,
  'Bilibili': FACTION_BILIBILI,
  'Utawarerumono': FACTION_UTAWARERUMONO,
  'KizunaAI': FACTION_KISUNAAI
};

const toLowerTrimmed = string => (0, _lodash.toLower)((0, _lodash.replace)((0, _lodash.deburr)(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''));

const isValid = input => input && (0, _lodash.isString)(input) && input.length > 0;

const getFactionFromInput = input => {
  if (!isValid(input)) return false;
  let nation = false;
  let factionKeys = (0, _lodash.keys)(getFactions);
  let lowerTrimmedInput = toLowerTrimmed(input);
  (0, _lodash.forEach)(factionKeys, faction => {
    (0, _lodash.forEach)(getFactions[faction], value => {
      if ((0, _lodash.includes)(toLowerTrimmed(value), lowerTrimmedInput)) {
        nation = faction;
        return true;
      }
    });
  });
  return nation;
};

const getAllShipsFromFaction = input => {
  let nation = toLowerTrimmed(getFactionFromInput(input));
  return (0, _lodash.filter)(_getAllShips.default, ship => toLowerTrimmed(ship.nationality) === nation);
};

exports.getAllShipsFromFaction = getAllShipsFromFaction;
var _default = getAllShipsFromFaction;
exports.default = _default;