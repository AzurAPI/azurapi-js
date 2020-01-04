import path from 'path'
import fs from 'fs'

const dataFile = path.join(__dirname, './equipments.json')

const clearEquipmentsData = async () => {
    fs.writeFile(dataFile, JSON.stringify({}), function (err) {
        if (err) console.log(err)
    })
}

export { clearEquipmentsData }
export default clearEquipmentsData