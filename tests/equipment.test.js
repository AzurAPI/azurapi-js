const { AzurAPIInstance } = require('../build/index.js');
const {
  tools: { events },
  api,
} = AzurAPIInstance;

test('findItem Equipment', () => {
  events.on('ready', () => {
    let result = api.equipments.findItem('Quadruple 130mm (Mle 1932)');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('findItem Equipment EN', () => {
  events.on('ready', () => {
    let result = api.equipments.findItem('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('findItem Equipment CN', () => {
  events.on('ready', () => {
    let result = api.equipments.findItem('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('findItem Equipment JP', () => {
  events.on('ready', () => {
    let result = api.equipments.findItem('130mm副砲Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});

test('findItem Equipment KR', () => {
  events.on('ready', () => {
    let result = api.equipments.findItem('130mm 부포 Mle 1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
  });
});
