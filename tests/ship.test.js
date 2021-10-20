const { AzurAPIInstance } = require('../build/index.js');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

test('Ship by Name/ID', () => {
  events.on('ready', () => {
    let result = api.ships.findItem('Abukuma');
    expect(result.names.en).toBe('Abukuma');
  });
});

test('Ships by Faction', () => {
  events.on('ready', () => {
    let result = api.ships.nationality('IJN');
    expect(result[0].names.en).toBe('Abukuma');
  });
});
