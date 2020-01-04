const ships = require('./lib')
const { updateShipsData } = require('./lib/updateShipsData')
const { updateEquipmentsData } = require('./lib/updateEquipmentsData')
const { checkForNewUpdate } = require('./lib/checkForNewUpdate')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
  updateEquipmentsData,
  checkForNewUpdate
}
