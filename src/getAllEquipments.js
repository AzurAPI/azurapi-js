import { toArray } from 'lodash'
import getAllEquipmentsFromJson from './getAllEquipmentsFromJson'

const getAllEquipments = toArray(getAllEquipmentsFromJson)

export default getAllEquipments
export { getAllEquipments as getAllEquipments }