import { createRouter, createWebHashHistory } from "vue-router";
import Container from "./Container";
import Add from "./Add";
import Read from "./Read";
import Login from "./Login";
import Signin from "./Signin";
import Home from "./Home";
import LoginSuccess from "./LoginSuccess";
// import SessionCheck from "./SessionCheck";

import store from "../store/index";

export default createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/login",
      component: Login,
      name: "Login",
      beforeEnter: (to, from, next) => {
        if (store.state.user.isLoggedIn) {
          alert("이미 로그인 되어 있습니다.");
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/signin",
      component: Signin,
      name: "Signin",
      beforeEnter: (to, from, next) => {
        if (store.state.user.isLoggedIn) {
          alert("잘못된 경로 접근입니다.");
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/loginsuccess",
      component: LoginSuccess,
      name: "LoginSuccess",
    },
    {
      path: "/",
      component: Home,
      name: "Home",
      beforeEnter: (to, from, next) => {
        if (store.state.user.isLoggedIn) {
          next();
        } else {
          store.dispatch("user/AccessTokenHandler").then((res) => {
            if (res === "NOT_VALID_ACCESS_TOKEN") {
              store.dispatch("user/RefreshTokenHandler").then((res) => {
                if (res === "NOT_VALID_REFRESH_TOKEN") {
                  store.commit("user/resetState");
                  next("/login");
                } else {
                  next();
                }
              });
            } else if (res === "NEED_LOGIN") {
              store.commit("user/resetState");
              next("/login");
              return;
            } else {
              next();
            }
          });
        }
      },
      children: [
        {
          path: "",
          component: Container,
          name: "Container",
        },
        {
          path: "add",
          component: Add,
          name: "Add",
          props: true,
        },
        {
          path: "read",
          component: Read,
          name: "Read",
        },
      ],
    },
  ],
});
