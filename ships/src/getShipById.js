import { findIndex, toNumber } from 'lodash'
import ships from './ships.json'
import shipIds from './getShipIds'
import isPositiveIntegerNumber from './util/isPositiveIntegerNumber'

const getShipById = (id) => {
    if (!isPositiveIntegerNumber(id)) return undefined
    let shipIndex = findIndex(shipIds, (index) => toNumber(index) === toNumber(id))
    return ships[shipIds[shipIndex]] ? ships[shipIds[shipIndex]] : undefined
}

export default getShipById
export { getShipById as getShipById }