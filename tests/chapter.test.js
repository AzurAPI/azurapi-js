const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();


test('Whole chapter', async () => {
    let result = await client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
});

test('Chapter & filter by section', async () => {
    let result = await client.chapters.get('1');
    expect(result[1].names.en).toBe('Offshore Exercises');
});

