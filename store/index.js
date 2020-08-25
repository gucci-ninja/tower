export const state = () => ({
  users: [],
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
    try {
      const { id } = await dispatch("socketEmit", {
        action: "addUser",
        payload: user,
      });
      commit("setUser", user)
      commit("addSocket", id)
    } catch(err) {
      console.log('Socket not ready to emit');
    }

  },
  sendMessage({ dispatch, state }, msg) {
    const { user } = state;
    dispatch("socketEmit", {
      action: "sendMessage",
      payload: {
        msg,
        user
      }
    });
  },
};
