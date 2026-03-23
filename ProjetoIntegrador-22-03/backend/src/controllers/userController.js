// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// 400 - dado inválido
// 403 - sem permissão
// 404 - não encontrado
// 500 - erro interno

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

            res.json(userEmail);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserId(id);

            res.json(user);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    },

    async updateActive(req, res) {
        try {
            const { id } = req.params;
            const { active } = req.body;
            const user = await userService.updateActive(id, active);

            res.json({ user, message: "Status do usuário atualizado com sucesso!" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};