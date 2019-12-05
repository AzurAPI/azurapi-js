import { findIndex, includes, toLower } from 'lodash'
import ships from './getAllShips'
import getAllShipsKoreanNames from './getAllShipsKoreanNames'

const getShipByKoreanName = (name) => {
    let shipId = findIndex(getAllShipsKoreanNames, (item) => includes(toLower(item), toLower(name)))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByKoreanName
export { getShipByKoreanName as getShipByKoreanName }