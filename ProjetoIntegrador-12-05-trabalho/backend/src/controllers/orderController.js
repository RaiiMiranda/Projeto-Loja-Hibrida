// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: orderController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { orderService } from "../services/orderService.js";

export const orderController = {

    async create(req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const order = await orderService.getOrderById(req.params.id);
            res.json(order);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};