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
  import axios from 'axios'

  export default {
    name: "chapter",
    components: {
      detailVue,
    },
    data() {
      return {
        pageName: '更新日志',

        updateLogsList: [{
          date: '2020-11-30',
          version: 'version: 1.2.4',
          content: ['圣诞节来袭！！祝大家平安喜乐，万事胜意！！',
            '给大家开发了一个可以给头像加上圣诞帽的网站：<a href="https://chenmo1212.cn/Christmas">点此进入</a>']
        }, {
          date: '2020-11-30',
          version: 'version: 1.2.4',
          content: ['修复模拟考试多选题顺序不同导致判错bug~',
            '修复判断题答案错误~',
            '修复选项自动切换bug~',
            '优化部分细节~']
        }, {
          date: '2020-11-28',
          version: 'version: 1.2.2',
          content: ['修复考试结果页面分数不显示bug~ ',
            '支持电脑端键盘快速答题~',
            '优化部分细节~']
        }, {
          date: '2020-11-24',
          version: 'version: 1.2.0',
          content: ['题库内容已更新~',
            '新增模拟考试模式~',
            '音乐播放器支持传入歌单链接~',
            '优化部分细节~']
        }, {
          date: '2020-11-21',
          version: 'version: 1.1.0',
          content: ['网站使用CDN加速，打开速度更快了~',
            '题库内容已更新~',
            '音乐播放器支持传入歌单链接~',
            '优化部分细节~',
            '模拟期末考试功能正在开发（大四有点忙，会尽快完成的）']
        }, {
          date: '2020-9-28',
          version: 'version: 1.1.0',
          content: ['增加todo功能~']
        }, {
          date: '2020-9-25',
          version: 'version: 1.0.7',
          content: ['更换全局成抽屉样式~']
        }, {
          date: '2020-8-29',
          version: 'version: 1.0.6',
          content: ['支持键盘监听，可以用键盘切换题目~']
        }, {
          date: '2020-8-27',
          version: 'version: 1.0.5',
          content: ['增加反馈机制~',
            '题库网站的域名更换啦~',]
        }, {
          date: '2020-8-6',
          version: 'version: 1.0.4',
          content: ['增加音乐播放器~',
            '增加全局悬浮音乐控制按钮~',]
        }, {
          date: '2020-7-30',
          version: 'version: 1.0.3',
          content: ['页面懒加载~',
            '增加全屏功能~',]
        }, {
          date: '2020-7-23',
          version: 'version: 1.0.2',
          content: ['增加卡片模式~']
        }, {
          date: '2020-7-16',
          version: 'version: 1.0.1',
          content: ['增加黑夜模式~']
        }, {
          date: '2020-7-9',
          version: 'version: 1.0.0',
          content: ['长理web端新拟态题库来了~']
        }]
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
        'setWarning',
        'setProjectQuestionData',
      ]),

      backHome() {
        this.$router.push({name: 'home'});
      },

      /**
       * 反馈类型
       * @param index 下标
       */
      handleType(index) {
        console.log(index);

        let type1 = document.getElementById('improve');
        let type2 = document.getElementById('bug');
        let type3 = document.getElementById('advise');

        switch (index) {
          case 1:
            this.type = '改进建议';
            type1.checked = "checked";
            type2.checked = "";
            type3.checked = "";
            break;
          case 2:
            this.type = 'Bug提交';
            type1.checked = "";
            type2.checked = "checked";
            type3.checked = "";
            break;
          case 3:
            this.type = '对开发者的话';
            type1.checked = "";
            type2.checked = "";
            type3.checked = "checked";
            break;
        }
      },
      /**
       * 移除警告状态
       */
      removeWarning() {
        document.getElementById("content").classList.remove("warning");
        document.getElementById("mail").classList.remove("warning");
      },

      /**
       * 检测邮箱格式是否正确
       * @returns {boolean} 正确与否
       */
      checkMail() {
        let email = this.mail;
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (reg.test(email)) {
          console.log("邮箱格式正确");
          return true
        } else {
          console.log("邮箱格式不正确");
          document.getElementById("mail").classList.add("warning");
          this.setWarning("邮箱格式不正确");
          return false
        }
      },
      /**
       * 检测反馈内容是否正确
       * @returns {boolean} 正确与否
       */
      checkContent() {
        let content = this.feedCont;
        if (content) {
          console.log("反馈内容不为空");
          return true
        } else {
          console.log("反馈内容为空");
          document.getElementById("content").classList.add("warning");
          this.setWarning("反馈内容不得为空");
          return false
        }
      },

      /**
       * 提交
       */
      submitBug() {
        // 检测邮箱
        if (!this.checkMail()) return;
        // 检测反馈内容
        if (!this.checkContent()) return;

        let content = `#### 反馈类型：\n\n${this.type}\n\n---\n\n#### 反馈内容：\n\n${this.feedCont}\n\n---\n\n#### 称呼：\n\n${this.name}\n\n---\n\n#### 联系方式：\n\n${this.mail}`;

        let SCKEY = 'SCT25268TK4j67c5FaUBd7RVWlNas3kcN';
        let url = 'https://sctapi.ftqq.com/' + SCKEY + '.send';

        let params = new URLSearchParams();
        params.append('text', 'Little cookie 用户反馈');
        params.append('desp', content);

        axios.post(url, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
        }).then((res) => {
          console.log("返回的值" + res);
          this.setWarning("提交成功！感谢您的反馈！");
          this.type = '';
          this.mail = '';
          this.name = '';
          this.feedCont = ''
        }).catch(err => {
          console.log("错误" + err);
          this.setWarning("提交成功了！感谢您的反馈！");
          this.type = '';
          this.mail = '';
          this.name = '';
          this.feedCont = ''
        });
      }
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
          background: #D3DCE6;
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
            text-shadow: 0 1px rgba(255, 255, 255, .5);
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
