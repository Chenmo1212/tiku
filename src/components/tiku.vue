<template>
  <div id="tiku">
    <swiper v-if="card_arr.length>1" :options="swiperOption" ref="mySwiper"
    >
      <div class="swiper-slide current">
        <span class="ribbon4" :style="{backgroundColor: currentMemory.color}">当前在背</span>
        <!--封面-->
        <div class="card-cover">
          <!--<svg-icon iconClass="maogai"></svg-icon>-->
          <svg-icon :iconClass="currentMemory.svgName"></svg-icon>
        </div>
        <!--标题-->
        <div class="card-title">{{currentMemory.title}} <span>({{currentMemory.currentChapter}})</span></div>
        <!--进度条-->
        <div class="card-progress">
          <div class="card-progress__back"></div>
          <div class="card-progress__line"
               :style="{width:currentMemory.currentProgress, backgroundColor:currentMemory.color}"></div>
        </div>
        <!--题目类型-->
        <div class="card-question_type">
          单选：{{currentMemory.chapterRadioNum}}道 &nbsp;&nbsp;多选:{{currentMemory.chapterMultiNum}}道&nbsp;&nbsp;判断：{{currentMemory.chapterJudgeNum}}道
        </div>
        <!--开始背题-->
        <div class="card-btn">
          <button class="btn begin" @click="clickCardBtn($event)" :style="{color: currentMemory.color}">
            <span class="icon-container">
              <i class="fa fa-rocket"></i>
              开始背题
            </span>
          </button>
        </div>
      </div>

      <div class="swiper-slide" v-for="(item, index) in card_arr">
        <!--封面-->
        <div class="card-cover">
          <!--<svg-icon iconClass="maogai"></svg-icon>-->
          <svg-icon :iconClass="item.svgName"></svg-icon>
        </div>
        <!--标题-->
        <div class="card-title">{{item.title}} <span v-if="item.isCurrent">({{item.currentChapter}})</span></div>
        <!--进度条-->
        <div class="card-progress">
          <div class="card-progress__back"></div>
          <div class="card-progress__line"
               :style="{width:currentMemory.currentProgress, backgroundColor: item.color}"></div>
        </div>
        <!--题目类型-->
        <div class="card-question_type">
          单选：{{item.radioNum}}道 &nbsp;&nbsp;多选:{{item.multiNum}}道&nbsp;&nbsp;判断：{{item.judgeNum}}道
        </div>
        <!--开始背题-->
        <div class="card-btn">
          <button class="btn begin" @click="clickCardBtn($event)" :style="{color: item.color}">
            <span class="icon-container">
              <i class="fa fa-rocket"></i>
              开始背题
            </span>
          </button>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css';

  export default {
    name: "tiku",
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    data() {
      return {
        // 卡片轮播
        swiperOption: {
          //可见图片张数
          slidesPerView: 1.2, // 每个视图展示几张轮播图
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          // loop: true,   //无限循环
          observeParents: true, // 将observe应用于Swiper的父元素
          loopAdditionalSlides: 1, // loop模式下在slides前后复制多少个slide，默认0：前后各复制1个，1：前后各复制2个
          spaceBetween: 0, // 每张轮播图之间的间距
          centeredSlides: true, // 是否居中轮播图
          grabCursor: true,  // 抓手光标
          initialSlide: 0,   // 设置slidesPerView为小数，失效了
        },

        // 当前在背
        currentMemory: {
          svgName: "maogai",         // 封面图名字
          title: "毛概",              // 名称
          currentChapter: "第一章",   // 当前章节
          currentProgress: "20%",    // 当前进度
          chapterRadioNum: 65,              // 章节单选题数
          chapterMultiNum: 35,              // 章节多选题数
          chapterJudgeNum: 0,               // 章节判断题数
          color: "#536DFE"
        },

        // 卡片内容
        card_arr: [
          {
            svgName: "sixiu",         // 封面图名字
            title: "思修",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#00B0FF"
          }, {
            svgName: "jindaishi",         // 封面图名字
            title: "近代史",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#F50057"
          }, {
            svgName: "makesi",         // 封面图名字
            title: "马克思",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#00BFA6"
          }, {
            svgName: "maogai",         // 封面图名字
            title: "毛概",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#536DFE"
          }, {
            svgName: "C",         // 封面图名字
            title: "C语言（上）",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#F9A826"
          }, {
            svgName: "C",         // 封面图名字
            title: "C语言（下）",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#F9A826"
          }, {
            svgName: "junli",         // 封面图名字
            title: "军理（上）",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#6C63FF"
          }, {
            svgName: "junli",         // 封面图名字
            title: "军理（下）",              // 名称
            currentChapter: "",   // 当前章节
            currentProgress: "60%",    // 当前进度
            radioNum: 65,              // 章节单选题数
            multiNum: 35,              // 章节多选题数
            judgeNum: 0,               // 章节判断题数
            color: "#6C63FF"
          }]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper);
      // this.swiper.slideTo(0, 1000, false);  // 解决initialSlide失效问题
    },
    methods: {
      clickCardBtn(ev) {
        // console.log(ev);
        ev.srcElement.classList.add("active");
        this.$router.push({name: 'chapter'})
      },
    }
  }
</script>

<style scoped lang="scss">
  #tiku {
    height: calc(100vh - 200px);
    overflow: hidden;
  }


  .swiper-container {
    height: 100%;
    padding-top: 10px;

    .swiper-slide {
      transition: 1s;
      transform: scale(1);
      /*height: 440px;*/
      height: 95%;

      border-radius: 7px;

      /*background: #E8E9ED;*/
      box-shadow: 5px 5px 6px #d1d3db, -5px -5px 6px #f4f4f6;

      background-color: #fff;
      /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
    }

    .swiper-slide-prev,
    .swiper-slide-next,
    .swiper-slide-duplicate-prev,
    .swiper-slide-duplicate-next {
      transform: scale(0.9)
    }
  }

  /*card*/
  .swiper-slide {
    .card-cover {
      display: block;
      background-color: var(--back-color);
      max-width: 300px;
      overflow: hidden;
      max-height: 300px;
      height: 180px;
      width: 90%;
      margin: 10px auto 0;
      padding: 0;
      border-radius: 10px;
    }

    .card-title {
      margin: 10% 0;
      font-size: 18px;
      font-weight: 700;
    }

    .card-progress {
      width: 90%;
      margin: 8% auto;

      .card-progress__back {
        height: 16px;
        background-color: #6c63ff;
        border-radius: 13px;
        border: 4px solid #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12),
        inset 0 0 4px rgba(255, 255, 255, 0), inset 2px 2px 2px rgba(55, 84, 170, 0.15),
        inset 35px 28px 64px #fff !important;
      }

      .card-progress__line {
        height: 16px;
        /*background-color: #6c63ff;*/
        margin-top: -20px;
        margin-left: 4px;
        border-radius: 8px;
        opacity: 1;
        animation: sliding 3s ease infinite;
      }
    }

    .card-question_type {
      font-size: 14px;
    }

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
        background: #ffffff;
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

  .current {
    .ribbon {
      position: relative;
    }

    .ribbon4 {
      position: absolute;
      top: 15px;
      left: 0;
      color: #fff;
      padding: 8px 10px;
      box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .ribbon4:before, .ribbon4:after {
      position: absolute;
      content: "";
      display: block;
    }

    .ribbon4:before {
      width: 7px;
      height: 100%;
      padding: 0 0 7px;
      top: 0;
      left: -7px;
      background: inherit;
      border-radius: 5px 0 0 5px;
    }

    .ribbon4:after {
      width: 5px;
      height: 5px;
      background: rgba(0, 0, 0, 0.35);
      bottom: -5px;
      left: -5px;
      border-radius: 5px 0 0 5px;
    }
  }
</style>
