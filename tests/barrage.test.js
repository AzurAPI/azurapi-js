const { AzurAPI } = require('../build/index.js');

test('Get Barrage', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.barrages.get('Full_Barrage_-_22_II');
      resolve(result.name);
    });
  });
  return expect(data).resolves.toBe('Full Barrage - 22 II');
});
