const ships = require('./lib')
const { updateShipsData } = require('./utils/updateShipsData')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
}
