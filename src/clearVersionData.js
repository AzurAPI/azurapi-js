import path from 'path'
import fs from 'fs'

const dataFile = path.join(__dirname, './version-info.json')

const clearVersionData = async () => {
    fs.writeFile(dataFile, JSON.stringify({}), function (err) {
        if (err) console.log(err)
    })
}

export { clearVersionData }
export default clearVersionData