let { getShipByName, getShip } = require("../index.js")

describe("Get ship module", () => {
    test('should be able to export the function with deconstruction and work well', () => {
        expect(getShip('belfast')).toBeTruthy()
        expect(getShip('belfast').id).toBe('115')
    })
    test('should be able to export the function in root as \'getShipByName\' alias via deconstruction and work well', () => {
        expect(getShipByName('belfast')).toBeTruthy()
        expect(getShipByName('belfast').id).toBe('115')
    })
});