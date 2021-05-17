-- Deploy omedocs:05-alter-table-order to pg

BEGIN;

-- Supprime la table "order" et la contrainte des clés étrangères 
DROP TABLE "order" CASCADE;

-- Crée une nouvelle table "order" avec des nouveaux champs et d'autres modifiés
CREATE TABLE "order" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number TEXT NOT NULL, 
    total_cost TEXT NOT NULL,
    status TEXT DEFAULT 'payé',
    date TIMESTAMPTZ DEFAULT NOW(),
    buyer_id INT REFERENCES "user"(id),
    seller_id INT REFERENCES "user"(id)
);

ALTER TABLE "order"
    ALTER date   
        SET DEFAULT NOW();

COMMIT;