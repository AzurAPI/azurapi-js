import { findIndex, isNumber, isString, toLower, replace, deburr } from 'lodash'
import ships from './getAllShips'
import getAllShipsChineseNames from './getAllShipsChineseNames'
import getAllShipsEnglishNames from './getAllShipsEnglishNames'
import getAllShipsKoreanNames from './getAllShipsKoreanNames'
import getAllShipsJapaneseNames from './getAllShipsJapaneseNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const isValid = (input) => input && (isNumber(input) || (isString(input)))

const getShipByName = (name) => {
    if (!isValid(name)) return undefined
    let shipId = findIndex(getAllShipsChineseNames, (shipNameCn) => toLower(shipNameCn) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsEnglishNames, (shipNameEn) => escapeLatinString(shipNameEn) === escapeLatinString(name))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsKoreanNames, (shipNameKr) => toLower(shipNameKr) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsJapaneseNames, (shipNameJp) => toLower(shipNameJp) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByName
export { getShipByName as getShipByName }