const ships = require('./ships')
const { updateShipsData } = require('./ships/utils/updateShipsData')
const { clearShipsData } = require('./ships/utils/clearShipsData')

module.exports = {
  ships,
  ...ships,
  updateShipsData,
  clearShipsData
}
