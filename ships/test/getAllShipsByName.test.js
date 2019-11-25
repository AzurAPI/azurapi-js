let {
    getAllShips,
    getAllShipsByChineseName,
    getAllShipsByEnglishName,
    getAllShipsByJapaneseName,
    getAllShipsByKoreanName
} = require("../../index.js")

describe("Get all ships sorted by english name module", () => {
    test('should return a alphabetically sorted array, first ship\'s name should start with a number or a \'A\'', () => {
        expect(/^[?!^0-9A\s].*/g.test(getAllShipsByEnglishName[0].names.en)).toBeTruthy()
    })
    test('... while last ship\'s name should start with a \'Z\'', () => {
        expect(getAllShipsByEnglishName[getAllShips.length - 1].names.en.charAt(0)).toBe('Z')
    })
})

// TODO : Needs testing on other languages
