// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryModel.js
// -- Acessa o banco -> executa queries SQL -> retorna dados
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const categoryModel = {

    // Criando uma categoria
    async create(category) {
        const { name } = category;
        
        const query = `
            INSERT INTO category (name)
            VALUES ($1)
            RETURNING *
        `;

        const value = [name];

        const result = await database.query(query, value);

        return result.rows[0];
    },

    // Retornando todas as categorias
    async findAll() {
        const result = await database.query(
            "SELECT * FROM category"
        );

        return result.rows;
    },

    // Procurando categoria pelo id
    async findById(id) {
        const result = await database.query(
            "SELECT * FROM category WHERE id = $1",
            [id]
        );

        // Retornando um único registro
        return result.rows[0];
    },

    // Procurando categoria pelo nome
    async findByName(name) {
        const result = await database.query(
            "SELECT * FROM category WHERE name = $1",
            [name]
        );

        // Retornando um único registro
        return result.rows[0];
    },

    // Atualizando o nome da categoria
    async updateCategoryName(id, name) {
        const result = await database.query(
            "UPDATE category SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        return result.rows[0];
    },

    // Deletando categoria pelo id
    async deleteById(id) {
        const result = await database.query(
            "DELETE FROM category WHERE id = $1 RETURNING *",
            [id]
        );

        // Retornando um único registro
        return result.rows[0];
    }

};