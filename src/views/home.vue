<template>
  <div class="hello" :class="{dark: themeMode==='dark'}">

    <!--  抽屉  -->
    <div id="menu_nav" class="inactive">
      <mine-vue/>
    </div>

    <div id="navbarContainer" :class="{home: this.themeMode === 'dark', 'inactive': isShowDrawer}">
      <div class="header">
        <div class="menu">
          <div class="menu-circle m_button" @click="showDrawer()" id="m_button">
            <span/>
            <span/>
            <span/>
          </div>
          <div class="title" @click="setWarning('欢迎使用  Little Cookie')">Little Cookie</div>
          <div class="menu-circle" @click="toAbout">
            <i class="fa fa-bell-o"/>
          </div>
        </div>
      </div>

      <div id="content">
        <tiku-vue :showBeginBtn="showBeginBtn" class="a-fadein"/>
      </div>
    </div>

    <!--  更新提示框  -->
    <div class="modal update_modal" v-if="isShowUpdateModal">
      <div class="bg"></div>
      <div class="content a-fadeinB">
        <div class="title">
          <svg-icon iconClass="having_fun"/>
          <h3>Little Cookie <br>更新说明({{ version }})</h3>
          <!--          <h3>Little Cookie <br>维护ing</h3>-->
        </div>
        <div class="msg-model">
          <div class="text">
            <p v-for="item in updateLogsList[0].content" v-html="item"/>
          </div>
          <div class="submit-btn" @click="hiddenUpdateModal"><i class="fa fa-send-o"/> <span>朕知道了</span></div>
          <div class="text show-log" style="text-align: center;">
            <router-link to="/timeline" style="color:#a9ceff;">查看更新日志</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tikuVue from './tiku'
  import musicVue from './music'
  import mineVue from './mine'
  import todoVue from './todo'

  // 导入vuex
  import {mapState, mapActions} from 'vuex'

  // 导入数据
  import {tikudb} from '../tikudb/tikudb'

  export default {
    name: 'home',
    components: {
      tikuVue,
      musicVue,
      mineVue,
      todoVue,
    },
    data() {
      return {
        pageIndex: 1,
        showBeginBtn: true,
        isShowDrawer: true,
        isShowUpdateModal: true,
        version: '1.2.5',
      }
    },
    created() {
      localStorage.setItem("toHome", JSON.stringify(true))  // 路由守卫

      this.version = this.updateLogsList[0].version.slice(9)

      // if (this.themeMode === "dark") window.document.documentElement.setAttribute("data-theme", this.themeMode);
    },
    mounted() {
      // 更新提示框是否已经隐藏
      if (typeof (localStorage.tiku_version) !== 'undefined') {
        if (localStorage.tiku_version !== this.version) {
          localStorage.removeItem('isShowUpdateModal');
          localStorage.setItem('tiku_version', this.version)
        }
      }
      if (typeof (localStorage.tiku_version) === 'undefined') {
        localStorage.setItem('tiku_version', '1.0.0')
      }
      if (typeof (localStorage.isShowUpdateModal) !== 'undefined') {
        if (!JSON.parse(localStorage.isShowUpdateModal)) {
          this.isShowUpdateModal = false
        }
      }

      // console.clear();
      // 导入数据
      // console.log(tikudb);
      // console.log(this.projectBasicData);
      if (JSON.stringify(this.projectBasicData) === "{}") {
        // console.log(typeof(localStorage.globalConfig) === 'undefined');

        // 判断本地是否有存储数据
        if (typeof (localStorage.projectBasicData) === 'undefined') {
          console.log("第一次加载");
          let projectBasicData = {};
          let questionData = {};

          let projectColor = ['#00B0FF', '#F50057', '#00BFA6', '#536DFE', '#F9A826', '#F9A826', '#6C63FF', '#6C63FF'];
          let projectSvgName = ['sixiu', 'jindaishi', 'makesi', 'maogai', 'C', 'C', 'junli', 'junli'];
          let projectName = ['si_xiu', 'jin_dai_shi', 'ma_ke_si', 'mao_gai', 'lang_c_1', 'lang_c_2', 'jun_li_1', 'jun_li_2'];
          let tikudbProjectName = ['morals_and_ethics', 'modern_history', 'marxism_principle', 'mao_gai', 'lang_c_1', 'lang_c_2', 'jun_li_1', 'jun_li_2'];

          for (let i = 0; i < projectName.length; i++) {
            projectBasicData[projectName[i]] = this.getBasicMsg(tikudb[tikudbProjectName[i]]);
            projectBasicData[projectName[i]].color = projectColor[i];
            projectBasicData[projectName[i]].svg = projectSvgName[i];
            projectBasicData[projectName[i]].id = projectName[i];
            questionData[projectName[i]] = tikudb[tikudbProjectName[i]].content;
          }
          // console.log("导入后的数据：", projectBasicData, '\n 题目数据：', questionData);
          this.setProjectBasicData(projectBasicData);
          this.setProjectQuestionData(questionData);

          localStorage.setItem('projectBasicData', JSON.stringify(projectBasicData));
          localStorage.setItem('projectQuestionData', JSON.stringify(questionData));
          // console.log(JSON.parse(localStorage.getItem('globalConfig')));
        } else {
          // 本地有了数据，直接赋值给本地
          // console.log(JSON.parse(localStorage.projectBasicData))
          // console.log(JSON.parse(localStorage.projectQuestionData))
          this.setProjectBasicData(JSON.parse(localStorage.projectBasicData));
          this.setProjectQuestionData(JSON.parse(localStorage.projectQuestionData));
        }
        // 定义已选择答案模板
        this.setDefineSelectedAnswer();
        localStorage.setItem('selectedAnswer', JSON.stringify(this.selectedAnswer));
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'projectBasicData',
        'selectedAnswer',
        'themeMode',
        'isFullScreen',
        'updateLogsList',
      ])
    },
    methods: {
      ...mapActions([
        'setThemeColor',
        'setProjectBasicData',
        'setProjectQuestionData',
        'defineSelectedAnswer',
        'setThemeMode',
        'setWarning',
        'setFullScreen',
        'setAudioActive',
      ]),

      showDrawer() {
        // console.log("jjj")
        let nav = document.getElementById('menu_nav');
        let main = document.getElementById('navbarContainer');
        let btn = document.getElementById('m_button');
        nav.classList.toggle("inactive");
        main.classList.toggle("inactive");
        btn.classList.toggle("active");
        this.isShowDrawer = !this.isShowDrawer;
      },

      hiddenUpdateModal() {
        localStorage.setItem('isShowUpdateModal', JSON.stringify(false));
        localStorage.setItem('tiku_version', this.version);
        this.isShowUpdateModal = false;
      },

      /**
       * 设置全屏
       */
      handleFullScreen() {
        // console.log(this.isFullScreen);
        if (this.isFullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else {
            window.parent.showTopBottom();
          }
          this.setFullScreen(false);
          this.setWarning("全屏模式关闭");
        } else {
          // console.log("退出");
          let ele = document.body;
          if (ele.requestFullscreen) {
            ele.requestFullscreen();
          } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
          } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
          } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
          }
          this.setFullScreen(true);
          this.setWarning("全屏模式开启");
        }
      },
      /**
       * 搜索框事件
       */
      searchFocus() {
        const finder = document.querySelector(".finder");
        finder.classList.add("active");
        // console.log("focus");
        this.showBeginBtn = false;
        this.setWarning("现在还不能搜索哦~");
      },
      searchBlur() {
        const input = document.querySelector(".finder__input");
        const finder = document.querySelector(".finder");
        if (input.value.length === 0) {
          finder.classList.remove("active");
        }
        // console.log("blur");
        this.showBeginBtn = true;
      },
      searchSubmit(ev) {
        // console.log(ev);
        const input = document.querySelector(".finder__input");
        const finder = document.querySelector(".finder");
        ev.preventDefault();
        finder.classList.add("processing");
        finder.classList.remove("active");
        input.disabled = true;
        setTimeout(() => {
          finder.classList.remove("processing");
          input.disabled = false;
          if (input.value.length > 0) {
            finder.classList.add("active");
          }
        }, 1000);
        // console.log("submit")
      },

      /**
       * 获取科目题目总数
       * @param content： 科目章节
       * @returns {Object}： 题目总数
       */
      getTotalNum(content) {
        // console.log(content);
        let tempSum = 0;
        let tempSigSum = 0;
        let tempMulSum = 0;
        let tempJudSum = 0;
        let tempBlaSum = 0;
        for (let i = 0; i < content.length; i++) {
          tempSum += content[i].radio + content[i].multiple + content[i].decide;
          tempSigSum += content[i].radio;
          tempMulSum += content[i].multiple;
          tempJudSum += content[i].decide;
          tempBlaSum += content[i].fill;
        }
        // console.log({sum: tempSum, sig: tempSigSum, mul: tempMulSum, jud: tempJudSum})
        return {sum: tempSum, sig: tempSigSum, mul: tempMulSum, jud: tempJudSum, bla: tempBlaSum}
      },

      /**
       * 导入章节基本信息
       * @param content 科目章节数组
       * @returns {Array} 特定格式章节数组
       */
      getChapterBasicData(content) {
        let tempArr = [];
        // console.log("content:", content);
        for (let i = 0; i < content.length; i++) {
          let tempObj = {};
          tempObj["title"] = content[i].title;
          tempObj["sig"] = content[i].radio;
          tempObj["mul"] = content[i].multiple;
          tempObj["jud"] = content[i].decide;
          tempObj["bla"] = content[i].fill;
          tempObj["chapter_fill"] = 0;
          tempObj["currentIndex"] = 0;
          tempArr.push(tempObj);
        }
        // console.log("content1:", tempArr);
        return tempArr;
      },

      /**
       * 导入科目基本数据
       * @param item 科目
       * @returns {Object} 特定科目格式
       */
      getBasicMsg(item) {
        let tempObj = {};
        // console.log(item);
        tempObj["length"] = item["length"];
        tempObj["chinese"] = item.chinese;
        tempObj["total_num"] = this.getTotalNum(item.content).sum;
        tempObj["total_sig_num"] = this.getTotalNum(item.content).sig;
        tempObj["total_mul_num"] = this.getTotalNum(item.content).mul;
        tempObj["total_jud_num"] = this.getTotalNum(item.content).jud;
        tempObj["total_bla_num"] = this.getTotalNum(item.content).bla;
        tempObj["total_fill_num"] = 0;
        tempObj["content"] = this.getChapterBasicData(item.content);
        // console.log(tempObj["chinese"], "数据导入完成");
        return tempObj
      },

      /**
       * 定义已选择答案模板
       */
      setDefineSelectedAnswer() {
        // console.log(this.projectBasicData);
        let totalData = this.projectBasicData;

        // 创建临时对象
        let tempObj = {};

        // 定义每个题内容
        // let quesObj = {index: null, userAns: null}

        // 定义每一个题目类型数组
        let sigArr = [];
        let mulArr = [];
        let judArr = [];
        let blaArr = [];

        // 定义章节对象
        let chapterObj = {};
        chapterObj['sigArr'] = sigArr;
        chapterObj['mulArr'] = mulArr;
        chapterObj['blaArr'] = blaArr;
        chapterObj['judArr'] = judArr;

        // 定义每一个科目
        // console.log(Object.keys(totalData))
        for (let item in Object.keys(totalData)) {
          // console.log(Object.values(totalData)[item])
          // console.log(totalData[key])
          // 每个科目章节数
          let chapterLen = Object.values(totalData)[item].content.length;

          // 该为数组
          tempObj[Object.keys(totalData)[item]] = [];
          for (let i = 0; i < chapterLen; i++) {
            // 将章节对象放入科目里
            tempObj[Object.keys(totalData)[item]].push(chapterObj)
          }
        }
        // console.log(tempObj)
        this.defineSelectedAnswer(tempObj)
      },

      // 前往关于
      toAbout() {
        this.$router.push({name: 'about'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/handle";

  svg {
    display: block;
  }

  .hello {
    margin: 0;
    overflow: hidden;
    @include background("bg_drawer_color1");
  }

  html {
    /*overflow: hidden;*/
  }

  body {
    /*background: #f4f6f8;*/
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    /*overflow: hidden;*/
  }

  .update_modal {
    .content {
      top: 15%;

      .title {
        position: relative;
        width: 80%;
        left: 10%;

        .svg-icon {
          width: 100%;
        }
      }

      .msg-model {
        text-align: left;
      }

      .show-log {
        margin: 10px 0 0 0;
      }
    }
  }

  .header {
    .menu {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #A2B1CA;

      .title {
        font-family: 'Rubik', sans-serif;
        font-weight: 600;
        font-size: 16px;
      }


      .menu-circle {
        margin: 3% 5%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 25px;
        box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        display: -webkit-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        background-color: #f4f6f8;
        transition: box-shadow 0.6s cubic-bezier(0.79, 0.21, 0.06, 0.81);
      }

      .menu-circle:active {
        box-shadow: inset -5px -5px 5px white, inset 5px 5px 5px rgba(0, 0, 0, 0.1);
      }
    }
  }

  #navbarContainer {
    position: relative;
    right: -76%;
    left: 76%;
    background-color: #f4f6f8;
    box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transform: scale(0.9);
    transition: all 1s;

    &.inactive {
      right: 0;
      left: 0;
      border-radius: 0;
      transform: scale(1);
    }

    #content {
      height: calc(100vh - 70px);
    }

    /*@media screen and (max-width: 375px) {*/
    /*#content {*/
    /*margin-bottom: 22%;*/
    /*}*/
    /*}*/
  }


  #contentWrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #contentWrapper h2 {
    color: #fff;
    font-family: sans-serif;
    font-weight: 400;
  }


  /*html,*/
  /*body {*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*color: #292929;*/
  /*background-color: #eaeaea;*/
  /*}*/

  .search {
    width: 100%;

    .container {
      text-align: center;
      color: #6c7885;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      z-index: 2;

      form {
        transition: all 0.5s;
        position: absolute;
        width: 90%;
        top: 0;
        /*transform: translateY(-50%);*/

        .finder {
          margin-top: 10px;
          @include background('home_bg_color1');
          border-radius: 10px;
          padding: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);

          .finder__outer {
            display: flex;
            width: 100%;
            padding: 4px 0;
            border-radius: 10px;
            box-shadow: inset 2px 2px 3px -2px #c3c3c3, inset -2px -2px 3px -2px #ffffff;

            .finder__inner {
              display: flex;
              align-items: center;
              position: relative;
              flex: 1;
              transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

              .finder__input {
                /*height: calc(100% + 24px);*/
                border: none;
                background-color: transparent;
                outline: none;
                font-size: 16px;
                padding: 6px 0;
                letter-spacing: 0.75px;
              }

              .finder__icon {
                width: 25px;
                height: 25px;
                margin: 0 10px;
                transition: all 0.2s;
                box-shadow: inset 0 0 0 20px #6c7885;
                border-radius: 50%;
                position: relative;
              }
            }
          }
        }

        .active .finder__inner {
          padding: 6px;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .finder__icon:after, .finder__icon:before {
          display: block;
          content: "";
          position: absolute;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .finder__icon:after {
          width: 5px;
          height: 5px;
          background-color: #6c7885;
          /*<!--@include background('home_bg_color2')*/
          border: 3px solid #ffffff;
          top: 52%;
          position: absolute;
          transform: translateY(-50%);
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 50%;
        }

        .finder__icon:before {
          width: 4px;
          height: 11px;
          /*<!--@include background('home_bg_color2')*/
          background: #fff;
          top: 50%;
          left: 14px;
          transform: rotateZ(45deg) translate(-50%, 0);
          transform-origin: 0 0;
          border-radius: 4px;
        }

        .active .finder__icon:after {
          border-width: 5px;
          background-color: #ffffff;
        }

        .active .finder__icon:before {
          /*background-color: #6c7885;*/
          @include background("home_bg_color3");
          width: 6px;
          transform: rotateZ(45deg) translate(-50%, 15px);
        }

        .processing .finder__icon {
          transform-origin: 50%;
          animation: spinner 0.3s linear infinite;
          animation-delay: 0.5s;
        }

        .active .finder__icon {
          transform: translateY(-5px);
        }

        @keyframes spinner {
          0% {
            transform: rotateZ(45deg);
          }
          100% {
            transform: rotateZ(405deg);
          }
        }

        /*.finder__form {*/
        /*flex: 1;*/
        /*height: calc(100% + 100px);*/
        /*}*/
      }
    }
  }

  /* 淡入 */
  .a-fadein {
    animation: 1s ease-out backwards;
    animation-name: fadein;
  }

  /* 淡入 */
  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .dark {
    .menu-circle {
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
      background-color: #26282b !important;

      &:active,
      &.active.m_button {
        box-shadow: inset 2px 2px 3px -2px rgba(0, 0, 0, 0.3), inset -2px -2px 3px 0px rgba(80, 80, 80, 0.5) !important;
      }
    }

    .mine {
      #b, #bgBubble {
        background-color: #2e3237 !important;
      }
    }

    .music {
      #bg, #bgBubble {
        background-color: #26282b !important;
      }
    }

    .home {
      background: #26282b !important;
      box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.65) !important;

      #bg, #bgBubble {
        background-color: #26282b !important;
      }
    }

    .finder__icon {
      box-shadow: inset 0 0 0 20px #9a9a9a !important;
    }

    .finder__outer {
      box-shadow: inset 2px 2px 3px -2px rgba(0, 0, 0, 0.3), inset -2px -2px 3px 0px rgba(80, 80, 80, 0.5) !important;
    }
  }

  #menu_nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 76%;
    //background-color: #f4f6f8;
    @include background("bg_drawer_color1");
    box-sizing: border-box;
    transition: 1s ease left;
  }

  #menu_nav.inactive {
    left: -76%;
  }

  .m_button span {
    background-color: #A2B1CA;
    width: 15px;
    height: 2px;
    border-radius: 4px;
    margin: 1px 0 3px 0;
    -webkit-transition: margin 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81), -webkit-transform 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81);
    transition: margin 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81), transform 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81), -webkit-transform 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81);
  }

  .m_button span:nth-child(2) {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }

  .active.m_button {
    box-shadow: inset -5px -5px 5px white, inset 5px 5px 5px rgba(0, 0, 0, 0.1) !important;
  }

  .active.m_button span {
    margin: -1px;
  }

  .active.m_button span:nth-child(1) {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .active.m_button span:nth-child(2) {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  .active.m_button span:nth-child(3) {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
