import { sortBy } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsByChineseName = sortBy(getAllShips, ['names.cn'])

export default getAllShipsByChineseName
export { getAllShipsByChineseName as getAllShipsByChineseName }