const ships = require('./lib')
const { updateShipsData } = require('./lib/updateShipsData')
const { checkForNewUpdate } = require('./lib/checkForNewUpdate')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
  checkForNewUpdate
}
