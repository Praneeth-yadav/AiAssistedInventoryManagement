use Inventory;

CREATE TABLE `usercredentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ;

CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(45) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `imglocation` varchar(500) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `addedBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `item_UNIQUE` (`item`)
) ;

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locationName VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zipcode VARCHAR(20) NOT NULL,
    createdDate DATE NOT NULL,
    addedBy VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    billing_name VARCHAR(255) NOT NULL,
    billing_address TEXT NOT NULL,
    billing_city VARCHAR(100) NOT NULL,
    billing_state VARCHAR(100) NOT NULL,
    billing_zip VARCHAR(20) NOT NULL,
    billing_country VARCHAR(100) NOT NULL,
    card_number VARCHAR(20) NOT NULL,
    expiration_date VARCHAR(7) NOT NULL, -- Format MM/YY
    cvv VARCHAR(4) NOT NULL,
    status ENUM('Pending', 'Completed', 'Cancelled', 'Refund', 'Replace', 'Escalate to Human Agent') DEFAULT 'Pending',
    billing_status ENUM('Pending', 'Paid', 'Declined', 'Refund', 'Escalate to Human Agent') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES usercredentials(user_id) -- Updated to reference usercredentials table
);
ALTER TABLE orders ADD COLUMN username VARCHAR(255);


ALTER TABLE orders MODIFY user_id INT NULL;