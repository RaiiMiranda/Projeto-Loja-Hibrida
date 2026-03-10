const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

// Configura o Express para servir os arquivos dentro da pasta 'frontend'
// Permitindo que o HTML encontre o CSS e imagens automaticamente
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(port, () => {
    console.log(`Loja de Instrumentos rodando em http://localhost:${port}`);
});
