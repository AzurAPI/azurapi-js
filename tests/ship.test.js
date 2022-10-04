const { Ships } = require('../build/core/api/api_ship');
const testShips = require('./test_ships.json');

test('Ships by Faction', async () => {
  const client = new Ships();
  client.raw = testShips;

  let result = client.nationality('IJN');

  return expect(result[0].nationality).toBe('Sakura Empire');
});

describe('get', () => {
  const mockApi = { queryIsShipName: () => true };

  it('should throw if you search with an empty string', () => {
    const client = new Ships(mockApi);
    try {
      let result = client.get(' ');
    } catch (err) {
      expect(err.message).toBe('AzurAPI query string must be string');
    }
  });
  it('should throw if search with object', () => {
    const client = new Ships(mockApi);

    try {
      let result = client.get({ some: 'damn object' });
    } catch (err) {
      expect(err.message).toBe('AzurAPI query string must be string');
    }
  });

  describe('Ship Searching', () => {
    test('By name', () => {
      const mockApi = { queryIsShipName: () => true };
      const client = new Ships(mockApi);
      client.raw = testShips;

      const result = client.get('Abukuma');
      expect(result[0].names.en).toBe('Abukuma');
    });

    test('By ID', () => {
      const mockApi = { queryIsShipName: () => false };
      const client = new Ships(mockApi);
      client.raw = testShips;

      const resultID = client.get('187');
      expect(resultID[0].names.en).toBe('Abukuma');
    });
    
    it('Fuzzy search ship by Name/ID', () => {
      const mockApi = { queryIsShipName: () => false };
      const client = new Ships(mockApi);
      client.raw = testShips;
      expect(client.fuse).toBeDefined();

      client.fuse.setCollection(testShips);
      const result = client.get('A');

      return expect(result[0].names.en).toBe('Abukuma');
    });
  });
});
