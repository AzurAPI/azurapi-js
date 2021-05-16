import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import equipments from './getAllEquipments'
import getAllEquipmentsChineseNames from './getAllEquipmentsChineseNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByChineseName = (name) => {
    let equipmentId = getAllEquipmentsChineseNames.findIndex(item => escapeLatinString(item).includes(escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByChineseName
export { getEquipmentByChineseName as getEquipmentByChineseName }