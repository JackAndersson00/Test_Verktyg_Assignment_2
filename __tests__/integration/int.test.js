const assert = require('assert');
const request = require('supertest');
const server = require('../../server.js');
const { deleteAllProducts } = require('../../database'); // Adjust the path as needed

describe('Integration tests', () => {

    let createdProductId;

    it('GET /api/v1/products returns status 200', async () => {
        const response = await request(server).get('/api/v1/products');
        assert.strictEqual(response.status, 200, 'Expected status code 200');
    });

    it('POST /api/v1/products adds a new product and returns status 201', async () => {
        const newProduct = { name: 'NewProduct', price: 10.99, category: 'Category1' };
        const response = await request(server).post('/api/v1/products').send(newProduct);
        assert.strictEqual(response.status, 201, 'Expected status code 201');
        assert(response.body && response.body.id, 'Expected new product to have an id');
        createdProductId = response.body.id; // Store the id of the created product for further tests
    });

    it('GET /api/v1/products/:id returns status 200 and a product', async () => {
        const response = await request(server).get(`/api/v1/products/${createdProductId}`);
        assert.strictEqual(response.status, 200, 'Expected status code 200');
        assert(response.body && response.body.id === createdProductId, 'Expected product with the created id');
    });

    it('PUT /api/v1/products/:id updates a product and returns status 204', async () => {
        const updatedProduct = { name: 'UpdatedProduct', price: 12.99, category: 'Category2' };
        const response = await request(server).put(`/api/v1/products/${createdProductId}`).send(updatedProduct);
        assert.strictEqual(response.status, 204, 'Expected status code 204');
    });

    it('DELETE /api/v1/products/:id deletes a product and returns status 204', async () => {
        const response = await request(server).delete(`/api/v1/products/${createdProductId}`);
        assert.strictEqual(response.status, 204, 'Expected status code 204');
    });

    after(async () => {
        await deleteAllProducts();
    });
});
// Förklaring av testerna
/*GET /api/v1/products/
: Testar att hämta en specifik produkt och kontrollerar att statuskoden är 200 och att rätt produkt returneras.
POST /api/v1/products: Testar att lägga till en ny produkt och kontrollerar att statuskoden är 201 och att den nya produkten har ett id.
PUT /api/v1/products/:id:
: Testar att uppdatera en specifik produkt och kontrollerar att statuskoden är 204.
DELETE /api/v1/products/:id:
: Testar att ta bort en specifik produkt och kontrollerar att statuskoden är 204.
*/
