const cache = require('../config/cache');

describe('Cache Module (Unit Test)', () => {
    test('should store and retrieve a value', () => {
        cache.set('testKey', { temp: 25 }, 60);
        const result = cache.get('testKey');
        expect(result).toEqual({ temp: 25 });
    });

    test('should return null for a non-existent key', () => {
        const result = cache.get('doesNotExist');
        expect(result).toBeNull();
    });

    test('should expire values after TTL', async () => {
        cache.set('shortLived', { value: 1 }, 0);
        await new Promise((resolve) => setTimeout(resolve, 10));
        const result = cache.get('shortLived');
        expect(result).toBeNull();
    });
});