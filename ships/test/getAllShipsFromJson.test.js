let { getAllShipsFromJson } = require("../getAllShipsFromJson.js")

describe("Get all ships from JSON module", () => {
    test('should be able to import ships.json file', () => {
        expect(getAllShipsFromJson).toBeTruthy()
    })
    test('should return Kaga\'s data correctly', () => {  
        expect(getAllShipsFromJson["368"].id).toBe("368")
    })
});