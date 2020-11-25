const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Whole chapter', async () => {
  let result = await client.getChapter('1');
  expect(result[1].names.en).toBe('Offshore Exercises');
});

test('Chapter & filter by section', async() => {
  let result = await client.getChapter('1', '1');
  expect(result.names.en).toBe('Offshore Exercises');
});
