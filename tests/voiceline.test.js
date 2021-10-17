const { AzurAPIClient } = require('../build/node.js');
const { events, api } = AzurAPIClient;

test('Get Voice Lines', async () => {
  events.on('ready', async () => {
    let result = await api.voicelines.get('101');
    expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});

test('Get Voice lines by name', async () => {
  events.on('ready', async () => {
    let result = await api.voicelines.get('Javelin');
    expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});
