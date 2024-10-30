CREATE DATABASE shopping;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO products (name, price, description) VALUES
('Product 1', 10.00, 'Description of product 1'),
('Product 2', 20.00, 'Description of product 2'),
('Product 3', 30.00, 'Description of product 3'),
('Product 4', 40.00, 'Description of product 4'),
('Product 5', 50.00, 'Description of product 5');