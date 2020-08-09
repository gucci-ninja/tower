const { Nuxt, Builder } = require('nuxt');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require('../nuxt.config.js');
const Message = require("../models/Message")();
var users = 0;

io.on("connection", (socket) => {
  socket.on("addUser", () => {
    // push user + socket id to table
    // db.ref(/user.towerName/users/..)
    // db.ref('towers/' + user.towerName + '/users/' + socket.id).set({
    //   name: user.name
    // });
    io.emit("updateUsers", ++users);
    return { id: socket.id };
  });

  socket.on("enterTower", ({ name, towerName }) => {
    socket.join(towerName);
    // io.to(towerName).emit("updateUsers", )
  })

  socket.on("disconnect", () => {
    io.emit("updateUsers", --users)
  });

  socket.on("sendMessage", ({msg, user}) => {
    io.to(user.towerName).emit("newMessage", new Message(msg, user.name));
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
