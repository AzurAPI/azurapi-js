import _ from 'lodash'
import ships from '../ships.json'

const getShip = (name) => {
    console.log(name)
    console.log(ships.length)
    return _.filter(ships, (ship) => _.lowerCase(ship.names.en) === _.lowerCase(name))
}

export default getShip
export { getShip as getShip }