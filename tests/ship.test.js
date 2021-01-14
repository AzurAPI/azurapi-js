const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();


test('Ship by Name/ID', async () => {
  client.on('ready', async () => {
    let result = await client.cache.ship.get('Abukuma');
    expect(result.names.en).toBe('Abukuma');
  });
});
  
test('Ships by Faction', async () => {
  client.on('ready', async () => {
    let result = await client.cache.ship.all.nationality('IJN');
    expect(result[0].names.en).toBe('Abukuma');
  });
});

