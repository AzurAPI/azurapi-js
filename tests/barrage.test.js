const { instance } = require('../build/Client.js');
const client = instance;

test('Get Barrage', () => {
  client.on('ready', async () => {
    let result = client.barrages.get('Full_Barrage_-_22_II');
    expect(result.name).toBe('Full Barrage - 22 II');
  });
});
