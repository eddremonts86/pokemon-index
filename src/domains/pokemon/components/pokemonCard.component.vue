<template>
  <v-card :loading="loading" class="mx-auto my-12">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="poke.img"
      :lazy-src="imgDefault"
      @click="goTo(pokemon.name)"
      class="cursor-pointer"
    ></v-img>
    <v-card-title
      ><h2 class="text-capitalize">{{ poke.name }}</h2>
      <v-spacer />
      <v-btn color="red" icon @click="favorite()">
        <v-icon>{{ favIcon }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle class="mt-1">
      <v-chip label class="my-1 mr-1" color="grey darken-4">
        <v-icon class="mx-2">mdi-human-male-height-variant </v-icon>
        <b>Height:</b> <span class="mx-2">{{ poke.height }}</span>
      </v-chip>
      <v-chip label class="my-1 mr-1" color="grey darken-4">
        <v-icon class="mx-2">mdi-weight-kilogram </v-icon>
        <b>Weight:</b> <span class="mx-2">{{ poke.weight }}</span>
      </v-chip>
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Abilities</v-card-title>
    <v-card-text class="abilitiesContainer">
      <v-chip
        class="ma-1"
        color="red darken-4"
        v-for="(ability, abilityKey) in poke.abilities"
        :key="abilityKey"
      >
        {{ ability.ability.name }}
      </v-chip>
    </v-card-text>
    <v-card-actions class="pa-5 ma-0 grey darken-4">
      <v-btn color="primary" block @click="goTo(pokemon.name)">
        Know more!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const imgDefaultUrl = "/images/loading.gif";
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pokemonExtraData: {},
      loading: false,
    };
  },
  computed: {
    poke() {
      const { name, height, weight, abilities, sprites } = this.pokemon;
      return {
        name,
        height,
        weight,
        abilities,
        img: sprites?.other["official-artwork"]?.front_default,
      };
    },
    imgDefault() {
      return imgDefaultUrl;
    },
    isFavorite() {
      return this.favorites.includes(this.poke.name);
    },
    favIcon() {
      return this.isFavorite ? "mdi-heart" : "mdi-heart-outline";
    },
  },
  methods: {
    goTo(name) {
      this.$router.push("/pokemon?name=" + name);
    },
    favorite() {
      const { name } = this.poke;
      this.$emit(
        "update:favorites",
        this.isFavorite
          ? this.favorites.filter((pokemon) => pokemon !== name)
          : [...this.favorites, name]
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.abilitiesContainer {
  min-height: 100px;
}
</style>
