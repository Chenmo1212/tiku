<template>
  <div class="Detail" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backChapter"/>
        </div>
        <div class="page-title" @click="exitFull()">章节背题 |
          <span :style="{color: chapterColor}" class="pageName">{{ projectName }} - {{ chapterName }}</span>
        </div>
      </div>
      <!--      <div class="full-screen" :style="{color: chapterColor}">-->
      <!--        <span @click="setScreen" v-if="!ifFullScreen"><i class="fa fa-expand"/></span>-->
      <!--        <span @click="exitFull" v-if="ifFullScreen"><i class="fa fa-compress"/></span>-->
      <!--      </div>-->
      <div class="favourite active" :style="{color: chapterColor}" @click="setFavourite(1)">
        <svg-icon iconClass="star_fill" v-if="isFavourite" :style="{fill: chapterColor}"/>
        <svg-icon iconClass="star" v-else :style="{fill: chapterColor}"/>
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
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 0">{{ questionIndex + 1 }}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 1">{{ questionIndex + 1 - selectedChapter.radio }}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 2">{{
              questionIndex + 1 - selectedChapter.radio - selectedChapter.multiple
            }}</span>
          <span class="question-index" :style="{color: chapterColor}"
                v-if="totalQuesArr[questionIndex].type === 3">{{
              questionIndex + 1 - selectedChapter.radio - selectedChapter.multiple - selectedChapter.fill
            }}</span>
          /
          <span class="question-num-item"
                v-if="totalQuesArr[questionIndex].type === 0">{{ selectedChapter.radio }}</span>
          <span class="question-num-item"
                v-if="totalQuesArr[questionIndex].type === 1">{{ selectedChapter.multiple }}</span>
          <span class="question-num-item"
                v-if="totalQuesArr[questionIndex].type === 2">{{ selectedChapter.fill }}</span>
          <span class="question-num-item"
                v-if="totalQuesArr[questionIndex].type === 3">{{ selectedChapter.decide }}</span>
          /
          <span
            class="question-num-item">{{
              selectedChapter.radio + selectedChapter.decide + selectedChapter.multiple + selectedChapter.fill
            }}</span>
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
          <div class="all-question" @click="toOverview">
            <i class="fa fa-th" aria-hidden="true"/>
          </div>
          <div class="show-answer" @click="showAnswer = !showAnswer">
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
      projectName: '马克思',
      chapterName: '导论',
      chapterColor: "#536dfe",
      checkIndex: -1,  // 用户选项
      showAnswer: false,

      userAns: null,

      questionIndex: 0,              // 题目序号
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

      answerList: [],                // 多选题正确答案
      checkedList: [],               // 用户多选题答案

      isError: true,

      ifFullScreen: false,

      gapIndex: 0,
      itemIndex: null,               // 题目序号
      currentType: null,             // 题目类型
      currentTypeIndex: 0,             // 题目类型的序号0,1,2,3

      selectedChapter: '',

      isFavourite: false,             // 是否收藏这个题

      // isStick: false,               // 是否始终显示答案
      // isCheckIn: false,                // 自动检查答案
    }
  },
  created() {
    let isOverview = false;
    let newIndex = null;

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
    if (localStorage.selectedProject === "{}") {
      this.setSelectedProject(this.projectBasicData['mao_gai']);
      localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
    }

    // 获取全部题目数据
    this.setSelectedProject(JSON.parse(localStorage.selectedProject));
    this.defineSelectedAnswer(JSON.parse(localStorage.selectedAnswer));
    this.setProjectBasicData(JSON.parse(localStorage.projectBasicData));

    let selectedChapter = JSON.parse(localStorage.selectedChapter);
    this.selectedChapter = selectedChapter;
    this.totalQuesArr = selectedChapter.data;
    // console.log(this.totalQuesArr);

    // 跳转题目
    if (typeof (this.$route.params.id) !== 'undefined') {
      this.itemIndex = this.$route.params.id;
      this.currentType = this.$route.params.type.slice(0, 3) + 'Arr';
      newIndex = this.$route.params.id - 1;
      // console.log(this.selectedAnswer);
      // console.log(this.selectedChapter);

      let projectId = this.selectedChapter.id;
      let chapterIndex = this.selectedChapter.index;
      // console.log(this.$route.params.type);
      let type = this.$route.params.type.slice(0, 3) + 'Arr';
      let ansArr = this.selectedAnswer[projectId][chapterIndex][type];

      // 匹配用户答案
      for (let i = 0; i < ansArr.length; i++) {
        if (ansArr[i].index === newIndex) {
          if (Array.isArray(ansArr[i].userAns)) {  // 根据用户选项是数组还是数字来判断是多选题还是单选题
            this.checkedList = ansArr[i].userAns;
          } else {
            this.checkIndex = ansArr[i].userAns;
          }
          this.isFavourite = ansArr[i].isFavourite;  // 题目是否已经收藏
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
      this.currentTypeIndex = type;             // 题目类型的序号0,1,2,3
      if (type === 0) type = "sigArr";
      if (type === 1) type = "mulArr";
      if (type === 2) type = "blaArr";
      if (type === 3) type = "judArr";

      let ansArr = this.selectedAnswer[projectId][chapterIndex][type];
      // console.log(ansArr);
      // 匹配用户答案
      for (let i = 0; i < ansArr.length; i++) {
        if (ansArr[i].index === newIndex + 1) {
          this.checkIndex = ansArr[i].userAns;
          this.isFavourite = ansArr[i].isFavourite;
          break;
        }
      }
    }
    // 处理标题信息
    this.chapterName = selectedChapter.title;
    this.projectName = this.selectedProject.chinese;

    // 判断本地是否有closeCheckOfMul
    // console.log(this.closeCheckOfMul)
    if (typeof (localStorage.closeCheckOfMul) !== 'undefined') {
      // 如果没有
      localStorage.setItem('closeCheckOfMul', JSON.stringify(this.closeCheckOfMul))
    }
  },

  mounted() {
    console.log("mounted:", this.$route.params.id);
    if (typeof (this.$route.params.id) !== 'undefined') {
      this.slice_count = this.$route.params.id - 1;
      this.gapIndex = this.$route.params.id - 1;
    }
    // 是否自动显示答案
    if (typeof (localStorage.isStick) !== 'undefined') {
      if (JSON.parse(localStorage.isStick) !== this.isStick) {
        this.setAutoStick();
      }
    }

    // if (this.isCheckIn) this.showAnswer = true;

    // 是否自动核对答案
    if (typeof (localStorage.isCheckIn) !== 'undefined') {
      if (JSON.parse(localStorage.isCheckIn) !== this.isCheckIn) {
        JSON.parse(localStorage.isCheckIn) ? this.setAutoCheck(true) : this.setAutoCheck(false);
      }
    }
  },
  computed: {
    ...mapState([
      'themeColor',
      'themeMode',
      // 'selectedChapter',
      'selectedProject',
      'selectedAnswer',
      'currentMemory',
      'projectBasicData',
      'isStick',
      'isCheckIn',
      'closeCheckOfMul',
    ]),
  },
  methods: {
    ...mapActions([
      'setSelectedChapter',
      'setSelectedAnswer',
      'setCurrentMemory',
      'setSelectedProject',
      'defineSelectedAnswer',
      'setProjectBasicData',
      'setWarning',
      'setFullScreen',
      'setAutoStick',
      'setAutoCheck',
      'setCloseCheckOfMul',
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

    /**
     * 设置题目的激活状态
     * @param index 类型
     */
    setFavourite(index) {
      if (index === 1) this.isFavourite = !this.isFavourite;
      if (index === 2) this.isFavourite = false;
      if (index === 3) this.isFavourite = true;

      let projectId = this.selectedProject.id;         // 科目id
      let chapterIndex = this.selectedChapter.index;   // 章节下标
      let userAns = this.userAns;            // 用户答案

      let tempArr = null;
      if (typeof (localStorage.selectedAnswer) === 'undefined') {
        tempArr = this.selectedAnswer[projectId][chapterIndex][this.currentType];
      } else {
        tempArr = JSON.parse(localStorage.selectedAnswer)[projectId][chapterIndex][this.currentType];
      }

      let tempObj = {};
      tempObj['index'] = this.questionIndex;
      tempObj['userAns'] = userAns;
      tempObj['isFavourite'] = this.isFavourite;
      let obj = this.isHasObj(tempArr, this.questionIndex);
      if (obj.flag) {
        // 科目id-章节下标-题目下标-用户答案
        this.setSelectedAnswer({
          projectId: projectId,
          chapterIndex: chapterIndex,
          quesObj: tempObj,
          quesType: this.currentTypeIndex,
          isReplace: true,
          replaceIndex: obj.index
        });
      } else {
        // 科目id-章节下标-题目下标-用户答案
        this.setSelectedAnswer({
          projectId: projectId,
          chapterIndex: chapterIndex,
          quesObj: tempObj,
          quesType: this.currentTypeIndex,
          isReplace: false,
        });
      }

      localStorage.setItem('selectedAnswer', JSON.stringify(this.selectedAnswer));
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

      if (type === 1) {
        // console.log(this.checkedList);
        if (this.checkedList.indexOf(answerIndex) >= 0) {
          return 'c-button--active';
        }
      } else {
        // console.log(this.checkIndex);
        if (this.checkIndex === answerIndex) {
          // console.log("getActiveStyle:", this.checkIndex);
          return 'c-button--active'
        }
        return ""
      }
    },
    backChapter() {
      this.$router.push({name: 'chapter'});
    },

    toOverview() {
      this.$router.push({name: 'overview'})
    },

    /**
     *  全屏
     */
    // setScreen() {
    //   let ele = document.body;
    //   if (ele.requestFullscreen) {
    //     ele.requestFullscreen();
    //   } else if (ele.mozRequestFullScreen) {
    //     ele.mozRequestFullScreen();
    //   } else if (ele.webkitRequestFullscreen) {
    //     ele.webkitRequestFullscreen();
    //   } else if (ele.msRequestFullscreen) {
    //     ele.msRequestFullscreen();
    //   }
    //   this.setFullScreen(true);
    //   this.ifFullScreen = true;
    //   localStorage.setItem('isFullScreen', JSON.parse(this.ifFullScreen));
    // },

    // exitFull() {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   } else if (document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    //   } else if (document.webkitCancelFullScreen) {
    //     document.webkitCancelFullScreen();
    //   } else {
    //     window.parent.showTopBottom();
    //   }
    //   this.setFullScreen(false);
    //   this.ifFullScreen = false;
    //   localStorage.setItem('isFullScreen', JSON.parse(this.ifFullScreen));
    // },

    // 切换题目
    changeQuestion(index) {
      if (index === 1) {     // 下一题
        if (this.questionIndex < this.totalQuesArr.length) this.questionIndex += 1;
      } else if (index === -1) {  // 上一题
        if (this.questionIndex > 0) this.questionIndex -= 1;
      }

      // console.log(this.totalQuesArr[this.questionIndex]);
      let tempType = this.totalQuesArr[this.questionIndex].type;

      // 确保多选题的时候，关闭自动检查答案
      if (tempType === 1) {  // 多选题
        if (this.isCheckIn) {  // 自动检查开启的时候
          this.setAutoCheck(false);
          this.setCloseCheckOfMul(true);
        }
      } else {  // 不是多选题的时候
        // 判断自动检查是不是关闭，如果是，则进一步判断是因为什么原因而关闭的
        if (!this.isCheckIn) {
          // 判断是否是因为多选题而关闭的自动检查
          if (this.closeCheckOfMul) {   // 是的
            // 那么在不是多选题的时候，应该改回来
            this.setAutoCheck(true);
          }
        }
      }

      // 获取用户答题情况
      let tempArr = this.selectedAnswer[this.selectedProject.id][this.selectedChapter.index][this.currentType];
      console.log('用户答题情况', tempArr)
      let flag = false;

      // 匹配用户答案
      // console.log(tempArr);
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].index === this.questionIndex) {
          if (Array.isArray(tempArr[i].userAns)) {
            this.checkedList = tempArr[i].userAns
          } else {
            this.checkIndex = tempArr[i].userAns;
          }
          // 获取用户题目收藏情况
          this.isFavourite = tempArr[i].isFavourite;
          flag = true;
        }
      }

      // 如果固定显示答案，则显示答案，如果不固定，则隐藏答案
      this.showAnswer = this.isStick;

      if (!flag) {
        this.checkIndex = -1;
        this.checkedList = [];
        this.isFavourite = false;
      }
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
      // 默认答案为错,修改答案样式
      this.isError = true;

      if (type === 1) {
        // 无则添加，有则删除
        if (this.checkedList.indexOf(answerIndex) >= 0) {
          this.checkedList.splice(this.checkedList.indexOf(answerIndex), 1);
        } else {
          this.checkedList.push(answerIndex);
        }

        // 判断对错，改答案样式
        // console.log("多选题答案", item.answer.sort().toString() === this.checkedList.sort().toString());
        item.answer.sort().toString() === this.checkedList.sort().toString() ? this.isError = false : this.isError = true;
      } else {
        // 判断对错，改答案样式
        this.checkIndex = answerIndex;

        // 更改判断题顺序（使第一个选项为对，第二个选项为错）
        if (type === 3) answerIndex = answerIndex ? 0 : 1;
        item.answer === answerIndex ? this.isError = false : this.isError = true;
      }
      // console.log("选择答案");

      // 自动校对答案
      if (this.isCheckIn) this.showAnswer = true;

      // 判断是否是跳转过来的，是跳转的，则需要加上间隔index
      this.itemIndex = index;

      // 记录答题情况

      let projectId = this.selectedProject.id;         // 科目id
      let chapterIndex = this.selectedChapter.index;   // 章节下标
      let quesIndex = index;                           // 题目下标
      let userAns = type === 1 ? this.checkedList : answerIndex;            // 用户答案
      this.userAns = userAns

      let tempObj = {};
      tempObj['index'] = quesIndex;
      tempObj['userAns'] = userAns;
      tempObj['isFavourite'] = this.isFavourite;
      this.currentTypeIndex = item.type

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

    /**
     * 判断是否需要替换已选择的答案
     */
    judgeReplace(projectId, chapterIndex, tempObj, type, quesIndex, typeArr) {
      let tempArr = null;
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
        if (ans === 0) return "错";
        if (ans === 1) return "对";
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
          isAnswerQuestion = false
          break;
        case 39:
          // console.log("右箭头");
          _this.changeQuestion(1);
          isAnswerQuestion = false
      }
      // 判断是不是答题状态
      if (isAnswerQuestion) {
        // 选项
        if (_this.currentType.indexOf('sig') >= 0 || _this.currentType.indexOf('jud') >= 0) {
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
        } else if (_this.currentType.indexOf('mul') >= 0) {
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
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/handle";

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
    width: 80%;
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

  .favourite {
    float: right;
    width: 14%;
    height: 100%;

    .svg-icon {
      height: 100%;
      width: 50%;
      max-width: 30px;
    }
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
