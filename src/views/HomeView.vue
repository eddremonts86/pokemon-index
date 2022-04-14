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
    <v-col cols="12" class="ma-0 pa-0">
      <v-expansion-panels data-cy="home-expansion-panels">
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header> Filters </v-expansion-panel-header>
          <v-expansion-panel-content>
            <pokemon-filters
              :elementsPerPage="pokemonPerPage"
              :byName="sortByName"
              :byHeight="sortByHeight"
              :byWeight="sortByWeight"
              @update:pokemon-per-page="updatePokemonPerPage"
              @update:sort="updateSort"
              @update:filter="updateFilter"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-col cols="12">
      <pokemonList
        :pokemon-per-page="pokemonPerPage"
        :sort="sort"
        :filter="filter"
        :favorites="favorites"
        @update:favorites="updateFavorites"
      />
    </v-col>
    <v-col cols="12" class="radio-xl pokemon-header d-flex justify-end">
      <pokemon-pagination />
    </v-col>
  </v-row>
</template>
<script>
import { pokemonList } from "@/domains/pokemon/views";
import localStorageHandler from "@/helpers/localStorageHandler";
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
      sort: localStorageHandler.getJsonLocalStore("sort") || [],
      filter: null,
      favorites: localStorageHandler.getJsonLocalStore("favorites") || [],
    };
  },
  mounted() {
    if (localStorageHandler.getJsonLocalStore("limit")) {
      this.pokemonPerPage = localStorageHandler.getJsonLocalStore("limit");
    }
  },
  computed: {
    sortByWeight() {
      return this.sort.find((s) => s.attribute === "weight")?.value;
    },
    sortByHeight() {
      return this.sort.find((s) => s.attribute === "height")?.value;
    },
    sortByName() {
      return this.sort.find((s) => s.attribute === "name")?.value;
    },
  },
  methods: {
    updatePokemonPerPage(pokemonPerPage) {
      this.pokemonPerPage = pokemonPerPage;
    },
    updateSort(sort) {
      localStorageHandler.setJsonLocalStore("sort", sort);
      this.sort = sort;
    },
    updateFilter(filter) {
      this.filter = filter;
    },
    updateFavorites(favorites) {
      localStorageHandler.setJsonLocalStore("favorites", favorites);
      this.favorites = favorites;
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
