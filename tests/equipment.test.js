const { AzurAPIClient } = require('../build/AzurAPIClient');
const client = new AzurAPIClient();

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
