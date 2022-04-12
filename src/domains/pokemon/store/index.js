import { getByFilter, getByUrl } from "@/helpers/axiosConnection";
import { fetchPokemonInformation } from "../utils/index";

const pokemonStore = {
  state: {
    pokemon: [],
    pokemonNextPageUrl: null,
    pokemonPreviousPageUrl: null,
  },
  mutations: {
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setPokemonPreviousPageUrl(state, pokemonPreviousPageUrl) {
      state.pokemonPreviousPageUrl = pokemonPreviousPageUrl;
    },
    setPokemonNextPageUrl(state, pokemonNextPageUrl) {
      state.pokemonNextPageUrl = pokemonNextPageUrl;
    },
    resetStore(state) {
      state.pokemon = [];
      state.pokemonNextPageUrl = null;
      state.pokemonPreviousPageUrl = null;
    },
  },
  actions: {
    async fetchPokemon({ commit }, { offset, limit }) {
      const filters = `offset=${offset}&limit=${limit}`;
      try {
        commit("resetStore");
        const response = await getByFilter("pokemon", filters);
        const { results, previous, next } = response.data;
        const pokemon = await fetchPokemonInformation(results);
        commit("setPokemon", pokemon);
        commit("setPokemonPreviousPageUrl", previous);
        commit("setPokemonNextPageUrl", next);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPokemonByPage({ commit }, pageUrl) {
      try {
        commit("resetStore");
        const response = await getByUrl(pageUrl);
        const { results, previous, next } = response.data;
        const pokemon = await fetchPokemonInformation(results);
        commit("setPokemon", pokemon);
        commit("setPokemonPreviousPageUrl", previous);
        commit("setPokemonNextPageUrl", next);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getPokemon: (state) => state.pokemon,
    getPokemonNextPageUrl: (state) => state.pokemonNextPageUrl,
    getPokemonPreviousPageUrl: (state) => state.pokemonPreviousPageUrl,
  },
};
export default pokemonStore;
