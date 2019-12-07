import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'
import { updateShipsData } from '../index'

const versionFile = path.join(__dirname, '../lib/version-info.json')

const checkForNewUpdate = async () => {
    await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json')
        .then(resp => resp.json())
        .then(responseJSON => {
            if (fs.existsSync(versionFile)) {
                let lastDownloadedVersion = fs.readFileSync(versionFile)
                let lastDownloadedVersionJson = JSON.parse(lastDownloadedVersion)
                console.log('A version file was found, checking if the version is the same...');
                if (responseJSON['version-number'] != lastDownloadedVersionJson['version-number'] || responseJSON['last-data-refresh-date'] != lastDownloadedVersionJson['last-data-refresh-date']) {
                    updateShipsData()
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
            else {
                console.log('No version file found, started downloading last ships data from source...');
                updateShipsData()
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