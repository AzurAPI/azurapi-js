const { AzurAPI } = require('../build/index.js');

test('Whole chapter', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.chapters.get('1');
      resolve(result[1].names.en);
    });
  });
  return expect(data).resolves.toBe('Offshore Exercises');
});

test('Chapter & filter by section', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.chapters.get('1');
      resolve(result[1].names.en);
    });
  });
  return expect(data).resolves.toBe('Offshore Exercises');
});
