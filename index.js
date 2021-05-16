const ships = require('./dist')
const { updateShipsData } = require('./dist/updateShipsData')
const { updateEquipmentsData } = require('./dist/updateEquipmentsData')
const { checkForNewUpdate } = require('./dist/checkForNewUpdate')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
  updateEquipmentsData,
  checkForNewUpdate
}
