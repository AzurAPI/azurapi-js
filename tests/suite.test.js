const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

client
  .getShipsByFaction('IJN')
  .then((data) => console.log(data[0]))
  .catch(console.error)
  .then(() => {
    console.log('-----------------');
  }).then(() => {
    client
      .getEquipments('Improved Depth Charge')
      .then((data) => console.log(data))
      .catch(console.error);
  });
