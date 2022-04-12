<template>
  <pokemon :pokemon="pokemon" />
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
