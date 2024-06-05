const db = require('./database.js');

// Function to get products
async function getProducts(keyword) {
    try {
        if (keyword) {
            // If a keyword is provided, fetch products by name containing the keyword
            return await db.getProductsByName(keyword);
        } else {
            // If no keyword is provided, fetch all products
            return await db.getAllProducts();
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Function to get product by ID
async function getProductById(id) {
    try {
        const product = await db.getProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Function to add a new product
async function addProduct(product) {
    try {
        return await db.addProduct(product);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Function to update a product by ID
async function updateProduct(id, product) {
    try {
        const updatedRows = await db.updateProduct(id, product);
        if (updatedRows === 0) {
            throw new Error('Product not found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Function to delete all products
async function deleteAllProducts() {
    try {
        await db.deleteAllProducts();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Function to delete a product by ID
async function deleteProductById(id) {
    try {
        const result = await db.deleteProductById(id);
        if (result.affectedRows === 0) {
            throw new Error('Product not found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteAllProducts,
    deleteProductById
};
