import deburr from 'lodash.deburr'
import toLower from 'lodash.tolower'
import equipments from './getAllEquipments'
import getAllEquipmentsJapaneseNames from './getAllEquipmentsJapaneseNames'

const escapeLatinString = (string) => toLower(deburr(string).replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByJapaneseName = (name) => {
    let equipmentId = getAllEquipmentsJapaneseNames.findIndex(item => escapeLatinString(item).includes(escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByJapaneseName
export { getEquipmentByJapaneseName as getEquipmentByJapaneseName }