import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    meta: {
      layout: "applicationLayout",
      title: "Home Page",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      layout: "applicationLayout",
      title: "About Pokemon",
    },
  },
  {
    path: "*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFoundView.vue"),
    meta: {
      layout: "defaultLayout",
      title: "Page not found",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
