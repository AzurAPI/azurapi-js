const { AzurAPI } = require('../build/index.js');

test('Whole chapter', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.chapters.name('Offshore Exercises');
      resolve(result[0].names.en);
    });
  });
  return expect(data).resolves.toBe('Offshore Exercises');
});

test('Whole chapter (ID)', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.chapters.id('1-1');
      resolve(result[0].names.en);
    });
  });
  return expect(data).resolves.toBe('Offshore Exercises');
});

// test('Chapter & filter by section', async () => {
//   const client = new AzurAPI();
//   const data = new Promise((resolve, reject) => {
//     client.on('ready', async () => {
//       let result = client.chapters.get('1');
//       resolve(result[0].names.en);
//     });
//   });
//   return expect(data).resolves.toBe('Offshore Exercises');
// });
