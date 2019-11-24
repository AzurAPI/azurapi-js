import { findIndex, toLower } from 'lodash'
import ships from './getAllShips'
import getAllShipsKoreanNames from './getAllShipsKoreanNames'

const getShipByKoreanName = (name) => {
    let shipId = findIndex(getAllShipsKoreanNames, (shipNameKr) => toLower(shipNameKr) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByKoreanName
export { getShipByKoreanName as getShipByKoreanName }