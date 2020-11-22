<template>
  <div class="overview" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backDetail"></i>
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
                 :style="{backgroundColor: getColor(getQuestionIndex(index, key), key)}"
                 @click="toExamDetail(index, key)"
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
      projectName: '马克思',
      chapterName: '导论',
      chapterColor: "#536dfe",
      questionObj: {
        sigNum: 43,
        mulNum: 23,
        judNum: 19,
        blaNum: 19,
      },
      answerObj: {},
      currentType: null,
      questionIndex: null,
    }
  },
  created() {

    // 获取所有信息
    this.totalQuesArr = this.$route.params.examQues;
    this.subjectId = this.$route.params.subjectId;
    this.quesDistributionType = this.$route.params.quesDistributionType;
    this.answerObj = this.$route.params.userAnsObj;

    let tempObj = {}
    tempObj['sigNum'] = this.quesDistributionType.sig;
    tempObj['mulNum'] = this.quesDistributionType.mul;
    tempObj['judNum'] = this.quesDistributionType.jud;
    tempObj['blaNum'] = this.quesDistributionType.bla;

    this.questionObj = tempObj;
    console.log(this.answerObj)
  },
  computed: {
    ...mapState([
      'themeColor',
      'themeMode',
      'cardMode',
      'selectedProject',
      'themeMode',
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
      if (this.isCheckIn(index, type)) {
        // console.log("true")
        return this.chapterColor;
      }
    },
    toExamDetail(index, key) {
      let quesIndex = 0;
      if (key === "sigNum") quesIndex = index;
      if (key === "mulNum") quesIndex = index + this.questionObj.sigNum;
      if (key === "blaNum") quesIndex = index + this.questionObj.sigNum + this.questionObj.mulNum;
      if (key === "judNum") quesIndex = index + this.questionObj.sigNum + this.questionObj.mulNum + this.questionObj.blaNum;
      this.$router.push({
        name: 'examDetail',
        params: {
          quesIndex: quesIndex,
          type: key,
          answerObj: this.answerObj,
          from: 'examOverview',
        }
      })
    }
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
    background: linear-gradient(90deg, #D43C0B, #BF8A10) !important;
  }

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
