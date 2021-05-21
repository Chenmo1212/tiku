<template>
  <div class="Detail" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="page-title" @click="clickSubmitBtn"><span>{{ submitName }}</span></div>
      <div class="full-screen" :style="{color: chapterColor}">
        {{ examTimeObj.examTime ? examTimeObj.examTime : '00:00' }}
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
              <span class="c-button__label" v-html="answerItem"/>
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
              <span class="c-button__label" v-html="answerItem"/>
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
                :class="{active: isCheckIn}"/>
              <i class="fa fa-thumb-tack stick" @click="handleStick" :class="{active: isStick}"/>
          </span>
          </div>
        </div>
      </div>
      <div class="content-btn-group">
        <div class="menu-card" :style="{color: chapterColor}">
          <div class="all-question" @click="toExamOverview">
            <i class="fa fa-th" aria-hidden="true"/>
          </div>
          <div class="show-answer" @click="handleShowAnswer()" v-if="examDoneStatus">
            <i class="fa fa-eye" aria-hidden="true" v-if="showAnswer"/>
            <i class="fa fa-eye-slash" aria-hidden="true" v-if="!showAnswer"/>
          </div>
          <div class="pre-question" @click="changeQuestion(-1)" :class="{'disable': questionIndex <= 0}">
            <i class="fa fa-arrow-left" aria-hidden="true"/>
          </div>
          <div class="next-question" @click="changeQuestion(1)"
               :class="{'disable': questionIndex >= totalQuesArr.length - 1}">
            <i class="fa fa-arrow-right" aria-hidden="true"/>
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
      // 定时器
      examTimeObj: {
        beginTime: 0,
        toOverviewTime: 0,
        backDetailTime: 0,
        endTime: 0,
        examTime: '00:00:00',
        gapTime: 0,
        isOver: false,
        timer: '',
      },
      examTime: 0,

      subjectId: null,
      submitName: '提交试卷',
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

      totalScore: 0,
      typeScore: 0,

      showAnswer: false,
      isError: true,
      ifFullScreen: false,
    }
  },
  created() {
    // 定时器初始化
    this.clockInit();

    // 判断答案是否固定显示
    if (this.isStick) this.handleShowAnswer();

    this.submitName = this.examDoneStatus ? '查看结果' : '提交试卷';

    // 获取所有信息
    let tempData = JSON.parse(localStorage.tiku_examData);
    this.totalQuesArr = tempData.examQues;
    this.subjectId = tempData.subjectId;
    this.quesDistributionType = tempData.quesDistributionType;

    if (this.$route.params.from === 'beforeExam') {
      this.currentType = this.totalQuesArr[0].type;
      // 将考试信息存入本地
      this.setExamLocal(1)
    } else if (typeof (localStorage.tiku_examData) !== 'undefined') {
      // 从本地中获取考试信息
      this.questionIndex = tempData.questionIndex;
      this.currentType = tempData.currentType;
      this.answerObj = tempData.answerObj;
      this.matchUserAns();
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
    this.getQuesTypeNum();
    console.log("mounted:", this.$route.params.id);
    if (typeof (this.$route.params.id) !== 'undefined') {
      this.slice_count = this.$route.params.id - 1;
      this.gapIndex = this.$route.params.id - 1;
    }
  },
  watch: {
    submitExamStatus() {
      console.log("changed", this.submitExamStatus)
      if (this.submitExamStatus) this.submitExam();
    },
    '$route'(to, from) {
      console.log(to);
      console.log(from);
      // from 对象中要 router 来源信息.
      // do your want
    }
  },
  computed: {
    ...
      mapState([
        'themeColor',
        'themeMode',
        'isStick',
        'isCheckIn',
        'isFullscreen',
        'examDoneStatus',
        'submitExamStatus',
      ]),
  },
  methods: {
    ...mapActions([
      'setWarning',
      'setFullScreen',
      'setExamStatus',
      'setAutoStick',
      'setAutoCheck',
      'setModel',
      'setSubmitExamStatus',
    ]),

    // 前往答题卡
    toExamOverview() {

      //  处理计时器
      this.examTimeObj.toOverviewTime = Date.parse(new Date()) / 1000;
      this.setLocalStorage();
      clearInterval(this.examTimeObj.timer);

      // 存储一些必要的信息
      this.setExamLocal(1);

      this.$router.push({
        name: 'examOverview',
        params: {
          from: 'examDetail',
        }
      })
    },
    // 提交试卷
    clickSubmitBtn() {
      if (!this.examDoneStatus) { // 考试在继续
        this.setModel('submitExam');  // 显示模态框等待用户操作
      } else {
        // 跳转考试结束页面
        this.$router.push({
          name: 'afterExam',
          params: {
            from: 'examDetail'
          }
        })
      }
    },
    submitExam() {
      // 计时器
      clearInterval(this.examTimeObj.timer);
      this.examTimeObj.isOver = true;
      this.setLocalStorage();

      let total = this.totalQuesArr;
      let user = this.answerObj;
      // 计算总分
      for (let i = 0; i < total.length; i++) {
        if (user[i] !== undefined) { // 用户答了这个题
          if (Array.isArray(total[i].answer)) {  // 数组得单独拿出来判断，存在顺序不同但内容相同的可能
            // console.log(total[i].answer)
            if (JSON.stringify(user[i].sort()) === JSON.stringify(total[i].answer.sort())) {  // 判断是否正确
              this.totalScore++;
            }
          } else {
            if (user[i] === total[i].answer) {  // 判断是否正确
              this.totalScore++;
            }
          }
        }
      }
      // 计算题型分数
      this.typeScore = this.calcTypeScore();

      // 设置模拟考试状态为结束考试
      this.setExamStatus(true);
      this.setSubmitExamStatus(false);
      this.setExamLocal(0);

      // 跳转考试结束页面
      this.$router.push({
        name: 'afterExam',
        params: {
          from: 'examDetail'
        }
      })
    },
    calcTypeScore() {
      let sigNum = this.quesDistributionType.sig;
      let mulNum = this.quesDistributionType.mul;
      let blaNum = this.quesDistributionType.bla;
      let judNum = this.quesDistributionType.jud;
      let scoreObj = {sig: 0, mul: 0, bla: 0, jud: 0};
      let total = this.totalQuesArr;
      let user = this.answerObj;
      for (let i = 0; i < total.length; i++) {
        if (i < sigNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.sig++;
            }
          }
        } else if (i < sigNum + mulNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (Array.isArray(total[i].answer)) {  // 数组得单独拿出来判断，存在顺序不同但内容相同的可能
              if (JSON.stringify(user[i].sort()) === JSON.stringify(total[i].answer.sort())) {  // 判断是否正确
                scoreObj.mul++;
              }
            }
          }
        } else if (i < sigNum + mulNum + blaNum) {
          if (user[i] !== undefined) { // 用户答了这个题
            if (user[i] === total[i].answer) {  // 判断是否正确
              scoreObj.bla++;
            }
          }
        } else if (i < 100) {
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

    handleShowAnswer() {
      //   显示答案
      this.judAnswer();
      this.showAnswer = !this.showAnswer;
    },

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
        if (ans === 1) return "对";
        if (ans === 0) return "错";
      }
    },
    // 固定答案
    handleStick() {
      this.setAutoStick();
      this.isStick ? this.setWarning("答案固定显示") : this.setWarning("答案取消固定");
      localStorage.setItem("isStick", JSON.stringify(this.isStick));
    },

    // 自动检测答案
    handleCheck() {
      if (this.isCheckIn) {
        this.setWarning("答案自动检查功能关闭");
        this.setAutoCheck(false);
      } else {
        this.setWarning("答案自动检查功能开启");
        this.setAutoCheck(true);
      }
      localStorage.setItem("isCheckIn", JSON.stringify(this.isCheckIn));
    },
    // 匹配用户答案
    matchUserAns() {
      // 匹配用户答案
      // console.log("匹配用户答案：", this.answerObj, '\n', this.questionIndex);
      for (let key in this.answerObj) {
        if (key == this.questionIndex) {
          if (Array.isArray(this.answerObj[key])) {
            this.checkedList = this.answerObj[key]
          } else {
            if (this.currentType === 3) {
              this.checkIndex = this.answerObj[key] ? 0 : 1;
            } else {
              this.checkIndex = this.answerObj[key]
            }
          }
          return true
        }
      }
    },

    // 切换题目
    changeQuestion(index) {
      if (index === 1) {     // 下一题
        // this.questionIndex < this.totalQuesArr.length ? this.questionIndex += 1 : this.setWarning("这已经是最后一题了哦~");
        if (this.questionIndex + 1 < this.totalQuesArr.length) {
          this.questionIndex += 1;
        } else {
          this.setWarning("这已经是最后一题了哦~");
          return
        }
      } else if (index === -1) {  // 上一题
        // this.questionIndex > 0 ? this.questionIndex -= 1 : this.setWarning("这已经是第一题了哦~");
        if (this.questionIndex > 0) {
          this.questionIndex -= 1
        } else {
          this.setWarning("这已经是第一题了哦~");
          return
        }
      }

      // console.log(this.totalQuesArr[this.questionIndex]);
      this.currentType = this.totalQuesArr[this.questionIndex].type;   // 题目类型变化
      this.getQuesTypeNum()

      // 判断考试是否完成决定保存数据时是否更新总分
      this.examDoneStatus ? this.setExamLocal(1) : this.setExamLocal(0);

      if (!this.matchUserAns()) {  // 匹配用户答案
        this.checkIndex = null;
        this.checkedList = [];
      }

      // 判断用户答案是否正确
      this.judAnswer();
    },
    judAnswer() {
      let ans = this.totalQuesArr[this.questionIndex].answer
      let user = this.answerObj[this.questionIndex]
      if (Array.isArray(ans)) {  // 数组得单独拿出来判断，存在顺序不同但内容相同的可能
        if (Array.isArray(user)) {
          this.isError = JSON.stringify(user.sort()) !== JSON.stringify(ans.sort())
        } else {
          this.isError = false
        }
      } else {
        this.isError = this.totalQuesArr[this.questionIndex].answer !== this.answerObj[this.questionIndex];
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
          // console.log(this.checkedList)
        }
        this.answerObj[index] = this.checkedList;
      } else {
        // 更改选项样式
        this.checkIndex = answerIndex;
        // console.log(this.answerObj)
        // 更改判断题顺序（使第一个选项为对，第二个选项为错）
        if (type === 3) answerIndex = answerIndex ? 0 : 1;
        console.log(answerIndex);
        this.answerObj[index] = answerIndex;
      }
      this.setExamLocal(1);

      // 判断用户答案是否正确
      this.judAnswer()
    },

    getAnsStyle(bool) {
      console.log(bool);
      if (!bool) return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
      return {color: '#F56C6C', border: '1px solid' + '#F56C6C'}
    },

    /**
     * KeyListener
     */
    keyListener(_this) {
      let answerList = document.getElementsByClassName('answer-item');
      let key = window.event.keyCode;
      let isAnswerQuestion = true;  // 是否是回答问题的——防止用户在切换题目的时候被误认为答题

      // 切换题目
      switch (key) {
        case 37:
          // console.log("左箭头");
          _this.changeQuestion(-1);
          isAnswerQuestion = false;
          break;
        case 39:
          // console.log("右箭头");
          _this.changeQuestion(1);
          isAnswerQuestion = false;
      }
      // 判断是不是答题状态
      if (isAnswerQuestion) {
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
          let answerIndex = _this.checkIndex
          if (this.currentType === 3) answerIndex = answerIndex ? 0 : 1;
          _this.answerObj[_this.questionIndex] = answerIndex;
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
            _this.checkedList.push(user_index);
            // console.log(_this.checkedList)
          }
          _this.answerObj[_this.questionIndex] = _this.checkedList;
        }
      }
      _this.setExamLocal(1)
    },

    /**
     * 存储考试用的必要信息
     * @param type: 1/0  1:普通模式； 0：考试结束后切换答题卡不改变总分
     */
    setExamLocal(type) {
      let tempObj = {}
      tempObj['examQues'] = this.totalQuesArr;
      tempObj['subjectId'] = this.subjectId;
      tempObj['quesDistributionType'] = this.quesDistributionType;
      tempObj['answerObj'] = this.answerObj;
      tempObj['currentType'] = this.currentType;
      tempObj['questionIndex'] = this.questionIndex;
      if (!type && this.examDoneStatus) {  // 考试结束
        localStorage.setItem('examTimeObj', JSON.stringify(this.examTimeObj))
        localStorage.setItem('totalScore', JSON.stringify(this.totalScore))
        localStorage.setItem('typeScore', JSON.stringify(this.typeScore))
      }
      localStorage.setItem('tiku_examData', JSON.stringify(tempObj))
    },

    calcExamTime() {
      // 获取当前时间为结束时间
      this.examTimeObj.endTime = Date.parse(new Date()) / 1000;
      let obj = this.examTimeObj;

      obj.gapTime += obj.backDetailTime - obj.toOverviewTime;  // 跳出的时间
      obj.toOverviewTime = 0;
      obj.backDetailTime = 0;

      // 输出到屏幕上
      let temp = (obj.endTime - obj.beginTime) - obj.gapTime;
      // 转换成字符串
      this.examTimeObj.examTime = this.numToTime(temp);
      this.setLocalStorage()
    },
    numToTime(num) {
      let hours = parseInt(num / 60 / 60)
      let minute = parseInt(num / 60 % 60)
      let second = parseInt(num % 60)

      if (hours < 10) hours = '0' + hours
      if (minute < 10) minute = '0' + minute
      if (second < 10) second = '0' + second
      return hours + ':' + minute + ':' + second
    },
    // 存储数据到本地
    setLocalStorage() {
      // window.examTimeObj = JSON.stringify(this.examTimeObj);
      localStorage.setItem('examTimeObj', JSON.stringify(this.examTimeObj));
    },
    overClock() {
      clearInterval(this.examTimeObj.timer);
      this.examTimeObj.isOver = true;
      this.setLocalStorage()
    },

    //添加beforeunload监听事件
    createBeforeunloadHandler() {
      //window.addEventListener('beforeunload', e => this.beforeunloadHandler(e));
      window.addEventListener('beforeunload', this.beforeunloadHandler, false);
    },
    //beforeunload监听事件
    beforeunloadHandler(e) {
      this.setLocalStorage();
      console.log("本地存储")
    },
    toAbout() {
      this.$router.push({name: 'about'})
    },
    resetTime() {
      this.examTimeObj.beginTime = Date.parse(new Date()) / 1000;
      this.examTimeObj.toOverviewTime = 0;
      this.examTimeObj.backDetailTime = 0;
      this.examTimeObj.endTime = 0;
      this.examTimeObj.gapTime = 0;
      this.setLocalStorage();
    },
    clockInit() {
      if (typeof (localStorage.examTimeObj) === 'undefined') {
        this.examTimeObj.beginTime = Date.parse(new Date()) / 1000;
        this.examTimeObj.timer = setInterval(this.calcExamTime, 1000)
      } else {
        // 刷新之后本地数据覆盖初始化数据
        this.examTimeObj = JSON.parse(localStorage.examTimeObj);
        if (!JSON.parse(localStorage.examTimeObj).isOver) {
          this.examTimeObj.timer = setInterval(this.calcExamTime, 1000)
        }
      }
      if (this.$route.params.from && this.$route.params.from === 'examOverview') {
        this.examTimeObj.backDetailTime = Date.parse(new Date()) / 1000;
      }
      this.setLocalStorage();
      this.createBeforeunloadHandler();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../scss/handle";

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
    width: 20%;
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
            padding: 7px;
            margin: 0px 5px;
            border-radius: 50%;
            height: 18px;
            width: 18px;
            text-align: center;
            line-height: 18px;
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
