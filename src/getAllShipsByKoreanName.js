import sortBy from 'lodash.sortby'
import getAllShips from './getAllShips'

const getAllShipsByKoreanName = sortBy(getAllShips, ['names.kr'])

export default getAllShipsByKoreanName
export { getAllShipsByKoreanName as getAllShipsByKoreanName }