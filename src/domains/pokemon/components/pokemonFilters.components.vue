<template>
  <v-row class="ma-0 radio-xl grey darken-4">
    <v-col cols="12" md="3" class="d-flex justify-start">
      <v-text-field
        persistent-hint
        solo
        rounded
        hint="Filter by name or ability"
        v-model="filter"
        @input="$emit('update:filter', filter)"
      />
    </v-col>
    <v-col cols="12" md="3" class="d-flex justify-center">
      <v-combobox
        :items="pokemonAmount"
        hint="Pokemon per page"
        persistent-hint
        solo
        rounded
        v-model="pokemonPerPage"
        @change="$emit('update:pokemon-per-page', pokemonPerPage)"
        class="size"
      >
      </v-combobox
    ></v-col>
    <v-col cols="12" md="2" class="d-flex justify-center">
      <div class="mx-4">
        <v-btn-toggle
          v-model="sortByName"
          borderless
          color="primary accent-3"
          @change="updateSort"
        >
          <v-btn value="asc" class="px-6">
            <v-icon right>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-6">
            <v-icon right>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
        <p class="mt-2 text-center">Sort by name</p>
      </div>
    </v-col>
    <v-col cols="12" md="2" class="d-flex justify-center">
      <div class="mx-4">
        <v-btn-toggle
          v-model="sortByHeight"
          borderless
          color="primary accent-3"
          @change="updateSort"
        >
          <v-btn value="asc" class="px-6">
            <v-icon right>mdi-sort-numeric-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-6">
            <v-icon right>mdi-sort-numeric-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
        <p class="mt-2 text-center">Sort by height</p>
      </div>
    </v-col>
    <v-col cols="12" md="2" class="d-flex justify-center">
      <div class="mx-4">
        <v-btn-toggle
          v-model="sortByWeight"
          borderless
          color="primary accent-3"
          @change="updateSort"
          >{{ sortByWeight }}
          <v-btn value="asc" class="px-6">
            <v-icon right>mdi-sort-bool-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-6">
            <v-icon right>mdi-sort-bool-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
        <p class="mt-2 text-center">Sort by weight</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PokemonFilters",
  props: {
    elementsPerPage: {
      type: Number,
      default: 10,
    },
    byName: {
      type: String,
      default: null,
    },
    byHeight: {
      type: String,
      default: null,
    },
    byWeight: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      pokemonAmount: [10, 20, 50],
      pokemonPerPage: this.elementsPerPage,
      sortByName: this.byName,
      sortByHeight: this.byHeight,
      sortByWeight: this.byWeight,
      filter: null,
    };
  },
  methods: {
    updateSort() {
      let sort = [
        {
          attribute: "name",
          value: this.sortByName || null,
        },
        {
          attribute: "height",
          value: this.sortByHeight || null,
        },
        {
          attribute: "weight",
          value: this.sortByWeight || null,
        },
      ].filter((s) => s.value);
      this.$emit("update:sort", sort);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-xl {
  border-radius: 10px;
}
.size {
  width: 100%;
}
</style>
