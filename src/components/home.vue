<template>
  <div class="hello">

    <div class="search" v-if="pageIndex === 1">
      <div class="container">
        <form autocomplete="off" @submit="searchSubmit($event)">
          <div class="finder">
            <div class="finder__outer">
              <div class="finder__inner">
                <div class="finder__icon" ref="icon"></div>
                <label>
                  <input class="finder__input" type="text" name="q" @focus="searchFocus()" @blur="searchBlur()">
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div id="navbarContainer">
      <div id="navbar">
        <div id="bubbleWrapper">
          <div id="bubble1" class="bubble"><span class="icon"><i class="fa fa-home"
                                                                 aria-hidden="true"></i></span></div>
          <div id="bubble2" class="bubble"><span class="icon"><i class="fa fa-music"></i></span></div>
          <div id="bubble3" class="bubble"><span class="icon"><i class="fa fa-user"></i></span></div>
          <!--<div id="bubble4" class="bubble"><span class="icon"><i class="fas fa-user"></i></span></div>-->
        </div>
        <div id="menuWrapper">
          <div id="menu1" class="menuElement" @click="changeTab(1)"><i
            class="fa fa-home"></i></div>
          <div id="menu2" class="menuElement" @click="changeTab(2)"><i class="fa fa-music"></i>
          </div>
          <div id="menu3" class="menuElement" @click="changeTab(3)"><i class="fa fa-user"></i></div>
          <!--<div id="menu4" class="menuElement" @click="move('4', '329px', '#ce93d8')"><i class="fas fa-user"></i></div>-->
        </div>
      </div>
      <div id="bgWrapper">
        <div id="bg"></div>
        <div id="bgBubble"></div>
      </div>

      <div id="content">
        <tiku-vue v-if="pageIndex === 1" :showBeginBtn="showBeginBtn"></tiku-vue>
        <music-vue v-if="pageIndex === 2" class="a-fadein"></music-vue>
        <!--<mine-vue v-if="pageIndex === 3"></mine-vue>-->
      </div>
    </div>

    <svg width="0" height="0">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo"/>
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
  import gsap from 'gsap'
  import tikuVue from './tiku'
  import musicVue from './music'
  import mineVue from './mine'

  // 导入vuex
  import {mapState, mapActions} from 'vuex'

  // 导入数据
  import tikudb from '../tikudb/tikudb'

  export default {
    name: 'home',
    components: {
      tikuVue,
      musicVue,
      mineVue,
    },
    data() {
      return {
        pageIndex: 1,
        showBeginBtn: true,
      }
    },
    mounted() {
      // console.clear();
      // 导入数据
      // console.log(tikudb.tikudb);
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
            projectBasicData[projectName[i]] = this.getBasicMsg(tikudb.tikudb[tikudbProjectName[i]]);
            projectBasicData[projectName[i]].color = projectColor[i];
            projectBasicData[projectName[i]].svg = projectSvgName[i];
            projectBasicData[projectName[i]].id = projectName[i];
            questionData[projectName[i]] = tikudb.tikudb[tikudbProjectName[i]].content;
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
      ])
    },
    methods: {
      ...mapActions([
        'setThemeColor',
        'setProjectBasicData',
        'setProjectQuestionData',
        'defineSelectedAnswer',
      ]),

      /**
       * 导航切换
       * @param index 导航下标
       */
      changeTab(index) {
        // console.log(index);
        this.pageIndex = index;
        if (index === 1) {
          this.move('1', '16.6%', '#e8e9ed');
        }
        if (index === 2) {
          this.move('2', '50%', '#f4f6f8');
        }
        if (index === 3) {
          this.move('3', '83.334%', '#c5e1a5');
        }
      },
      // tab 切换
      move(id, position, color) {
        var tl = gsap.timeline();
        tl.to("#bgBubble", {duration: 0.15, bottom: "-30px", ease: "ease-out"}, 0)
          .to("#bubble1", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble2", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble3", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          // .to("#bubble4", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to(".icon", {duration: 0.05, opacity: 0, ease: "ease-out",}, 0)
          .to("#bgBubble", {duration: 0.2, left: position, ease: "ease-in-out"}, 0.1)
          .to("#bgBubble", {duration: 0.15, bottom: "-50px", ease: "ease-out"}, '-=0.2')
          .to(`#bubble${id}`, {
            duration: 0.15,
            y: "0%",
            opacity: 1,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            ease: "ease-out"
          }, '-=0.1')
          .to(`#bubble${id}> span`, {duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out"}, '-=0.1')
          .to("#navbarContainer", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bg", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bgBubble", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
      },

      /**
       * 搜索框事件
       */
      searchFocus() {
        const finder = document.querySelector(".finder");
        finder.classList.add("active");
        // console.log("focus");
        this.showBeginBtn = false;
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  svg {
    display: block;
  }

  .hello {
    margin: 0;
    overflow: hidden;
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

  #navbarContainer {
    height: 100vh;
    background-color: #f4f6f8;
    /*border-radius: 20px;*/
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    #navbar {
      width: 100%;
      height: 60px;
      background-color: #fff;
      position: absolute;
      /*z-index: 999;*/

      #bubbleWrapper {
        position: absolute;
        display: flex;
        justify-content: space-around;
        width: 100%;
        bottom: 25px;
        /*z-index: 999;*/

        .bubble {
          background-color: #fff;
          width: 50px;
          height: 50px;
          bottom: 85px;
          border-radius: 50%;
          z-index: 1;
          transform: translateY(120%);
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            opacity: 0;
          }
        }

        #bubble1 {
          transform: translateY(0%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        #bubble1 > span {
          opacity: 0.7;
        }
      }
    }

    #bgWrapper {
      filter: url(#goo);
      width: 100%;
      height: 100px;
      /*height: calc(100vh - 120px - 20px);*/
      position: absolute;
      bottom: 60px;

      #bg {
        background-color: #f4f6f8;
        width: 120%;
        height: 100%;
        margin-left: -10%;
      }

      #bgBubble {
        position: absolute;
        background-color: #f4f6f8;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        bottom: -50px;
        left: 16.667%;
        transform: translateX(-50%);
      }

    }

    #menuWrapper {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: space-around;

      .menuElement {
        opacity: 0.4;
        transform: translateY(100%);
        cursor: pointer;

        &:hover {
          opacity: 0.5;
        }
      }
    }

    #content {
      margin-bottom: 100px;
    }

    @media screen and (max-width: 375px) {
      #content {
        margin-bottom: 22%;
      }
    }
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
          /*border: 1px solid #fff;*/
          background-color: #ffffff;
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
          background-color: #ffffff;
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
          background-color: #6c7885;
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
  .a-fadein{
    animation: 1s ease-out backwards;
    animation-name: fadein;
  }
  /* 淡入 */
  @-webkit-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
  }
  @-moz-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
  }
  @-ms-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
  }
  @keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
  }



</style>
