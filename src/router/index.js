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
    path: "/pokemon",
    name: "pokemon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokemonView.vue"),
    meta: {
      layout: "applicationLayout",
      title: "About Pokemon",
    },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FavoritesView.vue"),
    meta: {
      layout: "applicationLayout",
      title: "Favorite Pokemon",
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
