const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Ship by Name/ID', async () => {
  let result = await client.getShip('Abukuma');
  expect(result.names.en).toBe('Abukuma');
});

test('Ships by Faction', async () => {
  let result = await client.getShipsByFaction('IJN');
  expect(result[0].names.en).toBe('Abukuma');
});
