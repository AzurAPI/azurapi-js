import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import equipments from './getAllEquipments'
import getAllEquipmentsKoreanNames from './getAllEquipmentsKoreanNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByKoreanName = (name) => {
    let equipmentId = findIndex(getAllEquipmentsKoreanNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByKoreanName
export { getEquipmentByKoreanName as getEquipmentByKoreanName }