<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="poke.img" :lazy-src="imgDefault"></v-img>
    <v-card-title>{{ poke.name }}</v-card-title>
    <v-card-subtitle>
      <span> <b>Height:</b> {{ poke.height }} </span> <br />
      <span><b>Weight:</b> {{ poke.weight }}</span>
    </v-card-subtitle>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Abilities</v-card-title>

    <v-card-text>
      <v-chip
        class="ma-1"
        color="primary"
        v-for="(ability, abilityKey) in poke.abilities"
        :key="abilityKey"
      >
        {{ ability.ability.name }}
      </v-chip>
    </v-card-text>

    <v-card-actions class="pa-5">
      <v-btn color="primary" block> Know more! </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const imgDefaultUrl = "/images/default-pokemon.png";

export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
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
  },
};
</script>
