<template>
  <div :class="{dark: themeMode==='dark'}" class="chapter">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="back" aria-hidden="true" class="fa fa-angle-left"/>
        </div>
        <div class="pageName">{{pageName}}</div>
      </div>
    </div>
    <div class="body">
      <ul>
        <li v-for="value in updateLogsList">
          <div class="date silver-color"><span>{{value.version}}</span></div>
          <div class="main">
            <h2 id="h2-1">{{value.date}}</h2>
            <p v-for="(logItem, index) in value.content">{{index+1}}. <span v-html="logItem"/></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import detailVue from './cardDetail'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "chapter",
    components: {
      detailVue,
    },
    data() {
      return {
        pageName: '更新日志',
        fromRouterName: "home",
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'themeMode',
        'updateLogsList',
      ]),
    },
    created() {
      // 调整主题模式
      if (typeof (localStorage.themeMode) !== 'undefined') {
        let type = localStorage.themeMode;
        window.document.documentElement.setAttribute("data-theme", type);
        this.setThemeMode({type: type});
      }
    },
    mounted() {
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
        'setThemeMode',
        'setWarning',
        'setProjectQuestionData',
      ]),
      // beforeRouteEnter的处理函数，用来获取来源路由的名字
      setFromRouter(name) {
        this.fromRouterName = name;
      },
      back() {// 返回
        this.$router.push({name: this.fromRouterName})
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/_handle.scss";

  :root {
    .chapter.dark {
      --box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 #000 !important;
      --box-shadow-inner: inset 1px 1px 5px 0 #000, inset -2px -2px 5px 0 #636363 !important;
      --border-color: #26282b;
      --radio-color: #BF8A10 !important;
      --bg-color: #26282b;
      --bg-btn-color: #26282b;
      --text-color: #BF8A10;
      --text-btn-color: #BF8A10;
    }

    .chapter {
      --box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
      --box-shadow-inner: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px #fff;
      --border-color: #fff;
      --radio-color: #9fe3fb;
      --bg-color: #f4f6f8;
      --text-color: #000;
      --text-btn-color: #3ae7fb;
    }
  }

  .chapter {
    /*background-color: #f4f6f8;*/
    @include background('chapter_bg_color1');
    min-height: 100vh;
  }

  .dark {
    .main {
      background: #26282b !important;

      &:before {
        background: none!important;
      }

      &:after {
        border-right: 6px solid #26282b !important
      }

      p .link {
        color: #BF8A10!important;
      }
    }
    p, p span {
      color: #a2b1ca!important;
    }
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
        box-shadow: var(--box-shadow);
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
        color: var(--text-color);
      }
    }
  }

  .body {
    padding: 0 20px 20px 0;

    ul {
      margin-top: 15px;
      margin-left: 15px;
      padding: 0 0 20px;
      border-left: 1px solid #cad1db;
      -webkit-box-shadow: 1px 0 rgba(255, 255, 255, .7) inset;
      box-shadow: 1px 0 rgba(255, 255, 255, .7) inset;
      position: relative;

      &:before, &:after {
        content: "";
        position: absolute;
        width: 9px;
        height: 9px;
        background: -webkit-gradient(linear, left top, left bottom, from(#98a3b3), to(#d8e0ea));
        background: -webkit-linear-gradient(#98a3b3, #d8e0ea);
        background: linear-gradient(#98a3b3, #d8e0ea);
        -webkit-box-shadow: 0 0 0 1px #a4b2c6 inset, 0 0 0 2px #d8e0ea inset, 0 4px 3px rgba(166, 180, 199, .4);
        box-shadow: 0 0 0 1px #a4b2c6 inset, 0 0 0 2px #d8e0ea inset, 0 4px 3px rgba(166, 180, 199, .4);
        left: -5px;
        border-radius: 50%;
      }

      &:before {
        top: 0;
      }

      li {
        display: block;
        list-style: none;
        position: relative;
        margin-left: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-transition: .25s;
        transition: .25s;

        &:hover {
          -webkit-transform: translateY(6px);
          transform: translateY(6px);

          .date span {
            opacity: 1;
            -webkit-transform: translateY(-3px);
            transform: translateY(-3px)
          }

          .main {
            -webkit-box-shadow: 0 0 0 1px rgba(255, 255, 255, .4) inset, 0 3px 3px rgba(31, 45, 61, .2);
            box-shadow: 0 0 0 1px rgba(255, 255, 255, .4) inset, 0 3px 3px rgba(31, 45, 61, .2)
          }
        }

        .main {
          position: relative;
          display: inline-block;
          /*background: #D3DCE6;*/
          background: linear-gradient(0deg, rgba(255, 255, 255, .5), rgba(255, 255, 255, 0) 10px) #D3DCE6;
          border-radius: 13px;
          border: 1px solid #acbacc;
          padding: 5px 15px;
          -webkit-box-shadow: 0 0 0 1px rgba(255, 255, 255, .4) inset, 0 13px 15px rgba(31, 45, 61, .15);
          box-shadow: 0 0 0 1px #ffffff66 inset, 0 13px 15px #1f2d3d26;
          width: 90%;
          -webkit-transition: .25s;
          transition: .25s;

          &:before {
            content: "";
            display: block;
            position: absolute;
            left: 4px;
            top: 0;
            right: 4px;
            height: 20px;
            border-radius: 10px;
            background: rgba(255, 255, 255, .5);
            background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, .2)));
            background: -webkit-linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, .2));
            background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, .2))
          }

          p {
            margin: 4px 0
          }

          * {
            /*text-shadow: 0 1px rgba(255, 255, 255, .5);*/
            color: #5d6b7d;
            font-size: 13px;
            position: relative;
            z-index: 1
          }
        }
      }

      .date {
        height: 16px;

        &:before, &:after {
          top: 29px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          z-index: 1
        }

        span {
          font-size: 12px;
          opacity: 0;
          -webkit-transform: translateY(13px);
          transform: translateY(13px);
          display: inline-block;
          -webkit-transition: .25s;
          transition: .25s
        }
      }
    }

    ul .date:after, ul .date:before, ul .main:after, ul > li:before {
      content: "";
      position: absolute
    }

    ul .main img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      -webkit-box-shadow: 0 1px rgba(255, 255, 255, .5);
      box-shadow: 0 1px rgba(255, 255, 255, .5)
    }

    ul .date:before {
      border-right: 6px solid #acbacc;
      left: -5px
    }

    ul .date:after {
      border-right: 6px solid #e5eaf0;
      left: -4px
    }

    ul .main:after {
      border-top: 6px solid transparent;
      border-right: 6px solid #D3DCE6;
      border-bottom: 6px solid transparent;
      top: 12px;
      z-index: 1;
      left: -3px
    }

    ul > li:before {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #a6b4c7;
      left: -24px;
      top: 32px;
      -webkit-box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px #f0f2f7 inset;
      box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px #f0f2f7 inset
    }

    li, ul {
      padding: 0;
      text-align: left;
      /*margin: 0;*/
      display: block;
      list-style: none
    }

  }
</style>
