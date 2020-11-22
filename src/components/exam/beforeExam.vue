<template>
  <div :class="{dark: themeMode==='dark'}" class="beforeExam">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="backHome" aria-hidden="true" class="fa fa-angle-left"></i>
        </div>
        <div class="pageName">{{ pageName }}</div>
      </div>
    </div>
    <div class="main">
      <div class="main-container">
        <!--封面-->
        <div class="card-cover">
          <!--<svg-icon iconClass="maogai"></svg-icon>-->
          <svg-icon iconClass="exam"></svg-icon>
        </div>

        <!-- 文字-->
        <div class="content">
          <div class="content-hd">考前须知</div>
          <div class="content-bd">1. 试题来源：模拟考试中的题目均从现有题库中随机抽取，题目总数为 <strong>100</strong>道。</div>
          <div class="content-bd">
            2. 题型分布：模拟考试的题型分布为：<strong>单：多：判 = 5:3:2</strong>。<br>
            (C语言:单:填 = 7:3; &nbsp; 近代史:单:多 = 7:3)
          </div>
          <div class="content-bd">
            3. 试题答案：模拟考试中的试题答案仅作为参考，若答案有误，务必进行反馈。
          </div>
        </div>
        <!-- 开始考试 -->
        <div class="start-exam">
          <div class="card-btn">
            <button class="btn begin" style="color: rgb(0, 176, 255);">
              <span class="icon-container">
                <i class="fa fa-rocket"></i>开始考试
          </span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailVue from '../cardDetail'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'

export default {
  name: "chapter",
  components: {
    detailVue,
  },
  data() {
    return {
      pageName: '模拟考试',

      type: '改进建议',
      feedCont: '',
      mail: '',
      name: '',
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

      let SCKEY = 'SCU111050Tdb28e1d031b1b4a87d4cdba2f8bba1095f478da29f48a';
      let url = 'https://sc.ftqq.com/' + SCKEY + '.send';

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
@import "../../scss/_handle.scss";

:root {
  .beforeExam.dark {
    --box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 #000 !important;
    --box-shadow-inner: inset 1px 1px 5px 0 #000, inset -2px -2px 5px 0 #636363 !important;
    --border-color: #26282b;
    --radio-color: #BF8A10 !important;
    --bg-color: #26282b;
    --bg-btn-color: #26282b;
    --text-color: #BF8A10;
    --text-btn-color: #BF8A10;
  }

  .beforeExam {
    --box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
    --box-shadow-inner: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px #fff;
    --border-color: #fff;
    --radio-color: #9fe3fb;
    --bg-color: #f4f6f8;
    --text-color: #000;
    --text-btn-color: #3ae7fb;
  }
}

.beforeExam {
  /*background-color: #f4f6f8;*/
  @include background('chapter_bg_color1');
  min-height: 100vh;
}

.dark {
  .main {
    border: none !important;
    color: #A7A9AA !important;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65) !important;

    .card-btn .btn {
      background: #26282b !important;
      color: #BF8A10!important;
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }
  }
}

.header {
  height: 60px;
  line-height: 60px;
  /*background-color: #f4f6f8;*/
  @include background('chapter_bg_color1');
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .return {
    align-items: center;

    .circle {
      position: absolute;
      top: 15px;
      left: 5%;
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
      font-size: 18px;
      font-weight: 700;
      color: var(--text-color);
    }
  }
}

.main {
  margin: 20px;
  height: calc(100vh - 100px);
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
  display: flex;
  justify-content: center;
  align-items: center;

  .main-container {
    margin-top: -20%;

    .content {
      margin-top: 10%;

      .content-hd {
        font-size: 18px;
        font-weight: 700;
      }

      .content-bd {
        margin-top: 5%;
        padding: 0 20px;
        text-align: left;
        line-height: 1.5;

        span {
          padding-left: 20px;
        }
      }
    }

    .start-exam {
      .card-btn {
        /*margin-top: 10%;*/
        position: absolute;
        bottom: 6%;
        width: 90%;
        left: 5%;

        button {
          border: 0;
        }

        button:focus {
          border: none;
          outline: 0 !important;
          outline-style: none;
        }

        .btn {
          position: relative;
          width: 90%;
          height: 44px;
          border-radius: 30px;
          transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: #f4f6f8;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
          cursor: pointer;
        }

        .btn:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          z-index: 2;
        }

        .btn:active {
          box-shadow: 0 15px 20px rgba(0, 0, 0, 0.02);
        }

        .btn:active:after {
          box-shadow: inset 0px -2px 5px white, inset 0px 2px 5px rgba(0, 0, 0, 0.15);
        }

        .btn .icon-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 44px;
          letter-spacing: 3px;
          /*color: #6c63ff;*/
          font-weight: 700;
        }
      }
    }
  }
}


</style>
