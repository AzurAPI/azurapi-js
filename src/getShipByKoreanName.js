import toLower from 'lodash.tolower'
import ships from './getAllShips'
import getAllShipsKoreanNames from './getAllShipsKoreanNames'

const getShipByKoreanName = (name) => {
    const loweredName = toLower(name)
    let shipId = getAllShipsKoreanNames.findIndex(item => toLower(item).includes(loweredName))
    if (ships[shipId]) return ships[shipId]
    return undefined
}

export default getShipByKoreanName
export { getShipByKoreanName as getShipByKoreanName }