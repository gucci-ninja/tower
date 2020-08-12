class Users {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users = [...this.users, user];
  }

  findByToken(token) {
    return this.users.find((user) => user.token === token);
  }

  addSocket(name, socket) {
    const index = this.users.findIndex((user) => user.name === name);
    this.users[index].sockets = [...this.users[index].sockets, socket];
  }

  removeSocket(socket) {
    const user_index = this.users.findIndex((user) => user.sockets.includes(socket));
    const socket_index = this.users[user_index].sockets.indexOf(socket);
    this.users[user_index].sockets.splice(socket_index, 1);
  }
}

module.exports = () => {
  return new Users();
};
