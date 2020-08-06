import toLower from 'lodash.tolower'
import ships from './getAllShips'
import getAllShipsJapaneseNames from './getAllShipsJapaneseNames'

const getShipByJapaneseName = (name) => {
    const loweredName = toLower(name)
    let shipId = getAllShipsJapaneseNames.findIndex(item => toLower(item).includes(loweredName))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByJapaneseName
export { getShipByJapaneseName as getShipByJapaneseName }