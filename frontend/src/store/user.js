export default {
  namespaced: true,

  state: () => {
    return {
      username: "Guest",
      contents: [],
    };
  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload.newName;
    },
    setContents(state, payload) {
      state.contents = payload.contents;
    },
  },
};
