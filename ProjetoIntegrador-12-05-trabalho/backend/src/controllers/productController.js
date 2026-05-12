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
            const product = await productService.getProductId(id);
            res.json(product);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    },

    async findByCategory(req, res) {
        try {
            const { id } = req.params;
            const products = await productService.getByCategoryId(id);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.updateProduct(id, req.body);

            res.json(product);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.getProductId(id);
            console.log(req.params.id);
            
            await productService.deleteById(id);

            res.json({ product: { id: product.id, name: product.name }, message: "Produto excluído com sucesso! "});
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: error.message });
        }
    }

};