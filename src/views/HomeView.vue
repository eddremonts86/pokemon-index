<template>
  <v-row class="about">
    <v-col
      cols="12"
      class="pa-4 my-5 radio-xl pokemon-header d-flex justify-space-between align-center"
    >
      <h2>Pokemon</h2>
      <v-spacer></v-spacer>
      <pokemon-pagination />
    </v-col>
    <pokemon-filters
      :elementsPerPage="pokemonPerPage"
      @update:pokemon-per-page="updatePokemonPerPage"
      @update:sort="updateSort"
    />
    <v-col cols="12">
      <pokemonList :pokemon-per-page="pokemonPerPage" :sort="sort" />
    </v-col>
    <v-col cols="12" class="radio-xl pokemon-header d-flex justify-end">
      <pokemon-pagination />
    </v-col>
  </v-row>
</template>
<script>
import { pokemonList } from "@/domains/pokemon/views";
import {
  pokemonPagination,
  pokemonFilters,
} from "@/domains/pokemon/components";
export default {
  name: "HomeView",
  components: {
    pokemonList,
    pokemonPagination,
    pokemonFilters,
  },
  data() {
    return {
      pokemonPerPage: 10,
      sort: [],
    };
  },
  methods: {
    updatePokemonPerPage(pokemonPerPage) {
      this.pokemonPerPage = pokemonPerPage;
    },
    updateSort(sort) {
      this.sort = sort;
    },
  },
};
</script>
<style scoped>
.radio-xl {
  border-radius: 10px;
}
.pokemon-header {
  background-color: #2c31348f !important;
}
</style>
