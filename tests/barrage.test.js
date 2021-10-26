const { AzurAPIInstance } = require('@commonjs');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

test('Get Barrage', () => {
  events.on('ready', () => {
    let result = api.barrages.findItem('Full_Barrage_-_22_II');
    expect(result.name).toBe('Full Barrage - 22 II');
  });
});
