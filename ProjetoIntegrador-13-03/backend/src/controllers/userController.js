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
                return res.status(404).json({
                    message: "E-mail não encontrado."
                });
            }
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }

};