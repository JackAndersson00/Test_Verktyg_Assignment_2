const db = require('./database.js');

async function getProducts(keyword) {
    if (keyword) {
        return db.getProductsByName(keyword);
    } else {
        return db.getAllProducts();
    }
}

async function getProductById(id) {
    const product = await db.getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}

async function addProduct(product) {
    return db.addProduct(product);
}

async function updateProduct(id, product) {
    const updatedRows = await db.updateProduct(id, product);
    if (updatedRows === 0) {
        throw new Error('Product not found');
    }
    return { id, ...product }
}

async function deleteAllProducts() {
    await db.deleteAllProducts();
}

async function deleteProductById(id) {
    const result = await db.deleteProductById(id);
    if (result.affectedRows === 0) {
        throw new Error('Product not found');
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
