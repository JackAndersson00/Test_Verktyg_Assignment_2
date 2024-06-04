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

## Developed by

* Jack Andersson
* Kemal Hadziavdic
* Tomislav Vuckovic
* Joakim Christoffersson