<template>
  <div>
    <h1 class="ma-15">Favorites</h1>
    <v-row>
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
  </div>
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
    ...mapGetters(["getPokemon"]),
    pokemonList() {
      return this.getPokemon;
    },
  },
  mounted() {
    this.fetchFavoritePokemon(this.favorites);
  },
  methods: {
    ...mapActions(["fetchFavoritePokemon"]),
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

<style></style>
