CREATE DATABASE electrondb;

USE electrondb;

CREATE TABLE product(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(7,3) NOT NULL
);


insert into electrondb.product(name, description, price)
values('Leche', 'oferta 2x1', 5)

insert into electrondb.product(name, description, price)
values('Yogurt', 'Yogurt Lite', 2.5)


DESCRIBE product;

-- to change decimal range value
-- ALTER TABLE 'price' CHANGE COLUMN 'price' DECIMAL(8,2)