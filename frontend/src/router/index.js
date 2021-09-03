import { createRouter, createWebHashHistory } from "vue-router";
import Container from "./Container";
import Add from "./Add";
import Read from "./Read";
import Login from "./Login";
import Signin from "./Signin";
// import SessionCheck from "./SessionCheck";

export default createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/",
      component: Container,
      name: "Home",
    },
    {
      path: "/add",
      component: Add,
      name: "Add",
      props: true,
    },
    {
      path: "/read",
      component: Read,
      name: "Read",
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
    },
    {
      path: "/signin",
      component: Signin,
      name: "Signin",
    },
    // {
    //   path: "/auth-check",
    //   component: SessionCheck,
    //   name: "SessionCheck",
    // },
  ],
});
