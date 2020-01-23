import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const dataFile = path.join(__dirname, './ships.json')

const asyncWriteFile = promisify(fs.writeFile)

const clearShipsData = () => asyncWriteFile(dataFile, JSON.stringify({}))

export { clearShipsData }
export default clearShipsData