const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server);
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');

var users = 0;
var user_names = []

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log("socket in");
    user_names.push(socket.id);
    io.sockets.emit('users', {
        users: ++users,
        user_names: user_names
    });

    socket.on('disconnect', () => {
        user_names.splice(user_names.indexOf(socket.id), 1);
        io.sockets.emit('users', {
            users: --users,
            user_names: user_names
        });
    });
});

async function start() {
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    const builder = new Builder(nuxt);
    await builder.build();

    app.use(nuxt.render);

    server.listen(port, () => {
        console.log('running on a port lol');
    })
}

start();