import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const dataFile = path.join(__dirname, './version-info.json')

const asyncWriteFile = promisify(fs.writeFile)

const clearVersionData = () => asyncWriteFile(dataFile, JSON.stringify({}))

export { clearVersionData }
export default clearVersionData