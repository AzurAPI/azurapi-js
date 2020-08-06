import toArray from 'lodash.toarray'
import sortBy from 'lodash.sortby'
import getAllShipsFromJson from './getAllShipsFromJson'

const getAllShips = sortBy(toArray(getAllShipsFromJson), ['id'])

export default getAllShips
export { getAllShips as getAllShips }