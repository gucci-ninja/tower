export const state = () => ({
  users: 0,
  messages: [],
});

export const mutations = {
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  SOCKET_newMessage(state, newMsg) {
    state.messages = [...state.messages, newMsg];
  }
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  addUser({ dispatch }) {
    dispatch("socketEmit", {
      action: "addUser",
      payload: null,
    });
  },
  sendMessage({ dispatch }, msg) {
    dispatch("socketEmit", {
      action: "sendMessage",
      payload: msg
    });
  }
};
