import toArray from 'lodash.toarray'
import getAllShipsFromJson from './getAllShipsFromJson'

const getAllShips = toArray(getAllShipsFromJson)
const getAllShips = sortBy(toArray(getAllShipsFromJson), ['id'])

export default getAllShips
export { getAllShips as getAllShips }