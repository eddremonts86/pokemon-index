<template>
  <v-app>
    <v-main>
      <component :is="layout" v-if="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppVue",
  computed: {
    layout() {
      return this.$route.meta.layout || "defaultLayout";
    },
  },
};
</script>
