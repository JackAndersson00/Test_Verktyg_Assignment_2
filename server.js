const express = require('express');
const logic = require('./logic.js');

const server = express();
server.use(express.json());

// Routes using logic.js functions

// GET products (all or by name containing a keyword)
server.get('/api/v1/products', async (req, res) => {
    const keyword = req.query.name;
    console.log('Keyword:', keyword); // Log the keyword being used (for debugging)
    try {
        const products = await logic.getProducts(keyword);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// GET a specific product by id
server.get('/api/v1/products/:id', async (req, res) => {
    try {
        const product = await logic.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        if (err.message === 'Product not found') {
            res.status(404).send('Product not found');
        } else {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
});

// POST a product
server.post('/api/v1/products', async (req, res) => {
    try {
        const newProduct = await logic.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// PUT a product by id
server.put('/api/v1/products/:id', async (req, res) => {
    try {
        const updatedProduct = await logic.updateProduct(req.params.id, req.body);
        console.log("updatedProd", updatedProduct)
        res.status(204).json(updatedProduct);
    } catch (err) {
        console.error(err);
        if (err.message === 'Product not found') {
            res.status(404).send('Product not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

// DELETE all products
server.delete('/api/v1/products', async (req, res) => {
    try {
        await logic.deleteAllProducts();
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE a product by id
server.delete('/api/v1/products/:id', async (req, res) => {
    try {
        await logic.deleteProductById(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.message === 'Product not found') {
            res.status(404).json({ error: 'Product not found' }); // Return JSON error response
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

module.exports = server;