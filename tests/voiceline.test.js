const { AzurAPIInstance } = require('../build/index.js');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

test('Get Voice Lines', () => {
  events.on('ready', () => {
    let result = api.voicelines.findItem('101');
    expect(result.en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});

test('Get Voice lines by name', () => {
  events.on('ready', () => {
    let result = api.voicelines.findItem('Javelin');
    expect(result.en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
  });
});
