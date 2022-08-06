<!-- 报警信息列表 -->
<template>
  <div class="alarmInformationList-container">
    <!-- header -->
    <header class="header">
      <h1 style="margin-top: 0px;">报警信息列表</h1>
    </header>
    <!-- main section -->
    <section>
      <ul class="todo-list">
        <li v-for="(item, index) in todos" :key="index">
          {{item.datetime}}
          <br />
          <span style="color:darkred;">{{item.text}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Todo from "./TodoList/Todo.vue";

const STORAGE_KEY = "todos";
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};
const defalutList = [
  {
    datetime: "2022-07-21 13:35:56",
    text: "star this repository",
    done: false
  },
  {
    datetime: "2022-07-21 13:35:56",
    text: "fork this repository",
    done: false
  },
  { datetime: "2022-07-21 13:35:56", text: "follow author", done: false },
  { datetime: "2022-07-21 13:35:56", text: "vue-element-admin", done: true },
  { datetime: "2022-07-21 13:35:56", text: "vue", done: true },
  { datetime: "2022-07-21 13:35:56", text: "element-ui", done: true }
];
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  props: ["alarmList"],
  data() {
    return {
      visibility: "all",
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList
    };
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length;
    }
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        });
        this.setLocalStorage();
      }
      e.target.value = "";
    },
    toggleTodo(val) {
      val.done = !val.done;
      this.setLocalStorage();
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.setLocalStorage();
    },
    editTodo({ todo, value }) {
      todo.text = value;
      this.setLocalStorage();
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done);
      this.setLocalStorage();
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done;
        this.setLocalStorage();
      });
    }
  }
};
</script>
<style>
@import "./TodoList/index.scss";
.alarmInformationList-container {
  width: 100%;
  background-color: #95b7e1;
  height: 100%;
}
</style>