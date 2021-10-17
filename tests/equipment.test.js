const { AzurAPIClient } = require('../build/node.js');
const { events, api } = AzurAPIClient;

test('Get Equipment', async () => {
  events.on('ready', async () => {
    let result = api.equipments.get('Quadruple 130mm (Mle 1932)');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('Get Equipment EN', async () => {
  events.on('ready', async () => {
    let result = api.equipments.get('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('Get Equipment CN', async () => {
  events.on('ready', async () => {
    let result = api.equipments.get('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('Get Equipment JP', async () => {
  events.on('ready', async () => {
    let result = api.equipments.get('130mm副砲Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('Get Equipment KR', async () => {
  events.on('ready', async () => {
    let result = api.equipments.get('130mm 부포 Mle 1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
