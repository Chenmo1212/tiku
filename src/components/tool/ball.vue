<template>
  <transition>
    <div ref="dragIcon"
         class="dragIcon"
         id="dragIcon"
         @touchstart.stop="handleTouchStart"
         @touchmove.prevent.stop="handleTouchMove($event)"
         @touchend.stop="handleTouchEnd"
         :style="{left: left + 'px',top: top + 'px',width: itemWidth + 'px',height: itemHeight + 'px'}"
         v-if="isShow && isShowFloatBall">
      <nav class="nav">
        <input type="checkbox" class="nav__cb" id="menu-cb" :checked="isChecked" @click="clickMenu">
        <div class="nav__content">
          <ul class="nav__items">
            <li class="nav__item" @click="toMusic()">
              <span class="nav__item-text">  <i class="fa fa-music" aria-hidden="true"/> </span>
            </li>
            <li class="nav__item" @click="handleSong(-1)">
              <span class="nav__item-text">  <i class="fa fa-chevron-left" aria-hidden="true"/> </span>
            </li>
            <li class="nav__item" v-if="musicStatus" @click="handleMusicStatus">
              <span class="nav__item-text">  <i class="fa fa-pause" aria-hidden="true"/></span>
            </li>
            <li class="nav__item" v-if="!musicStatus" @click="handleMusicStatus">
              <span class="nav__item-text">  <i class="fa fa-play" aria-hidden="true"/></span>
            </li>
            <li class="nav__item" @click="handleSong(1)">
              <span class="nav__item-text">  <i class="fa fa-chevron-right" aria-hidden="true"/> </span>
            </li>
          </ul>
        </div>
        <label class="nav__btn" for="menu-cb"/>
      </nav>
    </div>
  </transition>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {
      itemWidth: {
        type: Number,
        default: 40
      },
      itemHeight: {
        type: Number,
        default: 40
      }
    },
    data() {
      return {
        isChecked: false,

        left: 0,
        top: 0,
        startToMove: false,
        isShow: true,
        timer: null,
        currentTop: null,
        clientW: document.documentElement.clientWidth,//视口宽
        clientH: document.documentElement.clientHeight,//视口高

        screenWidth: document.body.clientWidth
      }
    },
    created() {
      this.left = (this.clientW - this.itemWidth - 30);
      this.top = (this.clientH / 2 - this.itemHeight / 2);
      if (this.screenWidth >= 1175){
        this.isShow = false
      }
    },
    mounted() {
      this.bindScrollEvent()
    },
    beforeDestroy() {
      // 记得销毁一些全局的的事件
      this.removeScrollEvent();
    },
    computed: {
      ...mapState([
        'musicStatus',
        'isShowFloatBall',
      ]),
    },
    methods: {
      ...mapActions([
        'setMusicStatus',
        'setAudioActive',
      ]),
      toMusic() {
        this.clickMenu();
        this.$router.push({name: 'music'});
      },
      handleSong(index) {
        this.isChecked = true;
        this.clickMenu();
        index < 0 ? window.preSong() : window.nextSong();
        this.setMusicStatus(true);
      },
      handleMusicStatus() {
        this.musicStatus ? this.setMusicStatus(false) : this.setMusicStatus(true);
        this.isChecked = true;
        this.clickMenu();
      },
      clickMenu() {
        const that = this;
        this.setAudioActive(true);

        if (!this.isChecked) {
          // console.log(1);
          if (this.left < (this.clientW / 2)) {
            this.left = 102;//不让贴边 所以设置30没设置0
          } else {
            this.left = this.clientW - this.itemWidth - 100;//不让贴边 所以减30
          }
          this.$refs.dragIcon.style.transition = "all .3s";
        } else {
          // console.log(2);
          if (this.left < (this.clientW / 2)) {
            this.left = 102;
            setTimeout(function () {
              that.left = 20;
              that.$refs.dragIcon.style.transition = "all 0.8s";
            }, 1000)
          } else {
            this.left = this.clientW - this.itemWidth - 20;//不让贴边 所以减30
            setTimeout(function () {
              that.left = this.clientW - this.itemWidth - 80;//不让贴边 所以减30
              that.$refs.dragIcon.style.transition = "all 0.8s";
            }, 1000)
          }
          this.$refs.dragIcon.style.transition = "all .3s";
        }
        this.isChecked = !this.isChecked;
      },
      handleTouchStart() {
        this.startToMove = true;
        this.$refs.dragIcon.style.transition = "none"
      },
      handleTouchMove(e) {
        const clientX = e.targetTouches[0].clientX;//手指相对视口的x
        const clientY = e.targetTouches[0].clientY;//手指相对视口的y
        const isInScreen = clientX <= this.clientW && clientX >= 0 && clientY <= this.clientH && clientY >= 0;
        if (this.startToMove && e.targetTouches.length === 1) {
          if (isInScreen) {
            this.left = clientX - this.itemWidth / 2;
            this.top = clientY - this.itemHeight / 2;
          }
        }
      },
      handleTouchEnd() {
        if (this.isChecked) {
          if (this.left < (this.clientW / 2)) {
            this.left = 82;//不让贴边 所以设置30没设置0
            this.handleIconY()
          } else {
            this.left = this.clientW - this.itemWidth - 80;//不让贴边 所以减30
            this.handleIconY()
          }
        } else {
          if (this.left < (this.clientW / 2)) {
            this.left = 20;//不让贴边 所以设置30没设置0
            this.handleIconY()
          } else {
            this.left = this.clientW - this.itemWidth - 20;//不让贴边 所以减30
            this.handleIconY()
          }
        }
        this.$refs.dragIcon.style.transition = "all .3s"
      },
      handleIconY() {
        if (this.top < 0) {
          this.top = 100;//不上帖上边所以设置为30 没设置0
        } else if (this.top + this.itemHeight > this.clientH) {
          this.top = this.clientH - this.itemHeight - 20;//不让帖下边所以减30
        }
      },
      bindScrollEvent() {
        window.addEventListener('scroll', this.handleScrollStart)
      },
      removeScrollEvent() {
        window.removeEventListener('scroll', this.handleScrollStart)
      },
      handleScrollStart() {
        this.isShow = false;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.handleScrollEnd()
        }, 300);
        this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
      },
      handleScrollEnd() {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 判断是否停止滚动的条件
        if (this.scrollTop === this.currentTop) {
          this.isShow = true
        }
      }
    },
    watch: {
      screenWidth(){
        console.log(this.screenWidth);
        this.isShow = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/handle";

  .dragIcon {
    position: fixed;
    z-index: 9999;
  }

  .v-enter {
    opacity: 1;
  }

  .v-leave-to {
    opacity: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s;
  }

  /* MAIN VARIABLES FOR CUSTOMIZATION */
  /* -------------------------------- */
  .nav {
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 0;
    border-radius: 5px;
    width: auto;
    height: 40px;
    @include background('home_bg_color1');
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  }

  .nav__cb {
    z-index: -1000;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    pointer-events: none;
  }

  .nav__content {
    position: relative;
    width: 40px;
    height: 100%;
    -webkit-transition: width 1s cubic-bezier(0.49, -0.3, 0.68, 1.23);
    transition: width 1s cubic-bezier(0.49, -0.3, 0.68, 1.23);
  }

  .nav__cb:checked ~ .nav__content {
    -webkit-transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
    transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
    width: 200px;
  }

  .nav__items {
    position: relative;
    width: 200px;
    height: 100%;
    list-style-type: none;
    font-size: 0;
    padding: 0;
    text-align: right;
  }

  .nav__item {
    display: inline-block;
    vertical-align: top;
    width: 40px;
    text-align: center;
    @include background('home_bg_color1');
    font-size: 16px;
    line-height: 40px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    cursor: pointer;
    color: #A2B1CA;
  }

  .nav__item-text {
    display: block;
    height: 100%;
    -webkit-transform: rotateY(-70deg);
    transform: rotateY(-70deg);
    opacity: 0;
    -webkit-transition: opacity 0.7s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
    transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.7s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  }

  .nav__cb:checked ~ .nav__content .nav__item-text {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    opacity: 1;
    -webkit-transition: opacity 0.2s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
    transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.2s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  }

  .nav__item:nth-child(1) .nav__item-text {
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
  }

  .nav__cb:checked ~ .nav__content .nav__item:nth-child(1) .nav__item-text {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }

  .nav__item:nth-child(2) .nav__item-text {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  .nav__cb:checked ~ .nav__content .nav__item:nth-child(2) .nav__item-text {
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
  }

  .nav__item:nth-child(3) .nav__item-text {
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
  }

  .nav__cb:checked ~ .nav__content .nav__item:nth-child(3) .nav__item-text {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  .nav__btn {
    position: absolute;
    right: 0;
    top: 12px;
    left: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .nav__btn:before, .nav__btn:after {
    content: "";
    display: block;
    width: 28px;
    height: 4px;
    border-radius: 2px;
    background: #A2B1CA;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: background-color 0.3s, -webkit-transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
    transition: transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3), background-color 0.3s, -webkit-transform 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
  }

  .nav__btn:before {
    margin-bottom: 10px;
  }

  .nav__btn:hover:before, .nav__btn:hover:after {
    background: #A2B1CA;
  }

  .nav__cb:checked ~ .nav__btn:before {
    -webkit-transform: translateY(7px) rotate(-225deg);
    transform: translateY(7px) rotate(-225deg);
  }

  .nav__cb:checked ~ .nav__btn:after {
    -webkit-transform: translateY(-7px) rotate(225deg);
    transform: translateY(-7px) rotate(225deg);
  }
</style>
