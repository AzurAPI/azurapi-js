import map from 'lodash.map'
import getAllShips from './getAllShips'

const getAllShipsJapaneseNames = map(getAllShips, 'names.jp')

export default getAllShipsJapaneseNames
export { getAllShipsJapaneseNames as getAllShipsJapaneseNames }