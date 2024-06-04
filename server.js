const express = require("express");
const mysql = require("mysql2");

const server = express();
server.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123!',
    database: 'mydatabase'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Get all products
server.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Get product by ID
server.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    db.query("SELECT * FROM products WHERE id = ?", [productId], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send("Product not found");
        } else {
            res.json(results[0]);
        }
    });
});

// Add a new product
server.post("/api/products", (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const query = "INSERT INTO products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, description, price, quantity, category], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, name, description, price, quantity, category });
        }
    });
});

// Update a product by ID
server.put("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const { name, description, price, quantity, category } = req.body;
    const query = "UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?";
    db.query(query, [name, description, price, quantity, category, productId], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send("Product not found");
        } else {
            res.json({ id: productId, name, description, price, quantity, category });
        }
    });
});

// Delete all products
server.delete("/api/products", (req, res) => {
    db.query("DELETE FROM products", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send();
        }
    });
});

// Delete a product by ID
server.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    db.query("DELETE FROM products WHERE id = ?", [productId], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send("Product not found");
        } else {
            res.status(204).send();
        }
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
