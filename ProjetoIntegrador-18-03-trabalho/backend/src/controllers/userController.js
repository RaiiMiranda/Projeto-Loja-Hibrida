// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { userService } from "../services/userService.js";

export const userController = {

    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async findByEmail(req, res) {
        try {
            const { email } = req.params;
            const userEmail = await userService.getUserEmail(email);

            if(!userEmail) {
                return res.status(404).json({ message: "E-mail não encontrado." });
            }

            res.json(userEmail);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const userId = await userService.getUserId(id);

            if(!userId) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.json(userId);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateActive(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserId(id);

            // Se não encontrar o user, então retorna 404
            if(!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            // Se encontrar o id, então atualiza o status de ativo do usuário
            await userService.updateActive(id, false);

            res.json(user, "Usuário desativado com sucesso!");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};