const { AzurAPIClient } = require('../build/node.js');
const { events, api } = AzurAPIClient;

test('Whole chapter', async () => {
  events.on('ready', async () => {
    let result = await api.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});

test('Chapter & filter by section', async () => {
  events.on('ready', async () => {
    let result = await api.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
  });
});
