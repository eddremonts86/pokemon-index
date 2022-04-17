<template>
  <div>
    <v-skeleton-loader
      v-if="isLoading"
      type="card-avatar, article, actions"
    ></v-skeleton-loader>
    <pokemon :pokemon="pokemon" v-else />
  </div>
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
    if (!this.$route.query.name) {
      this.displayErrors();
    }
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
          this.displayErrors();
        })
        .finally(() => (this.isLoading = false));
    },
    displayErrors() {
      this.$store.commit(
        "errorsStore/setSystemErrors",
        {
          type: "error",
          text: "Sorry. We haven't found a pokemon with same name",
        },
        { root: true }
      );
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 3000);
    },
  },
};
</script>
