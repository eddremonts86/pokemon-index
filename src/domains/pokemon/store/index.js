import { getByFilter, getByUrl } from "@/helpers/axiosConnection";
import localStorageHandler from "@/helpers/localStorageHandler";
import { fetchPokemonInformation, getParmFromUrl } from "../utils/index";

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
      localStorageHandler.setJsonLocalStore("offset", offset);
      localStorageHandler.setJsonLocalStore("limit", limit);
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
      localStorageHandler.setJsonLocalStore(
        "offset",
        getParmFromUrl(pageUrl, "offset")
      );
      localStorageHandler.setJsonLocalStore(
        "limit",
        getParmFromUrl(pageUrl, "limit")
      );

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
    getPokemon(state) {
      return state.pokemon;
    },
    getPokemonNextPageUrl(state) {
      return state.pokemonNextPageUrl;
    },
    getPokemonPreviousPageUrl(state) {
      return state.pokemonPreviousPageUrl;
    },
  },
};
export default pokemonStore;
