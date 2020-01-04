import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import equipments from './getAllEquipments'
import getAllEquipmentsOfficialNames from './getAllEquipmentsOfficialNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByOfficialName = (name) => {
    let equipmentId = findIndex(getAllEquipmentsOfficialNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByOfficialName
export { getEquipmentByOfficialName as getEquipmentByOfficialName }