const http = require('http');

const server = http.createServer((req, res) => {
    console.log('current conn', server._connections);
    setTimeout(() => res.end('OK'), 10_000);
    });

//Max connection para limitação
server.maxConnections = 2;
server.listen(3030, 'localhost');