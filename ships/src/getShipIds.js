import { keys } from 'lodash'
import ships from './getAllShipsFromJson'

const getShipIds = keys(ships)

export default getShipIds
export { getShipIds as getShipIds }