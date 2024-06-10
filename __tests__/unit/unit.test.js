const assert = require('assert');
const logic = require('../../logic.js');
const db = require('../../database.js'); // Mocking database functions

// Mocking database methods
db.getProductsByName = async (keyword) => [{ id: 1, name: keyword }];
db.getAllProducts = async () => [{ id: 1, name: 'Product1' }];
db.getProductById = async (id) => (id === 1 ? { id: 1, name: 'Product1' } : null);
db.addProduct = async (product) => ({ id: 2, ...product });
db.updateProduct = async (id, product) => (id === 1 ? 1 : 0);
db.deleteAllProducts = async () => {};
db.deleteProductById = async (id) => (id === 1 ? { affectedRows: 1 } : { affectedRows: 0 });

describe('Unit tests', () => {
    it('getProducts returns an array', async () => {
        const products = await logic.getProducts();
        assert(Array.isArray(products), 'Expected products to be an array');
    });

    it('getProductById returns a product object if found', async () => {
        const product = await logic.getProductById(1);
        assert(product && product.id === 1, 'Expected product to be found');
    });

    it('getProductById throws an error if product is not found', async () => {
        try {
            await logic.getProductById(999);
            assert.fail('Expected error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'Product not found', 'Expected "Product not found" error message');
        }
    });

    it('addProduct returns the added product with an id', async () => {
        const newProduct = { name: 'NewProduct' };
        const addedProduct = await logic.addProduct(newProduct);
        assert(addedProduct && addedProduct.id, 'Expected product to have an id');
    });

    it('updateProduct updates a product if it exists', async () => {
        const updatedProduct = { name: 'UpdatedProduct' };
        await logic.updateProduct(1, updatedProduct);
        // If no error is thrown, the test passes
    });

    it('updateProduct throws an error if product does not exist', async () => {
        const updatedProduct = { name: 'UpdatedProduct' };
        try {
            await logic.updateProduct(999, updatedProduct);
            assert.fail('Expected error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'Product not found', 'Expected "Product not found" error message');
        }
    });

    it('deleteAllProducts deletes all products', async () => {
        await logic.deleteAllProducts();
        // If no error is thrown, the test passes
    });

    it('deleteProductById deletes a product if it exists', async () => {
        await logic.deleteProductById(1);
        // If no error is thrown, the test passes
    });

    it('deleteProductById throws an error if product does not exist', async () => {
        try {
            await logic.deleteProductById(999);
            assert.fail('Expected error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'Product not found', 'Expected "Product not found" error message');
        }
    });
});
