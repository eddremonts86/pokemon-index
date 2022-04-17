import Vue from "vue";
import Vuex from "vuex";
import errorsStore from "./errorsStore";
import pokemonStore from "@/domains/pokemon/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    pokemonStore,
    errorsStore,
  },
});
