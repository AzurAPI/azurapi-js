import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import equipments from './getAllEquipments'
import getAllEquipmentsOfficialNames from './getAllEquipmentsOfficialNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByOfficialName = (name) => {
    let equipmentId = getAllEquipmentsOfficialNames.findIndex(item => escapeLatinString(item).includes(escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByOfficialName
export { getEquipmentByOfficialName as getEquipmentByOfficialName }