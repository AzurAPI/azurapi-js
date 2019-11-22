const ships = require('./ships')
const equipment = require('./equipment')
const setup = require('./setup')

module.exports = {
  ships,
  equipment,
  setup,
  ...ships
}
