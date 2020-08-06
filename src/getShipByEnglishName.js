import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import ships from './getAllShips'
import getAllShipsEnglishNames from './getAllShipsEnglishNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getShipByEnglishName = (name) => {
    const escapedName = escapeLatinString(name)
    let shipId = getAllShipsEnglishNames.findIndex(item => escapeLatinString(item).includes(escapedName))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByEnglishName
export { getShipByEnglishName as getShipByEnglishName }