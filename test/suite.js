const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

client
  .getShipsByFaction('IJN')
  .then((data) => console.log(data[0]))
  .catch(console.error);
