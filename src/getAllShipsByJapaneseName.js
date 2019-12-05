import { sortBy } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsByJapaneseName = sortBy(getAllShips, ['names.jp'])

export default getAllShipsByJapaneseName
export { getAllShipsByJapaneseName as getAllShipsByJapaneseName }