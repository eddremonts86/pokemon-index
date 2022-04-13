<template>
  <v-app-bar app flat>
    <v-container class="py-0 fill-height">
      <v-btn
        icon
        text
        @click="$emit('update-asideMenu')"
        class="mr-10"
        data-cy="close-aside-left-nav"
      >
        <v-avatar color="grey darken-1" size="32">
          <img src="images/pokemon-logo.png" alt="logo.png" />
        </v-avatar>
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
      <v-responsive max-width="300">
        <pokemon-search />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import { MenuItemsConst } from "../const";
import { pokemonSearch } from "@/domains/pokemon/components";
export default {
  name: "TopBarMenu",
  components: { pokemonSearch },
  computed: {
    menuItems() {
      return MenuItemsConst;
    },
  },
};
</script>

<style></style>
