<template>
  <div id="tiku">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 添加的图片 -->
      <swiper-slide>slide 1</swiper-slide>
      <swiper-slide>slide 2</swiper-slide>
      <swiper-slide>slide 3</swiper-slide>
      <swiper-slide>slide 4</swiper-slide>
      <swiper-slide>slide 5</swiper-slide>
      <swiper-slide>slide 6</swiper-slide>
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
        swiperOption: {
          //可见图片张数
          slidesPerView: 1.2, // 每个视图展示几张轮播图
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          // loop: true,   //无限循环
          // observeParents: true, // 将observe应用于Swiper的父元素
          loopAdditionalSlides: 1, // loop模式下在slides前后复制多少个slide，默认0：前后各复制1个，1：前后各复制2个
          spaceBetween: 0, // 每张轮播图之间的间距
          centeredSlides: true, // 是否居中轮播图
          grabCursor: true,  // 抓手光标
          initialSlide: 0,   // 设置slidesPerView为小数，失效了
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper);
      this.swiper.slideTo(0, 1000, false);  // 解决initialSlide失效问题
    },
    methods: {

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

</style>
