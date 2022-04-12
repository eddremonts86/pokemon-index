<template>
  <v-app-bar app flat>
    <v-container class="py-0 fill-height">
      <v-btn icon text @click="$emit('update-asideMenu')" class="mr-10">
        <v-avatar color="grey darken-1" size="32"></v-avatar>
      </v-btn>
      <template v-for="link in menuItems">
        <router-link
          :key="link.routerName"
          link
          class="hidden-sm-and-down mx-2"
          :to="{ name: link.routeName }"
        >
          {{ link.text }}
        </router-link>
      </template>
      <v-spacer></v-spacer>
      <v-responsive>
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import { MenuItemsConst } from "../const";
export default {
  name: "TopBarMenu",
  computed: {
    menuItems() {
      return MenuItemsConst;
    },
  },
};
</script>

<style></style>
