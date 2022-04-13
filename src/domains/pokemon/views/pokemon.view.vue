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
      <div>
        <v-icon class="mx-2" large>mdi-book-open-variant</v-icon>
        <p class="header">Base experience</p>
        <p class="sub-header">{{ pokemon.base_experience }}</p>
      </div>
      <div>
        <v-icon class="mx-2" large>mdi-order-numeric-descending </v-icon>
        <p class="header">Order</p>
        <p class="sub-header">{{ pokemon.order }}</p>
      </div>
      <div>
        <v-icon class="mx-2" large>mdi-weight-kilogram </v-icon>
        <p class="header">Weight</p>
        <p class="sub-header">{{ pokemon.weight }}</p>
      </div>
      <div>
        <v-icon class="mx-2" large>mdi-human-male-height-variant </v-icon>
        <p class="header">Height</p>
        <p class="sub-header">{{ pokemon.height }}</p>
      </div>
    </v-col>
    <v-col cols="12" md="8" class="overflowTable">
      <h3 class="py-3">Pokemon Stats:</h3>
      <table>
        <thead>
          <td v-for="(stat, statsKey) in stats" :key="statsKey">
            <span>{{ stat.stat }}</span>
          </td>
        </thead>
        <tr>
          <td v-for="(stat, statsKey) in stats" :key="statsKey">
            <span v-if="!stat.data">{{ stat.score }}</span>
            <span v-if="stat.data">
              <v-chip
                v-for="(pokemonType, pokemonTypeKey) in stat.data"
                :key="pokemonTypeKey"
                :color="pokemonType.color"
                class="ma-1"
              >
                {{ pokemonType.type }}
              </v-chip>
            </span>
          </td>
        </tr>
      </table>
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
  },
  methods: {
    colors(type) {
      return pokemonTypesColor[type];
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
    > div {
      background-color: var(--background-color);
      display: inline-block;
      margin: 5px;
      padding: 10px;
      text-align: center;
      width: 40%;
      border-radius: 10px;
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
  thead {
    background-color: var(--background-color);
    color: #fff;
    td {
      padding: 0.5rem 1rem;
      text-transform: capitalize;
    }
  }
  tr {
    td {
      padding: 0.7rem 1rem;
    }
  }
}
</style>
