const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

client.on('ready', async () => {
  console.log(' >>> Client Loaded!');
  let result = await client.ships.get('Abukuma', { nameOnly: true, language: 'en' });
  console.log(` 
 >>  Test: Get Ship by Name
 >>  Expected Result: Abukuma
 >>  Method: <AzurAPI>.ships.get('Abukuma');

 >   Result: ${result.names.en}
`);
  let result2 = await client.barrages.get('Full_Barrage_-_22_II');
  console.log(` 
 >>  Test: Get Barrage by Name
 >>  Expected Result: Full Barrage - 22 II
 >>  Method: <AzurAPI>.barrages.get('Abukuma');

 >   Result: ${result2.name}
`);
  process.exit(0);
});
