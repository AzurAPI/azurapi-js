let { getAllShipsById } = require("../../index.js")

describe("Get all ships sorted by ID module", () => {
    test('should return a sorted array, first ship\'s ID should be \'001\'', () => {
        expect(getAllShipsById[0].id).toBe('001')
    })
});