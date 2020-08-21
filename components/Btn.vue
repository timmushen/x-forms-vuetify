<template>
  <v-hover v-slot:default="{ hover }">
    <v-btn
      v-bind="$attrs"
      :color="color"
      :depressed="depressed"
      :elevation="hover ? 4 : 0"
      v-on="$listeners"
      class="caption"
    >
      <slot></slot>
    </v-btn>
  </v-hover>
</template>

<script>
export default {
  props: {
    color: {
      default: "primary"
    },
    depressed: {
      default: false
    },
    timeout: {
      default: 3000
    }
  },
  data() {
    return {
      loader: null,
      loading: false
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), this.timeout);

      this.loader = null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
