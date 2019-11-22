let { getShip } = require("../build/ships/getShip")
let getShipApi = require("../build/ships/getShip")
let shipsAPI = require("../build/ships")
let api = require("../index.js")
let { getShipByName } = require("../index.js")

describe("Get ship mosule", () => {
    test("should be able to import directly from the function file and runs a query", () => {
        let res = getShip('z23')
        res[0].id.expect(200)
    });
});