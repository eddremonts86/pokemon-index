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
    >
      <pokemon-card :pokemon="pokemon" />
    </v-col>
  </v-row>
</template>

<script>
import { pokemonCard } from "../components";
import { mapActions, mapGetters } from "vuex";
import { orderBy as _orderBy } from "lodash";

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
      limit: this.pokemonPerPage,
      offset: 0,
    });
  },
  methods: {
    ...mapActions(["fetchPokemon"]),
    sortPokemon(pokemon) {
      const attribute = this.sort.map((e) => e.attribute);
      const values = this.sort.map((e) => e.value);
      const sorted = _orderBy(pokemon, attribute, values);
      console.log(sorted.map((ele) => ele.name));
      return sorted;
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
