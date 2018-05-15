<template>
  <div class="todo">
    <h3
      ref="title"
      v-bind:contenteditable="isEditing"
      class="todo__title">
      {{ todo.title }}
    </h3>
    
    <p
      ref="desc"
      v-bind:contenteditable="isEditing"
      v-if="!todo.completed || isEditing" 
      class="todo__desc"
    > 
      {{ todo.description }}
    </p>

    <p 
      v-else
      class="todo__completed"
    >
      Completed at: 
      {{ new Date(todo.completedAt).toLocaleString() }}
    </p>

    <TodoActions
      v-bind:is-completed="todo.completed"
      v-bind:is-editing="isEditing"
      v-bind:id="todo.id"
      v-bind:print="print"
      v-bind:remove="remove"
      v-bind:edit="edit"
      v-bind:save="save"
      v-bind:toggle="toggle"
      v-bind:class="{ active: todo.completed }"
    />
  </div>
</template>

<script>
import TodoActions from "@/../components/TodoActions";

export default {
  name: "Todo",
  data() {
    return {
      isEditing: false,
      editedTodo: {}
    };
  },
  props: {
    todo: {
      type: Object
    },
    printId: {
      type: Function
    },
    removeTodo: {
      type: Function
    },
    editTodo: {
      type: Function
    }, 
    toggleState: {
      type: Function
    }
  },
  components: {
    TodoActions
  },
  methods: {
    print() {
      this.printId(this.todo.id);
    },
    remove() {
      this.removeTodo(this.todo.id);
    },
    edit() {
      this.isEditing = !this.isEditing;

      if (this.isEditing === false) {
        this.$refs.title.innerText = this.todo.title;
        this.$refs.desc.innerText = this.todo.description;
      }
    },
    save() {
      let title = this.$refs.title.innerText;
      let desc = this.$refs.desc.innerText;
      if(!this.$validator.isEmpty(title, desc)) {
        this.editTodo({
          id: this.todo.id,
          title: title,
          description: desc,
          updatedAt: +new Date()
        });
      } else {
        this.$refs.title.innerText = this.todo.title;
        this.$refs.desc.innerText = this.todo.description;
      }

      this.isEditing = false;
    },
    toggle() {
      this.toggleState(this.todo.id);
    }
  }
};
</script>

<style lang="sass" scoped>
.todo
  position: relative
  display: block
  min-width: 320px
  border: 1px solid #000000
  border-top-left-radius: 10px
  border-bottom-right-radius: 10px

  + .todo
    margin-top: 16px

.todo__title
  height: 32px
  line-height: 32px
  margin-left: 16px
  margin-right: 16px
  font-size: 24px 
  text-align: left

  & + .buttons
    margin-top: 16px

  &:focus
    outline: none

.todo__desc
  height: 70px
  border-top: 1px solid #000000

  &:focus
    outline: none

.todo__completed
  padding-right: 8px
  padding-bottom: 8px
  font-size: 12px
  font-style: italic
  text-align: right
</style>
