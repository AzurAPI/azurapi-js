const { AzurAPIInstance } = require('@commonjs');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

events.on('ready', async () => {
  console.log(' >>> Client Loaded!');
  let result = await api.ships.findItem('Abukuma', {
    nameOnly: true,
    language: 'en',
  });
  console.log(` 
 >>  Test: Get Ship by Name
 >>  Expected Result: Abukuma
 >>  Method: <AzurAPI>.ships.get('Abukuma');

 >   Result: ${result.names.en}
`);
  let result2 = await api.barrages.findItem('Full_Barrage_-_22_II');
  console.log(` 
 >>  Test: Get Barrage by Name
 >>  Expected Result: Full Barrage - 22 II
 >>  Method: <AzurAPI>.barrages.get('Abukuma');

 >   Result: ${result2.name}
`);
  process.exit(0);
});
