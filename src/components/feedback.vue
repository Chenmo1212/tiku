<template>
  <div :class="{dark: themeMode==='dark'}" class="chapter">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="backHome" aria-hidden="true" class="fa fa-angle-left"/>
        </div>
        <div class="pageName">{{pageName}}</div>
      </div>
    </div>
    <div class="main">
      <div class="title mt-0"><span class="text">反馈类型</span></div>
      <div class="type-content">
        <label class="radio" for="improve" @click.prevent="handleType(1)">
          <span class="radio-bg"/>
          <input checked="checked" id="improve" name="type" type="radio" value="改进建议"/> 改进建议
          <span class="radio-on"/>
        </label>
        <label class="radio" for="bug" @click.prevent="handleType(2)">
          <span class="radio-bg"/>
          <input id="bug" name="type" type="radio" value="Bug提交"/> Bug提交
          <span class="radio-on"/>
        </label>
        <label class="radio" for="advise" @click.prevent="handleType(3)">
          <span class="radio-bg"/>
          <input id="advise" name="type" type="radio" value="对开发者的话"/> 对开发者的话
          <span class="radio-on"/>
        </label>
      </div>
      <div class="title"><span class="text">反馈内容</span></div>
      <textarea v-model="feedCont" id="content" @focus="removeWarning()"/>
      <div class="title"><span class="text">称呼（选填）</span></div>
      <input type="text" class="input name" v-model="name"/>
      <div class="title"><span class="text">邮箱</span></div>
      <input type="text" class="input mail" v-model="mail" id="mail" @focus="removeWarning()"/>
      <button class="btn submit" @click="submitBug()">
        <span class="icon-container">
          <i class="fa fa-rocket"/>
            立即提交
          </span>
      </button>
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
        pageName: '意见反馈',

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
        let type = localStorage.themeMode;
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
      handleType(index){
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
      removeWarning(){
        document.getElementById("content").classList.remove("warning");
        document.getElementById("mail").classList.remove("warning");
      },

      /**
       * 检测邮箱格式是否正确
       * @returns {boolean} 正确与否
       */
      checkMail(){
        let email = this.mail;
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(reg.test(email)){
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
      checkContent(){
        let content = this.feedCont;
        if(content){
          // console.log("反馈内容不为空");
          return true
        }else {
          console.log("反馈内容为空");
          document.getElementById("content").classList.add("warning");
          this.setWarning("反馈内容不" +
            "得为空");
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


        let UID = 'UID_pNfFHmlL26qUZuXmGkrS9CGNUSLD';
        let appToken = 'AT_aGS8jqOTZDiEAwbZFH2WdEgV15tgIl7j';
        let data = {
          summary: "Little Cookies反馈", //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
          content: `#### 类型：\n\n${this.type}\n\n---\n\n#### 内容：\n\n${this.feedCont}\n\n---\n\n#### 称呼：\n\n
            ${this.name}\n\n---\n\n#### 联系方式：\n\nEmail: ${this.mail}\n
            Agent:${navigator.userAgent + " DWAPI/7.0"}\n`,
          contentType: 3,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
          uids: [UID], //发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
          appToken: appToken
        };

        let url = 'https://wxpusher.zjiecode.com/api/send/message/';

        let params = JSON.stringify(data);

        axios.post(url, params, {
          headers: {
            'Content-Type': 'application/json'
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
          this.setWarning("提交失败了，请重试");
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
      --box-shadow: -1px -1px 3px 0 #636363,1px 1px 3px 0 #000!important;
      --box-shadow-inner: inset 1px 1px 5px 0 #000,inset -2px -2px 5px 0 #636363!important;
      --border-color: #26282b;
      --radio-color: #BF8A10!important;
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
  .warning {
    border: 1px solid #cc0001!important;
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
    color: var(--text-btn-color);
    outline: none;
  }

  .btn.submit:active {
    background-color: #e7e9ef;
  }

</style>
