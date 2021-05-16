import getShipById from './getShipById'
import getShipByName from './getShipByName'

const getShip = (input) => {
    let ship = getShipById(input)
    ship = ship ? ship : getShipByName(input)
    return ship ? ship : undefined
}

export default getShip
export { getShip as getShip }