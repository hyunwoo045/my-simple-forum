import{createRouter,createWebHashHistory}from"vue-router";import Container from"./Container";import Add from"./Add";import Read from"./Read";import Login from"./Login";import Signin from"./Signin";import Home from"./Home";import store from"../store/index";export default createRouter({history:createWebHashHistory(),routes:[{path:"/login",component:Login,name:"Login",beforeEnter:(e,o,t)=>{store.state.user.isLoggedIn?(alert("이미 로그인 되어 있습니다."),t("/")):t()}},{path:"/signin",component:Signin,name:"Signin",beforeEnter:(e,o,t)=>{store.state.user.isLoggedIn?(alert("잘못된 경로 접근입니다."),t("/")):t()}},{path:"/",component:Home,name:"Home",beforeEnter:(e,o,t)=>{store.state.user.isLoggedIn?t():store.dispatch("user/AccessTokenHandler").then((e=>{if("NOT_VALID_ACCESS_TOKEN"===e)store.dispatch("user/RefreshTokenHandler").then((e=>{"NOT_VALID_REFRESH_TOKEN"===e?(store.commit("user/resetState"),t("/login")):t()}));else{if("NEED_LOGIN"===e)return store.commit("user/resetState"),void t("/login");t()}}))},children:[{path:"",component:Container,name:"Container"},{path:"add",component:Add,name:"Add",props:!0},{path:"read",component:Read,name:"Read"}]}]});