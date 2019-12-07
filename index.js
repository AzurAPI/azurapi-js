const ships = require('./lib')
const { updateShipsData } = require('./lib/updateShipsData')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
}
