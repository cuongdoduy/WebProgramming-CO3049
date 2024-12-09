-- DROP DATABASE IF EXISTS shopping;

-- CREATE DATABASE shopping;
-- USE shopping;
-- Table for Customer
CREATE TABLE `Customer` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(255),
    `address` NVARCHAR(255),
    `email` NVARCHAR(255),
    `password` NVARCHAR(255),
    `admin_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Product
CREATE TABLE `Product` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `price` DOUBLE,
    `status` NVARCHAR(255),
    `admin_id` INT,
    `slug` NVARCHAR(80),
    `product_name` NVARCHAR(255),
    `discount` INT,
    `description` TEXT,
    `category_id` INT,
    `cover` NVARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Comment
CREATE TABLE `Comment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT,
    `product_id` INT,
    `date` DATETIME,
    `content` NVARCHAR(1000),
    `image` NVARCHAR(255),
    `star` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Cart
CREATE TABLE `Cart` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Admin
CREATE TABLE `Admin` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    `role` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Order
CREATE TABLE `Order` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Transaction
CREATE TABLE `Transaction` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `status` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Cart Items
CREATE TABLE `Cart_item` (
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT,
    PRIMARY KEY (`cart_id`, `product_id`)
);

-- Table for Order Items
CREATE TABLE `Order_item` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `quantity` INT,
    `product_id` INT
);

CREATE TABLE `Tag_item` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `tag_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Wishlist
CREATE TABLE `Wishlist` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Categories
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Tags
CREATE TABLE `Tags` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` VARCHAR(255),
    `start_date` DATE,
    `end_date` DATE,
    `status` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Product SKUs
CREATE TABLE `products_skus` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `size_attribute_id` INT,
    `color_attribute_id` INT,
    `quantity` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Product Attributes
CREATE TABLE `product_attributes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `type` ENUM('color', 'size'),
    `value` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Table for Product Images
CREATE TABLE `product_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Foreign Key Constraints
ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `products_skus` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `products_skus` ADD FOREIGN KEY (`color_attribute_id`) REFERENCES `product_attributes` (`id`);
ALTER TABLE `products_skus` ADD FOREIGN KEY (`size_attribute_id`) REFERENCES `product_attributes` (`id`);
ALTER TABLE `Order_item` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);
ALTER TABLE `Product` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
ALTER TABLE `Product` ADD FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`id`);
ALTER TABLE `Comment` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `Comment` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`id`) ON DELETE CASCADE;
ALTER TABLE `Order` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`id`) ON DELETE CASCADE;
ALTER TABLE `Transaction` ADD FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE;
ALTER TABLE `Cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`) ON DELETE CASCADE;
ALTER TABLE `Cart_item` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `Order_item` ADD FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE;
ALTER TABLE `Wishlist` ADD FOREIGN KEY (`user_id`) REFERENCES `Customer` (`id`) ON DELETE CASCADE;
ALTER TABLE `Wishlist` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `Tag_item` ADD FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE;
ALTER TABLE `Tag_item` ADD FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`) ON DELETE CASCADE;

ALTER TABLE `Order`
ADD `first_name` VARCHAR(100) NOT NULL,
ADD `last_name` VARCHAR(100) NOT NULL,
ADD `street_address` VARCHAR(255) NOT NULL,
ADD `apartment_floor` VARCHAR(255) NULL,
ADD `town_city` VARCHAR(100) NOT NULL,
ADD `phone_number` VARCHAR(20) NOT NULL,
ADD `email_address` VARCHAR(255) NOT NULL,
ADD `status` VARCHAR(50) NOT NULL DEFAULT 'pending';


