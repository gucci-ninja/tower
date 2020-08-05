const { Nuxt, Builder } = require('nuxt');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require('../nuxt.config.js');
const Message = require("../models/Message")();

var users = 0;

io.on("connection", (socket) => {
  socket.on("addUser", () => {
    io.emit("updateUsers", ++users);
  });

  socket.on("disconnect", () => {
    io.emit("updateUsers", --users)
  });

  socket.on("sendMessage", (msg) => {
    io.emit("newMessage", new Message(msg));
  });
});

async function start() {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;
  const builder = new Builder(nuxt);
  await builder.build();
  app.use(nuxt.render);

  server.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`)
  });
}
start();
