<template>
  <div class="Detail" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backChapter"></i>
        </div>
        <div class="page-title" @click="exitFull()">章节背题 | <span :style="{color: chapterColor}" class="pageName">{{projectName}} - {{chapterName}}</span>
        </div>
      </div>
      <div class="full-screen" :style="{color: chapterColor}">
        <span @click="setFullScreen" v-if="!ifFullscreen"><i class="fa fa-expand"></i></span>
        <span @click="exitFull" v-if="ifFullscreen"><i class="fa fa-compress"></i></span>
      </div>
    </div>

    <div class="content">
      <div class="content-head">
        <div class="question-type" :style="{color: chapterColor}">
          <span v-if="totalQuesArr[questionIndex].type === 0">单选题</span>
          <span v-if="totalQuesArr[questionIndex].type === 1">多选题</span>
          <span v-if="totalQuesArr[questionIndex].type === 2">填空题</span>
          <span v-if="totalQuesArr[questionIndex].type === 3">判断题</span>
        </div>
        <div class="question-num">
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 0">{{questionIndex + 1}}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 1">{{questionIndex + 1- selectedChapter.radio}}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 2">{{questionIndex + 1- selectedChapter.radio +selectedChapter.multiple}}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 3">{{questionIndex + 1- selectedChapter.radio +selectedChapter.multiple + selectedChapter.decide}}</span>
          /
          <span class="question-num-item" v-if="totalQuesArr[questionIndex].type === 0">{{selectedChapter.radio}}</span>
          <span class="question-num-item" v-if="totalQuesArr[questionIndex].type === 1">{{selectedChapter.multiple}}</span>
          <span class="question-num-item" v-if="totalQuesArr[questionIndex].type === 2">{{selectedChapter.fill}}</span>
          <span class="question-num-item" v-if="totalQuesArr[questionIndex].type === 3">{{selectedChapter.decide}}</span>
          /
          <span class="question-num-item">{{selectedChapter.radio + selectedChapter.decide + selectedChapter.multiple + selectedChapter.fill}}</span>
        </div>
      </div>
      <div class="content-question">
        <div class="card-question">
          {{totalQuesArr[questionIndex].question}}
        </div>
      </div>
      <div class="content-answer">
        <div class="card-answer-list">

          <!--单选多选题-->
          <div class="btn c-button answer-item"
               v-if="totalQuesArr[questionIndex].type === 0 || totalQuesArr[questionIndex].type === 1"
               :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
               :style="getColor(answerIndex)"
               @click.stop.prevent="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex)"
               v-for="(answerItem, answerIndex) in totalQuesArr[questionIndex].options">
            <span class="icon-item">
              <span v-if="answerIndex === 0">A.</span>
              <span v-if="answerIndex === 1">B.</span>
              <span v-if="answerIndex === 2">C.</span>
              <span v-if="answerIndex === 3">D.</span>
            </span>
            <span class="c-button__label">{{answerItem}}</span>
          </div>

          <!--判断题-->
          <div class="btn c-button answer-item"
               v-if="totalQuesArr[questionIndex].type === 3"
               :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
               :style="getColor(answerIndex)"
               @click.stop.prevent="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex)"
               v-for="(answerItem, answerIndex) in ['对','错']">
            <span class="icon-item">
              <span v-if="answerIndex === 0">A</span>
              <span v-if="answerIndex === 1">B</span>
            </span>
            <span class="c-button__label">{{answerItem}}</span>
          </div>

          <!--填空题-->
          <div class="btn c-button answer-item"
               v-if="totalQuesArr[questionIndex].type === 2"
               :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
               :style="getColor(answerIndex)"
               @click.stop.prevent="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex)">
          </div>
        </div>
        <div class="answer" v-if="showAnswer"
             :style="getAnsStyle(isError)"
        >
          <span>正确答案：</span>
          <span>{{shiftAns(totalQuesArr[questionIndex].answer, totalQuesArr[questionIndex].type)}}</span>
          <span class="stick-box" :class="{active: isStick}" @click="handleStick">
                <i class="fa fa-thumb-tack stick"></i>
          </span>
        </div>
      </div>
      <div class="content-btn-group">
        <div class="menu-card" :style="{color: chapterColor}">
          <div class="all-question" @click="toOverview">
            <i class="fa fa-th" aria-hidden="true"></i>
          </div>
          <div class="show-answer" @click="showAnswer = !showAnswer">
            <i class="fa fa-eye" aria-hidden="true" v-if="showAnswer"></i>
            <i class="fa fa-eye-slash" aria-hidden="true" v-if="!showAnswer"></i>
          </div>
          <div class="pre-question" @click="changeQuestion(-1)" :class="{disable: questionIndex <= 0}">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div class="next-question" @click="changeQuestion(1)" :class="{disable: questionIndex > totalQuesArr.length}">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Detail',
    data() {
      return {
        projectName: '马克思',
        chapterName: '导论',
        chapterColor: "#536dfe",
        checkIndex: -1,
        showAnswer: false,

        userAns: null,

        questionIndex: 0,
        totalQuesArr: [{
          type: 0,
          answer: 1,
          question: "毛泽东思想的活的灵魂是 ﹙  A  ﹚。",
          options: ['理同中国具体实际相结合', '实事求是，群众路', '解放思想，实', '解放思想与时俱进'],               // 总的数组
        }, {
          type: 0,
          answer: 1,
          question: "毛泽东思想的活的灵魂是 ﹙  B  ﹚。",
          options: ['把马克思主义基本原理同中国具体实际相结合', '实事求是，群众路线，独立自主', '解放思想，实事求是', '解放思想，实事求是，与时俱进'],               // 总的数组
        }],

        answerList: [],

        isError: true,

        ifFullscreen: false,
        ifExitScreen: false,

        gapIndex: 0,
        itemIndex: null,               // 题目序号
        currentType: null,             // 题目类型

        selectedChapter: '',

        isStick: false,               // 是否始终显示答案
      }
    },
    created() {
      let isOverview = false;
      let newIndex = null;

      // 获取全部题目数据

      this.setSelectedProject(JSON.parse(localStorage.selectedProject));
      this.defineSelectedAnswer(JSON.parse(localStorage.selectedAnswer));
      this.setProjectBasicData(JSON.parse(localStorage.projectBasicData));

      let selectedChapter = JSON.parse(localStorage.selectedChapter);
      this.selectedChapter = selectedChapter;
      this.totalQuesArr = selectedChapter.data;
      // console.log(this.totalQuesArr);

      if (typeof (this.$route.params.id) !== 'undefined') {
        this.itemIndex = this.$route.params.id;
        this.currentType = this.$route.params.type.slice(0, 3) + 'Arr';
        newIndex = this.$route.params.id - 1;
        console.log(newIndex)
        // console.log(this.selectedAnswer);
        // console.log(this.selectedChapter);

        let projectId = this.selectedChapter.id;
        let chapterIndex = this.selectedChapter.index;
        console.log(this.$route.params.type);
        let type = this.$route.params.type.slice(0, 3) + 'Arr';
        let ansArr = this.selectedAnswer[projectId][chapterIndex][type];

        // 匹配用户答案
        for (let i = 0; i < ansArr.length; i++) {
          if (ansArr[i].index === newIndex + 1) {
            this.checkIndex = ansArr[i].userAns;
          }
        }
        isOverview = true;
      }

      // 处理主题色
      this.chapterColor = JSON.parse(localStorage.themeColor);
      if (isOverview) {  // 题目总览中直接跳转
        this.questionIndex = newIndex;
        console.log(this.questionIndex)
      } else {           // 答题页面直接刷新
        let projectId = selectedChapter.id;
        let chapterIndex = selectedChapter.index;
        this.questionIndex = JSON.parse(localStorage.projectBasicData)[projectId].content[chapterIndex].currentIndex;
        let type = this.totalQuesArr[this.questionIndex].type;
        if (type === 0) type = "sigArr";
        if (type === 1) type = "mulArr";
        if (type === 2) type = "blaArr";
        if (type === 3) type = "judArr";

        let ansArr = this.selectedAnswer[projectId][chapterIndex][type];
        console.log(ansArr)
        // 匹配用户答案
        for (let i = 0; i < ansArr.length; i++) {
          if (ansArr[i].index === newIndex + 1) {
            this.checkIndex = ansArr[i].userAns;
          }
        }
      }
      // 处理标题信息
      this.chapterName = selectedChapter.title;
      this.projectName = JSON.parse(localStorage.selectedProject).chinese;

    },

    mounted() {
      console.log("mounted:", this.$route.params.id);
      if (typeof (this.$route.params.id) !== 'undefined') {
        this.slice_count = this.$route.params.id - 1;
        this.gapIndex = this.$route.params.id - 1;
      }
    },
    computed: {
      ...
        mapState([
          'themeColor',
          'themeMode',
          // 'selectedChapter',
          'selectedProject',
          'selectedAnswer',
          'currentMemory',
          'projectBasicData',
        ]),
    },
    methods: {
      ...
        mapActions([
          'setSelectedChapter',
          'setSelectedAnswer',
          'setCurrentMemory',
          'setSelectedProject',
          'defineSelectedAnswer',
          'setProjectBasicData',
          'setWarning',
        ]),

      /**
       * 更改选项颜色
       * @param answerIndex 选项下标
       * @returns {*} 返回颜色
       */
      getColor(answerIndex) {
        if (this.checkIndex === answerIndex) {
          return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        }
        return {}
      },

      /**
       * 判断选项是否激活
       * @param answerIndex 选项下标
       * @param type 问题类型
       * @returns {*} 返回颜色类
       */
      getActiveStyle(answerIndex, type) {
        if (this.currentType === null) {
          if (type === 0) this.currentType = 'sigArr';
          if (type === 1) this.currentType = 'mulArr';
          if (type === 2) this.currentType = 'blaArr';
          if (type === 3) this.currentType = 'judArr';
        }
        if (this.currentType !== type) {
          if (type === 0) this.currentType = 'sigArr';
          if (type === 1) this.currentType = 'mulArr';
          if (type === 2) this.currentType = 'blaArr';
          if (type === 3) this.currentType = 'judArr';
        }

        // console.log(this.checkIndex);
        if (this.checkIndex === answerIndex) {
          // console.log("getActiveStyle:", this.checkIndex);
          return 'c-button--active'
        }
        return ""
      },
      backChapter() {
        this.$router.push({name: 'chapter'});
      },

      toOverview() {
        this.$router.push({name: 'overview'})
      },

      setFullScreen() {
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
        this.ifFullscreen = true;
      }
      ,
      exitFull() {
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
        this.ifFullscreen = false;
      },

      changeQuestion(index){
        if (index === 1) {
          if (this.questionIndex < this.totalQuesArr.length) this.questionIndex += 1;
        } else if (index === -1){
          if (this.questionIndex >= 0) this.questionIndex -= 1;
        }
        // 如果固定显示答案，则显示答案，如果不固定，则隐藏答案
        this.showAnswer = this.isStick;
        this.checkIndex = -1;
      },

      isFinished() {
        // 重新渲染v-for
        // this.$forceUpdate();

        // console.log("isFinished");
        // console.log("checkIndex", this.checkIndex)
        // console.log("题目下标", this.itemIndex);
        // console.log(this.selectedChapter);
        let projectId = this.selectedChapter.id;         // 科目id
        let chapterIndex = this.selectedChapter.index;   // 章节下标
        let quesIndex = this.itemIndex;                  // 题目下标

        let flag = true;

        // console.log(projectId)
        // console.log(chapterIndex)
        // console.log(this.currentType)
        // console.log(JSON.parse(localStorage.selectedAnswer))
        let answerList = JSON.parse(localStorage.selectedAnswer)[projectId][chapterIndex][this.currentType];
        console.log(answerList);
        for (let i = 0; i < answerList.length; i++) {
          if (answerList[i].index === quesIndex) {
            console.log(answerList[i].index);
            console.log(quesIndex);
            this.checkIndex = answerList[i].userAns;
            flag = false;
            break;
          }
        }

        if (flag) this.checkIndex = -1;
      },

      /**
       * 选择选项并记录用户答案
       * @param item 题目信息
       * @param answerIndex 选项下标（用户答案）
       * @param index 题目下标
       * @returns {*} 返回颜色
       */
      submitAns(item, answerIndex, index) {

        this.itemIndex = index;

        // 默认答案为错,修改答案样式
        this.isError = true;
        item.answer === answerIndex ? this.isError = false : this.isError = true;

        // 更改选项样式
        this.checkIndex = answerIndex;

        // 记录答题情况
        let projectId = this.selectedProject.id;         // 科目id
        let chapterIndex = this.selectedChapter.index;   // 章节下标
        let quesIndex = index;                           // 题目下标
        let userAns = answerIndex;                       // 用户答案

        let tempObj = {};
        tempObj['index'] = quesIndex;
        tempObj['userAns'] = userAns;

        // console.log(this.selectedAnswer[projectId][chapterIndex]);
        if (item.type === 0) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'sigArr');
        if (item.type === 1) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'mulArr');
        if (item.type === 2) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'blaArr');
        if (item.type === 3) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'judArr');

        this.setCurrentMemory({
          projectId: projectId,
          chapterIndex: chapterIndex,
          itemIndex: quesIndex,
        });

        // console.log(this.currentMemory);
        localStorage.setItem('currentMemory', JSON.stringify(this.currentMemory));
        localStorage.setItem('projectBasicData', JSON.stringify(this.projectBasicData));
        localStorage.setItem('selectedAnswer', JSON.stringify(this.selectedAnswer));
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));
      },

      // 判断是否需要替换已选择的答案
      judgeReplace(projectId, chapterIndex, tempObj, type, quesIndex, typeArr) {
        let tempArr = null;
        // console.log(JSON.parse(localStorage.selectedAnswer)[projectId]);
        if (typeof (localStorage.selectedAnswer) === 'undefined') {
          tempArr = this.selectedAnswer[projectId][chapterIndex][typeArr];
        } else {
          tempArr = JSON.parse(localStorage.selectedAnswer)[projectId][chapterIndex][typeArr];
        }
        let obj = this.isHasObj(tempArr, quesIndex);
        // console.log(obj.flag);
        if (obj.flag) {
          // 科目id-章节下标-题目下标-用户答案
          this.setSelectedAnswer({
            projectId: projectId,
            chapterIndex: chapterIndex,
            quesObj: tempObj,
            quesType: type,
            isReplace: true,
            replaceIndex: obj.index
          });
        } else {
          // 科目id-章节下标-题目下标-用户答案
          this.setSelectedAnswer({
            projectId: projectId,
            chapterIndex: chapterIndex,
            quesObj: tempObj,
            quesType: type,
            isReplace: false,
          });
        }
      },
      // 判断是否已经选择过该题
      isHasObj(arr, val) {
        let flag = false; // true为有 false为没有
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].index === val) {
            flag = true;
            // console.log("重复值下标为：", i);
            return {flag: true, index: i};
          }
        }
        return {flag: false, index: -1};
      },

      getAnsStyle(bool) {
        if (!bool) return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        return {color: '#F56C6C', border: '1px solid' + '#F56C6C'}
      },

      /**
       * 将答案序号改成文字
       * @param ans 题目答案序号
       * @param type 题目类型
       * @returns {String} 返回答案字符串
       */
      shiftAns(ans, type) {
        if (type === 0) { // 单选题
          if (ans === 0) return "A";
          if (ans === 1) return "B";
          if (ans === 2) return "C";
          if (ans === 3) return "D";
        } else if (type === 1) { // 多选题
          let tempAns = '';
          for (let i = 0; i < ans.length; i++) {
            if (ans[i] === 0) tempAns += "A";
            if (ans[i] === 1) tempAns += "B";
            if (ans[i] === 2) tempAns += "C";
            if (ans[i] === 3) tempAns += "D";
            if (ans.length - i > 1) tempAns += '、';
          }
          return tempAns;
        } else if (type === 2) { // 填空题
          let tempAns = '';
          for (let i = 0; i < ans.length; i++) {
            tempAns += ans[i];
            if (ans.length - i > 1) tempAns += '、';
          }
          return tempAns;
        } else if (type === 3) { // 判断题
          if (ans === 0) return "对";
          if (ans === 1) return "错";
        }
      },

      /**
       * 懒加载加入数据
       * @param len 剩余卡片数目
       */
      pushCardData(len) {
        if (len > 3) return;
        if (len <= 3) {
          console.log("少于三个了");
          // console.log("刚开始：", this.cardArr);
          let newTempCard = null;

          if (this.totalCardArr.length - this.slice_count > 10) {
            // 新截取的数组
            newTempCard = this.totalCardArr.slice(this.slice_count, this.slice_count + 10);
            // console.log("刚开始2：", newTempCard);

            this.slice_count += 10;
          } else {
            // 新截取的数组
            newTempCard = this.totalCardArr.slice(this.slice_count, this.totalCardArr.length);
            // console.log("刚开始2：", newTempCard);

            this.slice_count = this.totalCardArr.length;
          }

          this.cardArr = this.cardArr.concat(newTempCard);
          // console.log("合并后：", this.cardArr);

          // 重新渲染v-for
          this.$forceUpdate();
        }
      },

      // 固定答案
      handleStick(){
        this.isStick = !this.isStick;
        this.isStick ? this.setWarning("答案固定显示"): this.setWarning("答案取消固定");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/_handle.scss";

  .Detail {
    /*background-color: #f4f6f8;*/
    @include background('detail_bg_color1');
    overflow: hidden;
    height: 100vh;
  }

  .dark {
    .content .content-answer .card-answer-list .c-button,
    .content-question,
    .circle,
    .menu-card,
    .question-num {
      box-shadow: -1px -1px 3px 0 #636363,1px 1px 3px 0 black !important;
    }
    .question-num-item {
      color: #A7A9AA!important;
    }
    .pageName,
    .full-screen,
    .question-index {
      color: #BF8A10!important;
    }
    .question-type {
      color: #BF8A10!important;
      box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363!important;
    }
    .content .content-answer .card-answer-list .c-button--active {
      background: #26282b!important;
      box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363!important;
    }
    .c-button {
      border: none!important;
      color: #A7A9AA!important;
    }
    .answer {
      box-shadow: inset 1px 1px 5px 0 black,inset -2px -2px 5px 0 #636363 !important;
    }
    .menu-card {
      color: #BF8A10!important;
    }
  }

  .header {
    height: 60px;
    line-height: 60px;
    /*background-color: #f4f6f8;*/
    @include background('detail_bg_color1');
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      display: flex;
      align-items: center;
      padding-left: 20px;
      width: 80vw;
      overflow: hidden;

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        @include font_color("detail_font_color2");
        @include background("detail_bg_color1");
        margin: 0;
        box-shadow: 3px 3px 5px #ebebeb, -3px -3px 5px #ffffff;
        border: 1px solid;
        @include border_color("detail_border_color1");
      }

      i {
        font-size: 30px;
        margin-right: 4px;
        display: block;
      }

      .page-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
        margin-left: 2%;
        text-align: left;
      }
    }

    .full-screen {
      float: right;
      width: 10vw;
    }
  }

  .content {
    padding: 20px;
    min-height: 90vh;

    .content-head {
      font-size: 14px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;

      .question-type {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        @include background("detail_bg_color1");
        box-shadow: inset 5px 5px 10px #eaecee,
        inset -5px -5px 10px #feffff;
      }

      .question-num {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        /*background: #f4f6f8;*/
        @include background("detail_bg_color1");
        box-shadow: 5px 5px 10px #eaecee,
        -5px -5px 10px #feffff;
      }
    }

    .content-question {
      @include font_color("detail_font_color1");
      margin: 10% 0;
      width: calc(100% - 20px);
      padding: 10px;
      @include background("detail_bg_color1");
      border-radius: 5px;
      text-align: left;
      border: 1px solid;
      @include border_color("detail_border_color1");
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
    }

    .content-answer {
      .card-answer-list {
        .c-button {
          font-size: 14px;
          text-align: left;
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          /*color: #2c3e50;*/
          background: transparent;
          border: 1px solid #fff;
          position: relative;
          box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
          transition: all 200ms ease-out 0s;
        }

        div {
          cursor: pointer;
          /*color: inherit;*/
          font-family: inherit;
          margin-bottom: 5%;
          box-sizing: border-box;
        }

        /*.btn:active, .btn:focus {*/
        /*outline: 0;*/
        /*}*/

        /*.c-button:hover:before {*/
          /*background: rgba(255, 255, 255, 0.24);*/
        /*}*/

        .c-button:before {
          content: '';
          position: absolute;
          border-radius: 5px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 2px solid transparent;
          -webkit-filter: blur(2px);
          filter: blur(2px);
          -webkit-transition: all 120ms ease-out 0s;
          transition: all 200ms ease-out 0s;
        }

        .c-button:after {
          content: '';
          position: absolute;
          border-radius: 5px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          -webkit-transition: all 120ms ease-out 0s;
          transition: all 200ms ease-out 0s;
        }

        .c-button--active {
          background: linear-gradient(to top, #f4f6f8, #fafcfd);
          box-shadow: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px white;
        }

        .c-button--active:before {
          /*border-color: white;*/
          /*box-shadow: 0 0.8px 3px white;*/
        }

        .c-button--active:after {
          /*box-shadow: inset 0 0 3px white;*/
        }
      }

      .answer {
        padding: 10px;
        font-size: 14px;
        text-align: left;
        width: calc(100% - 20px);
        border-radius: 5px;
        @include background("detail_bg_color1");
        box-shadow: inset 5px 5px 10px #eaecee, inset -5px -5px 10px #feffff;

        .stick-box {
          float: right;
          margin-top: -7px;
          .stick {
            padding: 10px;
          }
        }
        .active {
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
      }
    }

    .content-btn-group {
      .menu-card {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        height: 50px;
        width: 90%;
        border-radius: 5px;
        @include background("detail_bg_color1");
        box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
        display: flex;
        line-height: 50px;
        justify-content: center;

        .all-question {
          flex: 1;
          border-right: 1px solid;
          @include border_color("detail_border_color2");
        }

        .show-answer {
          border-left: 1px solid;
          border-right: 1px solid;
          @include border_color("detail_border_color2");
          flex: 1;
        }

        .pre-question {
          flex: 1;
          border-left: 1px solid;
          border-right: 1px solid;
          @include border_color("detail_border_color2");
        }

        .next-question {
          border-left: 1px solid;
          @include border_color("detail_border_color2");
          flex: 1;
        }

        .disable {
          color: #b9b9b9;
        }
      }
    }
  }


</style>
