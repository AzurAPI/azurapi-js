import { map } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsEnglishNames = map(getAllShips, 'names.en')

export default getAllShipsEnglishNames
export { getAllShipsEnglishNames as getAllShipsEnglishNames }