-- Deploy omedocs:tables-01 to pg

-- Création des tables SQL
BEGIN;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_type TEXT NOT NULL,
    establishment TEXT NOT NULL,
    rpps TEXT NULL, 
    finess TEXT NULL, 
    adeli TEXT NULL, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL, 
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    zip_code TEXT NOT NULL
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    quantity TEXT NOT NULL, 
    unit_price TEXT NOT NULL, 
    cis_code TEXT NOT NULL,
    -- clé étrangère
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE "order" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number TEXT NOT NULL, 
    status TEXT NOT NULL,
    date TIMESTAMPTZ,
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE notification (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL, 
    -- date incluant le fuseau horaire
    date TIMESTAMPTZ,
    order_id INT REFERENCES "order"(id),
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE product_has_order (
    product_id INT REFERENCES product(id),
    order_id INT REFERENCES "order"(id)
);

COMMIT;
