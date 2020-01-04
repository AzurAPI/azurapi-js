import fs from 'fs'
import path from 'path'

const equipments = path.join(__dirname, './equipments.json')

const getAllEquipmentsFromJson = JSON.parse(fs.readFileSync(equipments));

export default getAllEquipmentsFromJson
export { getAllEquipmentsFromJson as getAllEquipmentsFromJson }