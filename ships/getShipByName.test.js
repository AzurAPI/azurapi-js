let { getShipByName } = require("../index.js")

describe("Get ship by name module", () => {
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShipByName('Belfast')).toBeTruthy()
        expect(getShipByName('Belfast').id).toBe('115')
    })
    test('should be able to retrieve Prinz Eugen with english name (messed up) as input', () => {
        expect(getShipByName('pRinZ EUgeN')).toBeTruthy()
    })
    test('should be able to retrieve Cleveland (Muse) with english name as input', () => {
        expect(getShipByName('Cleveland (Muse)')).toBeTruthy()
        expect(getShipByName('Cleveland Muse')).toBeTruthy()
    })
    test('should be able to retrieve L\'Opiniâtre with french name with ou without accents as input', () => {
        expect(getShipByName('L\'Opiniâtre')).toBeTruthy()
        expect(getShipByName('L\'Opiniatre')).toBeTruthy()
        expect(getShipByName('L Opiniâtre')).toBeTruthy()
    })
    test('should be able to retrieve St. Louis with english name with or without punctuation as input', () => {
        expect(getShipByName('St. Louis')).toBeTruthy()
        expect(getShipByName('St Louis')).toBeTruthy()
    })
    test('should be able to retrieve 22 with string or an integer as input', () => {
        expect(getShipByName('22')).toBeTruthy()
        expect(getShipByName(22)).toBeTruthy()
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
        expect(getShipByName('')).toBeFalsy()
        expect(getShipByName()).toBeFalsy()
        expect(getShipByName(true)).toBeFalsy()
        expect(getShipByName(false)).toBeFalsy()
        expect(getShipByName([])).toBeFalsy()
    })
});