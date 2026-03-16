// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productModel } from "../models/productModel.js";

export const productService = {

    async createProduct(data) {
        const { name } = data;

        const productExists = await productModel.findByName(name);

        if(productExists) {
            throw new Error("Produto já cadastrado com esse nome.");
        }

        const product = await productModel.create({
            ...data, // spread operator
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