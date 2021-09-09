import axios from "axios";
import defaultAPI from "~/core/defaultAPI";

export default {
  namespaced: true,

  state: () => {
    return {
      isLoggedIn: false,
      id: -1,
      nickname: "",
    };
  },
  mutations: {
    setState(state, payload) {
      const { id, nickname } = payload;
      state.isLoggedIn = true;
      state.id = id;
      state.nickname = nickname;
    },
    resetState(state) {
      state.id = -1;
      state.nickname = "";
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  actions: {
    async AccessTokenHandler({ commit }) {
      try {
        const { nickname, user_id } = await verifyAccessToken();
        commit("setState", { nickname, user_id });
        return "OK";
      } catch (err) {
        return err;
      }
    },
    async RefreshTokenHandler({ commit }) {
      try {
        const { nickname, user_id } = await verifyRefreshToken();
        commit("setState", { nickname, user_id });
        return "OK";
      } catch (err) {
        return err;
      }
    },
  },
};

function verifyAccessToken() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      reject("NEED_LOGIN");
    } else {
      axios
        .get(`${defaultAPI.end_point}/auth/check?token=${token}`)
        .then((res) => {
          const data = res.data;
          if (data.message === "VALID_TOKEN") {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            resolve({
              nickname: data.decoded.nickname,
              user_id: data.decoded.user_id,
            });
          } else {
            reject("NOT_VALID_ACCESS_TOKEN");
          }
        });
    }
  });
}

function verifyRefreshToken() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      reject("NEED_LOGIN");
    } else {
      axios
        .get(`${defaultAPI.end_point}/auth/check_refresh?token=${token}`)
        .then((res) => {
          const data = res.data;
          if (data.message === "VALID_REFRESH_TOKEN") {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            resolve({
              nickname: data.decoded.nickname,
              user_id: data.decoded.user_id,
            });
          } else {
            reject("NOT_VALID_REFRESH_TOKEN");
          }
        });
    }
  });
}
