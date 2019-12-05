import { findIndex, toNumber } from 'lodash'
import ships from './getAllShipsFromJson'
import shipIds from './getShipIds'

const getShipById = (id) => {
    let shipIndex = findIndex(shipIds, (index) => toNumber(index) === toNumber(id) || index === id)
    return ships[shipIds[shipIndex]] ? ships[shipIds[shipIndex]] : undefined
}

export default getShipById
export { getShipById as getShipById }