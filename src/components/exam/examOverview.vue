<template>
  <div class="overview" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i class="fa fa-angle-left" aria-hidden="true" @click="toExamDetail(0, 0, 'back')"></i>
        </div>
        <div class="page-title">题目总览</div>
      </div>
    </div>

    <div class="container">
      <div class="question-type" v-for="(val, key) in questionObj" v-if="val">
        <div class="title">
          <span v-if="val && key === 'sigNum'">单选题</span>
          <span v-if="val && key === 'mulNum'">多选题</span>
          <span v-if="val && key === 'judNum'">判断题</span>
          <span v-if="val && key === 'blaNum'">填空题</span>
        </div>
        <div class="content">
          <div class="circle-box" v-for="index in val">
            <div class="circle"
                 :class="{'active': isCheckIn(getQuestionIndex(index, key), key)}"
                 :style="{background: getColor(getQuestionIndex(index, key), key)}"
                 @click="toExamDetail(getQuestionIndex(index, key), key, 'toQuestion')"
            >
              {{ getQuestionIndex(index, key) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "overview",
  data() {
    return {
      from: '',    // 从哪来
      projectName: '马克思',
      chapterName: '导论',
      chapterColor: "#00b0ff",
      wrongColor: "#ff6584",
      totalQuesArr: [],  // 题目信息
      questionObj: {
        sigNum: 43,
        mulNum: 23,
        judNum: 19,
        blaNum: 19,
      },
      answerObj: {},
      questionIndex: null,

      historyIndex: null,
      historyType: null,
    }
  },
  created() {

    // 获取所有信息
    this.from = this.$route.params.from;
    if (this.from !== 'examDetail' && this.from !== 'afterExam' ) {
      this.setWarning("搞事情同学，从哪个页面进来的？")
    }

    let temp = JSON.parse(localStorage.tiku_examData)
    this.totalQuesArr = temp.examQues;
    this.subjectId = temp.subjectId;
    this.quesDistributionType = temp.quesDistributionType;
    this.answerObj = temp.answerObj;

    let tempObj = {}
    tempObj['sigNum'] = this.quesDistributionType.sig;
    tempObj['mulNum'] = this.quesDistributionType.mul;
    tempObj['judNum'] = this.quesDistributionType.jud;
    tempObj['blaNum'] = this.quesDistributionType.bla;

    this.questionObj = tempObj;

  },
  computed: {
    ...mapState([
      'themeColor',
      'themeMode',
      'cardMode',
      'selectedProject',
      'themeMode',
      'examDoneStatus',
    ]),
  },
  methods: {
    ...mapActions([
      'setThemeColor',
      'setSelectedAnswer',
      'setCurrentMemory',
      'setSelectedProject',
      'defineSelectedAnswer',
      'setProjectBasicData',
    ]),
    backDetail() {
      this.$router.push({name: 'examDetail'});
    },
    // 获取题目类型的下标
    getQuestionIndex(index, key) {
      if (key.indexOf('sig') >= 0) return index;
      if (key.indexOf('mul') >= 0) return index + this.questionObj.sigNum;
      if (key.indexOf('bla') >= 0) return index + this.questionObj.sigNum + this.questionObj.mulNum;
      if (key.indexOf('jud') >= 0) return index + this.questionObj.sigNum + this.questionObj.mulNum + this.questionObj.blaNum;
    },
    /**
     * 是否已经答题
     * @param index 题目序号
     * @param type 题目类型
     * @returns {boolean} 返回是否
     */
    isCheckIn(index, type) {
      let itemIndex = null;
      let temp = Object.keys(this.answerObj)
      for (let i = 0; i < temp.length; i++) {
        itemIndex = parseInt(temp[i]) + 1
        if (itemIndex === index) {
          return true
        }
      }
    },
    getColor(index, type) {
      if (!this.examDoneStatus) {  // 考试ing，查看答题卡，只有做和没做的区别
        if (this.isCheckIn(index, type)) {
          // console.log("true")
          return this.chapterColor;
        }
      } else {  // 考试结束，查看答题卡，没做、做对、做错三种区别
        // 默认是没做的颜色
        // console.log(index, type)
        let total = this.totalQuesArr;
        let user = this.answerObj;
        if (this.isCheckIn(index, type)) {  // 判断有没有做
          // console.log(total[index].answer)
          // console.log(user[index - 1])
          if (total[index - 1].answer === user[index - 1]) { // 判断是否做对
            if (this.themeMode === 'dark') return 'linear-gradient(90deg, #D43C0B, #BF8A10)'
            return this.chapterColor;
          } else {  // 做错了
            // if (this.themeMode === 'dark') return 'linear-gradient(90deg, #cb2d3e, #ef473a)'
            if (this.themeMode === 'dark') return 'linear-gradient(90deg, #a73737, #7a2828)'
            return this.wrongColor;
          }
        }  // 没做
        return ''
      }
    },
    toExamDetail(index, key, type) {
      if (type ==='back'){
        this.$router.go(-1)
      } else {
        // 跳转题目，把跳转的东西存在本地
        let temp = JSON.parse(localStorage.tiku_examData)
        // 跳转的题目下标
        temp['questionIndex'] = index - 1;
        // 跳转的题目类型
        if (key.indexOf('sig') >= 0) temp['currentType'] = 0;
        if (key.indexOf('mul') >= 0) temp['currentType'] = 1;
        if (key.indexOf('bla') >= 0) temp['currentType'] = 2;
        if (key.indexOf('jud') >= 0) temp['currentType'] = 3;
        localStorage.setItem('tiku_examData', JSON.stringify(temp))

        this.$router.push({
          name: 'examDetail',
          params: {
            from: 'examOverview',
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/_handle.scss";

.overview {
  /*background-color: #f4f6f8;*/
  @include background("over_bg_color1");
}

.dark {
  .header .return .circle,
  .container .title {
    color: #BF8A10 !important;
    box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
  }

  .container .content .circle-box .circle {
    color: #BF8A10;
    box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
  }

  .container .content .circle-box .circle.active {
    box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
    //background: linear-gradient(90deg, #D43C0B, #BF8A10) !important;
  }

  .page-title,
  .pageName {
    color: #BF8A10 !important;
  }
}

.header {
  height: 60px;
  line-height: 60px;
  @include background("over_bg_color1");
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .return {
    float: left;
    display: flex;
    align-items: center;
    padding-left: 20px;
    width: 90vw;
    overflow: hidden;

    .circle {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      @include background("over_bg_color1");
      margin: 0;
      box-shadow: 3px 3px 5px #ebebeb, -3px -3px 5px #ffffff;
      border: 1px solid;
      @include border_color("over_border_color1")
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
}

.container {
  min-height: 90vh;
  padding: 0 5% 5%;

  .question-type {
    margin-top: 5%;
  }

  .title {
    height: 30px;
    line-height: 30px;
    width: 100px;
    border-radius: 5px;
    border: 1px solid;
    @include border_color("over_border_color1");
    box-shadow: 5px 5px 10px #eaecee,
    -5px -5px 10px #feffff;
    margin-bottom: 5%;
  }

  .content {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    .circle-box {
      width: 20%;
      margin: 2% 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .circle {
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 50%;
        border: 2px solid;
        @include border_color("over_border_color1");
        box-shadow: inset 3px 3px 10px #eaecee,
        inset -3px -3px 10px #feffff;
      }

      .active {
        border: 2px solid #fff;
        box-shadow: 5px 5px 10px #eaecee,
        -5px -5px 10px #feffff;
        color: #fff !important;
      }
    }
  }
}
</style>
