const { AzurAPI } = require('../build/index.js');

test('Ship by Name/ID', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.ships.get('Abukuma');
      resolve(result.names.en);
    });
  });
  return expect(data).resolves.toBe('Abukuma');
});

test('Ships by Faction', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.ships.nationality('IJN');
      resolve(result[0].nationality);
    });
  });
  return expect(data).resolves.toBe('IJN');
});
