import { findIndex, includes, toLower, replace, deburr } from 'lodash'
import equipments from './getAllEquipments'
import getAllEquipmentsJapaneseNames from './getAllEquipmentsJapaneseNames'

const escapeLatinString = (string) => toLower(replace(deburr(string), /[!@#$%^&*(),.?":{}|<>' ]/g, ''))

const getEquipmentByJapaneseName = (name) => {
    let equipmentId = findIndex(getAllEquipmentsJapaneseNames, (item) => includes(escapeLatinString(item), escapeLatinString(name)))
    if (equipments[equipmentId]) return equipments[equipmentId]
    return undefined
}

export default getEquipmentByJapaneseName
export { getEquipmentByJapaneseName as getEquipmentByJapaneseName }