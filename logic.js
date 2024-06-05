const db = require('./database.js');

// Function to get all products
async function getAllProducts() {
    try {
        const products = await db.getAllProducts();
        return products;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for server handling
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
        throw err; // Re-throw the error for server handling
    }
}

// Function to add a new product
async function addProduct(product) {
    try {
        const newProduct = await db.addProduct(product);
        return newProduct;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for server handling
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
        throw err; // Re-throw the error for server handling
    }
}

// Function to delete all products
async function deleteAllProducts() {
    try {
        await db.deleteAllProducts();
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for server handling
    }
}

// Function to delete a product by ID
async function deleteProductById(id) {
    try {
        const result = await db.deleteProductById(id);
        console.log(result.affectedRows); // Log the value of affectedRows
        if (result.affectedRows === 0) {
            throw new Error('Product not found');
        }
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for server handling
    }
}

// Function to get products by name containing a keyword
async function getProductsByName(keyword) {
    try {
        const products = await db.getProductsByName(keyword);
        return products;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteAllProducts,
    deleteProductById,
    getProductsByName
};
