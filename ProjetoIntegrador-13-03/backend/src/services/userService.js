// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";

export const userService = {

    async createUser(data) {
        // Criando variáveis com os campos correspondentes do objeto data
        const { email, password } = data;

        // Pegando o email do usuário
        const userExists = await userModel.findByEmail(email);

        // Se email do usuário já existe
        if(userExists) {
            // Então retorna erro
            throw new Error("Email já cadastrado");
        }

        // Criptografando a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);

        // Copia tudo do objeto 'data' e substitui a senha para a criptografada
        const user = await userModel.create({
            ...data, // spread operator
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
        return await userModel.findByEmail(email);
    }

};