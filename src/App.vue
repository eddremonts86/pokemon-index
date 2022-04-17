<template>
  <v-app>
    <v-main>
      <component :is="layout" v-if="layout">
        <router-view />
      </component>
      <sys-messages
        :type="type"
        :value="hasErrors"
        @close="close"
        :text="messagesText"
      />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppVue",
  computed: {
    ...mapGetters("errorsStore", ["hasErrors", "getErrorMessage"]),
    layout() {
      return this.$route.meta.layout || "defaultLayout";
    },
    type() {
      return this.getErrorMessage.type;
    },
    messagesText() {
      return this.getErrorMessage.text;
    },
  },
  methods: {
    ...mapActions("errorsStore", ["clearErrorMessage"]),
    close() {
      this.clearErrorMessage();
    },
  },
};
</script>
