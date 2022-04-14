import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./assets/scss/styles.css";

// Importing Global Components
import "@/components/register";

// Importing Global Layouts
Vue.component("defaultLayout", () => import(`./layouts/default.layout.vue`));
Vue.component("applicationLayout", () => import(`./layouts/app.layout.vue`));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
