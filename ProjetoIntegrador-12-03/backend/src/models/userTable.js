import database from './config/database.js';

export async function createUserTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
            id BIGSERIAL PRIMARY KEY,
            is_admin BOOLEAN DEFAULT FALSE NOT NULL, -- 0 (cliente)  1 (admin)
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            cpf VARCHAR(11) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL
         
    }
}