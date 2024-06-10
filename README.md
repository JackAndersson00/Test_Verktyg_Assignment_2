# Test_Verktyg_Assignment_2


## Mysql setup

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

## .env setup
```.env
HOST=YOURHOST
USER=YOURUSERNAME
PASSWORD=YOURPASSWORD
DATABASE=mydatabase
```

"npm run start" to start server
"npm run test:e2e" to start e2e tests
"npm run test" to start unit tests
"npm run testint" to start integration tests

## Developed by

* Jack Andersson
* Kemal Hadziavdic
* Tomislav Vuckovic
* Joakim Christoffersson
