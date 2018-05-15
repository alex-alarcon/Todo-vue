<template>
  <label class="field__wrapper">
    {{ option }}
    <input 
      v-bind:option="option"
      name="filter__option"
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
  name: "FilterOption",
  props: {
    option: {
      type: String,
      required: true
    },
    checked: {
      type: String
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
