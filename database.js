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
    const [result] = await connection.query(query, [name, description, price, quantity, category, id]);
    return result.affectedRows; // Return the number of affected rows
}

// Function to delete all products
async function deleteAllProducts() {
    try {
        await connection.query('DELETE FROM products');
        await connection.query('ALTER TABLE products AUTO_INCREMENT = 1');
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for server handling
    }
}

// Function to delete a product by ID
async function deleteProductById(id) {
    const result = await connection.query('DELETE FROM products WHERE id = ?', [id]);
    return result[0]; // Return the first element of the result array
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteAllProducts,
    deleteProductById
};
