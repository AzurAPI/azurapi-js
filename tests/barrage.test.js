const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

test('Get Barrage', async () => {
  client.on('ready', async () => {
    let result = await client.cache.barrages.get('Full_Barrage_-_Ayanami_II');
    expect(result[0].name).toBe('Full Barrage - Ayanami II');
  });
});
