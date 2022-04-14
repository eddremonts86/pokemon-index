<template>
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
</template>

<script>
export default {
  name: "PokemonStatsTable",
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
