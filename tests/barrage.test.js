const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Get Barrage', async () => {
  let result = await client.getBarrage('Full_Barrage_-_Ayanami_II');
  expect(result[0].name).toBe('Full Barrage - Ayanami II');
});
