const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

/*client
  .getShipsByFaction('IJN')
  .then((data) => console.log(data[0]))
  .catch(console.error);
console.log('-----------------');*/
client
  .getEquipments('Quadruple 130mm (Mle 1932)')
  .then((data) => console.log(data))
  .catch(console.error);
