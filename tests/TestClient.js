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
  process.exit(0);
});
