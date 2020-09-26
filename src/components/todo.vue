<template>
  <div class="test">
    <section class="todoapp">
      <header class="header">
        <div class="left date">
          <div class="day">16</div>
          <div class="month">&nbsp;/&nbsp;April</div>
        </div>
        <div class="right new-todo" @click="addTodo">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <ul class="todo-list">
          <li v-for="todo in filteredTodos"
              :key="todo.id"
              :class="{ completed: todo.completed}">
            <label class="todo">
              <input class="todo__state" type="checkbox"/>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25"
                   class="todo__icon">
                <use xlink:href="#todo__line" class="todo__line"></use>
                <use xlink:href="#todo__box" class="todo__box"></use>
                <use xlink:href="#todo__check" class="todo__check"></use>
                <use xlink:href="#todo__circle" class="todo__circle"></use>
              </svg>
              <span class="todo__text">{{todo.title}}</span>
            </label>
            <div class="todo-del" @click="removeTodo(todo)"><i class="fa fa-close" aria-hidden="true"></i></div>
          </li>
        </ul>
      </section>

      <!-- svg -->
      <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
        <defs>
          <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
            <stop offset="0%" stop-color="#27FDC7"/>
            <stop offset="100%" stop-color="#0FC0F5"/>
          </linearGradient>

          <linearGradient id="lineGradient">
            <stop offset="0%" stop-color="#0FC0F5"/>
            <stop offset="100%" stop-color="#27FDC7"/>
          </linearGradient>

          <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"></path>
          <path id="todo__box" stroke="url(#boxGradient)"
                d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>
          <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>
          <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
        </defs>
      </svg>
    </section>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      todos: null,
      newTodo: "",
      editedTodo: null,
      visibility: "all",
      presetValues: [{
        "title": "Wake up at 5am1111",
        "completed": true
      }, {
        "title": "Learn how to use Vue.js11111Learn how to use Vue.js11111Learn how to use Vue.js11111",
        "completed": false
      }, {
        "title": "Drink coffee1111",
        "completed": false
      }, {
        "title": "Drink coffee1111",
        "completed": false
      }, {
        "title": "Drink coffee1111",
        "completed": false
      }],
      STORAGE_KEY: "todo-app",
      todoStorageUid: null,
    }
  },
  created() {
    this.todos = this.todoStorageFetch();
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        this.todoStorageSave(todos);
      },
      deep: true
    }
  },

  computed: {
    filteredTodos: function () {
      if (this.visibility === 'all') return this.filtersAll(this.todos);
      if (this.visibility === 'active') return this.filtersActive(this.todos);
      if (this.visibility === 'completed') return this.filterCompleted(this.todos);
    },
    remaining: function () {
      return this.filtersActive(this.todos).length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },
  filters: {},
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: this.todoStorageUid++,
        title: value,
        completed: false
      });

      console.log(this.todos)

      this.newTodo = "";
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function () {
      this.todos = this.filtersActive(this.todos);
    },

    todoStorageFetch() {
      let todos = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.presetValues;
      // 防止本地存储的数据为空数组
      if (!todos.length) todos = this.presetValues;

      todos.forEach(function (todo, index) {
        todo.id = index;
      });
      this.todoStorageUid = todos.length;
      console.log(todos)
      return todos;
    },
    todoStorageSave(todos) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    },

    filtersAll(todos) {
      return todos;
    },
    filtersActive(todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    filterCompleted: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed;
      });
    },
    pluralize: function (n) {
      return n === 1 ? "task" : "tasks";
    }

  },
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.test {
  background-color: #f4f6f8;
}

html,
body {
  margin: 0;
  padding: 0;
}

a, button {
  -webkit-transition: color .3s ease;
  transition: color .3s ease;
}

input[type=checkbox], a, button {
  cursor: pointer;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Noto Sans HK', sans-serif;
  font-size: 12px;
  line-height: 1.4em;
  background: #d5d7de;
  color: #000;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

.todoapp {
  padding: 5% 20px;
  color: #6c7885;

  .header {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //background-color: #e7e9ef;

    .left.date {
      display: flex;
      align-items: flex-end;

      .day {
        font-weight: 700;
        font-size: 44px;
      }

      .month {
        padding-bottom: 5px;
        font-size: 24px;
      }
    }

    .right.new-todo {
      height: 30px;
      width: 30px;
      line-height: 30px;
      font-size: 18px;
    }
  }
}

.main {
  position: relative;
  z-index: 2;
}

.todo-list {
  margin: 13px 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  margin-bottom: 15px;
  height: 60px;
  line-height: 60px;
  text-align: left;
  padding: 0 15px;
  color: #6c7885;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 2px solid #fff;
  -webkit-box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
  box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;

  .todo {
    min-width: 80%;
    max-width: 90%;
    position: relative;
    display: flex;
    justify-content: center;

    .todo__state {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    .todo__text {
      display: inline-block;
      color: #135156;
      width: 100%;
      -webkit-transition: all 0.4s linear 0.4s;
      transition: all 0.4s linear 0.4s;
      margin-left: 10%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1;
    }

    .todo__icon {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -4%;
      width: 100%;
      height: 60px;
      margin: auto;
      fill: none;
      stroke: #27FDC7;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;

      .todo__line,
      .todo__box,
      .todo__check {
        -webkit-transition: stroke-dashoffset 0.8s cubic-bezier(0.9, 0, 0.5, 1);
        transition: stroke-dashoffset 0.8s cubic-bezier(0.9, 0, 0.5, 1);
      }
    }
  }
}

@-webkit-keyframes explode {
  30% {
    stroke-width: 3;
    stroke-opacity: 1;
    -webkit-transform: scale(0.8) rotate(40deg);
    transform: scale(0.8) rotate(40deg);
  }
  100% {
    stroke-width: 0;
    stroke-opacity: 0;
    -webkit-transform: scale(1.1) rotate(60deg);
    transform: scale(1.1) rotate(60deg);
  }
}

.todo__circle {
  stroke: #27FDC7;
  stroke-dasharray: 1, 6;
  stroke-width: 0;
  -webkit-transform-origin: 13.5px 12.5px;
  transform-origin: 13.5px 12.5px;
  -webkit-transform: scale(0.4) rotate(0deg);
  transform: scale(0.4) rotate(0deg);
  -webkit-animation: none 0.8s linear;
  animation: none 0.8s linear;
}

@keyframes explode {
  30% {
    stroke-width: 3;
    stroke-opacity: 1;
    -webkit-transform: scale(0.8) rotate(40deg);
    transform: scale(0.8) rotate(40deg);
  }
  100% {
    stroke-width: 0;
    stroke-opacity: 0;
    -webkit-transform: scale(1.1) rotate(60deg);
    transform: scale(1.1) rotate(60deg);
  }
}

.todo__box {
  stroke-dasharray: 56.1053, 56.1053;
  stroke-dashoffset: 0;
  -webkit-transition-delay: 0.16s;
  transition-delay: 0.16s;
}

.todo__check {
  stroke: #27FDC7;
  stroke-dasharray: 9.8995, 9.8995;
  stroke-dashoffset: 9.8995;
  -webkit-transition-duration: 0.32s;
  transition-duration: 0.32s;
}

.todo__line {
  stroke-dasharray: 168, 1684;
  stroke-dashoffset: 168;
}

.todo__circle {
  -webkit-animation-delay: 0.56s;
  animation-delay: 0.56s;
  -webkit-animation-duration: 0.56s;
  animation-duration: 0.56s;
}

.todo__state:checked ~ .todo__text {
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
  color: #5EBEC1;
  opacity: 0.6;
}

.todo__state:checked ~ .todo__icon .todo__box {
  stroke-dashoffset: 56.1053;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

.todo__state:checked ~ .todo__icon .todo__line {
  stroke-dashoffset: -8;
}

.todo__state:checked ~ .todo__icon .todo__check {
  stroke-dashoffset: 0;
  -webkit-transition-delay: 0.48s;
  transition-delay: 0.48s;
}

.todo__state:checked ~ .todo__icon .todo__circle {
  -webkit-animation-name: explode;
  animation-name: explode;
}
</style>
