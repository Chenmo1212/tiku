<template>
  <div class="test" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i class="fa fa-angle-left" aria-hidden="true" @click="back"/>
        </div>
        <div>待办事项</div>
      </div>
    </div>
    <section class="todoapp">
      <header class="todo-header">
        <div class="left date">
          <div class="day">{{ currentDay }}</div>
          <div class="month">&nbsp;/&nbsp;{{ currentMonth }}</div>
        </div>
        <div class="right new-todo add-collab-bubble" id="new_todo">
          <div class="bubble-toggle" @click="showModal()"><i class="fa fa-plus" aria-hidden="true"/></div>
          <div class="add-todo-container">
            <div class="add-header">新增代办</div>
            <label>
            <textarea class="add-input"
                      autocomplete="off"
                      placeholder="写下你的代办事项"
                      v-model="newTodo" @keyup.enter="addTodo"/>
            </label>
            <div class="add-group">
              <div class="btn submit" @click="addTodo"><span>确定</span></div>
            </div>
            <div class="add-todo">
              <img src="../assets/add.png" alt="no to do">
            </div>
          </div>
        </div>
      </header>
      <section class="main" v-show="todos.length" v-cloak v-if="!addTodo_modal">
        <ul class="todo-list">
          <li v-for="todo in filteredTodos('active')"
              :key="todo.id"
              :class="{ completed: todo.completed}"
          >
            <label class='todo'>
              <input class="todo__state" type="checkbox"/>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25"
                   class="todo__icon" @click.stop="completedTodo(todo)">
                <use xlink:href="#todo__line" class="todo__line"/>
                <use xlink:href="#todo__box" class="todo__box"/>
                <use xlink:href="#todo__check" class="todo__check"/>
                <use xlink:href="#todo__circle" class="todo__circle"/>
              </svg>
              <span class="todo__text">{{ todo.title }}</span>
            </label>
            <div class="todo-del" @click="removeTodo(todo)"><i class="fa fa-close" aria-hidden="true"/></div>
          </li>
        </ul>

        <!--    show completed    -->
        <div id="mobileMenuLink" class="done-list" @click="showDoneList()" v-if="filteredTodos('completed').length">
          <div class="arrow">
            <div id="mobileArrow">
              <span class="left"/>
              <span class="spine"/>
              <span class="right"/>
            </div>
          </div>
          <div class="text">{{ hiddenCompletedTodo ? '显示' : '隐藏' }} 已待办事项 - {{ filteredTodos('completed').length }}
          </div>
        </div>

        <ul class="todo-list" v-if="!hiddenCompletedTodo">
          <li v-for="todo in filteredTodos('completed')"
              :key="todo.id"
              :class="{ completed: todo.completed}"
          >
            <label class="todo">
              <input class="todo__state" type="checkbox" checked="checked"/>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25"
                   class="todo__icon" @click="completedTodo(todo)">
                <use xlink:href="#todo__line" class="todo__line"/>
                <use xlink:href="#todo__box" class="todo__box"/>
                <use xlink:href="#todo__check" class="todo__check"/>
                <use xlink:href="#todo__circle" class="todo__circle"/>
              </svg>
              <span class="todo__text">{{ todo.title }}</span>
            </label>
            <div class="todo-del" @click="removeTodo(todo)"><i class="fa fa-close" aria-hidden="true"/></div>
          </li>
        </ul>
      </section>
      <section class="main" v-if="!todos.length">
        <div class="no-todo">
          <img src="../assets/none.png" alt="no to do">
        </div>
      </section>

      <!-- svg -->
      <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
        <defs>
          <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
            <stop offset="0%" stop-color="#599efb"/>
            <stop offset="100%" stop-color="#0FC0F5"/>
          </linearGradient>

          <linearGradient id="lineGradient">
            <stop offset="0%" stop-color="#0FC0F5"/>
            <stop offset="100%" stop-color="#599efb"/>
          </linearGradient>

          <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"/>
          <path id="todo__box" stroke="url(#boxGradient)"
                d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"/>
          <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"/>
          <circle id="todo__circle" cx="13.5" cy="12.5" r="10"/>
        </defs>
      </svg>
    </section>

    <audio id="Mp3Me" style="clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);" autobuffer controls>
      <source src="../assets/1.mp3">
    </audio>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "test",
    data() {
      return {
        todos: null,
        newTodo: "",
        editedTodo: null,
        visibility: "all",
        presetValues: [{
          "title": "我爱学习",
          "completed": false
        }, {
          "title": "沉迷学习无法自拔",
          "completed": false
        }, {
          "title": "优秀是一种习惯",
          "completed": false
        }, {
          "title": "我心中只有学习",
          "completed": false
        }, {
          "title": "如果你不爱学习，对不起，我们做不了朋友",
          "completed": true
        }],
        STORAGE_KEY: "todo-app",
        todoStorageUid: null,

        currentDay: '',
        currentMonth: '',

        hiddenCompletedTodo: false,
        addTodo_modal: false,

        fromRouterName: "home",
      }
    },
    created() {
      this.todos = this.todoStorageFetch();

      this.initDate();

      this.hiddenCompletedTodo = JSON.parse(localStorage.getItem('hiddenCompletedTodo')) || false;
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
      ...mapState([
        'themeMode',
        'todoData',
      ]),
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
    beforeRouteEnter(to, from, next) {
      // console.log(to, from); // 可以拿到 from， 知道上一个路由是什么，从而进行判断
      //在next中写处理函数
      next(vm => {
        vm.setFromRouter(from.name)
      });
    },
    methods: {
      ...mapActions([
        'setTodoData',
        'setWarning',
      ]),
      // beforeRouteEnter的处理函数，用来获取来源路由的名字
      setFromRouter(name) {
        this.fromRouterName = name;
      },
      back() {// 返回
        this.$router.push({name: this.fromRouterName})
      },
      filteredTodos: function (status) {
        // if (status === 'all') return this.filtersAll(this.todos);
        if (status === 'active') return this.filtersActive(this.todos);
        if (status === 'completed') return this.filterCompleted(this.todos);
      },

      showModal() {
        let btn = document.getElementById('new_todo');
        btn.classList.toggle("open");
        this.addTodo_modal = !this.addTodo_modal;
      },
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

        this.setTodoData(this.todos);
        this.newTodo = "";
        this.setWarning("添加成功")
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

      /**
       *  完成todo
       */
      completedTodo(todo) {
        const that = this;

        // console.log(that.todos.indexOf(todo));
        let index = that.todos.indexOf(todo);

        if (!that.todos[index].completed) {
          setTimeout(function () {
            that.getMusic()
          }, 800)
        }

        setTimeout(function () {
          that.todos[index].completed = !that.todos[index].completed;
          that.todoStorageSave(that.todos)
          // console.log(that.todos)
        }, 1300)
      },

      todoStorageFetch() {
        let todos = this.todoData || JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.presetValues;
        // // 防止本地存储的数据为空数组
        // if (!todos.length) todos = this.presetValues;

        todos.forEach(function (todo, index) {
          todo.id = index;
        });
        this.todoStorageUid = todos.length;
        // console.log('todos', todos)
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
      },
      showDoneList() {
        const arrowElem = document.getElementById('mobileArrow');
        arrowElem.classList.toggle('up');
        this.hiddenCompletedTodo = !this.hiddenCompletedTodo;
        localStorage.setItem('hiddenCompletedTodo', JSON.stringify(this.hiddenCompletedTodo))
      },

      getMusic() {
        var Mp3Me = document.getElementById('Mp3Me');
        Mp3Me.play();
      },

      /**
       * 初始化日期
       */
      initDate() {
        let myDate = new Date();
        const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', "July", "August", 'September', 'October', 'November', 'December']
        this.currentMonth = monthArr[myDate.getMonth()];
        this.currentDay = myDate.getDate();
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
  @import "../scss/_handle.scss";

  .test {
    @include background('bg_drawer_color1');
    position: relative;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }

  .dark {
    .todo-list li,
    .add-group .btn {
      border: 1px solid #26282b !important;
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }

    .todo__text,
    .add-input {
      color: #6c7885 !important;
    }

    .add-input {
      box-shadow: inset 5px 5px 10px #202225, inset -5px -5px 10px #2c2e31 !important;
    }
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

  .header {
    height: 60px;
    line-height: 60px;
    /*background-color: #f4f6f8;*/
    @include background('chapter_bg_color1');
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      margin-left: 20px;
      display: flex;
      align-items: center;

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        /*background-color: #f4f6f8;*/
        @include background('chapter_bg_color2');
        margin: 0;
        box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
        border: 1px solid;
        @include border_color('chapter_border_color1');
      }

      i {
        font-size: 30px;
        margin-right: 4px;
        display: block;
      }

      div {
        margin: 0 10px;
        font-size: 16px;
      }
    }
  }

  .todoapp {
    padding: 5% 20px;
    color: #6c7885;

    .todo-header {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
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
        //height: 30px;
        //width: 30px;
        line-height: 30px;
        font-size: 18px;
      }

      .add-collab-bubble {
        position: absolute;
        right: 0;
        height: 54px;
        width: 54px;
        @include background('bg_drawer_color1');
        transition: background 0.4s ease-out 0.4s, height 0.4s ease, width 0.4s ease,
        border-radius 0.4s ease, box-shadow 0.4s ease-out, top 1s ease, right 1s ease-out;
        z-index: 10;

        &.open {
          border-radius: 4px;
          width: 100%;
          height: 100%;
          top: 0;
          right: 0;
          //background: #f4f6f8;
          //border: 1px solid #fff;
          //box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
          transition: background 0.8s ease, height 0.8s ease, width 0.8s ease, border-radius 0.2s ease, box-shadow 0.2s ease,
          top 1s ease, right 1s ease;

          i {
            transform: rotate(45deg);
            transition: 0.24s ease-out;
            color: #6c7885;
            background: none;
          }
        }

        .bubble-toggle {
          position: absolute;
          top: 0;
          right: 0;
          height: 54px;
          width: 54px;
          z-index: 2;
          cursor: pointer;

          i {
            position: absolute;
            top: 18px;
            right: 20px;
            color: #6c7885;
            transition: 0.2s ease;
            transform-origin: center;

            &:before, &:after {
              transition: 0.2s ease;
            }
          }
        }

        .add-todo-container {
          position: relative;
          visibility: hidden;
          padding: 1em 5%;
          box-sizing: border-box;
          width: 100%;
          transition: visibility 0.5s;
          @include background('bg_drawer_color1');

          .add-header {
            padding: 10px 0;
            opacity: 0;
            transition: opacity 0.2s ease 0.1s;
          }

          .add-input {
            border: none;
            outline: none;
            max-width: 100%;
            max-height: 300px;
            min-width: 100%;
            min-height: 100px;
            padding: 10px;
            box-sizing: border-box;
            opacity: 0;
            @include background('todoInput_bg_color');
            box-shadow: inset 7px -7px 14px #e8e8ea, inset -7px 7px 14px #ffffff;
          }

          .add-group {
            display: flex;
            justify-content: center;
            margin-top: 5%;
            opacity: 0;

            .btn {
              border: 1px solid #fff;
              width: 90%;
              height: 36px;
              line-height: 36px;
              border-radius: 5px;
              box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: .3s ease;
              color: #599efb;
            }
          }
        }

        &.open .add-todo-container {
          .add-header,
          .add-input,
          .add-group {
            opacity: 1;
          }

          visibility: visible;
          transition: all 0.5s;
        }
      }

    }
  }

  .main {
    position: relative;
    z-index: 2;

    .done-list {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        cursor: pointer;
        display: block;
        font-size: 13px;
        line-height: 1.6em;
        padding: 15px 0;
        text-align: center;
        text-transform: uppercase;
      }

      .arrow {
        #mobileArrow {
          width: 15px;
          height: 15px;
          position: relative;
          z-index: -1;
          left: -15px;

          span {
            background: #a8a8a8;
            position: absolute;
            height: 100%;
            width: 2px;
            top: 0;
            left: 14px;
            -webkit-transition: all 500ms 250ms ease;
            transition: all 500ms 250ms ease;

            &.left, &.right {
              height: 60%;
            }

            &.left {
              top: -8px;
              left: 17px;
              -webkit-transform: translateY(15px) translateX(-6px) rotate(-45deg);
              transform: translateY(15px) translateX(-6px) rotate(-45deg);
            }

            &.right {
              top: -8px;
              left: 11px;
              -webkit-transform: translateY(15px) translatex(6px) rotate(45deg);
              transform: translateY(15px) translatex(6px) rotate(45deg);
            }
          }

          &.up span.left {
            -webkit-transform: translateY(6px) translateX(-6px) rotate(-315deg);
            transform: translateY(6px) translateX(-6px) rotate(-315deg);
          }

          &.up span.right {
            -webkit-transform: translateY(6px) translateX(6px) rotate(315deg);
            transform: translateY(6px) translateX(6px) rotate(315deg);
          }
        }
      }
    }

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
        stroke: #599efb;
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
    stroke: #599efb;
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
    stroke: #599efb;
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
