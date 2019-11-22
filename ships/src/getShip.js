import { findIndex, keys, lowerCase } from 'lodash'
import ships from './getAllShipsFromJson'

const getShip = (name) => {
    let shipId = findIndex(keys(ships), (index) => lowerCase(ships[index].names.en) === lowerCase(name))
    return ships[keys(ships)[shipId]] ? ships[keys(ships)[shipId]] : undefined
}

export default getShip
export { getShip as getShip }