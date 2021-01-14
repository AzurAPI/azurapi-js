const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();


test('Whole chapter', async () => {
  client.on('ready', async () => {
    let result = await client.cache.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});
  
test('Chapter & filter by section', async() => {
  client.on('ready', async () => {
    let result = await client.cache.chapters.get('1', '1');
    expect(result.names.en).toBe('Offshore Exercises');
  });
});

