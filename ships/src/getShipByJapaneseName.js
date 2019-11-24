import { findIndex, toLower } from 'lodash'
import ships from './getAllShips'
import getAllShipsJapaneseNames from './getAllShipsJapaneseNames'

const getShipByJapaneseName = (name) => {
    let shipId = findIndex(getAllShipsJapaneseNames, (shipNameJp) => toLower(shipNameJp) === toLower(name))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByJapaneseName
export { getShipByJapaneseName as getShipByJapaneseName }