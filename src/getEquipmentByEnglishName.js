import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import equipments from './getAllEquipments'
import getAllEquipmentsEnglishNames from './getAllEquipmentsEnglishNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByEnglishName = (name) => {
    let equipmentId = findIndex(getAllEquipmentsEnglishNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByEnglishName
export { getEquipmentByEnglishName as getEquipmentByEnglishName }