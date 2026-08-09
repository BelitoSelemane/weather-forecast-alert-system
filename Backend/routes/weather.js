const express = require('express');
const router = express.Router();

// Mock data - será substituído por API real futuramente
const mockWeather = {
    Maputo: { temp: 32, description: 'Sunny', humidity: 60, windSpeed: 20 },
    Lisboa: { temp: 24, description: 'Cloudy', humidity: 70, windSpeed: 15 },
    Tokyo: { temp: 28, description: 'Rainy', humidity: 80, windSpeed: 25 }
};

// GET weather by city name
router.get('/:city', (req, res) => {
    const city = req.params.city;
    const data = mockWeather[city];

    if (!data) {
        return res.status(404).json({ error: 'City not found in mock database' });
    }

    res.json({ city, ...data });
});

module.exports = router;