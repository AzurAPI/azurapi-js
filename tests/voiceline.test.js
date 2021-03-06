const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

test('Get Voice Lines', async() => {
  client.on('ready', async () => {
    let result = await client.voicelines.get('101');
    expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});

test('Get Voice lines by name', async () => {
  client.on('ready', async () => {
    let result = await client.voicelines.get('Javelin');
    expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});

