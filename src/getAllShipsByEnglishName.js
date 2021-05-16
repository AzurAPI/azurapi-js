import sortBy from 'lodash.sortby'
import deburr from 'lodash.deburr'
import getAllShips from './getAllShips'

const deburredShipsEnglishNames = getAllShips.map(el => {
    el.names.en = deburr(el.names.en)
    return el
})
const getAllShipsByEnglishName = sortBy(deburredShipsEnglishNames, ['names.en'])

export default getAllShipsByEnglishName
export { getAllShipsByEnglishName as getAllShipsByEnglishName }