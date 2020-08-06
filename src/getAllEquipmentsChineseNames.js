import map from 'lodash.map'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsChineseNames = map(getAllEquipments, 'names.cn')

export default getAllEquipmentsChineseNames
export { getAllEquipmentsChineseNames as getAllEquipmentsChineseNames }