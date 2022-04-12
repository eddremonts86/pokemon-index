<template>
  <v-row>
    <v-col
      cols="12"
      class="image-container d-flex align-center justify-space-around"
    >
      <div>
        <v-img :src="image" :lazy-src="imgDefault" class="image"></v-img>
      </div>
      <h1>{{ pokemon.name }}</h1>
    </v-col>

    <v-col cols="12" md="4">
      <h3 class="py-3">General Information:</h3>
      <!--<p>Species : {{ pokemon.species.name }}</p>-->
      <p>Base experience : {{ pokemon.base_experience }}</p>
      <p>Weight : {{ pokemon.weight }}</p>
      <p>Height : {{ pokemon.height }}</p>
      <p>Order : {{ pokemon.order }}</p>
    </v-col>
    <v-col cols="12" md="8">
      <h3 class="py-3">Pokemon Stats:</h3>

      <table>
        <thead>
          <td v-for="(stat, statsKey) in stats" :key="statsKey">
            {{ stat.stat }}
          </td>
        </thead>
        <tr>
          <td v-for="(stat, statsKey) in stats" :key="statsKey">
            {{ stat.score }}
          </td>
        </tr>
      </table>
      <h3 class="py-3">Types:</h3>
      <p>
        <v-chip
          class="ma-1"
          v-for="(pokemonType, pokemonTypeKey) in types"
          :key="pokemonTypeKey"
          :color="pokemonType.color"
        >
          {{ pokemonType.type }}
        </v-chip>
      </p>
    </v-col>
    <v-col cols="12" class="content">
      <h3 class="py-3">Abilities :</h3>
      <p>
        <v-chip
          class="mx-2"
          color="red darken-4"
          v-for="(pokemonAbility, pokemonAbilityKey) in pokemon.abilities"
          :key="pokemonAbilityKey"
        >
          {{ pokemonAbility.ability.name }}
        </v-chip>
      </p>
      <h3 class="py-3">Games indices:</h3>
      <p>
        <v-chip
          class="ma-1"
          color="purple darken-4"
          v-for="(pokemonGames, pokemonGamesKey) in pokemon.game_indices"
          :key="pokemonGamesKey"
        >
          {{ pokemonGames.version.name }}
        </v-chip>
      </p>
      <h3 class="py-3">Moves:</h3>
      <p>
        <v-chip
          class="ma-1"
          color="indigo darken-4"
          v-for="(pokemonMove, pokemonMoveKey) in pokemon.moves"
          :key="pokemonMoveKey"
        >
          {{ pokemonMove.move.name }}
        </v-chip>
      </p>
    </v-col>
  </v-row>
</template>

<script>
const imgDefaultUrl = "/images/loading.gif";
import { pokemonTypesColor } from "@/domains/pokemon/const";
export default {
  name: "PokemonView",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
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
    stats() {
      const stats = this.pokemon.stats ?? [];

      const statsArray = Object.keys(stats).map((key) => {
        return {
          stat: stats[key].stat.name,
          score: stats[key].base_stat,
          effort: stats[key].effort,
        };
      });
      const totalScore = statsArray.reduce((acc, curr) => {
        acc += curr.score;
        return acc;
      }, 0);
      return [...statsArray, { score: totalScore, stat: "Total score" }];
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
  },
  methods: {
    colors(type) {
      return pokemonTypesColor[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  background-color: #2c31348f;
  border-radius: 20px;
  max-height: 300px;
  margin: 0;
  padding: 0;
  .image {
    width: 300px;
    height: auto;
  }
}
thead {
  background-color: #2c31348f;
  color: #fff;
  td {
    border-bottom: 1px solid #fff;
    padding: 0.2rem 1rem;
    text-transform: capitalize;
  }
}
tr {
  td {
    padding: 0.2rem 1rem;
  }
}
</style>
