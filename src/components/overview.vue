<template>
  <div class="overview">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backChapter"></i>
        </div>
        <div>题目总览 | <span :style="{color: chapterColor}">{{projectName}} - {{chapterName}}</span></div>
      </div>
    </div>

    <div class="container">
      <div class="question-type" v-for="(val, key, i) in questionObj">
        <div class="title" :style="{color: chapterColor}">
          <span v-if="val && key === 'sigNum'">单选题</span>
          <span v-if="val && key === 'mulNum'">多选题</span>
          <span v-if="val && key === 'judNum'">判断题</span>
          <span v-if="val && key === 'blaNum'">填空题</span>
        </div>
        <div class="content">
          <div class="circle-box" v-for="index in val">
            <div class="circle" :class="{'active': isCheck(index, key)}" :style="{backgroundColor: getColor(index, key)}">
              {{index}}
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
      }
    },
    created(){
      this.chapterColor = this.themeColor;
      let tempObj = {};
      console.log(this.selectedChapter);
      if(this.selectedChapter.radio) tempObj['sigNum'] = this.selectedChapter.radio;
      if(this.selectedChapter.multiple) tempObj['mulNum'] = this.selectedChapter.multiple;
      if(this.selectedChapter.decide) tempObj['judNum'] = this.selectedChapter.decide;
      if(this.selectedChapter.fill) tempObj['blaNum'] = this.selectedChapter.fill;

      this.questionObj = tempObj;

      // console.log(this.selectedAnswer[this.selectedChapter.id][this.selectedChapter.index])
      let checkObj = this.selectedAnswer[this.selectedChapter.id][this.selectedChapter.index];
      this.answerObj = checkObj;
    },
    computed: {
      ...mapState([
        'themeColor',
        'selectedChapter',
        'selectedProject',
        'selectedAnswer',
      ]),
    },
    methods: {
      backChapter() {
        this.$router.push({name: 'chapter'});
      },
      isCheck(index, type){
        if (type === "sigNum") {
          for (let i = 0; i < this.answerObj.sigArr.length; i++){
            if (this.answerObj.sigArr[i].index === index){
              return true
            }
          }
        } else if(type === "mulNum") {
          for (let i = 0; i < this.answerObj.mulArr.length; i++){
            if (this.answerObj.mulArr[i].index === index){
              return true
            }
          }
        } else if(type === "blaNum") {
          for (let i = 0; i < this.answerObj.blaArr.length; i++){
            if (this.answerObj.blaArr[i].index === index){
              return true
            }
          }
        } else if(type === "judNum") {
          for (let i = 0; i < this.answerObj.judArr.length; i++){
            if (this.answerObj.judArr[i].index === index){
              return true
            }
          }
        }
      },
      getColor(index, type){
        if(this.isCheck(index, type)) return this.chapterColor;
      }
    }
  }
</script>

<style scoped lang="scss">
  .overview {
    background-color: #f4f6f8;
  }

  .header {
    height: 60px;
    line-height: 60px;
    background-color: #f4f6f8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      margin-left: 20px;
      display: flex;
      align-items: center;
      width: 18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: #f4f6f8;
        margin: 0;
        box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
        border: 1px solid #fff;
      }

      i {
        font-size: 30px;
        margin-right: 4px;
        display: block;
      }

      div {
        margin: 0 10px;
        font-size: 16px;
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
      border: 1px solid #fff;
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
          background: #fff;
          border: 2px solid #fff;
          box-shadow: inset 3px 3px 10px #eaecee,
          inset -3px -3px 10px #feffff;
        }

        .active {
          border: 2px solid #fff;
          box-shadow: 5px 5px 10px #eaecee,
          -5px -5px 10px #feffff;
          color: #fff;
        }
      }
    }
  }
</style>
