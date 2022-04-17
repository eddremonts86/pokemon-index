<template>
  <v-row>
    <v-col
      cols="12"
      class="pa-4 mt-5 radio-xl d-flex justify-space-between align-center"
    >
      <h1>Favorites</h1>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      v-for="(pokemon, key) in pokemonList"
      :key="key"
      class="d-flex align-stretch"
    >
      <pokemon-card
        :pokemon="pokemon"
        :favorites="favorites"
        @update:favorites="updateFavorites"
      />
    </v-col>
  </v-row>
</template>

<script>
import localStorageHandler from "@/helpers/localStorageHandler";
import { mapActions, mapGetters } from "vuex";
import { pokemonCard } from "@/domains/pokemon/components";

export default {
  name: "FavoritesView",
  data() {
    return {
      favorites: localStorageHandler.getJsonLocalStore("favorites") || [],
    };
  },
  components: {
    pokemonCard,
  },
  computed: {
    ...mapGetters("pokemonStore", ["getPokemon"]),
    pokemonList() {
      return this.getPokemon;
    },
  },
  mounted() {
    this.fetchFavoritePokemon(this.favorites);
  },
  methods: {
    ...mapActions("pokemonStore", ["fetchFavoritePokemon"]),
    updateFavorites(favorites) {
      localStorageHandler.setJsonLocalStore("favorites", favorites);
      this.favorites = favorites;
    },
  },
  watch: {
    favorites: {
      handler(favorites) {
        this.fetchFavoritePokemon(favorites);
      },
      deep: true,
    },
  },
};
</script>
