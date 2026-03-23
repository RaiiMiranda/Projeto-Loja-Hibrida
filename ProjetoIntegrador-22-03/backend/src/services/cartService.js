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

export const cartService = {

    async getCartItems(userId) {
        return await cartModel.getByUser(userId);
    },

    async addToCart(userId, productId, quantity) {
        const existing = await cartModel.findByUserAndProduct(userId, productId);

		// Se já existe o produto no carrinho, então atualiza a quantidade dele
        if (existing) {
            return await cartModel.updateQuantity(
                existing.id,
                existing.quantity + quantity
            );
        }

		// Se não existe então adiciona o produto no carrinho
        return await cartModel.create({
            user_id: userId,
            product_id: productId,
            quantity
        });
    },

    async updateQuantity(cartId, quantity) {
        if (quantity <= 0) {
            return await cartModel.delete(cartId);
        }

        return await cartModel.updateQuantity(cartId, quantity);
    },

    async removeItem(cartId) {
        return await cartModel.delete(cartId);
    },

    async clearCart(userId) {
        return await cartModel.clear(userId);
    },

	async checkout(req, res) {
        try {
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
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};