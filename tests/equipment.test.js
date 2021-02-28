const { AzurAPI } = require('../build/Client');
const client = new AzurAPI();

test('Get Equipment', async () => {
    let result = client.equipments.get('Quadruple 130mm (Mle 1932)');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment EN', async () => {
    let result = client.equipments.get('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});

test('Get Equipment CN', async () => {
    let result = client.equipments.get('四联装130mm副炮Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});
//BROKEN
test('Get Equipment JP', async () => {
    let result = client.equipments.get('130mm副砲Mle1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});
//BROKEN
test('Get Equipment KR', async () => {
    let result = client.equipments.get('130mm 부포 Mle 1932');
    expect(result.names.en).toBe('四联装130mm副炮Mle1932');
});
