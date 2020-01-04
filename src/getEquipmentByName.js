import { isNumber, isString } from 'lodash'
import getEquipmentByOfficialName from './getEquipmentByOfficialName'
import getEquipmentByChineseName from './getEquipmentByChineseName'
import getEquipmentByEnglishName from './getEquipmentByEnglishName'
import getEquipmentByKoreanName from './getEquipmentByKoreanName'
import getEquipmentByJapaneseName from './getEquipmentByJapaneseName'

const isValid = (input) => input && (isNumber(input) || (isString(input)))

const getEquipmentByName = (name) => {
    if (!isValid(name)) return undefined
    return getEquipmentByOfficialName(name)
        || getEquipmentByChineseName(name)
        || getEquipmentByEnglishName(name)
        || getEquipmentByKoreanName(name)
        || getEquipmentByJapaneseName(name)
        || undefined
}

export default getEquipmentByName
export { getEquipmentByName as getEquipmentByName }