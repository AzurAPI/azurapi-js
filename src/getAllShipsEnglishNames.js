import getAllShips from './getAllShips'

const getAllShipsEnglishNames = getAllShips.map(el => el.names.en)

export default getAllShipsEnglishNames
export { getAllShipsEnglishNames as getAllShipsEnglishNames }