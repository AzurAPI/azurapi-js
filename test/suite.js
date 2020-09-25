const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

client
  .getShip('Yamashiro')
  .then((data) => console.log(data))
  .catch(console.error);
