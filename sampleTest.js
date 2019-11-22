
let { getShip } = require("./build/ships/getShip")
console.log(getShip('z23'))

let getShipApi = require("./build/ships/getShip")
console.log(getShipApi.getShip('z23'))

let shipsAPI = require("./build/ships")
console.log(shipsAPI.getShipByName('z23'));

let api = require("./index.js")
console.log(api.ships.getShipByName('z23'));

let { getShipByName } = require("./index.js")
console.log(getShipByName('z23'));