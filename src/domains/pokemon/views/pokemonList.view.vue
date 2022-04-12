<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      v-for="(pokemon, key) in getPokemon"
      :key="key"
    >
      <pokemon-card :pokemon="pokemon" />
    </v-col>
  </v-row>
</template>

<script>
import { pokemonCard } from "../components";
import { mapActions, mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters(["getPokemon"]),
  },
  mounted() {
    this.fetchPokemon({
      limit: this.pokemonPerPage,
      offset: 0,
    });
  },
  methods: {
    ...mapActions(["fetchPokemon"]),
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
