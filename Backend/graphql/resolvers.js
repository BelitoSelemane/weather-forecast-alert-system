const mockWeather = {
    Maputo: { temp: 32, description: 'Sunny', humidity: 60, windSpeed: 20 },
    Lisboa: { temp: 24, description: 'Cloudy', humidity: 70, windSpeed: 15 },
    Tokyo: { temp: 28, description: 'Rainy', humidity: 80, windSpeed: 25 }
};

const mockCities = [
    { id: 1, name: 'Maputo', addedBy: 'demo' },
    { id: 2, name: 'Lisboa', addedBy: 'demo' }
];

const root = {
    cities: () => mockCities,
    weather: ({ city }) => {
        const data = mockWeather[city];
        if (!data) return null;
        return { city, ...data };
    }
};

module.exports = root;