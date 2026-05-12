// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: orderModel.js
// -- Acessa o banco -> execute queries SQL -> retorna dados
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import database from "../config/database.js";

/*

id BIGSERIAL PRIMARY KEY,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
channel order_channel DEFAULT 'ONLINE' NOT NULL,
status order_status DEFAULT 'PENDENTE' NOT NULL,
total_value DECIMAL(15,2) NOT NULL,
user_id BIGINT NOT NULL,
address_id BIGINT, -- se o cliente estiver presencial, ele não será obrigado a cadastrar seu endereço
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (address_id) REFERENCES address(id)

*/

export const orderModel = {

    // Criando um pedido
    async create(order) {
        const { created_at, status, total_value, user_id, address_id } = order;
        
        const query = `
            INSERT INTO order_client (created_at, status, total_value, user_id, address_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [created_at, status, total_value, user_id, address_id];

        const result = await database.query(query, values);

        return result.rows[0];
    },

    async getById(id) {
        const query = `
            SELECT 
                o.id as order_id,
                oi.quantity,
                p.name,
                p.price,
                p.image_url
            FROM order_client o
            JOIN order_items oi ON oi.order_id = o.id
            JOIN product p ON p.id = oi.product_id
            WHERE o.id = $1
        `;

        const result = await database.query(query, [id]);

        return result.rows;
    }

};