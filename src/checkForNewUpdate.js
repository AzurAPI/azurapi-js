import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { updateShipsData } from './updateShipsData'
import { clearShipsData } from './clearShipsData'
import { updateEquipmentsData } from './updateEquipmentsData'
import { clearEquipmentsData } from './clearEquipmentsData'

const versionFile = path.join(__dirname, './version-info.json')

const updateVersionFile = responseJSON => {
    fs.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
        if (err) console.log(err)
    })
}

const isUpToDate = async (dataType) => !getLastDownloadedVersionJson[dataType] || responseJSON[dataType]['version-number'] != getLastDownloadedVersionJson[dataType]['version-number'] || responseJSON[dataType]['last-data-refresh-date'] != getLastDownloadedVersionJson[dataType]['last-data-refresh-date']

const readFileAsync = promisify(fs.readFile)

const existsAsync = (path) => {
    return (promisify(fs.open))(path, 'r')
        .then(fd => (promisify(fs.close))(fd).then(() => true))
        .catch(error => {
            if (error.code === 'ENOENT') return false
            throw error
        })
}

const getLastDownloadedVersionJson = async () => {
    try {
        let res = JSON.parse(await readFileAsync(versionFile));
        console.log('A version file was found, checking if the version is the same...')
        return res
    } catch (error) {
        console.log('An error has been throwed while trying to parse JSON data in \'version-info.json\' version file.')
        return {}
    }
}

const checkForNewUpdate = async () => {
    await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json')
        .then(resp => resp.json())
        .then(async (responseJSON) => {
            let fileExists = await existsAsync(versionFile);
            if (fileExists) {
                console.log('A version file was found, checking if the version is the same...')
                if (isUpToDate("ships")) {
                    await clearShipsData()
                    await updateShipsData()
                    console.log('New ships data detected, started updating ships data from source...');
                    updateVersionFile(responseJSON)
                }
                else {
                    console.log('Ships data is already up-to-date.')
                }

                if (isUpToDate("equipments")) {
                    await clearEquipmentsData()
                    await updateEquipmentsData()
                    console.log('New equipments data detected, started updating equipments data from source...');
                    updateVersionFile(responseJSON)
                }
                else {
                    console.log('Equipments data is already up-to-date.')
                }
            }
            else {
                console.log('No version file found, started downloading ships and equipments data from source...');
                await clearShipsData()
                await updateShipsData()
                await clearEquipmentsData()
                await updateEquipmentsData()
                updateVersionFile(responseJSON)
            }
        })
}

export { checkForNewUpdate }
export default checkForNewUpdate