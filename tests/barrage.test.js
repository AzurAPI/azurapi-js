const { Barrages } = require('../build/core/api/api_barrage');
const testBarrages = require('./test_barrages.json');

test('Get Barrage', () => {
  const barrages = new Barrages({ queryIsShipName: () => true });
  barrages.raw = testBarrages;

  let result = barrages.get('22');

  return expect(result[0].id).toBe('All_Out_Assault_-_22_II');
});
