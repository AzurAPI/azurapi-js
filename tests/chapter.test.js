const { AzurAPIInstance } = require('@commonjs');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

test('Whole chapter', () => {
  events.on('ready', () => {
    let result = api.chapters.findItem('1');
    expect(result.names.en).toBe(`Mariana's Turmoil Pt. 1`);
  });
});

test('Chapter & filter by section', () => {
  events.on('ready', () => {
    let result = api.chapters.findItem('1');
    expect(result.names.en).toBe(`Mariana's Turmoil Pt. 1`);
  });
});
