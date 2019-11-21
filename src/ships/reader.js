const fs = require('fs')
const shipsPath = ''

module.exports = () => {
    try {
        let res = fs.readFileSync(shipsPath)
        let json = JSON.parse(res)
        return json
    } catch (error) {
        return false
    }
}