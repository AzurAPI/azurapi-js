import { findIndex, toLower } from 'lodash'
import ships from './getAllShips'
import getAllShipsChineseNames from './getAllShipsChineseNames'

const getShipByChineseName = (name) => {
    let shipId = findIndex(getAllShipsChineseNames, (shipNameCn) => toLower(shipNameCn) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByChineseName
export { getShipByChineseName as getShipByChineseName }