const assert = require('assert');
const request = require('supertest');
const server = require('../../server.js');

describe('Integration tests', () => {
    it('GET /api/v1/products returns status 200', async () => {
        const response = await request(server).get('/api/v1/products');
        assert(response.status, 200, 'Expected status code 200');
    });

    // Add more integration tests for other routes as needed
});
