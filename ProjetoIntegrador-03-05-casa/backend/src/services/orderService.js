// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: orderService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { orderModel } from "../models/orderModel.js";

export const orderService = {

    async createOrder(data) {
        const order = await orderModel.create({
            ...data
        });

        return order;
    },

    // pedido precisa ter pelo menos um item
    // pedido precisa ter um pagamento

    // após pedido finalizado, usuário pode avaliar (tabela review)

};