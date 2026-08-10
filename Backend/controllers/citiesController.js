
let favoriteCities = new Map([
    [1, { id: 1, name: 'Maputo', addedBy: 'demo' }],
    [2, { id: 2, name: 'Lisboa', addedBy: 'demo' }]
]);

exports.getAllCities = (req, res) => {
    res.json(Array.from(favoriteCities.values()));
};

exports.getCityById = (req, res) => {
    const city = favoriteCities.get(parseInt(req.params.id));
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
};

exports.createCity = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'City name is required' });

    const id = Date.now();
    const newCity = { id, name, addedBy: req.user.username };
    favoriteCities.set(id, newCity);
    res.status(201).json(newCity);
};

exports.updateCity = (req, res) => {
    const id = parseInt(req.params.id);
    const city = favoriteCities.get(id);
    if (!city) return res.status(404).json({ error: 'City not found' });

    city.name = req.body.name || city.name;
    favoriteCities.set(id, city);
    res.json(city);
};

exports.deleteCity = (req, res) => {
    const id = parseInt(req.params.id);
    if (!favoriteCities.has(id)) return res.status(404).json({ error: 'City not found' });

    favoriteCities.delete(id);
    res.status(204).send();
};