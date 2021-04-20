const client = require('./client'); 

module.exports = {
    async insertUser(userType, establishment, rpps, finess, adeli, email, hashedPassword, phoneNumber, address, city, region, zipCode) {
        const result = await client.query(`
            INSERT INTO "user" (userType, establishment, rpps, finess, adeli, email, password, phoneNumber, address, city, region, zipCode)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [userType, establishment, rpps, finess, adeli, email, hashedPassword, phoneNumber, address, city, region, zipCode]
        );

        return result.rows;
    },

    async findUserByEmail(email) {
        const result = await client.query(`
            SELECT *
            FROM "user"
            WHERE email=$1`,
            [email]
        );

        return result.rows;
    },
}
