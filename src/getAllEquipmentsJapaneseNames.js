import map from 'lodash.map'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsJapaneseNames = map(getAllEquipments, 'names.jp')

export default getAllEquipmentsJapaneseNames
export { getAllEquipmentsJapaneseNames as getAllEquipmentsJapaneseNames }