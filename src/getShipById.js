import { findIndex, toNumber, isNumber, isString } from 'lodash'
import ships from './getAllShipsFromJson'
import shipIds from './getShipIds'

const isValid = (input) => input && (isNumber(input) || (isString(input)))

const getShipById = (id) => {
    if (!isValid(id)) return undefined
    let shipIndex = findIndex(shipIds, (index) => toNumber(index) === toNumber(id) || index === id)
    return ships[shipIds[shipIndex]] ? ships[shipIds[shipIndex]] : undefined
}

export default getShipById
export { getShipById as getShipById }