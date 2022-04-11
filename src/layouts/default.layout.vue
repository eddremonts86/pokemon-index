<template>
  <v-app>
    <top-bar-menu />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet min-height="85vh" rounded="lg" class="pa-7"
              ><router-view
            /></v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { topBarMenu } from "@/domains/application/components";

export default {
  name: "DefaultLayout",
  components: {
    topBarMenu,
  },
};
</script>
