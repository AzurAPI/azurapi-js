const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Get Voice lines', async () => {
  let result = await client.getVoiceline('101');
  expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
});
  
test('Get Voice lines by name', async () => {
  let result = await client.getVoiceline('Javelin');
  expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
});
