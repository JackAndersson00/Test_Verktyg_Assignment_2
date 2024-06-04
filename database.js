const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123!',
    database: 'mydatabase'
});

// Function to get all products
async function getAllProducts() {
    const [results] = await connection.query('SELECT * FROM products');
    return results;
}

// Function to get product by ID
async function getProductById(id) {
    const [results] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    return results[0];
}

// Function to add a new product
async function addProduct(product) {
    const { name, description, price, quantity, category } = product;
    const query = 'INSERT INTO products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)';
    const [results] = await connection.query(query, [name, description, price, quantity, category]);
    return { id: results.insertId, ...product };
}

// Function to update a product by ID
async function updateProduct(id, product) {
    const { name, description, price, quantity, category } = product;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?';
    await connection.query(query, [name, description, price, quantity, category, id]);
}

// Function to delete all products
async function deleteAllProducts() {
    await connection.query('DELETE FROM products');
}

// Function to delete a product by ID
async function deleteProductById(id) {
    await connection.query('DELETE FROM products WHERE id = ?', [id]);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteAllProducts,
    deleteProductById
};
