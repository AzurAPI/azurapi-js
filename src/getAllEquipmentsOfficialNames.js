import { keys } from 'lodash'
import getAllEquipmentsFromJson from './getAllEquipmentsFromJson'

const getEquipmentsOfficialNames = keys(getAllEquipmentsFromJson)

export default getEquipmentsOfficialNames
export { getEquipmentsOfficialNames as getEquipmentsOfficialNames }