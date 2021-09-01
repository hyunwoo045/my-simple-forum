export default {
  namespaced: true,

  state: () => {
    return {
      id: -1,
      username: "",
      writable: false,
    };
  },
  mutations: {
    setUsername(state, payload) {
      const { id, nickname } = payload;
      state.id = id;
      state.username = nickname;
      state.writable = true;
    },
  },
};
