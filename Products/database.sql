-- CREATE DATABASE SDCproducts;


DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS products;

CREATE TABLE products (

id INT UNIQUE NOT NULL,
name VARCHAR(255) NOT NULL,
slogan VARCHAR NOT NULL,
description VARCHAR NOT NULL,
category VARCHAR(255) NOT NULL,
default_price VARCHAR(255) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE features(
id INT UNIQUE NOT NULL,
feature VARCHAR(255),
value VARCHAR(255),
product_id INT NOT NULL,
FOREIGN KEY (product_id) REFERENCES products (id),
PRIMARY KEY (id)

);


CREATE TABLE styles(

id INT UNIQUE NOT NULL,
name VARCHAR(255) NOT NULL,
sale_price VARCHAR(255),
original_price VARCHAR(255),
default_style BIT,
productId INT,
FOREIGN KEY (productId) REFERENCES products (id),
PRIMARY KEY (id)
);


CREATE TABLE photos (
id INT UNIQUE NOT NULL,
url VARCHAR NOT NULL,
thumbnail_url VARCHAR NOT NULL,
styleId INT NOT NULL,
FOREIGN KEY (styleId) REFERENCES styles (id),
PRIMARY KEY (id)
);


CREATE TABLE skus (
id INT UNIQUE NOT NULL,
size VARCHAR(25) NOT NULL,
quantity INT NOT NULL,
styleId INT,
FOREIGN KEY (styleId) REFERENCES styles (id),
PRIMARY KEY (id)
);

CREATE TABLE related (
id INT UNIQUE NOT NULL,
current_product_id INT NOT NULL,
related_product_id INT NOT NULL,
FOREIGN KEY (current_product_id) REFERENCES products (id),
PRIMARY KEY (id)
);

-- Adds products.csv to DATABASE
\COPY products(id, name, slogan, description, category, default_price) FROM '/var/lib/postgresql/csvData/products.csv' DELIMITER ',' CSV HEADER

-- Adds styles.csv to DATABASE
\COPY styles(id, productId, name, sale_price, original_price, default_style) FROM '/var/lib/postgresql/csvData/styles.csv' DELIMITER ',' CSV HEADER

-- Adds features.csv to DATABASE
\COPY features(id, product_id, feature, value) FROM '/var/lib/postgresql/csvData/features.csv' DELIMITER ',' CSV HEADER

-- Adds photos.csv to DATABASE
\COPY photos(id, styleId, url, thumbnail_url) FROM '/var/lib/postgresql/csvData/photos.csv' DELIMITER ',' CSV HEADER

-- Adds skus.csv to DATABASE
\COPY skus(id, styleId, size, quantity) FROM '/var/lib/postgresql/csvData/skus.csv' DELIMITER ',' CSV HEADER

-- Adds related.csv to DATABASE
\COPY related(id, current_product_id, related_product_id) FROM '/var/lib/postgresql/csvData/related.csv' DELIMITER ',' CSV HEADER


-- Builds index of stuff

CREATE INDEX idx_photos_styleId
ON photos(styleId);

CREATE INDEX idx_skus_styleId
ON skus(styleId);

CREATE INDEX idx_styles_productId
ON styles(productId);

CREATE INDEX idx_related_related_product_id
ON related(related_product_id);