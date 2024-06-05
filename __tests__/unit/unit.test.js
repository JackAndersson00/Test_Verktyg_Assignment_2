const assert = require('assert');
const logic = require('../../logic.js');

describe('Unit tests', () => {
    it('getProducts returns an array', async () => {
        const products = await logic.getProducts();
        assert(Array.isArray(products), 'Expected products to be an array');
    });

    // Add more unit tests for other functions in logic.js
});
