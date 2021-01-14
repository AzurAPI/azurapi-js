const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

test('Get Equipment', async () => {
  client.on('ready', async () => {
    let result = await client.cache.equipments.get('Quadruple 130mm (Mle 1932)');
    //remember to fix... F
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
    
test('Get Equipment EN', async () => {
  client.on('ready', async () => {
    let result = await client.cache.equipments.get('四联装130mm副炮Mle1932');
    //remember to fix... F
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
    
test('Get Equipment CN', async () => {
  client.on('ready', async () => {
    let result = await client.cache.equipments.get('四联装130mm副炮Mle1932');
    //remember to fix... F
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
//BROKEN
test('Get Equipment JP', async () => {
  client.on('ready', async () => {
    let result = await client.cache.equipments.get('130mm副砲Mle1932');
    //remember to fix... F
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
//BROKEN
test('Get Equipment KR', async () => {
  client.on('ready', async () => {
    let result = await client.cache.equipments.get('130mm 부포 Mle 1932');
    //remember to fix... F
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
