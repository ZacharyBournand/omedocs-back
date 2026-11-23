// Récupère la libraire Stripe qui permet d'accéder à son API et récupère la clé liée à notre compte
const stripe = process.env.STRIPE_SECRET_KEY
    ? require('stripe')(process.env.STRIPE_SECRET_KEY)
    : null;
// Récupère le package "uuid" qui permet de créer un identifiant unique universel
const { v4: uuidv4 } = require('uuid');

// On export notre fonction
module.exports = {
    // On renvoit la clé publique Stripe au front (ou un statut OK si non configurée)
    // Comme on n'utilise pas le paramètre "request", on peut le remplacer par "_"
    sendStripeKey (_, response) {
        if (process.env.STRIPE_PUBLISHABLE_KEY) {
            return response.send(process.env.STRIPE_PUBLISHABLE_KEY);
        }
        return response.status(200).json({ status: 'ok' });
    },

    // Initialise l'instance de paiement
    async initializePaymentInstance (request, response) {
        if (!stripe) {
            return response.status(503).json({ status: 'failure', error: 'Stripe is not configured' });
        }
        console.log('Request:', request.body);
        // On initialise ces deux variables au cas où on les utilise pour afficher une erreur et/ou un statut (succès ou pas)
        let error;
        let status;
        
        try {
            // Récupère les infos du médicament acheté et du token
            const { product, token } = request.body;
            // Crée un nouvel objet "customers" contenant les infos des clients qui ont fait cette requête et les stocke dans Stripe
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id,
            });
            // Donne la valeur unique à la clé d'idempotence (générée par le client) que le serveur utilise pour reconnaître des 
            // nouvelles tentatives de la même requête
            const idempotency_key = uuidv4();
            // Crée un nouvel objet "charges" contenant les infos de la facture
            const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: 'eur',
                customer: customer.id,
                receipt_email: token.email,
                description: `Acheter ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    },
                },
            },
            {   // Appelle la clé d'idempotence
                idempotency_key,
            });
            console.log('Charge:', { charge });
            status = 'success';
        }
        // S'il y a une erreur au niveau du serveur, on renvoit un statut d'échouement avec l'erreur
        catch (err) {
            console.error('Error:', err);
            error = err.message;
            status = 'failure';
        }
        // Renvoit en réponse l'état de la requête sous format JSON
        response.json({ error, status });
    }
}
