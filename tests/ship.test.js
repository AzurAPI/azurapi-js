const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

test('Ship by Name/ID', () => {
    let result = client.ships.get('Abukuma');
    expect(result.names.en).toBe('Abukuma');
});

test('Ships by Faction', () => {
    let result = client.ships.nationality('IJN');
    expect(result[0].names.en).toBe('Abukuma');
});