// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

/*

CREATE TABLE cart (
	id BIGSERIAL PRIMARY KEY, 
	quantity INT NOT NULL,
	product_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, product_id)
);

um cliente pode adicionar vários produtos
não gera reserva de estoque
cada produto tem quantidade
o carrinho pertence a um único cliente
ao finalizar a compra:
	gera um pedido
	itens do carrinho viram order_item
	pode ser limpo

se produto ja existe no carrinho
entao soma + 1 e atualiza o preço total

se produto nao existe
cria um novo item nela

add    -> adiciona novo item, se nao estiver já no carrinho (se ja estiver incrementa a quantidade dele)
remove -> remove um item existente do carrinho

*/

import { cartModel } from "../models/cartModel.js";
import database from "../config/database.js";

export const cartService = {

    async getCartItems(user_id) {
        return await cartModel.getByUser(user_id);
    },

    async addToCart(user_id, product_id, quantity) {
        const existing = await cartModel.findByUserAndProduct(user_id, product_id);

		// Se já existe o produto no carrinho, então atualiza a quantidade dele
        if (existing) {
            return await cartModel.updateQuantity(
                existing.id,
                existing.quantity + quantity
            );
        }

		// Se não existe então adiciona o produto no carrinho
        return await cartModel.create({
            user_id: user_id,
            product_id: product_id,
            quantity
        });
    },

    async updateQuantity(cart_id, quantity) {
        const existing = await cartModel.findCartId(cart_id);

		// Se o carrinho não existe, então não atualiza nada
		if (!existing) {
			throw new Error("Carrinho não encontrado.");
		}
		
		// Se o carrinho existe
		// Se atualizar a quantidade para 0 ou menos, então deleta ele do carrinho
		if (quantity <= 0) {
            return await cartModel.delete(cart_id);
        }

		// Se atualizar a quantidade para maior que 0, então atualiza a quantidade
        return await cartModel.updateQuantity(cart_id, quantity);
    },

    async removeItem(cart_id) {
        return await cartModel.delete(cart_id);
    },

    async clearCart(user_id) {
        return await cartModel.clear(user_id);
    },

	async checkout(user_id) {
        
		/*
		
		pegar itens do carrinho
		validar se não está vazio
		calcular total
		criar pedido (order_client)
		criar itens (order_item)
		criar pagamento (payment)
		limpar carrinho
		tudo dentro de TRANSACTION:
			BEGIN;

			cria pedido
			cria itens
			cria pagamento
			limpa carrinho

			COMMIT;

			se tudo der certo salva
			se não

			ROOLBACK;

			desfaz tudo automaticamente

			ou seja, ele garante integridade dos dados no processo de checkout

		funções:
		1. pegar carrinho
		2. calcular total
		3. criar pedido
		4. criar itens do pedido
		5. criar pagamento
		6. limpar carrinho

		que retorna o pedido
		return order;

		*/

		const client = await database.connect();

		try {
			await client.query("BEGIN");

			// 1. pegar carrinho
			const cartItems = await client.query(
				`SELECT c.quantity, p.id as product_id, p.price
				FROM cart c
				JOIN product p ON p.id = c.product_id
				WHERE c.user_id = $1`,
				[user_id]
			);

			if (cartItems.rows.length === 0) {
				throw new Error("Carrinho vazio");
			}

			// 2. calcular total
			let total = 0;
			cartItems.rows.forEach(item => {
				total += item.price * item.quantity;
			});

			// 3. criar pedido
			const orderResult = await client.query(
				`INSERT INTO order_client (status, total_value, user_id)
				VALUES ('PENDENTE', $1, $2)
				RETURNING *`,
				[total, user_id]
			);

			const order = orderResult.rows[0];

			// 4. criar itens do pedido
			for (const item of cartItems.rows) {
				await client.query(
					`INSERT INTO order_item (quantity, unit_price, order_id, product_id)
					VALUES ($1, $2, $3, $4)`,
					[item.quantity, item.price, order.id, item.product_id]
				);
			}

			// 5. criar pagamento
			await client.query(
				`INSERT INTO payment (method, status, order_id)
				VALUES ('PENDENTE', 'PENDENTE', $1)`,
				[order.id]
			);

			// 6. limpar carrinho
			await client.query(
				`DELETE FROM cart WHERE user_id = $1`,
				[user_id]
			);

			await client.query("COMMIT");

			return order;

		} catch (error) {
			await client.query("ROLLBACK");
			throw error;
		} finally {
			client.release();
		}
    }

};