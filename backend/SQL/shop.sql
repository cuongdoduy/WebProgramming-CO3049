DROP DATABASE IF EXISTS shopping;

CREATE DATABASE shopping;
USE shopping;

CREATE TABLE `Customer` (
  `UserID` INT PRIMARY KEY AUTO_INCREMENT,
  `Name` NVARCHAR(225),
  `Role` NVARCHAR(225),
  `Address` NVARCHAR(225),
  `Email` NVARCHAR(225),
  `Password` NVARCHAR(225),
  `AdminID` INT
);

CREATE TABLE `Product` (
  `ProductID` INT PRIMARY KEY AUTO_INCREMENT,
  `Price` FLOAT,
  `Status` NVARCHAR(225),
  `cart_ID` INT,
  `AdminID` INT,    
  `ProductName` NVARCHAR(50),
  `Description` NVARCHAR(225),
  `image` VARCHAR(225)
);

CREATE TABLE `Comment` (
  `ID` INT PRIMARY KEY AUTO_INCREMENT,
  `CustomerID` INT,
  `Product_ID` INT,
  `Date` DATETIME,
  `Content` NVARCHAR(225),
  `image` VARCHAR(225)
);

CREATE TABLE `Cart` (
  `CartID` INT PRIMARY KEY AUTO_INCREMENT,
  `Quantity` INT,
  `Status` VARCHAR(25),
  `CustomerID` INT
);

CREATE TABLE `ADMIN` (
  `admin_id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(225),
  `password` VARCHAR(225),
  `role` VARCHAR(25)
);

CREATE TABLE `ORDER` (
  `order_no` INT PRIMARY KEY AUTO_INCREMENT,
  `order_date` DATETIME,
  `quantity` INT,
  `status` VARCHAR(25),
  `customer_id` INT
);

CREATE TABLE `TRANSACTION` (
  `transaction_id` INT PRIMARY KEY AUTO_INCREMENT,
  `order_id` INT,
  `customer_id` INT,
  `status` VARCHAR(25)
);

CREATE TABLE `CART_OF_CUSTOMER` (
  `cart_id` INT,
  `product_id` INT,
  PRIMARY KEY (`cart_id`, `product_id`)
);

CREATE TABLE `ORDER_OF_CUSTOMER` (
  `order_no` INT,
  `product_id` INT,
  PRIMARY KEY (`order_no`, `product_id`)
);

ALTER TABLE `Product` ADD FOREIGN KEY (`AdminID`) REFERENCES `ADMIN` (`admin_id`);

ALTER TABLE `Product` ADD FOREIGN KEY (`cart_ID`) REFERENCES `Cart` (`CartID`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`Product_ID`) REFERENCES `Product` (`ProductID`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`UserID`);

ALTER TABLE `ORDER` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`UserID`);

ALTER TABLE `TRANSACTION` ADD FOREIGN KEY (`order_id`) REFERENCES `ORDER` (`order_no`);

ALTER TABLE `TRANSACTION` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`UserID`);

ALTER TABLE `CART_OF_CUSTOMER` ADD FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`CartID`);

ALTER TABLE `CART_OF_CUSTOMER` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`ProductID`);

ALTER TABLE `ORDER_OF_CUSTOMER` ADD FOREIGN KEY (`order_no`) REFERENCES `ORDER` (`order_no`);

ALTER TABLE `ORDER_OF_CUSTOMER` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`ProductID`);

ALTER TABLE `Cart` ADD FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`UserID`);

ALTER TABLE `Customer` ADD FOREIGN KEY (`AdminID`) REFERENCES `ADMIN` (`admin_id`);

INSERT INTO ADMIN (admin_id, email, password, role)
VALUES (1, 'admin@example.com', 'adminpassword', 'admin');

INSERT INTO Product (ProductName, Description, Price, Status, image, AdminID)
VALUES
('iPhone 15 Pro Max', 'Latest flagship smartphone with advanced features', 1299.99, 'In Stock', 'iphone15.jpg', 1),
('Samsung Galaxy S24 Ultra', 'Powerful Android phone with stunning display', 1199.99, 'In Stock', 'galaxyS24.jpg', 1),
('MacBook Pro 14"', 'High-performance laptop for professionals', 1999.99, 'In Stock', 'macbookPro14.jpg', 1),
('Dell XPS 13', 'Sleek and stylish ultrabook', 999.99, 'In Stock', 'xps13.jpg', 1),
('Sony PlayStation 5', 'Next-gen gaming console', 499.99, 'Out of Stock', 'ps5.jpg', 1),
('Nintendo Switch OLED', 'Versatile gaming console', 349.99, 'In Stock', 'switchOLED.jpg', 1),
('Apple Watch Series 9', 'Smartwatch with advanced health tracking', 399.99, 'In Stock', 'appleWatch9.jpg', 1),
('Samsung Galaxy Watch 6', 'Stylish smartwatch with long battery life', 299.99, 'In Stock', 'galaxyWatch6.jpg', 1),
('AirPods Pro (2nd Gen)', 'Premium wireless earbuds with active noise cancellation', 249.99, 'In Stock', 'airpodsPro2.jpg', 1),
('Sony WH-1000XM5', 'Top-rated noise-cancelling headphones', 399.99, 'In Stock', 'wh1000xm5.jpg', 1),
('LG OLED C3', 'Immersive OLED TV with stunning picture quality', 1499.99, 'In Stock', 'lgC3.jpg', 1),
('Samsung Neo QLED 8K', 'Bright and detailed 8K TV', 2999.99, 'In Stock', 'samsungNeoQLED8K.jpg', 1),
('Canon EOS R8', 'Professional-grade mirrorless camera', 1799.99, 'In Stock', 'eosR8.jpg', 1),
('Nikon Z9', 'High-resolution DSLR camera', 5499.99, 'In Stock', 'nikonZ9.jpg', 1),
('DJI Mavic 3 Pro', 'Advanced drone with cinematic capabilities', 1499.99, 'In Stock', 'mavic3Pro.jpg', 1),
('GoPro Hero 11 Black', 'Action camera for extreme adventures', 399.99, 'In Stock', 'hero11Black.jpg', 1),
('Apple iPad Pro 12.9"', 'Powerful tablet for productivity and creativity', 1099.99, 'In Stock', 'ipadPro12.9.jpg', 1),
('Samsung Galaxy Tab S9 Ultra', 'Android tablet with stunning display', 1199.99, 'In Stock', 'tabS9Ultra.jpg', 1),
('Microsoft Surface Pro 9', 'Versatile 2-in-1 laptop and tablet', 999.99, 'In Stock', 'surfacePro9.jpg', 1),
('Logitech MX Master 3S', 'Ergonomic wireless mouse', 99.99, 'In Stock', 'mxMaster3S.jpg', 1),
('Keychron K8 Pro', 'Mechanical keyboard for Mac and Windows', 149.99, 'In Stock', 'keychronK8Pro.jpg', 1),
('Razer Blade 15', 'High-performance gaming laptop', 1999.99, 'In Stock', 'razerBlade15.jpg', 1),
('Alienware m17 R6', 'Powerful gaming laptop with alienware design', 2499.99, 'In Stock', 'alienwarem17R6.jpg', 1),
('ASUS ROG Strix G17', 'Affordable gaming laptop with strong performance', 1499.99, 'In Stock', 'rogStrixG17.jpg', 1),
('NVIDIA GeForce RTX 4090', 'High-end graphics card for PC gaming', 1599.99, 'Out of Stock', 'rtx4090.jpg', 1),
('AMD Radeon RX 7900 XTX', 'Powerful graphics card for PC gaming', 999.99, 'In Stock', 'rx7900xtx.jpg', 1),
('Intel Core i9-13900K', 'High-performance desktop processor', 599.99, 'In Stock', 'i913900K.jpg', 1),
('AMD Ryzen 9 7950X', 'Powerful desktop processor', 549.99, 'In Stock', 'ryzen97950X.jpg', 1),
('Kingston Fury Renegade SSD', 'High-speed SSD for gaming and content creation', 199.99, 'In Stock', 'furyRenegadeSSD.jpg', 1),
('Samsung 990 Pro SSD', 'Fast SSD for everyday use', 149.99, 'In Stock', 'samsung990ProSSD.jpg', 1),
('Seagate FireCuda 530', 'High-performance SSD for gaming and content creation', 179.99, 'In Stock', 'firecuda530.jpg', 1),
('Western Digital Black SN850', 'Fast SSD for everyday use', 129.99, 'In Stock', 'blackSN850.jpg', 1),
('Corsair Vengeance RGB DDR5', 'High-performance RAM with RGB lighting', 199.99, 'In Stock', 'vengeanceRGBDDR5.jpg', 1),
('G.Skill Trident Z5 Neo', 'High-performance RAM with stylish design', 179.99, 'In Stock', 'tridentZ5Neo.jpg', 1),
('Cooler Master Hyper 212 RGB Black Edition', 'Popular CPU cooler with RGB lighting', 49.99, 'In Stock', 'hyper212RGB.jpg', 1),
('NZXT Kraken X73', 'High-performance AIO liquid cooler', 199.99, 'In Stock', 'krakenX73.jpg', 1),
('Thermaltake Toughpower GF1 850W', 'High-quality power supply unit', 149.99, 'In Stock', 'toughpowerGF1.jpg', 1),
('EVGA SuperNOVA 1000 G3', 'Premium power supply unit', 249.99, 'In Stock', 'supernova1000G3.jpg', 1),
('Logitech G Pro X Superlight', 'Lightweight gaming mouse', 149.99, 'In Stock', 'gProXSuperlight.jpg', 1),
('SteelSeries Aerox 3 Wireless', 'Lightweight wireless mouse', 99.99, 'In Stock', 'aerox3Wireless.jpg', 1),
('HyperX Cloud Alpha Wireless', 'Comfortable wireless gaming headset', 199.99, 'In Stock', 'cloudAlphaWireless.jpg', 1),
('SteelSeries Arctis Pro Wireless', 'Premium wireless gaming headset', 349.99, 'In Stock', 'arctisProWireless.jpg', 1),
('Razer Viper Ultimate', 'Fast and accurate wireless gaming mouse', 149.99, 'In Stock', 'viperUltimate.jpg', 1),
('Logitech G Pro X Keyboard', 'Mechanical gaming keyboard', 149.99, 'In Stock', 'gProXKeyboard.jpg', 1),
('Keychron K10', 'Tenkeyless mechanical keyboard', 99.99, 'In Stock', 'keychronK10.jpg', 1),
('ASUS ROG Strix XG32UQ', 'High-refresh-rate gaming monitor', 1299.99, 'In Stock', 'strixXG32UQ.jpg', 1),
('Samsung Odyssey Neo G8', 'Mini-LED gaming monitor with high refresh rate', 999.99, 'In Stock', 'odysseyNeoG8.jpg', 1),
('BenQ EW3280U', '4K monitor for content creation', 799.99, 'In Stock', 'ew3280U.jpg', 1);