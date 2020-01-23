import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const dataFile = path.join(__dirname, './equipments.json')

const asyncWriteFile = promisify(fs.writeFile)

const updateEquipmentsData = async () => {
    const rawData = await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json').then(res => res.text())
    await asyncWriteFile(dataFile, rawData)
}

export { updateEquipmentsData }
export default updateEquipmentsData