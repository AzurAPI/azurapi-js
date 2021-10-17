const { AzurAPIClient } = require('../build/node.js');
const { events, api } = AzurAPIClient;

test('Ship by Name/ID', () => {
  events.on('ready', async () => {
    let result = api.ships.get('Abukuma');
    expect(result.names.en).toBe('Abukuma');
  });
});

test('Ships by Faction', () => {
  events.on('ready', async () => {
    let result = api.ships.nationality('IJN');
    expect(result[0].names.en).toBe('Abukuma');
  });
});
