let { getShipByName } = require("../index.js")

describe("Get ship by name module", () => {
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShipByName('Belfast')).toBeTruthy()
        expect(getShipByName('Belfast').id).toBe('115')
    })
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShipByName('Belfast')).toBeTruthy()
        expect(getShipByName('Belfast').id).toBe('115')
    })
    test('should be able to retrieve St. Louis with english name with or without punctuation as input', () => {
        expect(getShipByName('St. Louis')).toBeTruthy()
        expect(getShipByName('St Louis')).toBeTruthy()
    })
    test('should be able to retrieve Belfast with chinese name as input', () => {
        expect(getShipByName('贝尔法斯特')).toBeTruthy()
        expect(getShipByName('贝尔法斯特').id).toBe('115')
    })
    test('should be able to retrieve Belfast with japanese name as input', () => {
        expect(getShipByName('ベルファスト')).toBeTruthy()
        expect(getShipByName('ベルファスト').id).toBe('115')
    })
    test('should be able to retrieve Belfast with korean name as input', () => {
        expect(getShipByName('벨파스트')).toBeTruthy()
        expect(getShipByName('벨파스트').id).toBe('115')
    })
    test('should return undefined with incorrect values as input', () => {
        expect(getShipByName(1)).toBeFalsy()
        expect(getShipByName('1')).toBeFalsy()
    })
});