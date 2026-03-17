// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productModel } from "../models/productModel.js";

export const productService = {

    async createProduct(data) {
        const { name, brand, condition, description, price, category_id } = data;

        const productExists = await productModel.findByName(name);

        if(productExists) {
            throw new Error("Produto já cadastrado com esse nome.");
        }

        if (!name || !brand || !condition || !description || !price || !category_id) {
            throw new Error("Dados obrigatórios não informados.");
        }

        const product = await productModel.create({
            ...data, // spread operator
            //available: true
        });

        return product;
    },

    // Pegando todos os produtos
    async getProducts() {
        return await productModel.findAll();
    },

    // Pegando um id específico
    async getProductId(id) {
        return await productModel.findById(id);
    }

};