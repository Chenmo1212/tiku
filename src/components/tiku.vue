<template>
  <div id="tiku" :class="{dark: this.themeMode === 'dark'}">
    <swiper :options="swiperOption" ref="mySwiper"
    >
      <div class="swiper-slide current">
        <span class="ribbon4" :style="{backgroundColor: currentMemoryMsg.color}">当前在背</span>
        <div class="card-container">
          <!--封面-->
          <div class="card-cover">
            <!--<svg-icon iconClass="maogai"/>-->
            <svg-icon :iconClass="currentMemoryMsg.svgName"/>
          </div>
          <!--标题-->
          <div class="card-title">{{ currentMemoryMsg.title }} <span>({{ currentMemoryMsg.currentChapter }})</span>
          </div>
          <!--题目类型-->
          <div class="card-question_type">
            <span v-if="currentMemoryMsg.radioNum"> 单选:<span
              :style="{color: currentMemoryMsg.color}">{{ currentMemoryMsg.radioNum }}</span>道</span>
            <span v-if="currentMemoryMsg.multiNum"> 多选:<span
              :style="{color: currentMemoryMsg.color}">{{ currentMemoryMsg.multiNum }}</span>道</span>
            <span v-if="currentMemoryMsg.judgeNum"> 判断:<span
              :style="{color: currentMemoryMsg.color}">{{ currentMemoryMsg.judgeNum }}</span>道</span>
            <span v-if="currentMemoryMsg.fillNum"> 填空:<span
              :style="{color: currentMemoryMsg.color}">{{ currentMemoryMsg.fillNum }}</span>道</span>&nbsp;
          </div>
          <!--进度条-->
          <div class="card-progress">
            <div class="card-progress__back"></div>
            <div class="card-progress__line"
                 :style="{width:currentMemoryMsg.chapterProgress, backgroundColor:currentMemoryMsg.color}"></div>
          </div>
          <!--开始背题-->
          <div class="card-btn" v-show="showBeginBtn">
            <button class="btn begin" @click="clickCardBtn($event, currentMemoryMsg, 1)"
                    :style="{color: currentMemoryMsg.color}">
            <span class="icon-container">
              <i class="fa fa-rocket"/>
              开始背题
            </span>
            </button>
          </div>
          <!--模拟考试-->
          <div class="card-btn" v-show="showBeginBtn">
            <button class="btn begin" @click="mockExam($event, currentMemoryMsg)"
                    :style="{color: currentMemoryMsg.color}">
            <span class="icon-container">
              <i class="fa fa-flag"/>
              模拟考试
            </span>
            </button>
          </div>
        </div>
      </div>

      <!--科目列表-->
      <div class="swiper-slide" v-for="(value) in projectBasicData">
        <div class="card-container">
          <!--封面-->
          <div class="card-cover">
            <!--<svg-icon iconClass="maogai"/>-->
            <svg-icon :iconClass="value.svg"/>
          </div>
          <!--标题-->
          <div class="card-title">{{ value.chinese }}</div>
          <!--题目类型-->
          <div class="card-question_type">
          <span v-if="value.total_sig_num"> 单选: <span
            :style="{color: value.color}">{{ value.total_sig_num }}</span> 道</span>&nbsp;
            <span v-if="value.total_mul_num"> 多选: <span
              :style="{color: value.color}">{{ value.total_mul_num }}</span> 道</span>&nbsp;
            <span v-if="value.total_jud_num"> 判断: <span
              :style="{color: value.color}">{{ value.total_jud_num }}</span> 道</span>&nbsp;
            <span v-if="value.total_bla_num"> 填空: <span
              :style="{color: value.color}">{{ value.total_bla_num }}</span> 道</span>&nbsp;
          </div>
          <!--进度条-->
          <div class="card-progress">
            <div class="card-progress__back"></div>
            <div class="card-progress__line"
                 :style="getProgressStyle(value)"></div>
          </div>
          <!--开始背题-->
          <div class="card-btn" v-show="showBeginBtn">
            <button class="btn begin" @click="clickCardBtn($event, value, 2)" :style="{color: value.color}">
            <span class="icon-container">
              <i class="fa fa-rocket"/>
              开始背题
            </span>
            </button>
          </div>
          <!--模拟考试-->
          <div class="card-btn" v-show="showBeginBtn">
            <button class="btn begin" @click="mockExam($event, value)" :style="{color: value.color}">
            <span class="icon-container">
              <i class="fa fa-flag"/>
              模拟考试
            </span>
            </button>
          </div>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css';
import {mapState, mapActions} from 'vuex'

export default {
  name: "tiku",
  props: ["showBeginBtn"],
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
      currentMemoryMsg: {},
      // 卡片内容
      cardObj: this.projectBasicData,
    }
  },
  computed: {
    ...mapState([
      'themeColor',
      'projectBasicData',
      'currentMemory',
      'selectedProject',
      'selectedChapter',
      'cardMode',
      'themeMode',
    ]),

    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {
    if (typeof localStorage.currentMemory !== 'undefined') {
      console.log("本地有当前在背的内容");
      this.currentMemoryMsg = JSON.parse(localStorage.currentMemory);
    } else if (JSON.stringify(this.currentMemory) !== "{}") {
      // console.log(this.currentMemory);
      this.currentMemoryMsg = this.currentMemory;
      localStorage.setItem('currentMemory', JSON.stringify(this.currentMemory));
    }
  },
  mounted() {
    const that = this;
    document.getElementById('appTitle').innerHTML = '欢迎你~';
    // setTimeout(function () {
    // document.getElementById('app').style.display = 'block';
    // document.getElementById('appLoading').style.display = 'none';

    // 调整主题模式
    if (typeof (localStorage.themeMode) !== 'undefined') {
      let type = localStorage.themeMode;
      window.document.documentElement.setAttribute("data-theme", type);
      that.setThemeMode({type: type});
    }
    // }, 1000)
  },
  methods: {
    ...mapActions([
      'setThemeColor',
      'setSelectedProject',
      'setSelectedChapter',
      'setThemeMode',
      'setCurrentMemory',
    ]),

    /**
     * 进入背题
     * @param ev 事件参数（修改样式）
     * @param item 背题的科目
     * @param from 从哪里过来的（1：当前背题；2：科目列表）
     */
    clickCardBtn(ev, item, from) {
      // console.log(ev);
      // console.log(item);
      ev.srcElement.classList.add("active");
      this.setThemeColor(item.color);

      if (from === 1) {
        if (typeof (localStorage.selectedChapter) === 'undefined') {
          this.setSelectedChapter({id: 'mao_gai', index: 0});
          localStorage.setItem('selectedChapter', JSON.stringify(this.selectedChapter))
        }
        if (typeof (localStorage.selectedProject) === 'undefined') {
          this.setSelectedProject(this.projectBasicData['mao_gai']);
          localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
        }
        if (localStorage.selectedProject === "{}") {
          this.setSelectedProject(this.projectBasicData['mao_gai']);
          localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject))
        }
        if (typeof (localStorage.cardMode) !== 'undefined') {
          JSON.parse(localStorage.cardMode) ? this.$router.push({name: 'cardDetail'}) : this.$router.push({name: 'detail'});
        } else {
          this.cardMode ? this.$router.push({name: 'cardDetail'}) : this.$router.push({name: 'detail'});
        }

      } else if (from === 2) {
        this.setSelectedProject(item);
        this.$router.push({name: 'chapter'});
      }
      localStorage.setItem('themeColor', JSON.stringify(item.color));
      localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));
    },
    getProgressStyle(value) {
      let result = 100 * value.total_fill_num / value.total_num;
      // console.log(result);
      if (result < 2 && result > 0) result = 2;
      return {width: result + "%", backgroundColor: value.color}
    },

    mockExam(ev, item) {
      if(typeof(localStorage.tiku_examData) !== 'undefined') localStorage.removeItem('tiku_examData');
      if(typeof(localStorage.examTimeObj) !== 'undefined') localStorage.removeItem('examTimeObj');

      // console.log(item.id)
      this.setCurrentMemory({
        projectId: item.id,
        chapterIndex: 0,
        itemIndex: 0,
      });
      localStorage.setItem('currentMemory', JSON.stringify(this.currentMemory));

      ev.srcElement.classList.add("active");
      this.setThemeColor(item.color);
      let id_ = item.id;
      this.$router.push({
        name: 'beforeExam',
        params: {
          id: id_
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/_handle.scss";

#tiku {
  height: 100%;
}

.dark {
  .swiper-container .swiper-slide {
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65) !important;

    .card-btn .btn {
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }
  }

  .swiper-slide .card-progress .card-progress__back {
    background: #2d3135 !important;
    border: 4px solid #2e3237 !important;
    box-shadow: inset 2px 2px 3px -2px rgba(0, 0, 0, 0.3), inset -2px -2px 3px 0px rgba(80, 80, 80, 0.5) !important;
  }

  .card-progress__line {
    background: linear-gradient(90deg, #D43C0B, #BF8A10) !important;
  }

  .ribbon4, .btn.begin {
    background: #2e3237 !important;
  }

  .btn.begin {
    color: #A7A9AA !important;
  }
}

@media screen and (max-width: 375px) {
  #tiku {
    overflow: hidden;
  }
}

.swiper-container {
  height: 100%;

  .swiper-slide {
    transition: 1s;
    transform: scale(1);
    /*height: 440px;*/
    height: 95%;
    border-radius: 7px;
    /*background: #E8E9ED;*/
    box-shadow: 5px 5px 6px #d1d3db, -5px -5px 6px #f4f4f6;
    /*background-color: #fff;*/
    @include background('tiku_bg_color1');
    display: flex;
    justify-content: center;
    align-items: center;

    .card-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .swiper-slide-prev,
  .swiper-slide-next,
  .swiper-slide-duplicate-prev,
  .swiper-slide-duplicate-next {
    transform: scale(0.9)
  }
}

@media screen and (max-width: 375px) {
  .swiper-slide .card-btn {
    bottom: 3% !important;
  }
}

/*card*/
.swiper-slide {
  @include font_color('tiku_font_color1');

  .card-cover {
    display: block;
    background-color: var(--back-color);
    max-width: 300px;
    overflow: hidden;
    max-height: 300px;
    height: 180px;
    margin: 10px auto 0;
    padding: 0;
    border-radius: 10px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 700;
  }

  .card-question_type {
    margin-top: 10px;
    font-size: 13px;
  }

  .card-progress {
    width: 90%;
    margin: 8% auto;

    .card-progress__back {
      height: 16px;
      background-color: #e7e9ef;
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

  .card-btn {
    margin-top: 10px;

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
      height: 36px;
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
      line-height: 36px;
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

@media screen and (min-width: 1175px) {
  .swiper-slide .card-cover {
    margin: 100px auto 0;
  }
}
</style>
