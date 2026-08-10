// Simple in-memory cache (simulates Redis behavior for this project)
const cacheStore = new Map();

function set(key, value, ttlSeconds = 60) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    cacheStore.set(key, { value, expiresAt });
}

function get(key) {
    const entry = cacheStore.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
        cacheStore.delete(key);
        return null;
    }

    return entry.value;
}

module.exports = { set, get };