export default {
  namespaced: true,

  state: () => {
    return {
      isLoggedIn: false,
      id: -1,
      username: "",
    };
  },
  mutations: {
    setState(state, payload) {
      const { user_id, nickname } = payload;
      state.isLoggedIn = true;
      state.username = nickname;
      state.id = user_id;
    },
    resetState(state) {
      state.isLoggedIn = false;
      state.username = "";
      state.id = -1;
    },
  },
};
