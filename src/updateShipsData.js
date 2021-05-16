import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const dataFile = path.join(__dirname, './ships.json')

const asyncWriteFile = promisify(fs.writeFile)

const updateShipsData = async () => {
    const rawData = await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json').then(res => res.text())
    await asyncWriteFile(dataFile, rawData)
}

export { updateShipsData }
export default updateShipsData