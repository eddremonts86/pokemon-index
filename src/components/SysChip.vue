<template>
  <div>
    <v-chip
      v-for="(item, key) in items"
      :key="`chip-key-${key}`"
      :color="color"
      class="ma-1"
      :label="label"
    >
      <v-icon class="mx-2" v-if="hasIcon">{{ icon }}</v-icon>
      {{ item }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "SysChip",
  props: {
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    label: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "mdi-tag-outline",
    },
  },
};
</script>

<style></style>
