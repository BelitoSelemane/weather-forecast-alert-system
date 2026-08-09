const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// "Base de dados" em memória (array simples, por enquanto)
let favoriteCities = [
    { id: 1, name: 'Maputo', addedBy: 'demo' },
    { id: 2, name: 'Lisboa', addedBy: 'demo' }
];

// CREATE - adicionar cidade favorita (rota protegida)
router.post('/', verifyToken, (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'City name is required' });
    }

    const newCity = {
        id: Date.now(),
        name,
        addedBy: req.user.username
    };

    favoriteCities.push(newCity);
    res.status(201).json(newCity);
});

// READ - listar todas as cidades favoritas (rota pública)
router.get('/', (req, res) => {
    res.json(favoriteCities);
});

// READ - buscar uma cidade específica por id (rota pública)
router.get('/:id', (req, res) => {
    const city = favoriteCities.find(c => c.id === parseInt(req.params.id));

    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }

    res.json(city);
});

// UPDATE - editar nome da cidade (rota protegida)
router.put('/:id', verifyToken, (req, res) => {
    const city = favoriteCities.find(c => c.id === parseInt(req.params.id));

    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }

    city.name = req.body.name || city.name;
    res.json(city);
});

// DELETE - remover cidade (rota protegida)
router.delete('/:id', verifyToken, (req, res) => {
    const index = favoriteCities.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: 'City not found' });
    }

    favoriteCities.splice(index, 1);
    res.status(204).send();
});

module.exports = router;