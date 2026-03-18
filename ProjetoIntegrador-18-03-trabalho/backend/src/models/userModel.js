// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userModel.js
// -- Queries SQL
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

export const userModel = {

    // async/await
    // async permite rodar códigos que demoram sem travar a aplicação, usando await para esperar concluir a ação

    // Criando um usuário
    async create(user) {
        const { is_admin, name, email, password, cpf, phone } = user;

        const query = `
            INSERT INTO users (name, email, password, cpf, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [name, email, password, cpf, phone];

        // Esperando o banco retornar o resultado (await) para continuar o código
        const result = await database.query(query, values);

        // Retornando um único registro
        return result.rows[0];
    },

    // Retornando todos os usuários
    async findAll() {
        const result = await database.query(
            "SELECT * FROM users ORDER BY name ASC"
        );

        // Retornando todos os registros
        return result.rows;
    },

    // Procurando usuário pelo email
    async findByEmail(email) {
        const result = await database.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // Retornando um único registro
        return result.rows[0];
    },

    // Procurando usuário pelo id 
    async findById(id) {
        const result = await database.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        // Retornando um único registro
        return result.rows[0];
    },

    // Atualizando o campo 'active' do usuário
    async updateActive(id, active) {
        const result = await database.query(
            "UPDATE users SET active = $1 WHERE id = $2",
            [active, id]
        );

        return result;
    }

};