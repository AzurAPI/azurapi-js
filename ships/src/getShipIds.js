import { keys } from 'lodash'
import getAllShipsFromJson from './getAllShipsFromJson'

const getShipIds = keys(getAllShipsFromJson)

export default getShipIds
export { getShipIds as getShipIds }