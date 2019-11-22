let { getShipById } = require("../index.js")

describe("Get ship by ID module", () => {
    test('should be able to retrieve Belfast with an integer as a parameter', () => {
        expect(getShipById(144)).toBeTruthy()
    })
    test('should be able to retrieve Belfast with a stringified integer as a parameter', () => {
        expect(getShipById('144')).toBeTruthy()
    })
    test('should return undefined with an integer as a parameter that isn\'t registered as a ship ID', () => {
        expect(getShipById(1)).toBeFalsy()
    })
    test('should return undefined with a string with letters as a parameter', () => {
        expect(getShipById('abc')).toBeFalsy()
    })
    test('should return undefined with a negative number as a parameter', () => {
        expect(getShipById(-4)).toBeFalsy()
    })
    test('should return undefined with a number with decimals as a parameter', () => {
        expect(getShipById(144.1)).toBeFalsy()
    })
    test('should return Belfast with a number with zeros as decimals as a parameter', () => {
        expect(getShipById(144.0)).toBeTruthy()
    })
});