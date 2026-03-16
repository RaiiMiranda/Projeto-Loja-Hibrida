// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productService } from "../services/productService.js";

export const productController = {

    async create(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const products = await productService.getProducts();
            res.json(products);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const productId = await productService.getProductId(id);

            if (!productId) {
                return res.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            res.json(productId);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }

};