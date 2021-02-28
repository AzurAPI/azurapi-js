const {instance} = require('../build/Client');
const client = instance;

test('Get Barrage', () => {
    let result = client.barrages.get('Full_Barrage_-_22_II');
    expect(result.name).toBe('Full Barrage - 22 II');
});
