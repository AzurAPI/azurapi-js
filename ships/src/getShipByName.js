import { findIndex, toLower, replace } from 'lodash'
import ships from './getAllShips'
import getAllShipsChineseNames from './getAllShipsChineseNames'
import getAllShipsEnglishNames from './getAllShipsEnglishNames'
import getAllShipsKoreanNames from './getAllShipsKoreanNames'
import getAllShipsJapaneseNames from './getAllShipsJapaneseNames'

const getShipByName = (name) => {
    let shipId = findIndex(getAllShipsChineseNames, (shipNameCn) => toLower(shipNameCn) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsEnglishNames, (shipNameEn) => toLower(replace(shipNameEn, '.', '')) === toLower(replace(name, '.', '')))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsKoreanNames, (shipNameKr) => toLower(shipNameKr) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    shipId = findIndex(getAllShipsJapaneseNames, (shipNameJp) => toLower(shipNameJp) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByName
export { getShipByName as getShipByName }