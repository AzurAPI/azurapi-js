const { AzurAPI } = require('../build/index.js');

test('Get Voice Lines', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = await client.voicelines.get('101');
      resolve(result.Default[0].en);
    });
  });
  return expect(data).resolves.toBe('J-class destroyer ー Javelin, Hull Number F61!');
});

test('Get Voice lines by name', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = await client.voicelines.get('Javelin');
      resolve(result.Default[0].en);
    });
  });
  return expect(data).resolves.toBe('J-class destroyer ー Javelin, Hull Number F61!');
});

