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

INSERT INTO Customer (Name, Role, Address, Email, Password, AdminID)
VALUES
('Alice Johnson', 'Customer', '123 Main St', 'alice@example.com', 'password123', 1),
('Bob Smith', 'Customer', '456 Elm St', 'bob@example.com', 'password456', 1),
('Charlie Brown', 'Customer', '789 Oak St', 'charlie@example.com', 'password789', 1),
('David Lee', 'Customer', '101 Pine St', 'david@example.com', 'password101', 1),
('Emily Wilson', 'Customer', '202 Cedar St', 'emily@example.com', 'password202', 1),
('Frank Green', 'Customer', '303 Maple St', 'frank@example.com', 'password303', 1),
('Grace Miller', 'Customer', '404 Birch St', 'grace@example.com', 'password404', 1),
('Henry Davis', 'Customer', '505 Walnut St', 'henry@example.com', 'password505', 1),
('Isabella Clark', 'Customer', '606 Willow St', 'isabella@example.com', 'password606', 1),
('Jack White', 'Customer', '707 Spruce St', 'jack@example.com', 'password707', 1),
('Karen Black', 'Customer', '808 Ash St', 'karen@example.com', 'password808', 1),
('Larry Brown', 'Customer', '909 Fir St', 'larry@example.com', 'password909', 1),
('Michelle Green', 'Customer', '1010 Pine St', 'michelle@example.com', 'password1010', 1),
('Nathan Davis', 'Customer', '1111 Cedar St', 'nathan@example.com', 'password1111', 1),
('Olivia Clark', 'Customer', '1212 Maple St', 'olivia@example.com', 'password1212', 1),
('Peter White', 'Customer', '1313 Birch St', 'peter@example.com', 'password1313', 1),
('Quinn Black', 'Customer', '1414 Walnut St', 'quinn@example.com', 'password1414', 1),
('Riley Brown', 'Customer', '1515 Willow St', 'riley@example.com', 'password1515', 1),
('Sophia Green', 'Customer', '1616 Spruce St', 'sophia@example.com', 'password1616', 1),
('Thomas Davis', 'Customer', '1717 Ash St', 'thomas@example.com', 'password1717', 1),
('Uma Clark', 'Customer', '1818 Fir St', 'uma@example.com', 'password1818', 1),
('Victor White', 'Customer', '1919 Pine St', 'victor@example.com', 'password1919', 1),
('Wendy Black', 'Customer', '2020 Cedar St', 'wendy@example.com', 'password2020', 1),
('Xavier Brown', 'Customer', '2121 Maple St', 'xavier@example.com', 'password2121', 1),
('Yolanda Green', 'Customer', '2222 Birch St', 'yolanda@example.com', 'password2222', 1),
('Zachary Davis', 'Customer', '2323 Walnut St', 'zachary@example.com', 'password2323', 1),
('Abby Clark', 'Customer', '2424 Willow St', 'abby@example.com', 'password2424', 1),
('Ben White', 'Customer', '2525 Spruce St', 'ben@example.com', 'password2525', 1),
('Chloe Black', 'Customer', '2626 Ash St', 'chloe@example.com', 'password2626', 1),
('Daniel Brown', 'Customer', '2727 Fir St', 'daniel@example.com', 'password2727', 1),
('Ella Green', 'Customer', '2828 Pine St', 'ella@example.com', 'password2828', 1),
('Finn Davis', 'Customer', '2929 Cedar St', 'finn@example.com', 'password2929', 1),
('Georgia Clark', 'Customer', '3030 Maple St', 'georgia@example.com', 'password3030', 1),
('Harry White', 'Customer', '3131 Birch St', 'harry@example.com', 'password3131', 1),
('Isabella Black', 'Customer', '3232 Walnut St', 'isabella@example.com', 'password3232', 1),
('Jack Brown', 'Customer', '3333 Willow St', 'jack@example.com', 'password3333', 1),
('Karen Green', 'Customer', '3434 Spruce St', 'karen@example.com', 'password3434', 1),
('Liam Davis', 'Customer', '3535 Ash St', 'liam@example.com', 'password3535', 1),
('Mia Clark', 'Customer', '3636 Fir St', 'mia@example.com', 'password3636', 1),
('Noah White', 'Customer', '3737 Pine St', 'noah@example.com', 'password3737', 1),
('Olivia Black', 'Customer', '3838 Cedar St', 'olivia@example.com', 'password3838', 1),
('Penelope Brown', 'Customer', '3939 Maple St', 'penelope@example.com', 'password3939', 1),
('Quinn Green', 'Customer', '4040 Birch St', 'quinn@example.com', 'password4040', 1),
('Riley Davis', 'Customer', '4141 Walnut St', 'riley@example.com', 'password4141', 1);