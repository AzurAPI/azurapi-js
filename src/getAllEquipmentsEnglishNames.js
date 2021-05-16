import map from 'lodash.map'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsEnglishNames = map(getAllEquipments, 'names.en')

export default getAllEquipmentsEnglishNames
export { getAllEquipmentsEnglishNames as getAllEquipmentsEnglishNames }