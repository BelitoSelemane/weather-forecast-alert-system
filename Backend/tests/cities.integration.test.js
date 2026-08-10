const request = require('supertest');
const express = require('express');
const citiesRoutes = require('../routes/cities');

const app = express();
app.use(express.json());
app.use('/api/cities', citiesRoutes);

describe('Cities API (Integration Test)', () => {
    test('GET /api/cities should return a list of cities', async () => {
        const response = await request(app).get('/api/cities');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/cities without token should return 401', async () => {
        const response = await request(app)
            .post('/api/cities')
            .send({ name: 'TestCity' });
        expect(response.statusCode).toBe(401);
    });

    test('GET /api/cities/:id with invalid id should return 404', async () => {
        const response = await request(app).get('/api/cities/999999');
        expect(response.statusCode).toBe(404);
    });
});