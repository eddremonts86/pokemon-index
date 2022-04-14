<template>
  <v-row
    class="pokemonContainer"
    :style="`--background-color : ${principalTypeColor}`"
  >
    <v-col cols="12" class="d-flex">
      <v-spacer></v-spacer>
      <router-link to="/">Back to home</router-link>
    </v-col>

    <v-col
      cols="12"
      class="image-container d-flex align-center justify-space-around"
    >
      <div>
        <v-img :src="image" class="image"></v-img>
      </div>
      <h1 class="text-capitalize">{{ pokemon.name }}</h1>
    </v-col>

    <v-col cols="12" md="4" class="generalInformation">
      <h3 class="py-3">General Information:</h3>
      <pokemon-general-information :pokemon="generalInfo" />
    </v-col>
    <v-col cols="12" md="8" class="overflowTable">
      <h3 class="py-3">Pokemon Stats:</h3>
      <pokemonStatsTable :stats="stats" />
    </v-col>
    <v-col cols="12" class="content">
      <h3 class="py-3">Abilities :</h3>
      <sys-chip :items="abilities" color="red darken-4" />
      <h3 class="py-3">Games indices:</h3>
      <sys-chip :items="games" color="purple darken-4" />
      <h3 class="py-3">Moves:</h3>
      <sys-chip :items="moves" color="indigo darken-4" />
    </v-col>
  </v-row>
</template>

<script>
const imgDefaultUrl = "/images/loading.gif";
import { pokemonTypesColor } from "@/domains/pokemon/const";
import {
  pokemonGeneralInformation,
  pokemonStatsTable,
} from "@/domains/pokemon/components";
export default {
  name: "PokemonView",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  components: {
    pokemonStatsTable,
    pokemonGeneralInformation,
  },
  computed: {
    image() {
      return (
        this.pokemon.sprites?.other["official-artwork"]?.front_default ||
        imgDefaultUrl
      );
    },
    imgDefault() {
      return imgDefaultUrl;
    },
    types() {
      const types = this.pokemon.types ?? [];
      return types.map(({ type }) => {
        return {
          type: type.name,
          color: this.colors(type.name),
        };
      });
    },
    principalTypeColor() {
      return this.types[0]?.color;
    },
    stats() {
      const stats = this.pokemon.stats ?? [];
      const statsArray = Object.keys(stats).map((key) => {
        return {
          stat: stats[key].stat.name,
          score: stats[key].base_stat,
          effort: stats[key].effort,
          type: "stat",
          data: null,
        };
      });
      const totalScore = statsArray.reduce((acc, curr) => {
        acc += curr.score;
        return acc;
      }, 0);
      return [
        { stat: "Types", data: [...this.types] },
        ...statsArray,
        { score: totalScore, stat: "Total score", type: "stat", data: null },
      ];
    },
    hasPokemonInformation() {
      return Object.keys(this.pokemon).length > 0;
    },
    games() {
      if (!this.hasPokemonInformation) return [];
      return this.pokemon?.game_indices.map(({ version }) => version.name);
    },
    moves() {
      if (!this.hasPokemonInformation) return [];
      return this.pokemon?.moves.map(({ move }) => move.name);
    },
    abilities() {
      if (!this.hasPokemonInformation) return [];
      return this.pokemon?.abilities.map(({ ability }) => ability.name);
    },
    generalInfo() {
      if (!this.hasPokemonInformation) return {};
      const { weight, base_experience, order, height } = this.pokemon;
      return {
        weight,
        base_experience,
        order,
        height,
      };
    },
  },
  methods: {
    colors(type) {
      return pokemonTypesColor[type] || "#C03028";
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemonContainer {
  --background-color: #transparent;
  .generalInformation {
    h3 {
      display: block;
    }
  }
  .image-container {
    border-radius: 20px;
    max-height: 300px;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    .image {
      width: 300px;
      height: auto;
    }
    @media screen and (max-width: 1024px) {
      display: flex;
      margin-bottom: 2rem;
      text-align: center;
      h1 {
        font-size: 4rem;
      }
      .image {
        width: 200px;
        height: auto;
      }
    }
    @media screen and (max-width: 600px) {
      display: flex;
      margin-bottom: 2rem;
      text-align: center;
      display: inline-block;
      h1 {
        font-size: 3rem;
      }
      .image {
        width: 100px;
        height: auto;
      }
    }
  }
  .overflowTable {
    overflow-y: auto;
  }
}
</style>
