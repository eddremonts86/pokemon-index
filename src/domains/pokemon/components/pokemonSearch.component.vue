<template>
  <v-autocomplete
    v-model.trim="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    dense
    hide-details
    rounded
    item-text="name"
    item-value="name"
    label="Search pokemon by name"
    placeholder="Search pokemon by name"
    append-icon="mdi-magnify"
    solo
    clearable
  >
    <template v-slot:selection="data">
      <v-chip v-bind="data.attrs" :input-value="data.selected">
        <v-avatar left>
          <v-img :src="data.item.img"></v-img>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template>
        <v-list-item link @click="goTo(data.item.name)">
          <v-list-item-avatar>
            <img :src="data.item.img" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.group"
            ></v-list-item-subtitle> </v-list-item-content
        ></v-list-item>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { getByAttribute } from "@/helpers/axiosConnection";
export default {
  name: "PokemonSearch",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    items() {
      return this.entries.map(({ name, sprites }) => {
        return { name, img: sprites?.other["official-artwork"]?.front_default };
      });
    },
  },

  watch: {
    search(val) {
      if (this.isLoading) return;
      this.isLoading = true;
      getByAttribute("pokemon", val.trim().toLowerCase())
        .then((res) => {
          this.entries = [res.data];
        })
        .catch(() => {
          this.entries = [];
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    goTo(name) {
      this.$router.push("/pokemon?name=" + name);
    },
  },
};
</script>
