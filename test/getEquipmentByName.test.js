let { getEquipmentByName } = require("../index.js")

describe("Get equipment by name module", () => {
    test('should be able to retrieve Quadruple 356mm (BL 14\" Mk VII) with official name as input', () => {
        expect(getEquipmentByName('Quadruple 356mm (BL 14\" Mk VII)')).toBeTruthy()
        expect(getEquipmentByName('Quadruple 356mm (BL 14\" Mk VII)').wikiUrl).toBe('https://azurlane.koumakan.jp/Quadruple_356mm_(BL_14%22_Mk_VII)')
    })
    test('should be able to retrieve Quadruple 356mm (BL 14\" Mk VII) with english name as input', () => {
        expect(getEquipmentByName('Quadruple 356mm Main Gun')).toBeTruthy()
        expect(getEquipmentByName('Quadruple 356mm Main Gun').wikiUrl).toBe('https://azurlane.koumakan.jp/Quadruple_356mm_(BL_14%22_Mk_VII)')
    })
    test('should be able to retrieve Quadruple 356mm (BL 14\" Mk VII) with chinese name as input', () => {
        expect(getEquipmentByName('四联装356mm主炮')).toBeTruthy()
        expect(getEquipmentByName('四联装356mm主炮').wikiUrl).toBe('https://azurlane.koumakan.jp/Quadruple_356mm_(BL_14%22_Mk_VII)')
    })
    test('should be able to retrieve Quadruple 356mm (BL 14\" Mk VII) with japanese name as input', () => {
        expect(getEquipmentByName('356mm四連装砲')).toBeTruthy()
        expect(getEquipmentByName('356mm四連装砲').wikiUrl).toBe('https://azurlane.koumakan.jp/Quadruple_356mm_(BL_14%22_Mk_VII)')
    })
    test('should be able to retrieve Quadruple 356mm (BL 14\" Mk VII) with korean name as input', () => {
        expect(getEquipmentByName('356mm 4연장포')).toBeTruthy()
        expect(getEquipmentByName('356mm 4연장포').wikiUrl).toBe('https://azurlane.koumakan.jp/Quadruple_356mm_(BL_14%22_Mk_VII)')
    })
    test('should be able to retrieve Twin 410mm (Type 3 Shell) with official name as input', () => {
        expect(getEquipmentByName('Twin 410mm (Type 3 Shell)')).toBeTruthy()
        expect(getEquipmentByName('Twin 410mm (Type 3 Shell)').wikiUrl).toBe('https://azurlane.koumakan.jp/Twin_410mm_(Type_3_Shell)')
    })
    test('should be able to retrieve Twin 410mm (Type 3 Shell) with english name as input', () => {
        expect(getEquipmentByName('410mm Mounted Gun (Type 3 Shell)')).toBeTruthy()
        expect(getEquipmentByName('410mm Mounted Gun (Type 3 Shell)').wikiUrl).toBe('https://azurlane.koumakan.jp/Twin_410mm_(Type_3_Shell)')
    })
    test('should be able to retrieve Twin 410mm (Type 3 Shell) with chinese name as input', () => {
        expect(getEquipmentByName('410mm连装炮(三式弹)')).toBeTruthy()
        expect(getEquipmentByName('410mm连装炮(三式弹)').wikiUrl).toBe('https://azurlane.koumakan.jp/Twin_410mm_(Type_3_Shell)')
    })
    test('should be able to retrieve Twin 410mm (Type 3 Shell) with japanese name as input', () => {
        expect(getEquipmentByName('410mm連装砲(三式弾)')).toBeTruthy()
        expect(getEquipmentByName('410mm連装砲(三式弾)').wikiUrl).toBe('https://azurlane.koumakan.jp/Twin_410mm_(Type_3_Shell)')
    })
    test('should be able to retrieve Twin 410mm (Type 3 Shell) with korean name as input', () => {
        expect(getEquipmentByName('410mm 연장포 (삼식탄)')).toBeTruthy()
        expect(getEquipmentByName('410mm 연장포 (삼식탄)').wikiUrl).toBe('https://azurlane.koumakan.jp/Twin_410mm_(Type_3_Shell)')
    })
    test('should return undefined with incorrect values as input', () => {
        expect(getEquipmentByName('')).toBeFalsy()
        expect(getEquipmentByName()).toBeFalsy()
        expect(getEquipmentByName(true)).toBeFalsy()
        expect(getEquipmentByName(false)).toBeFalsy()
        expect(getEquipmentByName([])).toBeFalsy()
    })
})