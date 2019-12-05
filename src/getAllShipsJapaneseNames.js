import { map } from 'lodash'
import getAllShips from './getAllShips'

const getAllShipsJapaneseNames = map(getAllShips, 'names.jp')

export default getAllShipsJapaneseNames
export { getAllShipsJapaneseNames as getAllShipsJapaneseNames }