const { AzurAPI } = require('../build/core/Client.js');
const client = new AzurAPI();

test('Whole chapter', async () => {
  client.on('ready', async () => {
    let result = await client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});

test('Chapter & filter by section', async () => {
  client.on('ready', async () => {
    let result = await client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});
