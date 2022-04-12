<template>
  <v-row class="ma-0 radio-xl">
    <v-col cols="12" md="6" class="d-flex justify-start">
      <v-combobox
        :items="pokemonAmount"
        hint="Pokemon per page"
        persistent-hint
        solo
        rounded
        v-model="pokemonPerPage"
        max-width="200px"
        @change="$emit('update:pokemon-per-page', pokemonPerPage)"
      >
      </v-combobox
    ></v-col>
    <v-col cols="12" md="6" class="d-flex justify-end">
      <div class="mx-4">
        <p>Sort by name</p>
        <v-btn-toggle
          v-model="sortByName"
          borderless
          color="primary accent-3"
          @change="updateSort"
        >
          <v-btn value="asc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="mx-4">
        <p>Sort by Height</p>
        <v-btn-toggle
          v-model="sortByHeight"
          borderless
          color="primary accent-3"
          @change="updateSort"
        >
          <v-btn value="asc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="mx-4">
        <p>Sort by Weight</p>
        <v-btn-toggle
          v-model="sortByWeight"
          borderless
          color="primary accent-3"
          @change="updateSort"
        >
          <v-btn value="asc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
          <v-btn value="desc" class="px-4">
            <v-icon right>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
        </v-btn-toggle>
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
  },
  data() {
    return {
      pokemonAmount: [10, 20, 50],
      pokemonPerPage: this.elementsPerPage,
      sortByName: [],
      sortByHeight: [],
      sortByWeight: [],
    };
  },
  methods: {
    updateSort() {
      let sort = [
        {
          attribute: "name",
          value: this.sortByName?.length > 0 ? this.sortByName : null,
        },
        {
          attribute: "height",
          value: this.sortByHeight?.length > 0 ? this.sortByHeight : null,
        },
        {
          attribute: "weight",
          value: this.sortByWeight?.length > 0 ? this.sortByWeight : null,
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
</style>
