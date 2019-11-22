import { toArray } from 'lodash'
import ships from './getAllShipsFromJson'

const getAllShips = toArray(ships)

export default getAllShips
export { getAllShips as getAllShips }