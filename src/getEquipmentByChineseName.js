import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import equipments from './getAllEquipments'
import getAllEquipmentsChineseNames from './getAllEquipmentsChineseNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByChineseName = (name) => {
    let equipmentId = findIndex(getAllEquipmentsChineseNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByChineseName
export { getEquipmentByChineseName as getEquipmentByChineseName }