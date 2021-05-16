import toLower from 'lodash.tolower'
import ships from './getAllShips'
import getAllShipsChineseNames from './getAllShipsChineseNames'

const getShipByChineseName = (name) => {
    const loweredName = toLower(name)
    let shipId = getAllShipsChineseNames.findIndex(item => toLower(item).includes(loweredName))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByChineseName
export { getShipByChineseName as getShipByChineseName }