<template>
  <div class="d-flex flex-column">
    <div class="pa-4">
      <h2>Pokemon World</h2>
      <p class="small">The most complete list of Pokemon</p>
    </div>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          link
          @click="$router.push({ name: item.routeName })"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { MenuItemsConst } from "../const";

export default {
  name: "AsideLeftMenu",
  computed: {
    menuItems() {
      return MenuItemsConst;
    },
  },
};
</script>

<style></style>
