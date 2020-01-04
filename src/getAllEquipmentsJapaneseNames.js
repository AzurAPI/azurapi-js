import { map } from 'lodash'
import getAllEquipments from './getAllEquipments'

const getAllEquipmentsJapaneseNames = map(getAllEquipments, 'names.jp')

export default getAllEquipmentsJapaneseNames
export { getAllEquipmentsJapaneseNames as getAllEquipmentsJapaneseNames }