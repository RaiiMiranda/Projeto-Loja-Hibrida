// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: database.js
// -- Conecta o banco de dados 'musicStore'
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Pool } from 'pg';

const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

// Exporta o pool para poder ser usado em outros arquivos
export default pool;