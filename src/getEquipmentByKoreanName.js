import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import equipments from './getAllEquipments'
import getAllEquipmentsKoreanNames from './getAllEquipmentsKoreanNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByKoreanName = (name) => {
    let equipmentId = getAllEquipmentsKoreanNames.findIndex(item => escapeLatinString(item).includes(escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByKoreanName
export { getEquipmentByKoreanName as getEquipmentByKoreanName }