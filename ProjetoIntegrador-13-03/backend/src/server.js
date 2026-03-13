// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: server.js
// -- Inicializa o servidor e fica pronto pra receber as requisições
// -- Funcionamento: Route -> Controller -> Service -> Model -> Database
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cors());         // libera CORS (acesso do frontend)
app.use(express.json()); // converte JSON do body em objeto JS)

// Rotas
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

// Qual rota vai responder as requisições HTTP GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/src/pages/index.html'));
});

// Inicia o servidor para receber as requisições
app.listen(port, () => {
    console.log(`Loja de Instrumentos rodando em http://localhost:${port}`);
});