import map from 'lodash.map'
import getAllShips from './getAllShips'

const getAllShipsKoreanNames = map(getAllShips, 'names.kr')

export default getAllShipsKoreanNames
export { getAllShipsKoreanNames as getAllShipsKoreanNames }