// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productModel.js
// -- Acessa o banco -> execute queries SQL -> retorna dados
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const productModel = {

    // Criando um produto
    async create(product) {
        const { name, brand, condition, state, state_message, description, price, available, category_id } = product;
        
        const query = `
            INSERT INTO product (name, brand, condition, state, state_message, description, price, available, category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

        const values = [name, brand, condition, state, state_message, description, price, available, category_id];

        const result = await database.query(query, values);

        return result.rows[0];
    },

    // Retornando todos os produtos disponíveis
    async findAll() {
        // LEFT JOIN: apresenta os produtos mesmo que eles não tenham imagens
        // LATERAL: executa a subquery para cada linha de produto (p.id)
        // LIMIT 1: se tiverem várias imagens mostrará apenas uma, sem duplicar
        const result = await database.query(`
            SELECT 
                p.*,
                c.name AS category_name,
                pi.url AS image_url
            FROM product p  

            JOIN category c ON c.id = p.category_id

            LEFT JOIN LATERAL (
                SELECT url
                FROM product_image
                WHERE product_id = p.id
                LIMIT 1
            ) pi ON true

            WHERE p.available = true
        `);

        return result.rows;
    },

    // Procurando produto pelo id
    async findById(id) {
        const result = await database.query(`
            SELECT 
                p.*,
                pi.url AS image_url
            FROM product p

            LEFT JOIN LATERAL (
                SELECT url
                FROM product_image
                WHERE product_id = p.id
                LIMIT 1
            ) pi ON true

            WHERE p.id = $1
            LIMIT 1`,
            [id]
        );

        return result.rows[0];
    },

    // Procurando produtos vinculados a uma categoria
    async findCategoryId(id) {
        const result = await database.query(`
            SELECT 
                p.*,
                pi.url AS image_url
            FROM product p

            LEFT JOIN LATERAL (
                SELECT url
                FROM product_image
                WHERE product_id = p.id
                LIMIT 1
            ) pi ON true

            WHERE p.category_id = $1 AND p.available = true`, 
            [id]
        );

        return result.rows;
    },

    // Desativando produto pelo id
    async deleteById(id) {
        const result = await database.query(`
            UPDATE product
            SET available = false
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        return result.rows[0];
    },

    // Atualizando os campos do produto
    async updateProductById(id, data) {
        const { name, brand, condition, state, state_message, description, price, available, category_id } = data;

        const result = await database.query(`
            UPDATE product SET 
                name = $1,
                brand = $2,
                condition = $3,
                state = $4,
                state_message = $5,
                description = $6,
                price = $7,
                category_id = $8
            WHERE id = $9
            RETURNING *`,
            [name, brand, condition, state, state_message, description, price, category_id, id]
        );

        return result.rows[0];
    },

};