// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";

export const userService = {

    async createUser(data) {
        // Criando variáveis com os campos correspondentes do objeto data
        const { name, email, password, cpf, phone } = data;

        // Se não preencher os campos obrigatórios, então não permite o cadastro
        if (!name || !email || !password || !cpf || !phone) {
            throw new Error("Dados obrigatórios não informados.");
        }

        // Pegando o email do usuário
        const userExists = await userModel.findByEmail(email);

        // Se email do usuário já existe
        if(userExists) {
            // Então retorna erro
            throw new Error("Email já cadastrado.");
        }

        // Criptografando a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);

        // Copia tudo do objeto 'data' e substitui a senha para a criptografada
        const user = await userModel.create({
            ...data,                 // spread operator
            is_admin: false,         // sempre falso
            password: hashedPassword
        });

        // Retornando o usuário
        return user;
    },

    // Pegando todos os usuários
    async getUsers() {
        return await userModel.findAll();
    },

    // Pegando um email específico
    async getUserEmail(email) {
        const user = await userModel.findByEmail(email);

        if (!user) {
            throw new Error("E-mail não encontrado.");
        }

        return user;
    },

    // Pegando um id específico
    async getUserId(id) {
        const user = await userModel.findById(id);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return user;
    },

    // Atualizando o status de ativo
    async updateActive(id, active) {
        const user = await userModel.findById(id);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return await userModel.updateActive(id, active);
    }

};