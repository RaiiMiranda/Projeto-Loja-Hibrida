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

            // Verificando se o email do usuário existe no banco
            const user = await userModel.findByEmail(email);

            // Se não existir, então retorna 404 (não encontrou o que pediu)
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            if (!user.active) {
                return res.status(403).json({ error: "Usuário desativado." });
            }

            // Comparando as senhas
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Se as senhas não forem iguais, então retorna 401 (autenticação não autorizada)
            if (!passwordMatch) {
                return res.status(401).json({ error: "Senha inválida." });
            }

            // Gerando o Token 'jwt.sign()'
            // token formato JWT: HEADER.PAYLOAD.SIGNATURE
            const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: "1h" });  

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });

            return res.json({ user: { id: user.id, name: user.name } });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Logout realizado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};