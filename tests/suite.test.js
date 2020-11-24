const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

test('Ship by Name/ID', async () => {
  let result = await client.getShip('Abukuma');
  expect(result.names.en).toBe('Abukuma');
});

test('Ships by Faction', async () => {
  let result = await client.getShipsByFaction('IJN');
  expect(result[0].names.en).toBe('Abukuma');
});

test('Get Equipment', async () => {
  let result = await client.getEquipment('Quadruple 130mm (Mle 1932)');
  //remember to fix... F
  expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment EN', async () => {
  let result = await client.getEquipment('四联装130mm副炮Mle1932');
  //remember to fix... F
  expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment CN', async () => {
  let result = await client.getEquipment('四联装130mm副炮Mle1932');
  //remember to fix... F
  expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment JP', async () => {
  let result = await client.getEquipment('130mm副砲Mle1932');
  //remember to fix... F
  expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment KR', async () => {
  let result = await client.getEquipment('130mm 부포 Mle 1932');
  //remember to fix... F
  expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Voice lines', async () => {
  let result = await client.getVoiceline('101');
  expect(result.Default[0].en).toBe('J-class destroyer ー Javelin, Hull Number F61!');
});

test('Get Barrage', async () => {
  let result = await client.getBarrage('Full_Barrage_-_Ayanami_II');
  expect(result[0].name).toBe('Full Barrage - Ayanami II');
});
