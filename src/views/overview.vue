<template>
  <div class="overview" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backDetail"/>
        </div>
        <div class="page-title">题目总览 | <span :style="{color: chapterColor}"
                                             class="pageName">{{ projectName }} - {{ chapterName }}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="question-type" v-for="(val, key) in questionObj" v-if="val">
        <div class="title" :style="{color: chapterColor}">
          <span v-if="val && key === 'sigNum'">单选题</span>
          <span v-if="val && key === 'mulNum'">多选题</span>
          <span v-if="val && key === 'judNum'">判断题</span>
          <span v-if="val && key === 'blaNum'">填空题</span>
        </div>
        <div class="content">
          <div class="circle-box" v-for="index in val">
            <div class="circle"
                 :class="{'active': isCheckIn(index, key)}"
                 :style="{backgroundColor: getColor(index, key)}"
                 @click="toDetail(index, key)"
            >
              {{ index }}
              <svg-icon iconClass="star_rb"
                        :style="{fill: '#fe9517', stroke:'orange', strokeWidth:5, strokeOpacity:0.5}"
                        v-if="getIsFavourite(index, key)"/>
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
      answerObj: {
        sigArr: [],
        mulArr: [],
        judArr: [],
        blaArr: [],
      },

      selectedChapter: JSON.parse(localStorage.selectedChapter)
    }
  },
  created() {
    let selectedChapter = JSON.parse(localStorage.selectedChapter);
    this.setThemeColor(JSON.parse(localStorage.themeColor));
    this.setSelectedProject(JSON.parse(localStorage.selectedProject));
    this.setProjectBasicData(JSON.parse(localStorage.projectBasicData));

    // console.log(this.selectedProject);

    this.projectName = this.selectedProject.chinese;
    this.chapterName = this.selectedChapter.title;
    this.chapterColor = this.themeColor;
    let tempObj = {};
    // console.log(selectedChapter)
    tempObj['sigNum'] = selectedChapter.radio;
    tempObj['mulNum'] = selectedChapter.multiple;
    tempObj['judNum'] = selectedChapter.decide;
    tempObj['blaNum'] = selectedChapter.fill;

    this.questionObj = tempObj;

    // console.log(this.selectedAnswer[this.selectedChapter.id][this.selectedChapter.index])
    this.answerObj = JSON.parse(localStorage.selectedAnswer)[selectedChapter.id][selectedChapter.index];
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
      this.$router.push({name: 'detail'});
    },
    /**
     * 是否已经答题
     * @param index 题目序号
     * @param type 题目类型
     * @returns {boolean} 返回是否
     */
    isCheckIn(index, type) {
      // console.log(index);
      let itemIndex = null;
      type = type.slice(0, 3) + 'Arr';
      for (let i = 0; i < this.answerObj[type].length; i++) {
        itemIndex = this.answerObj[type][i].index + 1;
        if (itemIndex === index && this.answerObj[type][i].userAns !== null) {
          return true
        }
      }
    },
    /**
     * 获取是否收藏的信息
     * @param index： 题目所在题目类型中的下标
     * @param key： 题目所在的题目类型
     */
    getIsFavourite(index, key) {
      let itemIndex = null;
      let type = key.slice(0, 3) + 'Arr';
      for (let i = 0; i < this.answerObj[type].length; i++) {
        itemIndex = this.answerObj[type][i].index + 1;
        if (itemIndex === index) {
          return this.answerObj[type][i].isFavourite
        }
      }
    },
    getColor(index, type) {
      if (this.isCheckIn(index, type)) {
        // console.log("true")
        return this.chapterColor;
      }
    },
    toDetail(index, key) {
      // console.log(this.questionObj);
      // console.log(index);
      // console.log(key);
      let quesIndex = 0;
      if (key === "sigNum") quesIndex = index;
      if (key === "mulNum") quesIndex = index + this.questionObj.sigNum;
      if (key === "blaNum") quesIndex = index + this.questionObj.sigNum + this.questionObj.mulNum;
      if (key === "judNum") quesIndex = index + this.questionObj.sigNum + this.questionObj.mulNum + this.questionObj.blaNum;
      // console.log(this.questionObj.blaNum);

      // console.log(this.cardMode);

      if (typeof (localStorage.cardMode) !== 'undefined') {
        if (JSON.parse(localStorage.cardMode)) {
          this.$router.push({
            name: 'cardDetail',
            params: {
              id: quesIndex,
              type: key
            }
          })
        } else {
          this.$router.push({
            name: 'detail',
            params: {
              id: quesIndex,
              type: key
            }
          })
        }
      } else {
        if (this.cardMode) {
          this.$router.push({
            name: 'cardDetail',
            params: {
              id: quesIndex,
              type: key
            }
          })
        } else {
          this.$router.push({
            name: 'detail',
            params: {
              id: quesIndex,
              type: key
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/handle";

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
        position: relative;
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

      .svg-icon {
        width: 15px;
        height: 50%;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
