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

            res.json(categoryId);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params; // vem da url
            const { name } = req.body; // vem do corpo json
            const updated = await categoryService.updateCategoryName(id, name);

            res.json({ category: updated, message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.deleteCategory(id);

            res.json({ category: { id: category.id, name: category.name }, message: "Categoria excluída com sucesso! "});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};