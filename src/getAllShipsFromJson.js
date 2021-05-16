import fs from 'fs'
import path from 'path'

const ships = path.join(__dirname, './ships.json')

const getAllShipsFromJson = JSON.parse(fs.readFileSync(ships));

export default getAllShipsFromJson
export { getAllShipsFromJson as getAllShipsFromJson }