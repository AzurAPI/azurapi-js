const { AzurAPI } = require('../build/index.js');
const client = new AzurAPI();

test('Ship by Name/ID', () => {
  client.on('ready', async () => {
    let result = client.ships.get('Abukuma');
    expect(result.names.en).toBe('Abukuma');
  });
});

test('Ships by Faction', () => {
  client.on('ready', async () => {
    let result = client.ships.nationality('IJN');
    expect(result[0].names.en).toBe('Abukuma');
  });
});
