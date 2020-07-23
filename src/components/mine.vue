<template>
  <div id="mine"  :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="bg">
        <div class="circle">
          <span class="circle__btn" @click="playBtnWave">
            <span class="pause"></span>
            <span class="play"></span>
          </span>
          <span class="circle__back-1"></span>
          <span class="circle__back-2"></span>
        </div>

        <div class="wrapper">
          <div class="typing-demo">
            LITTLE COOKIE By ChenMo.
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="item day-night">
        <i class="fa fa-moon-o left" aria-hidden="true"></i>
        <span>白天模式</span>
        <div class="toggle toggle--daynight">
          <input type="checkbox" id="toggle--daynight" class="toggle--checkbox" :checked="ifLight">
          <label class="toggle--btn" for="toggle--daynight" @click="changeTheme">
            <span class="toggle--feature"></span>
          </label>
        </div>
      </div>
      <div class="item">
        <i class="fa fa-clone left"></i>
        <span>卡片模式</span>
        <span class="switch-container">
         <label class="switch" @click="handleTikuMode">
          <input type="checkbox" :checked="cardMode">
        </label>
        </span>
      </div>
      <div class="item">
        <i class="fa fa-expand left"></i>
        <span>全屏模式</span>
        <span class="switch-container">
         <label class="switch" @click="setFullScreen">
          <input type="checkbox" :checked="isFullScreen">
        </label>
        </span>
      </div>
      <div class="item" @click="handleFeedBack">
        <i class="fa fa-pencil-square-o left"></i>
        <span>我要反馈</span>
        <span class="right-icon">
          <span class="circle">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "mine",
    data() {
      return {
        isFullScreen: false,
        ifLight: true,
      }
    },
    created(){
      if (typeof(localStorage.themeMode) === 'undefined'){
        localStorage.setItem('themeMode', JSON.stringify(this.themeMode));
      } else {
        this.ifLight = JSON.parse(localStorage.themeMode) === "light";
        let type = JSON.parse(localStorage.themeMode);
        this.setThemeMode({type: type});
      }
    },
    computed: {
      ...mapState([
        'cardMode',
        'themeMode',
      ]),
    },
    methods: {
      ...mapActions([
        'setTikuMode',
        'setThemeMode',
        'setWarning',
      ]),
      /**
       * 设置水波纹效果
       */
      playBtnWave(e) {
        console.log("pause");
        const play = document.querySelector('.play');
        const pause = document.querySelector('.pause');
        const playBtn = document.querySelector('.circle__btn');
        const wave1 = document.querySelector('.circle__back-1');
        const wave2 = document.querySelector('.circle__back-2');
        e.preventDefault();
        pause.classList.toggle('visibility');
        play.classList.toggle('visibility');
        playBtn.classList.toggle('shadow');
        wave1.classList.toggle('paused');
        wave2.classList.toggle('paused');
      },
      /**
       * 设置全屏
       */
      setFullScreen() {
        // console.log(this.isFullScreen);
        if (this.isFullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else {
            window.parent.showTopBottom();
          }
          this.isFullScreen = false;
          this.setWarning("全屏模式关闭");
        } else {
          // console.log("退出");
          let ele = document.body;
          if (ele.requestFullscreen) {
            ele.requestFullscreen();
          } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
          } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
          } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
          }
          this.isFullScreen = true;
          this.setWarning("全屏模式开启");
        }
      },
      // 更改主题
      changeTheme() {
        let type = null;
        if(this.themeMode === 'light'){
          type = 'dark';
          this.ifLight = true;
        } else {
          type = 'light';
          this.ifLight = false;
        }
        // this.ifLight = !this.ifLight;
        // console.log(this.themeMode);
        this.setWarning("主题切换成功");
        this.setThemeMode({type: type});
        window.document.documentElement.setAttribute("data-theme", type);

        localStorage.setItem('themeMode', JSON.stringify(this.themeMode));
      },

      // 设置题库模糊
      handleTikuMode(){
        if (this.cardMode){
          this.setTikuMode();
          this.setWarning("卡片答题页面已关闭");
        } else {
          this.setTikuMode();
          this.setWarning("卡片答题页面设置成功");
        }
      },

      handleFeedBack(){
        this.setWarning("该功能正在开发ing~");
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/_handle.scss";

  #mine {
    height: calc(100vh - 80px);
    @include background('background_color3');
    padding: 0 20px;
    width: calc(100vw - 40px);
    position: relative;

    .header {
      height: 42vh;
      justify-content: center;
      display: flex;
      align-items: center;


      /*  PLAY BUTTON  */
      .circle {
        justify-self: center;
        border-radius: 1rem;
        justify-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: grid;
        grid-template-rows: 1fr;

        .circle__btn {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
          width: 6rem;
          height: 6rem;
          display: flex;
          margin: .6rem;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          z-index: 300;
          /*background: #E4EBF5;*/
          box-shadow: 3px 3px 6px hsla(215, 46%, 78%, 0.8), -3px -3px 6px hsla(215, 46%, 108%, 0.8);
          cursor: pointer;
          position: relative;
          background: url("../assets/avatar.png");
          -webkit-background-size: cover;
          background-size: cover;
          border: 2px solid;
          @include border_color("border_color1");

          .play {
            position: absolute;
            opacity: 0;
            transition: all .2s linear;
          }

          .play.visibility {
            opacity: 1;
          }

          .pause {
            position: absolute;
            transition: all .2s linear;
          }

          .pause.visibility {
            opacity: 0;
          }
        }

        .circle__back-1, .circle__back-2 {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          filter: blur(1px);
          z-index: 100;
        }

        .circle__back-1 {
          box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7, -0.4rem -0.4rem 0.8rem #fff;
          background: linear-gradient(to bottom right, #c8d0e7 0%, #fff 100%);
          animation: waves 4s linear infinite;

          ~ .paused {
            animation-play-state: paused;
          }
        }

        .circle__back-2 {
          box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7, -0.4rem -0.4rem 0.8rem #fff;
          animation: waves 4s linear 2s infinite;

          ~ .paused {
            animation-play-state: paused;
          }
        }

        @keyframes waves {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      }

      /*  Wrapper  */
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        .typing-demo {
          width: 24ch;
          animation: typing 3s steps(24), blink 0.5s step-end infinite alternate;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid;
          font-family: Poppins, serif;
          font-size: 16px;
          @include font_color('active_tab_font_color')
        }
        @keyframes typing {
          from {
            width: 0;
          }
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      }
    }

    .content {
      width: 100%;

      .item {
        margin-bottom: 20px;
        height: 100%;
        line-height: 40px;
        text-align: left;
        padding: 0 10px;
        color: #6c7885;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border: 2px solid;
        @include border_color("border_color1");
        box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;

        .left {
          margin-right: 10px;
        }

        .right-icon {
          float: right;
          height: 40px;
          width: 40px;
          display: inline-block;
          font-size: 30px;
          position: relative;

          .circle {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.12);
            border: 2px solid;
            position: absolute;
            top: 2px;
            @include border_color("border_color1");

            i {
              display: block;
              margin-left: 11px;
              margin-top: -2px;
            }
          }
        }
      }

      .day-night {
        position: relative;
      }

      /* =====================================================
         Some defaults across all toggle demos
         ===================================================== */
      .toggle {
        display: inline-block;
        float: right;
        user-select: none;
        margin-top: 3px;
      }

      .toggle--checkbox {
        display: none;
      }

      .toggle--btn {
        display: block;
        margin: 0 auto;
        font-size: 1.4em;
        transition: all 350ms ease-in;
      }

      .toggle--btn:hover {
        cursor: pointer;
      }

      .toggle--btn, .toggle--btn:before, .toggle--btn:after,
      .toggle--checkbox,
      .toggle--checkbox:before,
      .toggle--checkbox:after,
      .toggle--feature,
      .toggle--feature:before,
      .toggle--feature:after {
        transition: all 250ms ease-in;
      }

      .toggle--btn:before, .toggle--btn:after,
      .toggle--checkbox:before,
      .toggle--checkbox:after,
      .toggle--feature:before,
      .toggle--feature:after {
        content: '';
        display: block;
      }

      /* ===================================================
         Day/Night and Gender toggle buttons
         =================================================== */
      .toggle--daynight .toggle--btn,
      .toggle--like .toggle--btn {
        position: relative;
        height: 30px;
        width: 50px;
        border-radius: 30px;
      }

      .toggle--daynight .toggle--btn:before,
      .toggle--like .toggle--btn:before {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 23px;
        height: 23px;
        border-radius: 50%;
      }

      .toggle--daynight .toggle--btn {
        border: 2px solid #1c1c1c;
        background-color: #3c4145;
      }

      .toggle--daynight .toggle--btn:before {
        background: #fff;
        border: 2px solid #e3e3c7;
      }

      .toggle--daynight .toggle--btn:after {
        position: absolute;
        top: 62%;
        left: 14px;
        z-index: 10;
        width: 5.2px;
        height: 5.2px;
        opacity: 0;
        background: #fff;
        border-radius: 50%;
        box-shadow: #fff 2px -3px, #fff 3px 0, #fff 6px 0, #fff 9px 0px, #fff 10px -3px, #fff 12px 0, #fff 15px 0, #fff 14px -1px 0 1px, #fff 9px -5px 0 -2px, #fff 5px -6px 0 1px, #d3d3d3 0 0 0 -13px, #d3d3d3 8px 0 0 4px, #d3d3d3 2px -1px 0 4px, #d3d3d3 1px -1px 0 4px, #d3d3d3 14px -1px 0 4px, #d3d3d3 4px -8px 0 1px, #d3d3d3 5px -7px 0 4px;
        transition: opacity 100ms ease-in;
      }

      @keyframes starry_star {
        50% {
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: #fff 5px -3px 0 0, #fff 11px 10px 0 -1px, rgba(255, 255, 255, 0.1) 11px 3px 0 1px, #fff 16px 7px 0 0, rgba(255, 255, 255, 0.1) 27px 3px 0 -1.5px, #fff 5px 12px 0 1px;
        }
      }
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 100;
          transform: scale(1.1);
        }
        55% {
          transform: scale(1.1);
        }
        75% {
          transform: scale(0.9);
        }
        100% {
          opacity: 100;
          transform: scale(1);
        }
      }

      .toggle--daynight .toggle--feature {
        display: block;
        position: absolute;
        top: 9px;
        left: 52.5%;
        z-index: 20;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #fff;
        box-shadow: rgba(255, 255, 255, 0.1) 8px -3px 0 0, rgba(255, 255, 255, 0.1) 12px 10px 0 -1px, #fff 15px 5px 0 1px, rgba(255, 255, 255, 0.1) 18px 10px 0 0, #fff 20px 6px 0 -1.5px, rgba(255, 255, 255, 0.1) 5px 17px 0 1px;
        animation: starry_star 5s ease-in-out infinite;
      }

      .toggle--daynight .toggle--feature:before {
        position: absolute;
        top: -5px;
        left: -11px;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #e3e3c7;
        -webkit-box-shadow: #e3e3c7 -28px 0 0 -3px, #e3e3c7 -8px 24px 0 -2px;
        box-shadow: #e3e3c7 -14px 0 0 -3px, #e3e3c7 -8px 11px 0 -2px;
        -webkit-transform-origin: -6px 130%;
        transform-origin: -6px 130%;
      }

      .toggle--daynight .toggle--checkbox:checked + .toggle--btn {
        @include background('bg_mine');
        border: 2px solid;
        @include border_color('border_mine')
      }

      .toggle--daynight .toggle--checkbox:checked + .toggle--btn:before {
        left: 22px;
        background-color: #ffdf6d;
        border: 2px solid #e1c348;
      }

      .toggle--daynight .toggle--checkbox:checked + .toggle--btn:after {
        opacity: 100;
        animation-name: bounceIn;
        animation-duration: 0.60s;
        animation-delay: 0.10s;
        animation-fill-mode: backwards;
        animation-timing-function: ease-in-out;
      }

      .toggle--daynight .toggle--checkbox:checked + .toggle--btn > .toggle--feature {
        opacity: 0;
        box-shadow: rgba(255, 255, 255, 0.1) 30px -3px 0 -4px, rgba(255, 255, 255, 0.1) 12px 10px 0 -5px, #fff 38px 18px 0 -3px, rgba(255, 255, 255, 0.1) 32px 34px 0 -4px, #fff 20px 24px 0 -5.5px, rgba(255, 255, 255, 0.1) 5px 38px 0 -3px;
        animation: none;
      }

      .toggle--daynight .toggle--checkbox:checked + .toggle--btn > .toggle--feature:before {
        left: 25px;
        transform: rotate(70deg);
      }


      .switch-container {
        height: 40px;
        display: flex;
        float: right;
        width: 54px;
        align-items: center;
        margin-right: 5px;

        input[type="checkbox"] {
          position: relative;
          top: 10px;
          width: 54px;
          height: 32px;
          -webkit-appearance: none;
          @include background('bg_mine_color2');
          border-radius: 40px;
          box-shadow: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px white;
          transition: .5s;
          outline: none;
        }

        input:checked[type="checkbox"] {
          @include background('bg_mine');
          border: 2px solid;
          @include border_color('border_mine');
          /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.12);*/
        }

        input[type="checkbox"]:before {
          content: "";
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          top: 3px;
          left: 4px;
          @include background('bg_mine');
          border: 2px solid;
          @include border_color('border_color1');
          transition: 0.5s;
          transform: scale(1.1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.12);
        }

        input:checked[type="checkbox"]:before {
          left: 23px;
          top: 2px;
          width: 24px;
          height: 24px;
          border: none;
          @include background('bg_mine_color1');
        }

        input:checked[type="checkbox"]:after {
          /*content: "👋";*/
          position: absolute;
          top: 7px;
          left: 7px;
          font-family: monospace;
          color: white;
          animation: animate 1s ease;
        }

        @keyframes animate {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }
    }

  }

  #mine.dark {
    .circle__btn {
      box-shadow: 3px 3px 6px hsla(200, 12%, 20%, 0.89), -3px -3px 6px hsla(175, 10%, 26%, 0.8) !important;
    }
    .circle__back-1 {
      box-shadow: 0.4rem 0.4rem 0.8rem #2e3237, -0.4rem -0.4rem 0.8rem #26282b!important;
      background: linear-gradient(to bottom right, #6b6b6b 0%, #2b2b2b 100%) !important;
    }
    .circle__back-2 {
      box-shadow: 0.4rem 0.4rem 0.8rem #2e3237, -0.4rem -0.4rem 0.8rem #26282b!important;
    }
    .item {
      /*box-shadow: 2px 2px 5px rgba(0,0,0,.3), -2px -2px 5px rgba(0,0,0,.5), -0.4px -0.4px 0.4px rgba(80,80,80,.4)!important;*/
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65)!important;
    }
    .switch-container {
      input[type="checkbox"] {
        box-shadow: inset 0.4px 0.4px 1.5px #2E3237, inset 1.5px 1.5px 3px #6c7885, inset -0.8px -0.8px 1.5px #6c7885!important;
      }
    }
    .right-icon {
      .circle {
        box-shadow: -2px -2px 5px rgba(255,255,255,0.05),2px 2px 2px rgba(0,0,0,0.65) !important;
      }
    }
  }
</style>
