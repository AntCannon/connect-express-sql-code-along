DROP DATABASE IF EXISTS colors_prod_hsqj;
CREATE DATABASE colors_prod_hsqj;

\c colors_prod_hsqj;

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_favorite BOOLEAN
);