const { AzurAPI } = require('../build/index.js');
const client = new AzurAPI();

test('Whole chapter', async () => {
  client.on('ready', async () => {
    let result = client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});

test('Chapter & filter by section', async () => {
  client.on('ready', async () => {
    let result = client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});
