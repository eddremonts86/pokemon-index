<template>
  <v-row class="infoContainer d-flex align-stretch justify-center">
    <v-col cols="12" md="5" class="infoBlok">
      <v-icon class="mx-2" large>mdi-book-open-variant</v-icon>
      <p class="header">Base experience</p>
      <p class="sub-header">{{ pokemon.base_experience }}</p>
    </v-col>
    <v-col cols="12" md="5" class="infoBlok">
      <v-icon class="mx-2" large>mdi-order-numeric-descending </v-icon>
      <p class="header">Order</p>
      <p class="sub-header">{{ pokemon.order }}</p>
    </v-col>
    <v-col cols="12" md="5" class="infoBlok">
      <v-icon class="mx-2" large>mdi-weight-kilogram </v-icon>
      <p class="header">Weight</p>
      <p class="sub-header">{{ pokemon.weight }}</p>
    </v-col>
    <v-col cols="12" md="5" class="infoBlok">
      <v-icon class="mx-2" large>mdi-human-male-height-variant </v-icon>
      <p class="header">Height</p>
      <p class="sub-header">{{ pokemon.height }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PokemonGeneralInformation",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
div.infoBlok {
  background-color: var(--background-color);
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  margin: 10px;
  .header {
    font-size: 1.5em;
    padding: 0;
    margin: 0;
  }
  .sub-header {
    font-size: 3.5em;
    font-weight: 900;
    padding: 0;
    margin: 0;
  }
}
</style>
