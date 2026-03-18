// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { cartService } from "../services/cartService.js";

export const cartController = {

    async getCart(req, res) {
        try {
            
        } catch(error) {
            res.status(500).json({ error: error.message }); // arrumar o status(xxx)
        }
    },

    async addItem(req, res) {
        try {
            
        } catch(error) {
            res.status(500).json({ error: error.message }); // arrumar o status(xxx)
        }
    },

    async removeItem(req, res) {
        try {
            
        } catch(error) {
            res.status(500).json({ error: error.message }); // arrumar o status(xxx)
        }
    },

    async update(req, res) {
        try {
            
        } catch(error) {
            res.status(500).json({ error: error.message }); // arrumar o status(xxx)
        }
    },

    async checkout(req, res) {
        try {
            
        } catch(error) {
            res.status(500).json({ error: error.message }); // arrumar o status(xxx)
        }
    }

};