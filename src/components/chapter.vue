<template>
  <div class="chapter"  :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backHome"></i>
        </div>
        <div>选择章节</div>
        |
        <div :style="{color: chapterColor}" class="pageName">{{pageName}}</div>
      </div>
    </div>

    <!--chapter select-->
    <div class="chapter-select">
      <div class="card-container" v-for="(item, index) in projectData">
        <div class="card" @click="clickCardBtn(index, 1, $event)">
          <div class="left">
            <div class="title">{{item.title}}</div>
            <div class="card-progress">
              <div class="card-progress__back"></div>
              <div class="card-progress__line"
                   :style="getProgressStyle(item)">
              </div>
            </div>
            <div class="type">
              <span v-if="item.sig"> 单选: <span :style="{color: chapterColor}" class="typeNum">{{item.sig}}</span> 道</span>&nbsp;
              <span v-if="item.mul"> 多选: <span :style="{color: chapterColor}" class="typeNum">{{item.mul}}</span> 道</span>&nbsp;
              <span v-if="item.jud"> 判断: <span :style="{color: chapterColor}" class="typeNum">{{item.jud}}</span> 道</span>&nbsp;
              <span v-if="item.bla"> 填空: <span :style="{color: chapterColor}" class="typeNum">{{item.bla}}</span> 道</span>&nbsp;
            </div>
          </div>
          <div class="right">
            <div class="detail-icon" @click.stop="clickCardBtn(index, 2, $event)">
              <i class="fa fa-angle-right" aria-hidden="true" :style="{color: chapterColor}"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import detailVue from './cardDetail'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "chapter",
    components: {
      detailVue,
    },
    data() {
      return {
        pageName: '',
        chapterColor: '',

        projectData: null,
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'themeMode',
        'selectedProject',
        'selectedChapter',
      ]),
    },
    created() {
      if (typeof (localStorage.selectedProject) === 'undefined') {
        console.log("不存在");
        this.pageName = this.selectedProject.chinese;
        this.chapterColor = this.selectedProject.color;
        this.projectData = this.selectedProject.content;
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));
      } else {
        console.log("存在")
        this.pageName = JSON.parse(localStorage.selectedProject).chinese;
        this.chapterColor = JSON.parse(localStorage.selectedProject).color;
        this.projectData = JSON.parse(localStorage.selectedProject).content;
        this.setProjectQuestionData(JSON.parse(localStorage.projectQuestionData))
      }
    },
    mounted() {
      console.log(JSON.parse(localStorage.selectedProject));
      console.log(JSON.parse(localStorage.selectedProject).chinese);
    },
    methods: {
      ...mapActions([
        'setSelectedChapter',
        'setProjectQuestionData',
      ]),

      backHome() {
        this.$router.push({name: 'home'});
      },
      /**
       * 开始背题
       * @param index 章节下标
       * @param type 点击类型（1：整个卡片，2：点击icon)
       * @param ev 事件函数
       */
      clickCardBtn(index, type, ev) {
        if (type === 2) {
          ev.srcElement.classList.add("active");
          // console.log(index);
        }
        if (typeof (localStorage.selectedChapter) === 'undefined') {
          this.setSelectedChapter({id: this.selectedProject.id, index: index});  // 科目id，章节序号
        } else {
          // console.log(JSON.parse(localStorage.selectedProject).id);
          // console.log(index)
          this.setSelectedChapter({id: JSON.parse(localStorage.selectedProject).id, index: index});  // 科目id，章节序号
        }
        localStorage.setItem('selectedChapter', JSON.stringify(this.selectedChapter))
        console.log("selectedChapter",this.selectedChapter)
        this.$router.push({name: 'detail'});
      },

      // 进度条样式
      getProgressStyle(item) {
        // console.log(item);
        // console.log(item.chapter_fill/(item.jud + item.mul + item.sig + item.bla));
        let result = item.chapter_fill / (item.jud + item.mul + item.sig + item.bla);
        result = result * 100;
        return {width: result + "%", backgroundColor: this.chapterColor}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/_handle.scss";
  .chapter {
    /*background-color: #f4f6f8;*/
    @include background('chapter_bg_color1');
    min-height: 100vh;
  }

  .dark {
    .chapter-select .card-container .card {
      box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black!important;
    }
    .card-progress .card-progress__back {
      border: 4px solid #2e3237!important;
      box-shadow: inset 2px 2px 3px -2px rgba(0,0,0,0.3), inset -2px -2px 3px 0px rgba(80,80,80,0.5) !important;
    }
    .card-progress__line {
      background: linear-gradient(90deg, #D43C0B, #BF8A10)!important;
    }
    .detail-icon {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
      .fa {
        color: #BF8A10!important;
      }
    }
    .header .circle {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
    }
    .header .circle, .header .pageName, .type .typeNum {
      color: #BF8A10!important;
    }
  }

  .header {
    height: 60px;
    line-height: 60px;
    /*background-color: #f4f6f8;*/
    @include background('chapter_bg_color1');
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      margin-left: 20px;
      display: flex;
      align-items: center;

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        /*background-color: #f4f6f8;*/
        @include background('chapter_bg_color2');
        margin: 0;
        box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
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
        font-size: 16px;
      }
    }
  }

  .chapter-select {
    padding: 5% 0 10%;
    @include font_color('chapter_font_color1');

    .card-container {
      .card {
        margin: 15px 15px 0;
        border-radius: 11px;
        /*background: #f4f6f8;*/
        @include background("chapter_bg_color2");
        border: 1px solid;
        @include border_color('chapter_border_color1');
        box-shadow: 5px 5px 8px #ebebeb,
        -5px -5px 8px #ffffff;
        padding: 10px;
        overflow: hidden;
        display: flex;

        .left {
          width: 80%;
          text-align: left;
          font-size: 14px;

          .title {
            font-weight: 700;
          }

          .card-progress {
            width: 100%;
            margin: 3% auto;

            .card-progress__back {
              height: 11px;
              /*background-color: #6c63ff;*/
              border-radius: 13px;
              border: 4px solid #fff;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12),
              inset 0 0 4px rgba(255, 255, 255, 0), inset 2px 2px 2px rgba(55, 84, 170, 0.15),
              inset 35px 28px 64px #fff;
            }

            .card-progress__line {
              height: 10px;
              /*background-color: #6c63ff;*/
              margin-top: -14px;
              margin-left: 4px;
              border-radius: 8px;
              opacity: 1;
              animation: sliding 3s ease infinite;
            }
          }

          .type {
            font-size: 12px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
          }
        }

        .right {
          width: 15%;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;

          .detail-icon {
            width: 30px;
            height: 30px;
            /*margin-top: 50%;*/
            vertical-align: center;
            /*background-color: #f4f6f8;*/
            @include background('chapter_bg_color2');
            box-shadow: 5px 5px 8px #ebebeb,
            -5px -5px 8px #ffffff;
            border: 1px solid;
            @include border_color('chapter_border_color1');
            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            i {
              font-size: 30px;
              display: block;
              margin-bottom: 3px;
              margin-left: 2px;
            }

            &:active {
              box-shadow: inset 5px 5px 10px #edeff1,
              inset -5px -5px 10px #fbfdff;
            }

            &:active:after {
              box-shadow: inset 0px -2px 5px white, inset 0px 2px 5px rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }
  }
</style>
