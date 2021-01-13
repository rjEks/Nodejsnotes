#!/usr/bin/env node
const cluster = require('cluster');
//o modulo cluster e necessario em conjunto com o parent
console.log(`master pid=${process.pid}`);
cluster.setupMaster({
    exec: __dirname+'/producer-http-basic.js'
});
console.log(__dirname)
// cada chamada do .fork() cria-se um worker (2)
cluster.fork();
cluster.fork();

//Todos os eventos devem ser logados, inclusive para realizar a ativação
//de um worker
cluster
    .on('disconnect', (worker) => {
        console.log('disconnect', worker.id);
    })
    .on('exit', (worker, code, signal) => {
        console.log('exit', worker.id, code, signal);
        // cluster.fork();
    })
    .on('listening', (worker, {address, port}) => {
        console.log('listening', worker.id, `${address}:${port}`);
        });