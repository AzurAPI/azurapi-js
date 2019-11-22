import _ from 'lodash'
import ships from './ships.json'

const getShip = (name) => {
    let shipId = _.filter(Object.keys(ships), (index) => _.lowerCase(ships[index].names.en) === _.lowerCase(name))
    return ships[shipId] || false
}

export default getShip
export { getShip as getShip }