// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: server.js
// -- Inicializa o servidor e deixa pronto para receber as requisições
// -- Funcionamento: Route -> Controller -> Service -> Model -> Database
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import 'dotenv/config'; // procura o .env
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
//import orderRoutes from "./routes/orderRoutes.js";

const app = express(); // criando uma instância do servidor web
const port = 3000;     // porta do servidor

// Pega o caminho absoluto da pasta onde 'server.js' está localizado
// __dirname = C:/projeto-integrador/backend/src
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.json()); // converte JSON do body em objeto JS
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // por causa do form nao enviar em json pro backend

// Rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
//app.use("/order", orderRoutes);

// Qual rota vai responder as requisições HTTP GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicia o servidor para receber as requisições
app.listen(port, () => {
    console.log(`Loja de Instrumentos rodando em http://localhost:${port}`);
});