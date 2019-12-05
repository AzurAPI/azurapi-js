import fetch from 'node-fetch'
import fs from 'fs'

const updateShipsData = async () => {
    await fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json').then((resp) => resp.json()).then((responseJSON) => {
        fs.writeFile("./ships/ships.json", JSON.stringify(responseJSON), function(err) {
            if (err) {
                console.log(err);
            }
        })
    })
};

export default updateShipsData
export { updateShipsData as updateShipsData }