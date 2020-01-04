import { map } from 'lodash'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsChineseNames = map(getAllEquipments, 'names.cn')

export default getAllEquipmentsChineseNames
export { getAllEquipmentsChineseNames as getAllEquipmentsChineseNames }