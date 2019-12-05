import { findIndex, includes, toLower } from 'lodash'
import ships from './getAllShips'
import getAllShipsChineseNames from './getAllShipsChineseNames'

const getShipByChineseName = (name) => {
    let shipId = findIndex(getAllShipsChineseNames, (item) => includes(toLower(item), toLower(name)))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByChineseName
export { getShipByChineseName as getShipByChineseName }