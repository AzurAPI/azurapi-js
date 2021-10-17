const { AzurAPIClient } = require('../build/node.js');
const { events } = AzurAPIClient;

test('Get Barrage', () => {
  events.on('ready', async () => {
    let result = api.barrages.get('Full_Barrage_-_22_II');
    expect(result.name).toBe('Full Barrage - 22 II');
  });
});
