import { sortBy } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsById = sortBy(getAllShips, ['id'])

export default getAllShipsById
export { getAllShipsById as getAllShipsById }