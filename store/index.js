export const state = () => ({
  users: 0,
  messages: [],
  user: {},
});

export const mutations = {
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  SOCKET_newMessage(state, newMsg) {
    state.messages = [...state.messages, newMsg];
  },
  setUser(state, user) {
    // console.log(user)
    state.user = user;
  },
  addSocket(state, id) {
    state.user.sockets = [...state.user.sockets, id];
  }
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  async addUser({ commit, dispatch }, user) {
    // console.log(user);
    const { id } = await dispatch("socketEmit", {
      action: "addUser",
      payload: user,
    });
    // console.log(id);
    commit("setUser", user)
    commit("addSocket", id)
  },
  sendMessage({ dispatch, state }, msg) {
    console.log(msg);
    const { user } = state;
    console.log(user)
    dispatch("socketEmit", {
      action: "sendMessage",
      payload: {
        msg,
        user
      }
    });
  },
  enterTower({ dispatch, state}) {
    // console.log(state.user.towerName)
    // console.log('yeeeettttt');
    const { user } = state;
    dispatch("socketEmit", {
      action: "enterTower",
      payload: user,
    });
  }
};
