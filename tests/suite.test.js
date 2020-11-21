const {
  AzurAPIClient
} = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Ships by Faction', async () => {
  let result = await client.getShipsByFaction('IJN')
  expect(result[0].names.en).toBe("Abukuma")
})

test('Get Equipment', async () => {
  let result = await client.getEquipments('Quadruple 130mm (Mle 1932)')
  expect(result.names.en).toBe("四联装130mm副炮Mle1932")
})