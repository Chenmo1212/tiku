<template>
  <div id="mine">


    <div class="header">
      <div class="bg">
        <div class="circle">
          <span class="circle__btn" @click="playBtnWave">
            <div class="pause" name="pause"></div>
            <div class="play" name="play"></div>
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
          <input type="checkbox" id="toggle--daynight" class="toggle--checkbox" checked="checked">
          <label class="toggle--btn" for="toggle--daynight">
            <span class="toggle--feature"></span>
          </label>
        </div>
      </div>
      <div class="item">
        <i class="fa fa-clone left"></i>
        <span>卡片模式</span>
        <span class="switch-container">
         <label class="switch">
          <input type="checkbox">
        </label>
        </span>
      </div>
      <div class="item">
        <i class="fa fa-expand left"></i>
        <span>全屏模式</span>
        <span class="switch-container">
         <label class="switch">
          <input type="checkbox">
        </label>
        </span>
      </div>
      <div class="item">
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
  export default {
    name: "mine",
    data() {
      return {}
    },
    methods: {
      playBtnWave(e) {
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
      }
    }
  }
</script>

<style scoped lang="scss">

  * {
    margin: 0;
    padding: 0;
  }

  #mine {
    height: calc(100vh - 80px);
    background: #f4f6f8;
    padding: 0 20px;
    width: calc(100vw - 40px);
    position: relative;
  }

  :root {
    --gray: #f4f6f8;
    --scalingFactor: calc(100 / 25); /*related to size*/
  }

  .header {
    height: 42vh;
    justify-content: center;
    display: flex;
    align-items: center;
  }

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
  }

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
    font-size: 3.2rem;
    color: #6d5dfc;
    z-index: 300;
    /*background: #E4EBF5;*/
    box-shadow: 3px 3px 6px hsla(215, 46%, 78%, 0.8), -3px -3px 6px hsla(215, 46%, 108%, 0.8);
    cursor: pointer;
    position: relative;
    background: url("../assets/avatar.png");
    -webkit-background-size: cover;
    background-size: cover;
    border: 2px solid #fff;
  }

  .circle__btn .play {
    position: absolute;
    opacity: 0;
    transition: all .2s linear;
  }

  .circle__btn .play.visibility {
    opacity: 1;
  }

  .circle__btn .pause {
    position: absolute;
    transition: all .2s linear;
  }

  .circle__btn .pause.visibility {
    opacity: 0;
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
  }

  .circle__back-1.paused {
    animation-play-state: paused;
  }

  .circle__back-2 {
    box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7, -0.4rem -0.4rem 0.8rem #fff;
    animation: waves 4s linear 2s infinite;
  }

  .circle__back-2.paused {
    animation-play-state: paused;
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

  .intro {
    margin-top: 50px;
  }


  .contact-wrapper {
    position: fixed;
    right: 0;
    bottom: 80px;
    transform: translateX(100%);
    -webkit-transition: transform 0.4s ease-in-out;
    transition: transform 0.4s ease-in-out;
  }

  .contact-wrapper.contact-wrapper--open {
    transform: translateX(-10px);
  }

  .contact-panel {
    background-color: #fff;
    border: 1px solid #101845;
    max-width: 500px;
    border-radius: 4px;
    width: 100%;
    position: relative;
  }

  .contact-panel__header {
    position: relative;
    background-color: #101845;
    color: #fff;
    font-size: 21px;
    line-height: 16px;
    padding: 15px;
    text-align: center;
    margin: 0;
  }

  .contact-panel ul {
    list-style-type: none;
    padding: 15px;
    margin: 0;
    text-align: center;
  }

  .contact-panel ul li {
    margin: 0 10px;
    display: inline-block;
  }

  .contact-panel ul li a {
    border-radius: 50%;
    color: #101845;
    height: 50px;
    width: 50px;
    display: inline-block;
    line-height: 50px;
    text-decoration: none;
    box-shadow: 0 1px 2px 1px rgba(170, 170, 170, 0.2);
    -webkit-transition: box-shadow 0.4s ease-in-out;
    transition: box-shadow 0.4s;
  }

  .contact-panel ul li a:hover {
    box-shadow: 0 2px 5px 1px rgba(170, 170, 170, 0.6);
  }

  .contact-close {
    border: 0;
    color: #ccc;
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 48px;
  }

  .contact-close:focus {
    outline: none;
  }

  .contact-button {
    border: 0;
    background-color: #101845;
    color: #fff;
    cursor: pointer;
    padding: 8px 16px;
    -webkit-transition: background-color 0.4s ease-in-out;
    transition: background-color 0.4s ease-in-out;
    font-size: 16px;
    line-height: 20px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 4px;
  }

  .contact-button:hover {
    background-color: #212b63;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  .typing-demo {
    width: 24ch;
    animation: typing 3s steps(24), blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-family: Poppins, serif;
    font-size: 16px;
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


  .content {
    width: 100%;

    .item {
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding: 0 10px;
      color: #6c7885;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      border: 2px solid #fff;
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;

      .left {
        margin-right: 10px;
      }

      .right-icon {
        float: right;
        height: 40px;
        display: inline-block;
        font-size: 30px;

        .circle {
          margin-top: 4px;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.12);
          border: 1px solid #fff;

          i {
            display: block;
            margin-left: 3px;
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
      background-color: #fff;
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
      background-color: #fff;
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
      background-color: #fff;
      box-shadow: rgba(255, 255, 255, 0.1) 8px -3px 0 0, rgba(255, 255, 255, 0.1) 12px 10px 0 -1px, #fff 15px 5px 0 1px, rgba(255, 255, 255, 0.1) 18px 10px 0 0, #fff 20px 6px 0 -1.5px, rgba(255, 255, 255, 0.1) 5px 17px 0 1px;
      animation: starry_star 5s ease-in-out infinite;
    }

    .toggle--daynight .toggle--feature:before {
      position: absolute;
      top: -5px;
      left: -11px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      border: 2px solid #e3e3c7;
      -webkit-box-shadow: #e3e3c7 -28px 0 0 -3px, #e3e3c7 -8px 24px 0 -2px;
      box-shadow: #e3e3c7 -14px 0 0 -3px, #e3e3c7 -8px 11px 0 -2px;
      -webkit-transform-origin: -6px 130%;
      transform-origin: -6px 130%;
    }

    .toggle--daynight .toggle--checkbox:checked + .toggle--btn {
      background-color: #9ee3fb;
      border: 2px solid #86c3d7;
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

      input[type="checkbox"] {
        position: relative;
        top: 10px;
        width: 54px;
        height: 32px;
        -webkit-appearance: none;
        background-color: #f4f6f8;
        border-radius: 40px;
        box-shadow: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px white;
        transition: .5s;
        outline: none;
      }

      input:checked[type="checkbox"] {
        background-color: #9ee3fb;
        border: 2px solid #86c3d7;
        /*background-color: #fff;*/
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
        background-color: #9ee3fb;
        border: 2px solid #fff;
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
        background-color: #fff;
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
</style>
