// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productModel } from "../models/productModel.js";
import { categoryModel } from "../models/categoryModel.js";

export const productService = {

    async createProduct(data) {
        const { name, brand, condition, description, price, category_id } = data;

        // Se não preencher os campos obrigatórios, então não permite o cadastro
        if (!name || !brand || !condition || !description || !price || !category_id) {
            throw new Error("Dados obrigatórios não informados.");
        }
        
        const categoryExists = await categoryModel.findById(category_id);

        // Se não existir a categoria, não permite criar o produto
        if(!categoryExists) {
            throw new Error("Categoria não cadastrada.");
        }

        const product = await productModel.create({
            ...data, // spread operator
            available: true
        });

        return product;
    },

    // Pegando todos os produtos
    async getProducts() {
        return await productModel.findAll();
    },

    // Pegando um id específico
    async getProductId(id) {
        const product = await productModel.findById(id);
        console.log(product);
        
        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        return await productModel.findById(id);
    },

    // Pegando o id da categoria vinculada ao produto
    async getByCategoryId(id) {
        return await productModel.findCategoryId(id);
    },

    // Atualizando os campos do produto
    async updateProduct(id, data) {
        return await productModel.updateProductById(id, data);
    },

    // Pegando um id específico para deletar
    async deleteById(id) {
        const product = await productModel.findById(id);

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        return await productModel.deleteById(id);
    }

};