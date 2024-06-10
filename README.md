# Test Verktyg Assignment 2

## MySQL Setup

To set up the MySQL database, execute the following SQL commands:

```sql
CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  quantity INT,
  category VARCHAR(255)
);
```

## .env Setup

Create a `.env` file in your project root directory with the following content:

```plaintext
HOST=YOURHOST
USER=YOURUSERNAME
PASSWORD=YOURPASSWORD
DATABASE=mydatabase
```

## Running the Server and Tests

To start the server, run:
```bash
npm run start
```

To start end-to-end (E2E) tests, run:
```bash
npm run test:e2e
```

To start unit tests, run:
```bash
npm run test
```

To start integration tests, run:
```bash
npm run testint
```

## Developed By

- Jack Andersson
- Kemal Hadziavdic
- Tomislav Vuckovic
- Joakim Christoffersson
