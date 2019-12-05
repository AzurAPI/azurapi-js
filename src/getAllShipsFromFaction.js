import { filter, forEach, includes, isString, keys, replace, toLower, deburr } from 'lodash'
import getAllShips from './getAllShips'

const FACTION_EAGLEUNION = ['USS', 'Eagle Union']
const FACTION_ROYALNAVY = ['HMS', 'Royal Navy']
const FACTION_SAKURAEMPIRE = ['IJN', 'Sakura Empire']
const FACTION_IRONBLOOD = ['KMS', 'Ironblood']
const FACTION_EASTERNRADIANCE = ['ROC', 'Eastern Radiance']
const FACTION_NORTHUNION = ['SN', 'North Union']
const FACTION_IRISLIBRE = ['FFNF', 'Iris Libre']
const FACTION_VICHYADOMINION = ['MNF', 'Vichya Dominion']
const FACTION_SARDEGNAEMPIRE = ['RN', 'Sardegna Empire']
const FACTION_NEPTUNIA = ['HDN', 'Neptunia']
const FACTION_BILIBILI = ['Bilibili']
const FACTION_UTAWARERUMONO = ['Utawarerumono']
const FACTION_KISUNAAI = ['KizunaAI']

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
}

const toLowerTrimmed = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const isValid = (input) => input && isString(input) && input.length > 0

const getFactionFromInput = (input) => {
    if (!isValid(input)) return false
    let nation = false
    let factionKeys = keys(getFactions)
    let lowerTrimmedInput = toLowerTrimmed(input)
    forEach(factionKeys, (faction) => {
        forEach(getFactions[faction], (value) => {
            if (includes(toLowerTrimmed(value), lowerTrimmedInput)) {
                nation = faction
                return true
            }
        })
    })
    return nation
}

const getAllShipsFromFaction = (input) => {
    let nation = toLowerTrimmed(getFactionFromInput(input))
    return filter(getAllShips, (ship) => toLowerTrimmed(ship.nationality) === nation)
}

export default getAllShipsFromFaction
export { getAllShipsFromFaction as getAllShipsFromFaction }