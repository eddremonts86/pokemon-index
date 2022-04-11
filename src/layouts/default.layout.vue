<template>
  <v-app>
    <top-bar-menu />

    <v-main>
      <v-container>
        <v-row>
          <v-col class="app-content">
            <v-sheet min-height="70vh" rounded="lg"><router-view /></v-sheet>
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
