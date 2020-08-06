import toArray from 'lodash.toarray'
import getAllEquipmentsFromJson from './getAllEquipmentsFromJson'

const getAllEquipments = toArray(getAllEquipmentsFromJson)

export default getAllEquipments
export { getAllEquipments as getAllEquipments }