// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";

export const categoryService = {

    async createCategory(data) {
        const { name } = data;

        const categoryExists = await categoryModel.findByName(name);

        if(!name) {
            throw new Error("Categoria precisa ter um nome.");
        }

        if(categoryExists) {
            throw new Error("Categoria já cadastrada com esse nome.");
        }

        const category = await categoryModel.create({
            ...data, // spread operator
        });

        return category;
    },

    // Pegando todos as categorias
    async getCategories() {
        return await categoryModel.findAll();
    },

    // Pegando um id específico
    async getCategoryId(id) {
        const category = await categoryModel.findById(id);

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        return category;
    },

    // Atualizando o nome da categoria
    async updateCategoryName(id, name) {
        const category = await categoryModel.findById(id);

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        return await categoryModel.updateCategoryName(id, name);
    },

    // Deletando uma categoria com id específico
    async deleteCategory(id) {
        const category = await categoryModel.findById(id);

        // Se não encontrar a categoria para remover, então retorna 404
        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        const products = await productModel.findCategoryId(id);

        // Se tiver produtos vinculados a uma categoria, então não permite excluir
        if (products.length > 0) {
            throw new Error("Não é possível excluir categoria com produtos vinculados");
        }

        return await categoryModel.deleteById(id);
    }

};