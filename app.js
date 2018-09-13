const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var routes = require('./routes');
const app = new express();
let port = 8080

app.use(bodyParser.urlencoded({extended: true}));

app.disable('x-powered-by');
app.set('view engine', 'ejs')

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    app.use('/', routes);
    app.listen(port, () => {
        console.log(`Server started on port`, port);
    });
}