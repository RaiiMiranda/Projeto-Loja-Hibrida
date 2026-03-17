// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: authController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

// Gera o Token
export const authController = {

    async login(req, res) {
        try {
            // Recebe os dados
            const { email, password } = req.body;

            // Verificando se usuário existe no banco
            const user = await userModel.findByEmail(email);

            // Se não existir, então retorna 404
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            // Comparando as senhas
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Se as senhas não forem iguais, então retorna 401
            if (!passwordMatch) {
                return res.status(401).json({ error: "Senha inválida" });
            }

            // Gerando o Token
            const token = jwt.sign({
                    id: user.id,
                    is_admin: user.is_admin
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Retorna a resposta
            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin
                },
                token
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};