<template>
	<div class="container">
    <div 
      class="todoList"
      v-if="filteredTodo.length"
    >
      <Todo 
        v-for="todo in filteredTodo"
        v-bind:todo="todo"
        v-bind:key="todo.id"
        v-bind:printId="printId"
        v-bind:removeTodo="removeTodo"
        v-bind:editTodo="editTodo"
        v-bind:toggleState="toggleState"
      />
    </div>

    <p v-else>No hay TODOS</p>

    <div class="options">
      <div class="filters">
        <FilterOption 
          option="All"
          v-model="visibility"
          checked=true
        />

        <FilterOption 
          option="Completed"
          v-model="visibility"
        />

        <FilterOption 
          option="Active"
          v-model="visibility"
        />
      </div>

      <div class="sort">
        <SortOption 
          option="alphaDesc"
          v-model="currentSort"
          v-bind:sort="sort"
          checked=true
        />

        <SortOption 
          option="alphaAsc"
          v-model="currentSort"
          v-bind:sort="sort"
        />

        <SortOption 
          option="dateDesc"
          v-model="currentSort"
          v-bind:sort="sort"
        />

        <SortOption 
          option="dateAsc"
          v-model="currentSort"
          v-bind:sort="sort"
        />
      </div>

      <div 
        class="remove"
        v-if="exitsCompleted"
      > 
        <a v-on:click.prevent="removeCompleted"> 
          Remove completed
        </a>
      </div>

      <Modal 
        v-bind:show="show"
        v-bind:create="createTodo"
        v-bind:toggleModal="toggleModal"
      />

      <IconButton 
        icon="plus"
        v-bind:onclick="toggleModal"
      />
    </div>
	</div>
</template>

<script>
import Todo from "@/../components/Todo";
import Modal from "@/../components/Modal";
import IconButton from "@/../components/IconButton";
import SortOption from "@/../components/SortOption";
import FilterOption from "@/../components/FilterOption";

const filters = {
  All(todos) {
    return todos;
  },

  Completed(todos) {
    return todos.filter(todo => todo.completed);
  },

  Active(todos) {
    return todos.filter(todo => !todo.completed);
  }
};

const sorts = {
  alphaDesc(a, b) {
    if (a.title > b.title) return -1;
    else if (a.title < b.title) return 1;
    else return 0;
  },
  alphaAsc(a, b) {
    return a.title.localeCompare(b.title);
  },
  dateDesc(a, b) {
    return b.createdAt - a.createdAt;
  },
  dateAsc(a, b) {
    return a.createdAt - b.createdAt;
  }
};

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

export default {
  name: "TodoList",
  data() {
    return {
      show: false,
      visibility: "All",
      currentSort: "alphaAsc",
      todoList: []
    };
  },
  methods: {
    printId(id) {
      console.log(id);
    },
    createTodo(newTodo) {
      newTodo = {
        ...newTodo,
        id: +new Date(),
        createdAt: +new Date(),
        completedAt: null,
        updatedAt: +new Date(),
        completed: false
      };

      this.todoList = this.todoList.concat(newTodo);
      this.$storage.save(this.todoList);
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);

      this.$storage.save(this.todoList);
    },
    editTodo(editedTodo) {
      this.todoList = this.todoList.map(todo => {
        if (todo.id === editedTodo.id) {
          return {
            ...todo,
            ...editedTodo
          };
        } else {
          return todo;
        }
      });

      this.$storage.save(this.todoList);
    },
    toggleState(id) {
      this.todoList = this.todoList.map(todo => {
        if (todo.id === id) {
          let newCompletedAt;
          newCompletedAt = todo.completed ? null : +new Date();

          return {
            ...todo,
            completed: !todo.completed,
            completedAt: newCompletedAt
          };
        } else {
          return todo;
        }
      });

      this.$storage.save(this.todoList);
    },
    removeCompleted() {
      this.todoList = filters.Active(this.todoList);

      this.$storage.save(this.todoList);
    },
    sort() {
      if (this.currentSort === "alphaDesc") {
        return (this.todoList = this.todoList.slice().sort(sorts.alphaDesc));
      } else if (this.currentSort === "alphaAsc") {
        return (this.todoList = this.todoList.slice().sort(sorts.alphaAsc));
      } else if (this.currentSort === "dateDesc") {
        return (this.todoList = this.todoList.slice().sort(sorts.dateDesc));
      } else {
        return (this.todoList = this.todoList.slice().sort(sorts.dateAsc));
      }
    },
    toggleModal() {
      this.show = !this.show;
    },
    readAll() {
      return this.$storage.getData();
    }
  },
  computed: {
    visibleTodo() {
      return pipe(this.sort, this.filteredTodo);
    },
    filteredTodo() {
      return filters[this.visibility](this.todoList);
    },
    exitsCompleted() {
      return this.todoList.length > 0 ? filters.Completed(this.todoList).length : 0;
    }
  },
  components: {
    Todo,
    IconButton,
    FilterOption,
    SortOption,
    Modal
  },
  mounted() {
    this.todoList = this.readAll() || [];
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.container
  margin: 0 auto
  max-width: 480px
  max-height: 600px
  overflow: auto
  padding-top: 16px
  padding-left: 16px
  padding-right: 16px
  border: 1px solid #000000

  &::-webkit-scrollbar
    display: none

.todoList
  height: 400px
  max-height: 400px
  overflow-y: scroll

  &::-webkit-scrollbar
    display: none

.options
  bottom: 0
  width: 100%
  margin-top: 16px
  border-top: 1px solid #000000

.remove
  text-align: right
  font-style: italic

  & a
    cursor: context-menu
</style>
