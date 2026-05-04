// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { cartService } from "../services/cartService.js";

export const cartController = {

    // Pegando os itens do carrinho do user
    async getUserCart(req, res) {
        try {
            const userId = req.user.id;

            // Pegando os itens do usuário logado
            const items = await cartService.getCartItems(userId);

            // Enviando os itens
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Adicionando item no carrinho do user
    async addItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;

            // Adicionando a quantidade de item no carrinho do usuário logado
            const item = await cartService.addToCart(userId, productId, quantity);

            // Enviando o item adicionado
            res.json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Atualizando a quantidade de um item do carrinho do user
    async updateQuantity(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            // Atualizando a quantidade do item
            const item = await cartService.updateQuantity(id, quantity);

            // Enviando o item atualizado
            res.json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Removendo um item do carrinho do user
    async removeItem(req, res) {
        try {
            const { id } = req.params;
            await cartService.removeItem(id);

            res.json({ message: "Item removido" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    // Limpando o carrinho do user
    async clear(req, res) {
        try {
            const userId = req.user.id;
            await cartService.clearCart(userId);

            res.json({ message: "Carrinho limpo" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Finalizando a compra do user
    async checkout(req, res) {
        try {
            const userId = req.user.id;

            const order = await cartService.checkout(userId);

            res.json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};