<template>
  <v-skeleton-loader
    v-if="isLoading"
    type="card-avatar, article, actions"
  ></v-skeleton-loader>
  <pokemon :pokemon="pokemon" v-else />
</template>

<script>
import { getByAttribute } from "@/helpers/axiosConnection";
import { pokemon } from "@/domains/pokemon/views";

export default {
  name: "PokemonSearch",
  components: {
    pokemon,
  },
  data() {
    return {
      pokemon: {},
      isLoading: false,
    };
  },
  computed: {
    pokemonName() {
      return this.$route.query.name;
    },
  },
  mounted() {
    this.fetchPokemon();
  },
  methods: {
    fetchPokemon() {
      this.isLoading = true;
      getByAttribute("pokemon", this.pokemonName)
        .then((res) => {
          this.pokemon = res.data;
        })
        .catch(() => {
          this.pokemon = {};
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
