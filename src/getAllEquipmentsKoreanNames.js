import map from 'lodash.map'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsKoreanNames = map(getAllEquipments, 'names.kr')

export default getAllEquipmentsKoreanNames
export { getAllEquipmentsKoreanNames as getAllEquipmentsKoreanNames }