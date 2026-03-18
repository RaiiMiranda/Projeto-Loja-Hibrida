// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { categoryService } from "../services/categoryService.js";
import { productService } from "../services/productService.js";

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
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            res.json(categoryId);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteById(req, res) {
        try {
            const { id } = req.params;

            const category = await categoryService.getCategoryId(id);
            const products = await productService.getByCategoryId(id);

            // Se não encontrar a categoria para remover, então retorna 404
            if (!category) {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            // Se tiver produtos vinculados a uma categoria, então não permite excluir
            if (products.length > 0) {
                return res.status(400).json({ message: "Não é possível excluir categoria com produtos vinculados." });
            }

            // Se encontrar a categoria, então remove ela
            await categoryService.deleteById(id);

            res.json({ category: { id: category.id, name: category.name }, message: "Categoria excluída com sucesso! "});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};