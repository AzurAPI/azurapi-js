import { toArray } from 'lodash'
import getAllShipsFromJson from './getAllShipsFromJson'

const getAllShips = toArray(getAllShipsFromJson)

export default getAllShips
export { getAllShips as getAllShips }