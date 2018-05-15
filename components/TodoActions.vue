<template>
  <div class="buttons">
    <IconButton
      v-if="isCompleted"
      icon="check-square"
      v-bind:onclick="toggle"
    />

    <IconButton
      v-else
      icon="square"
      v-bind:onclick="toggle"
    />

    <IconButton
      v-if="!isEditing"
      icon="pencil-alt" 
      v-bind:onclick="edit"
    />

    <template
      v-else
    >
      <IconButton 
        icon="times"
        v-bind:onclick="edit"
      />
      <IconButton
        icon="save" 
        v-bind:onclick="save"
      />
    </template>
    
    <IconButton 
      icon="trash-alt"
      v-bind:styles="{'color': '#a10c0c'}"
      v-bind:onclick="remove"
    />
  </div>
</template>

<script>
import IconButton from "@/../components/IconButton";

export default {
  name: "TodoActions",
  data: function() {
    return {
      removeStyles: {
        color: "#a10c0c"
      }
    };
  },
  props: {
    print: {
      type: Function
    },
    remove: {
      type: Function
    },
    edit: {
      type: Function
    },
    save: {
      type: Function
    },
    toggle: {
      type: Function
    },
    isEditing: {
      type: Boolean
    },
    isCompleted: {
      type: Boolean
    }
  },
  components: {
    IconButton
  }
};
</script>

<style lang="sass" scoped>

.buttons
  bottom: 0
  width: 100%
  border-top: 1px solid #000000
  background-color: rgba(97, 160,	112, 0.5)
  text-align: right

  &.active
    background-color: rgba(171,	162, 155, 0.5)

</style>
