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
}

module.exports = () => {
  return new Users();
};
