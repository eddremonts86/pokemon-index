<template>
  <v-snackbar
    :value="value"
    :color="type"
    absolute
    centered
    rounded
    top
    :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        class="white"
        small
        icon
        v-bind="attrs"
        @click="close"
        elevation="0"
      >
        <v-icon color="black" small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SysMessages",
  props: {
    text: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (val) => ["success", "error", "warning", "info"].includes(val),
    },
    position: {
      type: String,
      required: false,
      default: "top",
      validator: (val) => ["top", "bottom"].includes(val),
    },
    timeout: {
      type: Number,
      required: false,
      default: 2000,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
