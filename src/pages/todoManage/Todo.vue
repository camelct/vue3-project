
<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodoFunc"
      />
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input
        class="toggle-all"
        id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, "item") }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key"
            >{{ capitalize(key) }}</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { mapState, mapActions } from "vuex";

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done),
};
export default {
  components: { TodoItem },
  data() {
    return {
      visibility: "all",
      filters: filters,
    };
  },
  computed: {
    ...mapState({
      todos(state) {
        return state.todo.todos;
      },
      allChecked(state) {
        return state.todo.todos.every((todo) => todo.done);
      },
      filteredTodos(state) {
        return filters[this.visibility](state.todo.todos);
      },
      remaining(state) {
        return state.todo.todos.filter((todo) => !todo.done).length;
      },
    }),
  },
  methods: {
    ...mapActions("todo", ["toggleAll", "clearCompleted", "addTodo"]),
    addTodoFunc(e) {
      const text = e.target.value;
      if (text.trim()) {
        // 以下两种写法都可以
        this.addTodo(text);
        // this.$store.dispatch("todo/addTodo", text);
      }
      e.target.value = "";
    },
    pluralize(n, w) {
      return n === 1 ? w : w + "s";
    },
    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
};
</script>