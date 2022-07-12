const { AzurAPI } = require('../build/index.js');
const { Ships } = require('../build/core/api/api_ship');
const testShips = require('./test_ships.json');

test('Ship by Name/ID', async () => {
  const mockApi = { queryIsShipName: () => true };
  const client = new Ships(mockApi);
  client.raw = testShips;

  let result = client.get('Abukuma');

  return expect(result[0].names.en).toBe('Abukuma');
});

test('Ships by Faction', async () => {
  const client = new Ships();
  client.raw = testShips;

  let result = client.nationality('IJN');

  return expect(result[0].nationality).toBe('Sakura Empire');
});
