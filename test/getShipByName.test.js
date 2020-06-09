let { 
    getShipByName,
    getShipByEnglishName,
    getShipByChineseName,
    getShipByJapaneseName,
    getShipByKoreanName
} = require("../index.js")

describe("Get ship by name module", () => {
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShipByName('Belfast')).toBeTruthy()
        expect(getShipByName('Belfast').id).toBe('115')
    })
    test('should be able to retrieve Prinz Eugen with english name (messed up) as input', () => {
        expect(getShipByName('pRinZ EUgëN')).toBeTruthy()
    })
    test('should be able to retrieve Cleveland (Muse) with "μ" or "µ" as input', () => {
        expect(getShipByName('Cleveland μ')).toBeTruthy()
        expect(getShipByName('Cleveland µ')).toBeTruthy()
    })
    test('should be able to retrieve Emile Bertin with "E" or "É" as input', () => {
        expect(getShipByName('Emile Bertin')).toBeTruthy()
        expect(getShipByName('Émile Bertin')).toBeTruthy()
    })
    test('should be able to retrieve L\'Opiniâtre with french name with ou without accents as input', () => {
        expect(getShipByName('L\'Opiniâtre')).toBeTruthy()
        expect(getShipByName('L\'Opiniatre')).toBeTruthy()
        expect(getShipByName('L Opiniâtre')).toBeTruthy()
    })
    test('should be able to retrieve Jean Bart with \'jean\' as input', () => {
        expect(getShipByName('jean')).toBeTruthy()
        expect(getShipByName('jean').names.en).toBe('Jean Bart')
    })
    test('should be able to retrieve Jeanne d\'Arc with \'jeann\' as input', () => {
        expect(getShipByName('jeann')).toBeTruthy()
        expect(getShipByName('jeann').names.en).toBe('Jeanne d\'Arc')
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
        expect(getShipByName('')).toBeFalsy()
        expect(getShipByName()).toBeFalsy()
        expect(getShipByName(true)).toBeFalsy()
        expect(getShipByName(false)).toBeFalsy()
        expect(getShipByName([])).toBeFalsy()
    })
});

describe("Get ship by japanese name module", () => {
    test('should be able to retrieve Belfast with japanese name as input', () => {
        expect(getShipByJapaneseName('ベルファスト')).toBeTruthy()
        expect(getShipByJapaneseName('ベルファスト').id).toBe('115')
    })
    test('should not be able to retrieve Belfast with names in other languages as input', () => {
        expect(getShipByJapaneseName('벨파스트')).toBeFalsy()
        expect(getShipByJapaneseName('贝尔法斯特')).toBeFalsy()
        expect(getShipByJapaneseName('Belfast')).toBeFalsy()
    })
});

describe("Get ship by english name module", () => {
    test('should be able to retrieve Belfast with english name as input', () => {
        expect(getShipByEnglishName('Belfast')).toBeTruthy()
        expect(getShipByEnglishName('Belfast').id).toBe('115')
    })
    test('should not be able to retrieve Belfast with names in other languages as input', () => {
        expect(getShipByEnglishName('벨파스트')).toBeFalsy()
        expect(getShipByEnglishName('贝尔法斯特')).toBeFalsy()
        expect(getShipByEnglishName('ベルファスト')).toBeFalsy()
    })
});

describe("Get ship by korean name module", () => {
    test('should be able to retrieve Belfast with korean name as input', () => {
        expect(getShipByKoreanName('벨파스트')).toBeTruthy()
        expect(getShipByKoreanName('벨파스트').id).toBe('115')
    })
    test('should not be able to retrieve Belfast with names in other languages as input', () => {
        expect(getShipByKoreanName('ベルファスト')).toBeFalsy()
        expect(getShipByKoreanName('贝尔法斯特')).toBeFalsy()
        expect(getShipByKoreanName('Belfast')).toBeFalsy()
    })
});

describe("Get ship by chinese name module", () => {
    test('should be able to retrieve Belfast with chinese name as input', () => {
        expect(getShipByChineseName('贝尔法斯特')).toBeTruthy()
        expect(getShipByChineseName('贝尔法斯特').id).toBe('115')
    })
    test('should not be able to retrieve Belfast with names in other languages as input', () => {
        expect(getShipByChineseName('벨파스트')).toBeFalsy()
        expect(getShipByChineseName('ベルファスト')).toBeFalsy()
        expect(getShipByChineseName('Belfast')).toBeFalsy()
    })
});