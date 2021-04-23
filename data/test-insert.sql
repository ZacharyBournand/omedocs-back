-- Insère des données dans les tables créées

BEGIN;

INSERT INTO "user" (user_type, establishment, rpps, finess, adeli, email, password, phone_number, address, city, region, zip_code)
VALUES 
('seller', 'Pharmacie de St. Louis', '12345678901', null, null, 'pharmaducoin@gmail.com', 'password123', '0633432313', '2 Rue des clochers', 
    'St. Louis', 'Aquitaine', '33240'),
('seller', 'Pharmacie de Wakanda', '23456789012', null, null, 'pharmaWakanda@gmail.com', 'password234', '0644543424', '3 Rue des Surnaturels', 
    'Forever', 'Normandie', '14123'),
('seller', 'Pharmacie de Ceci', null, '234567890', null, 'pharmaCeci@gmail.com', 'password345', '0644543425', '3 Rue de Ceci', 
    'Ceci', 'Occitanie', '31500'),
('seller', 'Pharmacie de Ceci', null, null, '914567890', 'pharmaCela@gmail.com', 'password456', '0644543426', '12 Rue de Cela', 
    'Cela', 'Ile-de-France', '91230'),

('buyer', 'Hôpital de Wakanda', '33456789012', null, null, 'hôpiWakanda@gmail.com', 'password567', '0654543424', '5 Rue des Surnaturels', 
    'Forever', 'Normandie', '14143'),
('buyer', 'Hôpital de Ceci', null, '334567890', null, 'hôpiCeci@gmail.com', 'password678', '0654543428', '7 Rue de Ceci', 
    'Ceci', 'Occitanie', '31550'),
('buyer', 'Hôpital de Ceci', null, null, '914567895', 'hôpiCela@gmail.com', 'password789', '0654543429', '16 Rue de Cela', 
    'Cela', 'Ile-de-France', '91240');


INSERT INTO product (name, expiration_date, number_of_boxes, quantity_in_box, mass, volume, unit_price, composition, dosage_form, 
                    cis_code, user_id)
VALUES 
('doliprane', '13/06/2021', '3', '8', '100 mg', null, '2.18', 'acide citrique anhydre, mannitol, saccharine sodique', 'comprimé', 
    '64793681', 1),
('efferalgan', '18/07/2021', '5', '16', '500 mg', null, '3.29', 'hydroxypropylcellulose, croscarmellose sodique, béhénate de glycérol', 
    'granulés en sachet', '61128406', 1),

('doliprane', '23/06/2021', '6', '7', '100 mg', null, '2.18', 'acide citrique anhydre, mannitol, saccharine sodique', 
    'poudre pour solution buvable en sachet', '6479397', 2),
('efferalgan', '28/07/2021', '3', '7', '500 mg', null, '3.29', 'hydroxypropylcellulose, croscarmellose sodique, béhénate de glycérol', 
    'comprimé', '61128680', 2),

('eludril', '23/08/2021', '8', null, null, '500 ml', '6.43', 'Chlorhexidine gluconate solution, Chlorobutanol hémihydrate, Lévomenthol', 
    'solution liquide', '64793974', 3),
('spafson', '29/04/2021', '3', '30', '160 mg', null, '3.16', 'actose monohydraté, saccharose, acétate de polyvinyle', 'comprimé', 
    '34009318', 3),

('voltarène', '23/07/2021', '4', '30', '50 mg', null, '2.86', 'saccharose, alcool cétylique, silice colloïdale anhydre', 'comprimé', 
    '65215068', 4),
('spafson', '29/05/2021', '1', '30', '160 mg', null, '3.16', 'actose monohydraté, saccharose, acétate de polyvinyle', 'comprimé', 
    '34009318', 4);


INSERT INTO "order" (order_number, status, user_id)
VALUES 
('65789546', 'Expédié', 5),
('65789547', 'En cours de livraison', 6),
('65789548', 'livré demain', 7);


INSERT INTO notification (message, order_id, user_id)
VALUES 
('Bonjour, voici la commande de votre acheteur: ', 1, 1),
('Bonjour, voici la commande de votre acheteur: ', 2, 2),
('Bonjour, voici la commande de votre acheteur: ', 3, 3);


INSERT INTO product_has_order
VALUES 
( 1, 1),
( 2, 1),
( 3, 2),
( 4, 2),
( 5, 3),
( 6, 3);

COMMIT;