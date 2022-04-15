<template>
  <v-card :loading="loading" class="mx-auto my-12" elevation="2">
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
    <v-btn color="red" icon @click="favorite()" class="topLeft">
      <v-icon>{{ favIcon }}</v-icon>
    </v-btn>
    <v-card-title
      ><h2 class="text-capitalize">{{ poke.name }}</h2>
      <v-spacer />
    </v-card-title>
    <v-card-subtitle class="mt-1">
      <sys-chip
        label
        :items="height"
        color="grey darken-4"
        hasIcon
        icon="mdi-human-male-height-variant"
      />
      <sys-chip
        label
        :items="weight"
        color="grey darken-4"
        hasIcon
        icon="mdi-weight-kilogram"
      />
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Abilities</v-card-title>
    <v-card-text class="abilitiesContainer">
      <sys-chip :items="abilities" color="red darken-4" />
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
    abilities() {
      return this.poke.abilities.map((ability) => ability.ability.name);
    },
    weight() {
      return [`Weight: ${this.poke.weight}`];
    },
    height() {
      return [`Height: ${this.poke.height}`];
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
.topLeft {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
