let { getShip } = require("../index.js")

describe("Get ship by name/ID module", () => {
    test('should be able to retrieve Belfast with an integer as a parameter', () => {
        expect(getShip(144)).toBeTruthy()
    })
    test('should be able to retrieve Belfast with a stringified integer as a parameter', () => {
        expect(getShip('144')).toBeTruthy()
    })
    test('should be able to retrieve Gascogne with a string as a parameter', () => {
        expect(getShip('Plan012')).toBeTruthy()
    })
    test('should return undefined with an integer as a parameter that isn\'t registered as a ship ID', () => {
        expect(getShip(894919281874154848)).toBeFalsy()
    })
    test('should return undefined with a string with letters as a parameter', () => {
        expect(getShip('abc')).toBeFalsy()
    })
    test('should return undefined with a number with decimals as a parameter', () => {
        expect(getShip(144.1)).toBeFalsy()
    })
    test('should return Belfast with a number with zeros as decimals as a parameter', () => {
        expect(getShip(144.0)).toBeTruthy()
    })
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShip('Belfast')).toBeTruthy()
        expect(getShip('Belfast').id).toBe('115')
    })
    test('should be able to retrieve Prinz Eugen with english name (messed up) as input', () => {
        expect(getShip('pRinZ EUgëN')).toBeTruthy()
    })
    test('should be able to retrieve Cleveland (Muse) with "μ" or "µ" as input', () => {
        expect(getShip('Cleveland μ')).toBeTruthy()
        expect(getShip('Cleveland µ')).toBeTruthy()
    })
    test('should be able to retrieve Emile Bertin with "E" or "É" as input', () => {
        expect(getShip('Emile Bertin')).toBeTruthy()
        expect(getShip('Émile Bertin')).toBeTruthy()
    })
    test('should be able to retrieve L\'Opiniâtre with french name with ou without accents as input', () => {
        expect(getShip('L\'Opiniâtre')).toBeTruthy()
        expect(getShip('L\'Opiniatre')).toBeTruthy()
        expect(getShip('L Opiniâtre')).toBeTruthy()
    })
    test('should be able to retrieve Jean Bart with \'jean\' as input', () => {
        expect(getShip('jean')).toBeTruthy()
        expect(getShip('jean').names.en).toBe('Jean Bart')
    })
    test('should be able to retrieve Jeanne d\'Arc with \'jeann\' as input', () => {
        expect(getShip('jeann')).toBeTruthy()
        expect(getShip('jeann').names.en).toBe('Jeanne d\'Arc')
    })
    test('should be able to retrieve St. Louis with english name with or without punctuation as input', () => {
        expect(getShip('St. Louis')).toBeTruthy()
        expect(getShip('St Louis')).toBeTruthy()
    })
    test('should be able to retrieve 22 with string or an integer as input', () => {
        expect(getShip('22')).toBeTruthy()
        expect(getShip(22)).toBeTruthy()
    })
    test('should be able to retrieve Belfast with chinese name as input', () => {
        expect(getShip('贝尔法斯特')).toBeTruthy()
        expect(getShip('贝尔法斯特').id).toBe('115')
    })
    test('should be able to retrieve Belfast with japanese name as input', () => {
        expect(getShip('ベルファスト')).toBeTruthy()
        expect(getShip('ベルファスト').id).toBe('115')
    })
    test('should be able to retrieve Belfast with korean name as input', () => {
        expect(getShip('벨파스트')).toBeTruthy()
        expect(getShip('벨파스트').id).toBe('115')
    })
    test('should return undefined with incorrect values as input', () => {
        expect(getShip('')).toBeFalsy()
        expect(getShip()).toBeFalsy()
        expect(getShip(true)).toBeFalsy()
        expect(getShip(false)).toBeFalsy()
        expect(getShip([])).toBeFalsy()
    })
});