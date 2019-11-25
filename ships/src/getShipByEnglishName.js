import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import ships from './getAllShips'
import getAllShipsEnglishNames from './getAllShipsEnglishNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getShipByEnglishName = (name) => {
    let shipId = findIndex(getAllShipsEnglishNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByEnglishName
export { getShipByEnglishName as getShipByEnglishName }