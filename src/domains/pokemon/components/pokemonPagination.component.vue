<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="white mx-1"
          :class="{ grey: hasPreviousPage }"
          icon
          text
          v-bind="attrs"
          v-on="on"
          @click="previousPage"
          :disabled="hasPreviousPage"
        >
          <v-icon color="primary">mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <span>Previous page</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="primary mx-1"
          :class="{ grey: hasNextPage }"
          icon
          text
          v-bind="attrs"
          v-on="on"
          @click="nextPage"
          ::disabled="hasNextPage"
        >
          <v-icon color="white">mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <span>Next page</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "pokemonPagination",
  computed: {
    ...mapGetters(["getPokemonNextPageUrl", "getPokemonPreviousPageUrl"]),
    hasPreviousPage() {
      return this.getPokemonPreviousPageUrl === null;
    },
    hasNextPage() {
      return this.getPokemonNextPageUrl === null;
    },
  },
  methods: {
    ...mapActions(["fetchPokemonByPage"]),
    nextPage() {
      this.fetchPokemonByPage(this.getPokemonNextPageUrl);
    },
    previousPage() {
      this.fetchPokemonByPage(this.getPokemonPreviousPageUrl);
    },
  },
};
</script>

<style></style>
