import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import { updateShipsData } from './updateShipsData'
import { clearShipsData } from './clearShipsData'

const versionFile = path.join(__dirname, './version-info.json')

const checkForNewUpdate = async () => {
    await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json')
        .then(resp => resp.json())
        .then(async (responseJSON) => {
            let fileExists = await fs.existsSync(versionFile, exists => exists)
            if (fileExists) {
                let lastDownloadedVersionJson = await JSON.parse(fs.readFileSync(versionFile))
                console.log('A version file was found, checking if the version is the same...');
                if (lastDownloadedVersionJson) {
                    if (!lastDownloadedVersionJson.ships || responseJSON.ships['version-number'] != lastDownloadedVersionJson.ships['version-number'] || responseJSON.ships['last-data-refresh-date'] != lastDownloadedVersionJson.ships['last-data-refresh-date']) {
                        await clearShipsData()
                        await updateShipsData()
                        console.log('New data detected, started updating ships data from source...');
                        fs.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
                            if (err) {
                            console.log(err);
                            }
                        })
                    }
                    else {
                        console.log('Ships data is already up-to-date.')
                    }
                }
            }
            else {
                console.log('No version file found, started downloading last ships data from source...');
                await clearShipsData()
                await updateShipsData()
                fs.writeFile(versionFile, JSON.stringify(responseJSON), function (err) {
                    if (err) {
                    console.log(err);
                    }
                })
            }
        })
}

export { checkForNewUpdate }
export default checkForNewUpdate