// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productModel.js
// -- Acessa o banco -> execute queries SQL -> retorna dados
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
        // Fazendo LEFT JOIN para juntar produto e imagem do produto
        const result = await database.query(`
            SELECT 
                p.*,
                pi.url AS image_url
            FROM product p
            LEFT JOIN product_image pi 
                ON pi.product_id = p.id
        `);

        return result.rows;
    },

    // Procurando produto pelo id
    async findById(id) {
        // Fazendo LEFT JOIN para juntar produto e imagem do produto
        const result = await database.query(`
            SELECT 
                p.*,
                pi.url AS image_url
            FROM product p
            LEFT JOIN product_image pi 
                ON pi.product_id = p.id
            WHERE p.id = $1
            LIMIT 1
        `, [id]);

        return result.rows[0];
    },

    /* Procurando produto pelo nome
    async findByName(name) {
        const result = await database.query(
            "SELECT * FROM product WHERE name = $1",
            [name]
        );

        // Retornando um único registro
        return result.rows[0];
    },*/

    // Procurando produtos vinculados a uma categoria
    async findCategoryId(id) {
        const result = await database.query(`
            SELECT 
                p.*,
                pi.url AS image_url
            FROM product p
            LEFT JOIN product_image pi 
                ON pi.product_id = p.id
            WHERE p.category_id = $1
        `, [id]);

        return result.rows;
    },

    // Deletando produto pelo id
    async deleteById(id) {
        const result = await database.query(
            "DELETE FROM product WHERE id = $1 RETURNING *",
            [id]
        );
    },

    /* Atualizando os campos do produto
    async updateProduct(id, dados) {
        const result = await database.query(
            "UPDATE product SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        //campos que podem ser atualizados: name, brand, condition, description, price, available, category_id

        return result;
    },*/

};