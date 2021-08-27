import { createApp } from "vue";
import App from "./App";
import router from "./router/index.js";
import axios from "axios";
import store from "./store/index.js";
import VueAxios from "vue-axios";

createApp(App).use(router).use(store).use(VueAxios, axios).mount("#app");
