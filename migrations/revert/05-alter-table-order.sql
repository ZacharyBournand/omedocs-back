-- Revert omedocs:05-alter-table-order from pg

BEGIN;

-- Supprime la table "order" et la contrainte des clés étrangères 
DROP TABLE "order" CASCADE;

-- Crée la table "order" originale
CREATE TABLE "order" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number TEXT NOT NULL, 
    status TEXT NOT NULL,
    date TIMESTAMPTZ,
    user_id INT REFERENCES "user"(id)
);

COMMIT;