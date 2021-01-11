import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/rest.css";
import "./css/index.css";

const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.

app.use(router);
app.use(store);
app.mount("#app");
