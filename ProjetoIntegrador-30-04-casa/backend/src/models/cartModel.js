// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartModel.js
// -- Acessa o banco -> executa queries SQL -> retorna dados
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const cartModel = {

    // Procurando o id do carrinho
    async findCartId(cart_id) {
        const result = await database.query(
            "SELECT * FROM cart WHERE id = $1",
            [cart_id]
        );

        return result.rows[0];
    },

    // Busca todos os itens do carrinho do user logado
    // Pega itens do cart, junta com product e filtra pelo user
    async getByUser(user_id) {
        const result = await database.query(
            `SELECT 
                c.id,
                c.quantity,
                p.id as product_id,
                p.name,
                p.price
             FROM cart c
             JOIN product p ON p.id = c.product_id
             WHERE c.user_id = $1`,
            [user_id]   
        );

        // Retornando todos os registros
        return result.rows;
    },

    // Procura usuário e produto do carrinho
    async findByUserAndProduct(user_id, product_id) {
        const result = await database.query(
            `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`,
            [user_id, product_id]
        );

        // Retorna o primeiro registro
        return result.rows[0];
    },

    // Insere um novo item no carrinho
    async create({ user_id, product_id, quantity }) {
        const result = await database.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [user_id, product_id, quantity]
        );

        // Retorna o registro criado
        return result.rows[0];
    },

    // Atualiza a quantidade de um item
    async updateQuantity(id, quantity) {
        const result = await database.query(
            `UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *`,
            [quantity, id]
        );

        // Retorna o primeiro registro
        return result.rows[0];
    },

    // Apaga um item do carrinho pelo id
    async delete(id) {
        await database.query(
            `DELETE FROM cart WHERE id = $1`,
            [id]
        );
    },

    // Limpa o carrinho todo
    async clear(user_id) {
        await database.query(
            `DELETE FROM cart WHERE user_id = $1`,
            [user_id]
        );
    },

};