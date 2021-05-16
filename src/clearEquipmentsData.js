import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const dataFile = path.join(__dirname, './equipments.json')

const asyncWriteFile = promisify(fs.writeFile)

const clearEquipmentsData = () => asyncWriteFile(dataFile, JSON.stringify({}))

export { clearEquipmentsData }
export default clearEquipmentsData