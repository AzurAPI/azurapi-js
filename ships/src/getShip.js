import _ from 'lodash'
import ships from './test/ships.json'

const getShip = (name) => {
    return _.filter(ships, (ship) => _.lowerCase(ship.names.en) === _.lowerCase(name))
}

export default getShip
export { getShip as getShip }