<template>
  <label 
    v-on:click="sort"
    class="field__wrapper"
  >
    {{ option }}
    <input 
      v-bind:option="option"
      name="sort__option"
      type="radio" 
      class="field__input"
      v-bind:value="option"
      v-on:change="updateValue($event.target.value)"
      v-bind:checked="checked"
    />
    <span class="field__cheackmark"></span>
  </label>
</template>

<script>
export default {
  name: "SortOption",
  props: {
    option: {
      type: String,
      required: true
    },
    checked: {
      type: String
    },
    sort: {
      type: Function
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>

</style>
