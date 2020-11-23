<template>
  <div :class="{dark: themeMode==='dark'}" class="afterExam">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="backHome" aria-hidden="true" class="fa fa-home"></i>
        </div>
        <div class="pageName">{{ pageName }}</div>
      </div>
    </div>

    <div class="exam-result chart">
      <div class="chart-label">
        <span class="t2">得分</span>
        <span class="text-muted">{{ totalScore }}</span>
      </div>
      <svg class="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           preserveAspectRatio="xMidYMid meet">
        <linearGradient id="svg-gradient" gradientUnits="userSpaceOnUse" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" v-if="themeMode === 'light'" style="stop-color:#00b0ff"/>
          <stop offset="0%" v-if="themeMode === 'dark'" style="stop-color:#BF8A10"/>
          <stop offset="100%" v-if="themeMode === 'light'" style="stop-color:#38d1bf"/>
          <stop offset="100%" v-if="themeMode === 'dark'" style="stop-color:#D43C0B"/>
        </linearGradient>
        <circle r="40" cx="50" cy="50" stroke-width="7" fill="transparent" stroke="#E2E8F0"></circle>
        <circle id="chartfill" r="40" cx="50" cy="50" stroke-width="7" stroke-dasharray="200" stroke-dashoffset="0"
                transform="rotate(-90 50 50)"
                fill="transparent" stroke="url(#svg-gradient)" stroke-linecap="round" class="meter"></circle>
      </svg>
    </div>

    <div class="section">
      <div class="section-container">
        <!-- 文字-->
        <div class="content">
          <div class="content-bd">
            <div class="total-score">100分</div>
            <div class="text">总分</div>
          </div>
          <div class="line"></div>
          <div class="content-bd">
            <div class="total-time">{{ examTime }}</div>
            <div class="text">用时</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tit">
      <div class="left-line"></div>
      <div class="text">错题详情</div>
    </div>
    <div class="question-detail">
      <div class="section-container questionType">
        <!-- 文字-->
        <div class="content" v-for="(value, index) in questionTypeLists" v-if="value.distrType">
          <div class="content-hd">{{ value.name }}</div>
          <div class="content-bd">
            <div class="question-num">题数: <span>{{ value.distrType }}</span></div>
            <div class="question-rate">正确率：<span>{{ ((value.typeScore * 100 / value.distrType).toFixed(2)) }}%</span>
            </div>
          </div>
          <div class="score"><span>{{ value.typeScore }}</span>分</div>
        </div>
      </div>
    </div>

    <!-- 开始考试 -->
    <div class="check-answer-sheet">
      <div class="card-btn" @click="toExamOverview">
        <button class="btn begin" style="color: rgb(0, 176, 255);">
              <span class="icon-container">
                <i class="fa fa-rocket"></i>查看答题卡
          </span></button>
      </div>
    </div>
  </div>
</template>

<script>
import detailVue from '../cardDetail'
import {mapState, mapActions} from 'vuex'

export default {
  name: "chapter",
  components: {
    detailVue,
  },
  data() {
    return {
      pageName: '考试结果',
      examTime: '', // 用时
      totalScore: '', // 总分
      typeScore: {}, // 每一类

      subjectName: '',  // 科目名字
      projectQuestion: null,  // 科目题目
      projectBasic: null,  // 科目基本信息

      totalQues: [],  // 全部题目
      sig: [],   // 单选题
      mul: [],  // 多选题
      jud: [],   // 判断题
      bla: [],   // 填空题

      quesDistributionType: '',   // 题型分布类型

      questionTypeLists: []
    }
  },
  computed: {
    ...mapState([
      'themeMode',
      'projectName',
      'projectQuestionData',
      'projectBasicData',
      'quesDistribution',
    ]),
  },
  created() {
    let temp = JSON.parse(localStorage.tiku_examData)

    // 获取时间
    this.examTime = JSON.parse(localStorage.examTimeObj).examTime;
    // 获取总分
    this.totalScore = JSON.parse(localStorage.totalScore);
    this.typeScore = JSON.parse(localStorage.typeScore);
    this.quesDistributionType = temp.quesDistributionType;

    this.questionTypeLists = [
      {
        type: 'sig',
        name: '单选题',
        distrType: this.quesDistributionType.sig,
        typeScore: this.typeScore.sig,
      }, {
        type: 'mul',
        name: '多选题',
        distrType: this.quesDistributionType.mul,
        typeScore: this.typeScore.mul,
      }, {
        type: 'bla',
        name: '填空题',
        distrType: this.quesDistributionType.bla,
        typeScore: this.typeScore.bla,
      }, {
        type: 'jud',
        name: '判断题',
        distrType: this.quesDistributionType.jud,
        typeScore: this.typeScore.jud,
      }];
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'setWarning',
      'setExamStatue',
      'setModel',
    ]),

    backHome() {
      this.setModel('backHome')
    },

    toExamOverview() {
      this.$router.push({
        name: 'examOverview',
        params: {
          from: 'afterExam',
        }
      });
    },
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    // 存储考试用的必要信息
    setExamLocal() {
      let tempObj = {}
      tempObj['examQues'] = this.totalQuesArr;
      tempObj['subjectId'] = this.subjectId;
      tempObj['quesDistributionType'] = this.quesDistributionType;
      tempObj['answerObj'] = this.answerObj;
      tempObj['currentType'] = this.currentType;
      tempObj['questionIndex'] = this.questionIndex;
      localStorage.setItem('examTime', JSON.stringify(this.examTime))
      localStorage.setItem('totalScore', JSON.stringify(this.totalScore))
      localStorage.setItem('typeScore', JSON.stringify(this.typeScore))
      localStorage.setItem('tiku_examData', JSON.stringify(tempObj))
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/_handle.scss";

:root {
  .afterExam.dark {
    --box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 #000 !important;
    --box-shadow-inner: inset 1px 1px 5px 0 #000, inset -2px -2px 5px 0 #636363 !important;
    --border-color: #26282b;
    --radio-color: #BF8A10 !important;
    --bg-color: #26282b;
    --bg-btn-color: #26282b;
    --text-color: #BF8A10;
    --text-btn-color: #BF8A10;
  }

  .afterExam {
    --box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
    --box-shadow-inner: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px #fff;
    --border-color: #fff;
    --radio-color: #9fe3fb;
    --bg-color: #f4f6f8;
    --text-color: #000;
    --text-btn-color: #3ae7fb;
  }
}

.afterExam {
  /*background-color: #f4f6f8;*/
  @include background('chapter_bg_color1');
  min-height: 100vh;
}

.dark {
  .section {
    border: none !important;
    color: #A7A9AA !important;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65) !important;

    .card-btn .btn {
      background: #26282b !important;
      color: #BF8A10 !important;
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }
  }

  .exam-result.chart,
  .score,
  .check-answer-sheet .card-btn .btn,
  .question-detail {
    border: none!important;
    color: #A7A9AA!important;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    span {
      color: #BF8A10!important;
    }
  }

  .exam-result.chart::after {
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
  }

  .header .circle .fa.fa-home{
    color: #BF8A10!important;
  }

  .tit {
    color: #A7A9AA!important;
    .left-line {
      background-color: #BF8A10!important;
    }
  }

  .check-answer-sheet .card-btn .btn {
    background: #26282b !important;
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
      font-size: 20px;
      line-height: 30px;
      display: block;
      color: #00b0ff;
    }

    div {
      margin: 0 10px;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-color);
    }
  }
}

.exam-result.chart {
  position: relative;
  border-radius: 50%;
  margin: 2rem auto;
  width: 55%;
  box-shadow: -4px -2px 4px 0px #ffffff, 4px 2px 6px 0px #DFE4EA;
  /* inner shadow */

  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    margin: 3rem;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 2px 2px 2px 0px #DFE4EA inset, -2px -2px 2px 0px #ffffff inset;
  }

  .chart-label {
    position: absolute;
    top: 0;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      display: block;
    }

    .text-muted {
      font-size: 26px;
    }
  }

  #btntransactions {
    padding: 0.75rem;
  }

  #chartfill {
    //transition: stroke-dasharray 2s;
    animation: chart 2000ms linear forwards;
  }

  @keyframes chart {
    from {
      stroke-dashoffset: 200;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}

.question-detail {
  margin: 20px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
  display: flex;
  justify-content: center;
  align-items: center;

  .section-container.questionType {
    height: auto;
    width: 100%;
    padding: 0 10px;
    text-align: left;

    .content {
      width: 100%;
      position: relative;
      margin: 4% 0;

      .content-hd {
        font-size: 16px;
        font-weight: 700;
      }

      .content-bd {
        padding-top: 5px;
        font-size: 14px;
        display: flex;

        div {
          width: 40%;

          span {
            color: #00b0ff;
          }
        }
      }

      .score {
        position: absolute;
        right: 0;
        top: 2px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: #00b0ff;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        border: 1px solid #fff;
        box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;;
      }
    }
  }
}

.section {
  margin: 20px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
  display: flex;
  justify-content: center;
  align-items: center;

  .section-container {
    width: 100%;
    height: 60px;

    .content {
      display: flex;
      vertical-align: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .content-bd {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 49.5%;
        height: 100%;
        text-align: center;

        .total-score, .total-time {
          font-size: 18px;
        }

        .text {
          font-size: 14px;
          color: #a6b4cc;
        }
      }

      .line {
        height: 60%;
        background-color: #a6b4cc;
        width: 1px;
      }
    }
  }
}


.check-answer-sheet {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 10%;
  cursor: pointer;

  .card-btn {
    margin-top: 10%;
    width: 100%;

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
      border-radius: 5px;
      transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background: linear-gradient(-90deg, #38d1bf, #00b0ff);;
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
      cursor: pointer;
      color: #fff !important;
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

.tit {
  margin-left: 30px;
  display: flex;
  margin-top: 10%;

  .left-line {
    width: 3px;
    border-radius: 1.5px;
    height: 20px;
    background-color: #00b0ff;
  }

  .text {
    margin-left: 20px;
    line-height: 20px;
    font-weight: 700;
  }
}

</style>
