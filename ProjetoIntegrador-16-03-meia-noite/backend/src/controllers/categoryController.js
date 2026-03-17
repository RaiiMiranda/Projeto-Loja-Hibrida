// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { categoryService } from "../services/categoryService.js";

export const categoryController = {

    async create(req, res) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const categories = await categoryService.getCategories();
            res.json(categories);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const categoryId = await categoryService.getCategoryId(id);

            if (!categoryId) {
                return res.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            res.json(categoryId);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }

};