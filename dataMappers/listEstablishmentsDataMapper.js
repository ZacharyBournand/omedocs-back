// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données de l'/des organisme(s)
    async findEstablishments(value, region) {
        // Si la région envoyée par le front a pour valeur "Toutes les régions",
        // on change sa valeur à un sting vide pour renvoyer les organismes de chaque région
        if (region === 'Toutes les régions') {
            region = ""
        };

        // L'opérateur SQL "ILIKE" permet de rechercher une chaîne de caractères en tapant seulement une partie de la chaîne
        // et ne fait pas de distinction entre majuscules et minuscules
        const result = await client.query(`
            SELECT *
                FROM "user"
            WHERE establishment ILIKE $1
                AND region ILIKE $2`,
            // Le symbole "%" en SQL contient la partie de la chaîne de caractères qui n'a pas été tapée.
            // Si le symbole est mis après la variable (comme ici), elle proposera la suite de la chaîne qu'après 
            // avoir tapé le début de la chaîne.
            [`${value}%`,`${region}%` ]
        );

        // Renvoit ces données 
        return result.rows;
    },
}

