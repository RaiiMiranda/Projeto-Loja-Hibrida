// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { categoryModel } from "../models/categoryModel.js";

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
        return await categoryModel.findById(id);
    }

};