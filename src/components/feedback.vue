<template>
  <div :class="{dark: themeMode==='dark'}" class="chapter">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="backHome" aria-hidden="true" class="fa fa-angle-left"></i>
        </div>
        <div class="pageName">{{pageName}}</div>
      </div>
    </div>
    <div class="main">
      <div class="title mt-0"><span class="text">反馈类型</span></div>
      <div class="type-content">
        <label class="radio" for="improve">
          <span class="radio-bg"></span>
          <input checked="checked" id="improve" name="type" type="radio" value="改进建议"/> 改进建议
          <span class="radio-on"></span>
        </label>
        <label class="radio" for="bug">
          <span class="radio-bg"></span>
          <input id="bug" name="type" type="radio" value="Bug提交"/> Bug提交
          <span class="radio-on"></span>
        </label>
        <label class="radio" for="advice">
          <span class="radio-bg"></span>
          <input id="advice" name="type" type="radio" value="对开发者的话"/> 对开发者的话
          <span class="radio-on"></span>
        </label>
      </div>
      <div class="title"><span class="text">反馈内容（不超过300字呦）</span></div>
      <textarea></textarea>
      <div class="title"><span class="text">称呼（选填）</span></div>
      <input type="text" class="input name">
      <div class="title"><span class="text">邮箱</span></div>
      <input type="text" class="input mail">
      <button class="btn submit">
        <span class="icon-container">
          <i class="fa fa-rocket"></i>
            立即提交
          </span>
      </button>
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
        pageName: '意见反馈',
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'themeMode',
        'cardMode',
        'selectedProject',
        'selectedChapter',
      ]),
    },
    created() {
      // 调整主题模式
      if (typeof (localStorage.themeMode) !== 'undefined') {
        let type = JSON.parse(localStorage.themeMode);
        window.document.documentElement.setAttribute("data-theme", type);
        this.setThemeMode({type: type});
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'setThemeMode',
        'setSelectedChapter',
        'setProjectQuestionData',
      ]),

      backHome() {
        this.$router.push({name: 'home'});
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/_handle.scss";
  :root {
    .chapter.dark {
      --box-shadow: -1px -1px 3px 0 #636363,1px 1px 3px 0 #000!important;
      --box-shadow-inner: inset 1px 1px 5px 0 #000,inset -2px -2px 5px 0 #636363!important;
      --border-color: #26282b;
      --radio-color: #BF8A10!important;
      --bg-color: #26282b;
      --bg-btn-color: #26282b;
    }
    .chapter {
      --box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
      --box-shadow-inner: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px #fff;
      --border-color: #fff;
      --radio-color: #9fe3fb;
      --bg-color: #f4f6f8;
      --text-color: #000;
    }

  }


  .chapter {
    /*background-color: #f4f6f8;*/
    @include background('chapter_bg_color1');
    min-height: 100vh;
  }

  .dark {

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

  .main {
    padding: 20px;

    .title {
      margin: 5% 0;
      height: 30px;
      line-height: 30px;
      text-align: left;
      color: var(--text-color);

      .text {
        display: inline-block;
        text-align: left;
        border-radius: 5px;
        border: 1px solid var(--border-color);
        -webkit-box-shadow: var(--box-shadow);
        box-shadow: var(--box-shadow);
        padding: 2px 10px;
      }
    }

    .mt-0 {
      margin-top: 0;
    }
  }

  .type-content {
    margin: 20px 0;

    .radio {
      display: inline-block;
      position: relative;
      line-height: 18px;
      cursor: pointer;
      font-size: 14px;
      margin-right: 5px;

      input {
        display: none;
      }

      input:checked + span.radio-on {
        width: 10px;
        height: 10px;
        position: absolute;
        border-radius: 100%;
        top: 4px;
        left: 4px;
        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.4) inset;
        background: #FFFFFF linear-gradient(#ffffff 0, #e7e7e7 100%);
        transition: all 0.2s ease;
        transform: scale(1, 1);
        display: inline-block;
      }

      .radio-bg {
        display: inline-block;
        height: 18px;
        width: 18px;
        margin-right: 5px;
        padding: 0;
        background-color: var(--radio-color);
        border-radius: 100%;
        vertical-align: top;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1) inset, 0 1px 4px rgba(0, 0, 0, 0.1) inset, 1px -1px 2px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .radio-on {
        display: none;
      }
    }
  }
  textarea {
    min-width: 100%;
    width: 100%;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    height: 90px;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-inner);
    background-color: var(--bg-color);
  }

  textarea:focus,
  .input:focus {
    outline: 1px solid var(--radio-color);
  }

  .input {
    width: 100%;
    padding: 0 .3rem;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 14px;
    height: 40px;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-inner);
    background-color: var(--bg-color);
  }

  .btn.submit {
    text-align: center;
    margin-top: 10%;
    display: inline-block;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    -webkit-box-shadow: var(--box-shadow);
    box-shadow: var(--box-shadow);
    padding: 2px 10px;
    font-size: 16px;
    color: var(--radio-color);
    outline: none;
  }

  .btn.submit:active {
    background-color: #e7e9ef;
  }

</style>
