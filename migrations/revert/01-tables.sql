-- Revert omedocs:tables-01 from pg

-- Supprime les tables 
BEGIN;

DROP TABLE "user", product, "order", notification, product_has_order;

COMMIT;
