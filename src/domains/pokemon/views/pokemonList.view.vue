<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      v-for="(pokemon, key) in pokemonSorted"
      :key="key"
      class="d-flex align-stretch"
    >
      <pokemon-card :pokemon="pokemon" />
    </v-col>
  </v-row>
</template>

<script>
import { pokemonCard } from "../components";
import { mapActions, mapGetters } from "vuex";
import { orderBy as _orderBy } from "lodash";
import localStorageHandler from "@/helpers/localStorageHandler";

export default {
  name: "PokemonList",
  components: {
    pokemonCard,
  },
  props: {
    pokemonPerPage: {
      type: Number,
      default: 20,
    },
    sort: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["getPokemon"]),
    pokemonSorted() {
      return this.sort === null
        ? this.getPokemon
        : this.sortPokemon(this.getPokemon);
    },
  },
  mounted() {
    this.fetchPokemon({
      limit:
        localStorageHandler.getJsonLocalStore("limit") || this.pokemonPerPage,
      offset: localStorageHandler.getJsonLocalStore("offset") || 0,
    });
  },
  methods: {
    ...mapActions(["fetchPokemon"]),
    sortPokemon(pokemon) {
      const attribute = this.sort.map((e) => e.attribute);
      const values = this.sort.map((e) => e.value);
      const sorted = _orderBy(pokemon, attribute, values);
      if (this.filter) {
        return this.filterPokemon(sorted);
      }
      return sorted;
    },
    filterPokemon(sorted) {
      return sorted.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          pokemon.abilities.some(({ ability }) =>
            ability.name.toLowerCase().includes(this.filter.toLowerCase())
          )
      );
    },
  },
  watch: {
    pokemonPerPage(newValue) {
      this.fetchPokemon({
        limit: newValue,
        offset: 0,
      });
    },
  },
};
</script>
