let { getAllShipsFromFaction } = require("../../index.js")
let { findIndex } = require("lodash")

describe("Get all ships from faction module", () => {
    test('should return only german ships if searching for \'Ironblood\'', () => {
        let ships = getAllShipsFromFaction('Ironblood')
        expect(ships.length > 0).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Prinz Eugen') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Z23') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Bismarck') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Javelin') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Laffey') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Ayanami') > -1).toBeFalsy()
    })
    test('should return only german ships if searching for \'KMS\'', () => {
        let ships = getAllShipsFromFaction('KMS')
        expect(ships.length > 0).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Prinz Eugen') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Z23') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Bismarck') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Javelin') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Laffey') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Ayanami') > -1).toBeFalsy()
    })
    test('should return only german ships if searching for \'bloo\'', () => {
        let ships = getAllShipsFromFaction('bloo')
        expect(ships.length > 0).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Prinz Eugen') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Z23') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Bismarck') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Javelin') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Laffey') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Ayanami') > -1).toBeFalsy()
    })
    test('should return only british ships if searching for \'rOyALnàVy\'', () => {
        let ships = getAllShipsFromFaction('rOyALnàVy')
        expect(ships.length > 0).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Z23') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Javelin') > -1).toBeTruthy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Laffey') > -1).toBeFalsy()
        expect(findIndex(ships, (ship) => ship.names.en === 'Ayanami') > -1).toBeFalsy()
    })
    test('should return empty array if searching for incorrect inputs', () => {
        expect(getAllShipsFromFaction('').length).toBe(0)
        expect(getAllShipsFromFaction(false).length).toBe(0)
        expect(getAllShipsFromFaction([]).length).toBe(0)
        expect(getAllShipsFromFaction(['royal', 'sakura']).length).toBe(0)
    })
});