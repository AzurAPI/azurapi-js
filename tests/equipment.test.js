const { AzurAPI } = require('../build/index.js');

test('Get Equipment EN', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.equipments.get('Quadruple 130mm (Mle 1932)');
      resolve(result.names.en);
    });
  });
  return expect(data).resolves.toBe('Quadruple 130mm (Mle 1932)');
});

test('Get Equipment CN', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.equipments.get('四联装130mm副炮Mle1932');
      resolve(result.names.en);
    });
  });
  return expect(data).resolves.toBe('Quadruple 130mm (Mle 1932)');
});

test('Get Equipment JP', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.equipments.get('130mm副砲Mle1932');
      resolve(result.names.en);
    });
  });
  return expect(data).resolves.toBe('Quadruple 130mm (Mle 1932)');
});

test('Get Equipment KR', async () => {
  const client = new AzurAPI();
  const data = new Promise((resolve, reject) => {
    client.on('ready', async () => {
      let result = client.equipments.get('130mm 부포 Mle 1932');
      resolve(result.names.en);
    });
  });
  return expect(data).resolves.toBe('Quadruple 130mm (Mle 1932)');
});
