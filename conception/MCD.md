
PRODUIT: nom du produit, date de péremption, nombre de boîtes, quantité dans une boîte, masse, volume, prix unitaire, composition, forme pharmaceutique, code CIS
:

appartient, 11 UTILISATEUR, 0N PRODUIT

:
UTILISATEUR: type d'utilisateur, organisme, RPPS, FINESS, ADELI, email, mot de passe, numéro de téléphone, adresse, ville, région, code postal

passe, 0N COMMANDE, 11 UTILISATEUR

inclus, 0N PRODUIT, 1N COMMANDE
:
COMMANDE: numéro de commande, statut, date
:
initie, 11 NOTIFICATION, 11 COMMANDE
:
NOTIFICATION: message, date
:
envoyée, 0N NOTIFICATION, 11 UTILISATEUR
