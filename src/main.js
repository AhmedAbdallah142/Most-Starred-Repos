import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "normalize.css"; // for normal rendering for items

createApp(App).use(store).mount("#app");
