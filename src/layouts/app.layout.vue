<template>
  <v-app>
    <top-bar-menu @update-asideMenu="asideMenu = !asideMenu" />
    <v-navigation-drawer
      v-model="asideMenu"
      app
      temporary
      class="aside-left-nav"
    >
      <asideLeftMenu />
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet min-height="85vh" rounded="lg" class="pa-7">
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { topBarMenu, asideLeftMenu } from "@/domains/application/components";
export default {
  name: "AppLayout",
  components: {
    topBarMenu,
    asideLeftMenu,
  },
  data() {
    return {
      asideMenu: true,
    };
  },
};
</script>
