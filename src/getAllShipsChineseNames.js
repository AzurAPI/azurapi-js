import map from 'lodash.map'
import getAllShips from './getAllShips'

const getAllShipsChineseNames = map(getAllShips, 'names.cn')

export default getAllShipsChineseNames
export { getAllShipsChineseNames as getAllShipsChineseNames }