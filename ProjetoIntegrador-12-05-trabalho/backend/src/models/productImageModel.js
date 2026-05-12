// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productImageUpload.js
// -- Acessa o banco -> execute queries SQL -> retorna dados
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const productImageModel = {

    async create(url, product_id) {

        const result = await database.query(`
            INSERT INTO product_image (url, product_id)
            VALUES ($1, $2)
            RETURNING *`,
            [url, product_id]
        );

        return result.rows[0];
    },

    async findByProduct(product_id) {
        const result = await database.query(`
            SELECT *
            FROM product_image
            WHERE product_id = $1`,
            [product_id]
        );

        return result.rows;
    },

    async deleteById(id) {
        const result = await database.query(`
            DELETE FROM product_image
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        return result.rows[0];
    }

};