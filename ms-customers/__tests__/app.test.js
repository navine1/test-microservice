const { connectDb, initDb, seedDb, closeDb } = require('../src/config/database');
const request = require('supertest');
const app = require('../src/app');

beforeAll(async () => {
    await connectDb();
    await initDb();
    await seedDb();

});

afterAll(async () => {
    await closeDb();
});

describe('Health endpoint', () => {
    it('GET /health should return status OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: 'OK' });
    });
});

describe('Customers endpoint', () => {
    it('GET /customers should return seeded customers', async () => {
        const res = await request(app).get('/api/v1/customers');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.some(c => c.firstname === 'Elijah')).toBe(true);
    });
});
