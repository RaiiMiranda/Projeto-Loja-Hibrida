// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productModel.js
// -- Queries SQL
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const productModel = {

    // Criando um produto
    async create(product) {
        const { name, brand, condition, description, price, available, category_id } = product;
        
        const query = `
            INSERT INTO product (name, brand, condition, description, price, available, category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

        const values = [name, brand, condition, description, price, available, category_id];

        const result = await database.query(query, values);

        return result.rows[0];
    },

    // Retornando todos os produtos
    async findAll() {
        const result = await database.query(
            "SELECT * FROM product"
        );

        return result.rows;
    },

    // Procurando produto pelo id
    async findById(id) {
        const result = await database.query(
            "SELECT * FROM product WHERE id = $1",
            [id]
        );

        // Retornando um único registro
        return result.rows[0];
    },

    // Procurando produto pelo id
    async findByName(name) {
        const result = await database.query(
            "SELECT * FROM product WHERE name = $1",
            [name]
        );

        // Retornando um único registro
        return result.rows[0];
    }

};