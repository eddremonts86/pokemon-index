import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import PokemonList from "@/domains/pokemon/views/pokemonList.view.vue";
import { pokemonResponse } from "../../helpers";
Vue.use(Vuetify);
Vue.use(Vuex);

describe("Pokemon list", () => {
  const store = new Vuex.Store({
    state: {
      pokemon: () => pokemonResponse,
    },
    actions: {
      fetchPokemon: () => [],
    },
    getters: {
      getPokemon: (state) => state.pokemon,
    },
  });

  const wrapper = shallowMount(PokemonList, {
    propsData: {
      pokemonPerPage: 10,
      filter: "Search input value",
    },
    store,
  });
  it("Has been component props updated", () => {
    expect(wrapper.props().pokemonPerPage).toBe(10);
    expect(wrapper.props().filter).toBe("Search input value");
  });
});
