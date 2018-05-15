<template>
  <a
    class="button"
    v-bind:style="styles"
    v-on:click.prevent="onclick"
  >
    <i 
      class="fas"
      v-bind:class="'fa-' + icon"
    ></i>
  </a>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true
    },
    onclick: {
      type: Function,
      default() {
        return null;
      }
    },
    styles: {
      type: Object
    }
  }
};
</script>

<style lang="sass" scoped>
.button
  display: inline-block
  padding: 12px

  .fas
    font-size: 24px
</style>
