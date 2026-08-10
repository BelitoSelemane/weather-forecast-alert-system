const express = require('express');
const router = express.Router();
const cache = require('../config/cache');

const mockWeather = {
    Maputo: { temp: 32, description: 'Sunny', humidity: 60, windSpeed: 20 },
    Lisboa: { temp: 24, description: 'Cloudy', humidity: 70, windSpeed: 15 },
    Tokyo: { temp: 28, description: 'Rainy', humidity: 80, windSpeed: 25 }
};

router.get('/:city', (req, res) => {
    const city = req.params.city;
    const cacheKey = `weather:${city}`;

    // 1. Tenta buscar do cache primeiro
    const cached = cache.get(cacheKey);
    if (cached) {
        return res.json({ ...cached, source: 'cache' });
    }

    // 2. Se não estiver em cache, busca nos dados "reais"
    const data = mockWeather[city];
    if (!data) {
        return res.status(404).json({ error: 'City not found in mock database' });
    }

    const result = { city, ...data };

    // 3. Guarda no cache por 30 segundos
    cache.set(cacheKey, result, 30);

    res.json({ ...result, source: 'live' });
});

module.exports = router;