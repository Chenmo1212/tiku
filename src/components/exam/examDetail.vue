<template>
  <div class="Detail" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="page-title" @click="submitExam"><span>提交试卷</span></div>
      <div class="full-screen" :style="{color: chapterColor}">
        {{ examTime ? examTime : '00:00' }}
      </div>
    </div>

    <div class="content">
      <div class="content-head">
        <div class="question-type" :style="{color: chapterColor}" @click="showIndex()">
          <span v-if="totalQuesArr[questionIndex].type === 0">单选题</span>
          <span v-if="totalQuesArr[questionIndex].type === 1">多选题</span>
          <span v-if="totalQuesArr[questionIndex].type === 2">填空题</span>
          <span v-if="totalQuesArr[questionIndex].type === 3">判断题</span>
        </div>
        <div class="question-num">
          <span class="question-index" :style="{color: chapterColor}">{{ questionIndex + 1 }}</span>
          /
          <span class="question-num-item">100</span>
        </div>
      </div>
      <div class="content-container">
        <div class="content-question">
          <div class="card-question" v-html="totalQuesArr[questionIndex].question"></div>
        </div>
        <div class="content-answer">
          <div class="card-answer-list">

            <!--单选题-->
            <div class="btn c-button answer-item"
                 v-if="totalQuesArr[questionIndex].type === 0"
                 :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
                 :style="getColor(answerIndex, totalQuesArr[questionIndex].type)"
                 @click="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex, totalQuesArr[questionIndex].type)"
                 v-for="(answerItem, answerIndex) in totalQuesArr[questionIndex].options">
              <span class="icon-item">
                <span v-if="answerIndex === 0">A.</span>
                <span v-if="answerIndex === 1">B.</span>
                <span v-if="answerIndex === 2">C.</span>
                <span v-if="answerIndex === 3">D.</span>
              </span>
              <span class="c-button__label" v-html="answerItem"></span>
            </div>

            <!--多选题-->
            <div class="btn c-button answer-item"
                 v-if="totalQuesArr[questionIndex].type === 1"
                 :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
                 :style="getColor(answerIndex, totalQuesArr[questionIndex].type)"
                 @click="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex, totalQuesArr[questionIndex].type)"
                 v-for="(answerItem, answerIndex) in totalQuesArr[questionIndex].options">
              <span class="icon-item">
                <span v-if="answerIndex === 0">A.</span>
                <span v-if="answerIndex === 1">B.</span>
                <span v-if="answerIndex === 2">C.</span>
                <span v-if="answerIndex === 3">D.</span>
              </span>
              <span class="c-button__label" v-html="answerItem"></span>
            </div>

            <!--判断题-->
            <div class="btn c-button answer-item"
                 v-if="totalQuesArr[questionIndex].type === 3"
                 :class="getActiveStyle(answerIndex, totalQuesArr[questionIndex].type)"
                 :style="getColor(answerIndex, totalQuesArr[questionIndex].type)"
                 @click="submitAns(totalQuesArr[questionIndex], answerIndex, questionIndex, totalQuesArr[questionIndex].type)"
                 v-for="(answerItem, answerIndex) in ['对','错']">
            <span class="icon-item">
              <span v-if="answerIndex === 0">A</span>
              <span v-if="answerIndex === 1">B</span>
            </span>
              <span class="c-button__label">{{ answerItem }}</span>
            </div>
          </div>

          <!--答案-->
          <div class="answer" v-if="showAnswer"
               :style="getAnsStyle(isError)"
          >
            <span>正确答案：</span>
            <span>{{ shiftAns(totalQuesArr[questionIndex].answer, totalQuesArr[questionIndex].type) }}</span>
            <span class="stick-box">
             <i class="fa fa-check-circle check" aria-hidden="true"
                v-if="totalQuesArr[questionIndex].type === 0 || totalQuesArr[questionIndex].type === 3"
                @click="handleCheck"
                :class="{active: isCheckIn}"></i>
              <i class="fa fa-thumb-tack stick" @click="handleStick" :class="{active: isStick}"></i>
          </span>
          </div>
        </div>
      </div>
      <div class="content-btn-group">
        <div class="menu-card" :style="{color: chapterColor}">
          <div class="all-question" @click="toExamOverview">
            <i class="fa fa-th" aria-hidden="true"></i>
          </div>
          <div class="pre-question" @click="changeQuestion(-1)" :class="{'disable': questionIndex <= 0}">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div class="next-question" @click="changeQuestion(1)"
               :class="{'disable': questionIndex >= totalQuesArr.length - 1}">
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
      examTime: '',
      timer: "",
      content: "",
      hour: 0,
      minutes: 0,
      seconds: 0,

      subjectId: null,
      totalQuesArr: [],              // 所有题目信息
      quesDistributionType: null,    // 题型分布
      answerObj: {},                 // 用户的答案
      questionTypeNum: 0,            // 题型数目
      questionTypeIndex: 0,            // 题型数目

      questionIndex: 0,              // 题目序号
      currentType: null,             // 题目类型

      chapterColor: "#536dfe",

      checkIndex: -1,  // 用户选项
      checkedList: [],                // 多选题正确答案

      showAnswer: false,
      ifFullScreen: false,
    }
  },
  created() {
    // this.timer = setInterval(this.startTimer, 1000);

    // 获取所有信息
    if (this.$route.params.from === 'examOverview') {
      // 从本地中获取考试信息
      if (typeof (localStorage.tiku_examData) !== undefined) {
        let tempData = JSON.parse(localStorage.tiku_examData);
        this.totalQuesArr = tempData.examQues;
        this.subjectId = tempData.subjectId;
        this.quesDistributionType = tempData.quesDistributionType;
      }
      // 从题目总览中直接跳转的题号
      this.questionIndex = this.$route.params.quesIndex - 1;
      this.answerObj = this.$route.params.answerObj;
      if (this.$route.params.type.indexOf('sig') >= 0) this.currentType = 0;
      if (this.$route.params.type.indexOf('mul') >= 0) this.currentType = 1;
      if (this.$route.params.type.indexOf('bla') >= 0) this.currentType = 2;
      if (this.$route.params.type.indexOf('jud') >= 0) this.currentType = 3;
      this.matchUserAns();
    } else if (this.$route.params.from === 'afterExam') {
      this.totalQuesArr = this.$route.params.examQues;
      this.subjectId = this.$route.params.id;
      this.quesDistributionType = this.$route.params.quesDistributionType;
      this.currentType = this.totalQuesArr[0].type;

      // 将考试信息存入本地
      this.setExamLocal()
    } else if (typeof (localStorage.tiku_examData) !== undefined) {
      let tempData = JSON.parse(localStorage.tiku_examData);
      this.totalQuesArr = tempData.examQues;
      this.subjectId = tempData.subjectId;
      this.quesDistributionType = tempData.quesDistributionType;
    }

    // 键盘操作
    let _this = this;
    document.onkeydown = function (e) {
      _this.keyListener(_this);
    };

    // 是否全屏
    if (typeof (localStorage.isFullScreen) !== 'undefined') {
      // 如果用户已经设置过全屏了，则改成全屏
      console.log("用户已经设置过了", JSON.parse(localStorage.isFullScreen));
      this.ifFullScreen = JSON.parse(localStorage.isFullScreen)
    }

    // 处理主题色
    this.chapterColor = '#00b0ff';
  },

  mounted() {
    this.getQuesTypeNum()
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
        'currentMemory',
        'projectBasicData',
        'isFullscreen',
      ]),
  },
  methods: {
    ...mapActions([
      'setWarning',
      'setFullScreen',
    ]),
    /**
     * 更改选项颜色
     * @param answerIndex 选项下标
     * @param type 题目类型
     * @returns {*} 返回颜色
     */
    getColor(answerIndex, type) {
      if (type === 1) {
        // console.log(this.checkedList);
        if (this.checkedList.indexOf(answerIndex) >= 0) {
          return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        }
      } else {
        if (this.checkIndex === answerIndex) {
          return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        }
        return {}
      }
    },
    // 提交试卷
    submitExam() {
      // console.log(this.answerObj)
      // console.log(this.totalQuesArr)

      let totalScore = 0;
      let total = this.totalQuesArr
      let user = this.answerObj

      for (let i = 0; i < total.length; i++) {
        if (user[i] !== undefined) { // 用户答了这个题
          if (user[i] === total[i].answer) {  // 判断是否正确
            totalScore++;
          }
        }
      }
      let typeScore = this.calcTypeScore()

      this.$router.push({
        name: 'afterExam',
        params: {
          from: 'examDetail',
          time: this.examTime,
          totalScore: totalScore,
          typeScore: typeScore,
          quesDistributionType: this.quesDistributionType,
        }
      })
    },
    calcTypeScore() {
      let sigNum = this.quesDistributionType.sig;
      let mulNum = this.quesDistributionType.mul;
      let blaNum = this.quesDistributionType.bla;
      let judNum = this.quesDistributionType.jud;
      let scoreObj = {sig: 0, mul: 0, bla: 0, jud: 0};
      let total = this.totalQuesArr
      let user = this.answerObj
      for (let i = 0; i < total.length; i++) {
        if (i < sigNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.sig++;
            }
          }
        } else if (i < mulNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.mul++;
            }
          }
        } else if (i < blaNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.bla++;
            }
          }
        } else if (i < judNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.jud++;
            }
          }
        }
      }
      // console.log(scoreObj)
      return scoreObj
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
      // 根据不同题型判断答案是否激活
      if (type === 1) {
        // console.log(this.checkedList);
        if (this.checkedList.indexOf(answerIndex) >= 0) {
          return 'c-button--active';
        }
      } else {
        if (this.checkIndex === answerIndex) {
          // console.log("getActiveStyle:", this.checkIndex);
          return 'c-button--active'
        }
        return ""
      }
    },

    toExamOverview() {
      // console.log(this.quesDistributionType)
      this.$router.push({
        name: 'examOverview',
        params: {
          from: 'examDetail',
          subjectId: this.subjectId,
          examQues: this.totalQuesArr,
          userAnsObj: this.answerObj,
          quesDistributionType: this.quesDistributionType,

          currentIndex: this.questionIndex,
          currentType: this.currentType,
        }
      })
    },
    // 匹配用户答案
    matchUserAns() {
      // 匹配用户答案
      for (let key in this.answerObj) {
        if (key == this.questionIndex) {
          if (Array.isArray(this.answerObj[key])) {
            this.checkedList = this.answerObj[key]
          } else {
            this.checkIndex = this.answerObj[key]
          }
          return true
        }
      }
    },

    // 切换题目
    changeQuestion(index) {
      if (index === 1) {     // 下一题
        this.questionIndex < this.totalQuesArr.length ? this.questionIndex += 1 : this.setWarning("这已经是最后一题了哦~");
      } else if (index === -1) {  // 上一题
        this.questionIndex > 0 ? this.questionIndex -= 1 : this.setWarning("这已经是第一题了哦~");
      }

      // console.log(this.totalQuesArr[this.questionIndex]);
      this.currentType = this.totalQuesArr[this.questionIndex].type;   // 题目类型变化
      this.getQuesTypeNum()

      if (!this.matchUserAns()) {  // 匹配用户答案
        this.checkIndex = null;
        this.checkedList = [];
      }
    },
    getQuesTypeNum() {  // 获取题目类型的数量
      if (this.currentType === 0) this.questionTypeNum = this.quesDistributionType.sig
      if (this.currentType === 1) this.questionTypeNum = this.quesDistributionType.mul
      if (this.currentType === 2) this.questionTypeNum = this.quesDistributionType.bla
      if (this.currentType === 3) this.questionTypeNum = this.quesDistributionType.jud
    },
    /**
     * 选择选项并记录用户答案
     * @param item 题目信息
     * @param answerIndex 选项下标（用户答案）
     * @param index 题目下标
     * @param type 题目类型
     * @returns {*} 返回颜色
     */
    submitAns(item, answerIndex, index, type) {
      if (type === 1) {  // 多选题，用户答案需要用列表存储
        // 无则添加，有则删除
        if (this.checkedList.indexOf(answerIndex) >= 0) {
          this.checkedList.splice(this.checkedList.indexOf(answerIndex), 1);
        } else {
          this.checkedList.push(answerIndex);
        }
        this.answerObj[index] = this.checkedList;
      } else {
        // 更改选项样式
        this.checkIndex = answerIndex;
        this.answerObj[index] = this.checkIndex;
      }
      // console.log(this.answerObj)
    },

    /**
     * 判断是否需要替换已选择的答案
     */
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
     * KeyListener
     */
    keyListener(_this) {
      let answerList = document.getElementsByClassName('answer-item');
      let key = window.event.keyCode;

      // 选项
      if (_this.currentType === 0 || _this.currentType === 3) {
        // 单选题
        switch (key) {
          case 49:  // A
          case 65:  // A
            _this.checkIndex = 0;
            break;
          case 50:  // B
          case 66:  // B
            _this.checkIndex = 1;
            break;
          case 51:  // C
          case 67:  // C
            _this.checkIndex = 2;
            break;
          case 52:  // D
          case 68:  // D
            _this.checkIndex = 3;
            break;
        }
      } else if (_this.currentType === 1) {
        let user_index = -1;
        // 多选题
        switch (key) {
          case 49:  // A
          case 65:  // A
            user_index = 0;
            break;
          case 50:  // B
          case 66:  // B
            user_index = 1;
            break;
          case 51:  // C
          case 67:  // C
            user_index = 2;
            break;
          case 52:  // D
          case 68:  // D
            user_index = 3;
            break;
        }

        // 返回用户选项在已选列表里的下标
        let _index = _this.checkedList.findIndex(function (value) {
          return value === user_index
        });
        // 判断是否已经选择了该选项，有删无增
        if (_index >= 0) {
          _this.checkedList.splice(_index, 1)
        } else {
          _this.checkedList.push(user_index)
        }
      }

      // 切换题目
      switch (key) {
        case 37:
          // console.log("左箭头");
          _this.changeQuestion(-1);
          break;
        case 39:
          // console.log("右箭头");
          _this.changeQuestion(1);
      }
    },


    //封装一个处理单位数字的函数
    startTimer() {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minute = this.minute + 1;
      }

      if (this.minute >= 60) {
        this.minute = 0;
        this.hour = this.hour + 1;
      }
      this.examTime = (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
    },

    setExamLocal() {
      let tempObj = {}
      tempObj['examQues'] = this.totalQuesArr;
      tempObj['subjectId'] = this.subjectId;
      tempObj['quesDistributionType'] = this.quesDistributionType;
      tempObj['userAnsObj'] = this.userAnsObj;
      localStorage.setItem('tiku_examData', JSON.stringify(tempObj))
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../scss/_handle.scss";

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
    box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
  }

  .question-num-item {
    color: #A7A9AA !important;
  }

  .pageName,
  .full-screen,
  .question-index {
    color: #BF8A10 !important;
  }

  .question-type {
    color: #BF8A10 !important;
    box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
  }

  .content .content-answer .card-answer-list .c-button--active {
    background: #26282b !important;
    box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
  }

  .c-button {
    border: none !important;
    color: #A7A9AA !important;
  }

  .answer {
    box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
  }

  .menu-card {
    color: #BF8A10 !important;
  }

  .header .page-title span {
    box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
    background: linear-gradient(90deg, #D43C0B, #BF8A10) !important;
  }
}

.header {
  height: 60px;
  line-height: 60px;
  /*background-color: #f4f6f8;*/
  @include background('detail_bg_color1');
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: space-between;
  padding: 0 5%;

  .page-title {
    span {
      padding: 8px 10px;
      box-shadow: 5px 5px 10px #eaecee, -5px -5px 10px #feffff;
      background: linear-gradient(-90deg, #38d1bf, #00b0ff);
      color: #fff;
      border-radius: 5px;
    }
  }

  .full-screen {
    width: 15%;
  }
}

.content {
  padding: 20px;
  min-height: 90vh;
  height: 100%;

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

  .content-container {
    max-height: 71%;
    padding: 0 7px 0;
    margin-top: 5%;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .content-question {
      @include font_color("detail_font_color1");
      margin: 0 0 10%;
      width: calc(100% - 20px);
      padding: 10px;
      @include background("detail_bg_color1");
      border-radius: 5px;
      text-align: left;
      border: 1px solid;
      @include border_color("detail_border_color1");
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;

      .card-question {
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */

        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
      }
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

          .stick, .check {
            padding: 8px;
            margin: 0 5px;
          }
        }

        .active {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
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
