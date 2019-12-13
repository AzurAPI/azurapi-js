import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

const dataFile = path.join(__dirname, './ships.json')

const updateShipsData = async () => {
    await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json')
        .then(resp => resp.json())
        .then(async (responseJSON) => {
            fs.writeFile(dataFile, JSON.stringify(responseJSON), function (err) {
                if (err) console.log(err)
            })
        })
}

export { updateShipsData }
export default updateShipsData