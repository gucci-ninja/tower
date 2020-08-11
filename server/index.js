const { Nuxt, Builder } = require('nuxt');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require('../nuxt.config.js');
const Message = require("../models/Message")();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var users = 0;
const Users = require("../utils/users")();

io.on("connection", (socket) => {
  socket.on("addUser", (user) => {
    console.log(user.name);
    socket.join(user.towerName);
    Users.addSocket(user.name, socket.id);
    // push user + socket id to table
    // db.ref(/user.towerName/users/..)
    // db.ref('towers/' + user.towerName + '/users/' + socket.id).set({
    //   name: user.name
    // });
    io.emit("updateUsers", ++users);
    console.log(socket.id);
    // user.sockets.push(socket.id);
    // console.log(user.sockets);
    return { socketId: socket.id };
  });

  // socket.on("enterTower", ({ name, towerName }) => {
  //   socket.join(towerName);
  //   // io.to(towerName).emit("updateUsers", )
  // })

  socket.on("disconnect", () => {
    io.emit("updateUsers", --users)
  });

  socket.on("sendMessage", ({ msg, user }) => {
    io.to(user.towerName).emit("newMessage", new Message(msg, user.name));
  });
});

async function start() {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;
  const builder = new Builder(nuxt);
  await builder.build();

  app.use(bodyParser.json());

  app.post('/api/auth/login', (req, res) => {
    const { user } = req.body
    const token = jwt.sign({user}, 'supersecret');
    Users.addUser({
      ...user,
      token: token,
      sockets: []
    })
    res.json({ token });
  })

  app.get('/api/auth/user', (req, res, next) => {
    // get bearer token
    const header = req.headers['authorization'];
    const bearerToken = header.split(' ')[1];
    res.token = bearerToken;
    const user = Users.findByToken(bearerToken)
    res.json({ user: user });
  })

  app.use(nuxt.render);

  server.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`)
  });
}
start();
