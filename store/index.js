export const state = () => ({
  users: 0,
});

export const mutations = {
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
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
};
