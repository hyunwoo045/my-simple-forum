export default {
  namespaced: true,

  state: () => {
    return {
      username: "Guest",
    };
  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload.newName;
    },
  },
};
