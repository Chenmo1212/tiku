<template>
  <div :class="{dark: themeMode==='dark'}" class="beforeExam">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i @click="backHome" aria-hidden="true" class="fa fa-angle-left"></i>
        </div>
        <div class="pageName">{{ pageName }}</div>
      </div>
    </div>
    <div class="main">
      <div class="main-container">
        <!--封面-->
        <div class="card-cover">
          <!--<svg-icon iconClass="maogai"></svg-icon>-->
          <svg-icon iconClass="exam"></svg-icon>
        </div>

        <!-- 文字-->
        <div class="content">
          <div class="content-hd">考前须知</div>
          <div class="content-bd">1. 试题来源：模拟考试中的题目均从现有题库中随机抽取，题目总数为 <strong>100</strong>道。</div>
          <div class="content-bd">
            2. 题型分布：模拟考试的题型分布为：<strong>单：多：判 = 5:3:2</strong>。<br>
            (C语言:单:填 = 7:3; &nbsp; 近代史:单:多 = 7:3)
          </div>
          <div class="content-bd">
            3. 试题答案：模拟考试中的试题答案仅作为参考，若答案有误，务必进行反馈。
          </div>
        </div>
        <!-- 开始考试 -->
        <div class="start-exam">
          <div class="card-btn" @click="toExamDetail">
            <button class="btn begin" style="color: rgb(0, 176, 255);">
              <span class="icon-container">
                <i class="fa fa-rocket"></i>开始考试
          </span></button>
          </div>
        </div>
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
      pageName: '模拟考试',
      subjectName: '',  // 科目名字
      projectQuestion: null,  // 科目题目
      projectBasic: null,  // 科目基本信息

      totalQues: [],  // 全部题目
      sig: [],   // 单选题
      mul: [],  // 多选题
      jud: [],   // 判断题
      bla: [],   // 填空题
      examQues: [],  // 按考试顺序出的题

      quesDistributionType: '',   // 题型分布类型
    }
  },
  computed: {
    ...mapState([
      'themeMode',
      'projectName',
      'quesDistribution',
    ]),
  },
  created() {
    // 调整主题模式
    if (typeof (localStorage.themeMode) !== 'undefined') {
      let type = localStorage.themeMode;
      window.document.documentElement.setAttribute("data-theme", type);
      this.setThemeMode({type: type});
    }

    // 获取科目id
    this.subjectId = typeof (localStorage.tiku_examData) === 'undefined' ?
      this.$route.params.id : JSON.parse(localStorage.tiku_examData).subjectId;

    // 获取科目题目
    this.projectQuestion = JSON.parse(localStorage.projectQuestionData)[this.subjectId];
    //  获取科目基本信息
    this.projectBasic = JSON.parse(localStorage.projectBasicData)[this.subjectId];

    this.getAllQuestion();
    this.setExamLocal()
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

    getAllQuestion() {
      //  获取基本信息
      // console.log(this.projectQuestion);
      // 合并每个章节的题
      for (let i = 0; i < this.projectBasic.length; i++) {
        this.totalQues = this.totalQues.concat(this.projectQuestion[i].data);
      }
      for (let i = 0; i < this.totalQues.length; i++) {
        if (this.totalQues[i].type === 0) this.sig.push(this.totalQues[i])
        if (this.totalQues[i].type === 1) this.mul.push(this.totalQues[i])
        if (this.totalQues[i].type === 2) this.bla.push(this.totalQues[i])
        if (this.totalQues[i].type === 3) this.jud.push(this.totalQues[i])
      }

      // 获取题型比例
      let temp = ''
      if (this.sig.length) temp += 'sig_'
      if (this.mul.length) temp += 'mul_'
      if (this.jud.length) temp += 'jud_'
      if (this.bla.length) temp += 'bla_'
      if (temp[temp.length - 1] === '_')
        temp = temp.substr(0, temp.length - 1)
      this.quesDistributionType = this.quesDistribution[temp]
      // console.log('题型分布:', this.quesDistributionType)

      // 随机抽取题目
      if (this.quesDistributionType.sig !== undefined) {
        this.sig = this.getRandomArrayElements(this.sig, this.quesDistributionType.sig);
        this.examQues = this.examQues.concat(this.sig)
      }
      if (this.quesDistributionType.mul !== undefined) {
        this.mul = this.getRandomArrayElements(this.mul, this.quesDistributionType.mul);
        this.examQues = this.examQues.concat(this.mul)
      }
      if (this.quesDistributionType.jud !== undefined) {
        this.jud = this.getRandomArrayElements(this.jud, this.quesDistributionType.jud);
        this.examQues = this.examQues.concat(this.jud)
      }
      if (this.quesDistributionType.bla !== undefined) {
        this.bla = this.getRandomArrayElements(this.bla, this.quesDistributionType.bla);
        this.examQues = this.examQues.concat(this.bla)
      }
      // console.log(this.examQues)
    },

    toExamDetail() {
      this.setExamLocal();
      this.$router.push({
        name: 'examDetail',
        params: {
          from: 'beforeExam',
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
    /**
     * 存储考试用的必要信息
     */
    setExamLocal() {
      let tempObj = {}
      tempObj['examQues'] = this.examQues;
      tempObj['subjectId'] = this.subjectId;
      tempObj['quesDistributionType'] = this.quesDistributionType;
      localStorage.setItem('tiku_examData', JSON.stringify(tempObj))
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/_handle.scss";

:root {
  .beforeExam.dark {
    --box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 #000 !important;
    --box-shadow-inner: inset 1px 1px 5px 0 #000, inset -2px -2px 5px 0 #636363 !important;
    --border-color: #26282b;
    --radio-color: #BF8A10 !important;
    --bg-color: #26282b;
    --bg-btn-color: #26282b;
    --text-color: #BF8A10;
    --text-btn-color: #BF8A10;
  }

  .beforeExam {
    --box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
    --box-shadow-inner: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px #fff;
    --border-color: #fff;
    --radio-color: #9fe3fb;
    --bg-color: #f4f6f8;
    --text-color: #000;
    --text-btn-color: #3ae7fb;
  }
}

.beforeExam {
  /*background-color: #f4f6f8;*/
  @include background('chapter_bg_color1');
  min-height: 100vh;
}

.dark {
  .main {
    border: none !important;
    color: #A7A9AA !important;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65) !important;

    .card-btn .btn {
      background: #26282b !important;
      color: #BF8A10 !important;
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }
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
      font-size: 30px;
      margin-right: 4px;
      display: block;
    }

    div {
      margin: 0 10px;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-color);
    }
  }
}

.main {
  margin: 20px;
  height: calc(100vh - 100px);
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
  display: flex;
  justify-content: center;
  align-items: center;

  .main-container {
    margin-top: -20%;

    .content {
      margin-top: 10%;

      .content-hd {
        font-size: 18px;
        font-weight: 700;
      }

      .content-bd {
        margin-top: 5%;
        padding: 0 20px;
        text-align: left;
        line-height: 1.5;

        span {
          padding-left: 20px;
        }
      }
    }

    .start-exam {
      .card-btn {
        /*margin-top: 10%;*/
        position: absolute;
        bottom: 6%;
        width: 90%;
        left: 5%;

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
          border-radius: 30px;
          transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: #f4f6f8;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
          cursor: pointer;
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
  }
}


</style>
