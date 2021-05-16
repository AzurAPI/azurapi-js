import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import equipments from './getAllEquipments'
import getAllEquipmentsEnglishNames from './getAllEquipmentsEnglishNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByEnglishName = (name) => {
    let equipmentId = getAllEquipmentsEnglishNames.findIndex((item) => escapeLatinString(item).includes(escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByEnglishName
export { getEquipmentByEnglishName as getEquipmentByEnglishName }