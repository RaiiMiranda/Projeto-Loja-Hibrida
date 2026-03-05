// Inclui o módulo HTTP (protolo para tranferência de dados), utilizando modelo cliente-servidor
// Baseado em requisições (GET, POST) e respostas (200, 404, ...)
const { createServer } = require('node:http');

// Servidor escuta nesse host e porta especificados 
const hostname = 'localhost';
const port = 3000;

// Cria o servidor e retornando-o
const server = createServer((req, res) => {
  res.statusCode = 200;                        // resposta bem sucedida
  res.setHeader('Content-Type', 'text/plain'); // define o cabeçalho
  res.end('Hello World');                      // finaliza a resposta com argumento para end()
});

// Informa que o servidor está rodando
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); // http://localhost:3000/
});