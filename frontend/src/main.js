import { createApp } from "vue";
import App from "./App";
import router from "./router/index.js";

import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(router).use(VueAxios, axios).mount("#app");
