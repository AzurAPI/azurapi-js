import path from 'path'
import fs from 'fs'

const dataFile = path.join(__dirname, './ships.json')

const clearShipsData = async () => {
    fs.writeFile(dataFile, JSON.stringify({}), function (err) {
        if (err) console.log(err)
    })
}

export { clearShipsData }
export default clearShipsData