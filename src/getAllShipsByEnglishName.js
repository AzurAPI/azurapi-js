import { sortBy } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsByEnglishName = sortBy(getAllShips, ['names.en'])

export default getAllShipsByEnglishName
export { getAllShipsByEnglishName as getAllShipsByEnglishName }