<template>
  <div id="music">
    <div class="themed-block">
      <div class="neumorphic-card d-flex flex-column mx-auto">
        <div class="d-flex">
          <button type="button" class="btn neumorphic-btn neumorphic-btn_fab"><i class="fa fa-arrow-left"></i></button>
          <div class="neumorphic-text flex-grow-1 my-auto text-center">Music Player</div>
          <button type="button" class="btn neumorphic-btn neumorphic-btn_fab"><i class="fa fa-bars"></i></button>
        </div>
        <div class="neumorphic-card__body">
          <div class="neumorphic-image-wrapper">
            <img
              :src="cover"
              style="max-height: 100%; transform: translateX(-50%); margin-left: 50%;" alt="封面"/>
          </div>
          <div class="neumorphic-text neumorphic-text_title text-center mt-5"><a :href="url" target="_blank">{{songName}}</a></div>
          <div class="neumorphic-text text-center mt-1 mb-5">{{artist}}</div>
          <div class="neumorphic-slider slider mx-auto">
            <div class="neumorphic-slider__text neumorphic-slider__text_left">{{currentTime}}</div>
            <div class="neumorphic-slider__back"></div>
            <div class="neumorphic-slider__line" :style="{width: currentMusicBasicMsg.progress}"></div>
            <!--<div class="neumorphic-slider__thumb"></div>-->
            <div class="neumorphic-slider__text neumorphic-slider__text_right">{{duration}}</div>
          </div>
          <div class="player-controls">
            <div class="btn-group">
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab mx-auto" @click="handlePre()">
                <i class="fa fa-backward"></i>
              </button>
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab neumorphic-btn_primary mx-auto"
                      @click="handleMusicStatus">
                <i class="fa fa-pause" v-if="musicStatus"></i>
                <i class="fa fa-play" v-if="!musicStatus"></i>
              </button>
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab mx-auto" @click="handleNext">
                <i class="fa fa-forward"></i>
              </button>
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
    name: "music",
    computed: {
      ...mapState([
        'musicStatus',
        'currentMusicBasicMsg',
      ]),
    },
    data() {
      return {
        ifPlayMusic: false,
        duration: '',
        currentTime: '',
        songName: '',
        artist: '',
        cover: '',
        url: '',
        currentMusicMsg: "",
      }
    },
    created() {

      if (typeof(localStorage.currentMusicBasicMsg) === 'undefined'){
        this.currentMusicMsg = this.currentMusicBasicMsg;
        this.duration = this.formatSeconds(this.currentMusicMsg.duration);
        // console.log(this.duration);
        localStorage.setItem("currentMusicBasicMsg", JSON.stringify(this.currentMusicBasicMsg));
      } else {
        // console.log(JSON.parse(localStorage.currentMusicBasicMsg))
        this.currentMusicMsg = JSON.parse(localStorage.currentMusicBasicMsg);
      }
    },
    mounted() {
      this.currentTime = this.formatSeconds(this.currentMusicMsg.currentTime);
      this.duration = this.formatSeconds(this.currentMusicMsg.duration);
      this.songName = this.currentMusicMsg.name;
      this.artist = this.currentMusicMsg.singer;
      this.cover = this.currentMusicMsg.cover;
      this.url = this.currentMusicMsg.url;
      // console.log(this.cover);
    },
    watch:{
      currentMusicBasicMsg(){
        this.currentTime = this.formatSeconds(this.currentMusicBasicMsg.currentTime);
        this.duration = this.formatSeconds(this.currentMusicBasicMsg.duration);
        this.songName = this.currentMusicBasicMsg.name;
        this.artist = this.currentMusicBasicMsg.singer;
        this.cover = this.currentMusicBasicMsg.cover;
        this.url = this.currentMusicBasicMsg.url;
        localStorage.setItem("currentMusicBasicMsg", JSON.stringify(this.currentMusicBasicMsg));
      }
    },
    methods: {
      ...mapActions([
        'setMusicStatus',
      ]),
      handleMusicStatus() {
        this.setMusicStatus(true);
      },
      handleNext() {
        window.nextSong()
      },
      handlePre() {
        window.preSong()
      },
      //将秒数转换为时分秒格式
      formatSeconds(value) {

        let theTime = parseInt(value);// 秒
        let middle = 0;// 分
        let hour = 0;// 小时

        if (theTime > 60) {
          middle = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (middle > 60) {
            hour = parseInt(middle / 60);
            middle = parseInt(middle % 60);
          }
        }
        let result ="";
        if (parseInt(theTime) < 10) {
          result = "00:0" + parseInt(theTime)
        }

        if (middle > 0) {
          if (parseInt(theTime) < 10) {
            result = "" + parseInt(middle) + ":0" + parseInt(theTime);
          }
          result = "0" + parseInt(middle) + ":" + parseInt(theTime);
        }
        if (hour > 0) {
          result = "" + parseInt(hour) + ":" + parseInt(middle) + ":" + parseInt(theTime);
        }
        return result;
      }
    }
  }
</script>

<style scoped lang="scss">
  a {
    color: #6C7A92;
    text-decoration: none;
  }
  #music {
    height: calc(100vh - 80);
  }

  body {
    background-color: #f4f6f8;
    /*background-color: #EBECF0;*/
    font-size: 12px;
  }

  .themed-block {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    padding: 0;
    z-index: 1;
  }

  .themed-block:first-of-type {
    --back-color: #f4f6f8;
    --text-color: #A2B1CA;
    --title-color: #6C7A92;
    --shadow-color: 0, 0, 0;
    --light-color: 255, 255, 255;
    --border-active-color: #EEE;
    --main-action-left: #779DFF;
    --main-action-right: #9EB8FF;
    background-color: #ddd;
  }

  .themed-block:nth-of-type(2) {
    --back-color: #2E3237;
    --text-color: #707174;
    --title-color: #A7A9AA;
    --shadow-color: 0, 0, 0;
    --light-color: 80, 80, 80;
    --border-active-color: #444;
    --main-action-left: #D43C0B;
    --main-action-right: #BF8A10;
    background-color: #26282B;
  }

  .btn:focus {
    outline: none;
  }

  .neumorphic-btn {
    padding: 10 15px;
    border-radius: 25px;
    background-color: var(--back-color);
    border: 2px solid var(--back-color);
    box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset 0 0 0 0 rgba(var(--shadow-color), 0), inset 0 0 0 0 rgba(var(--light-color), 0);
    transition: all .25s ease;
    color: var(--text-color);
    font-size: 12px;
    text-shadow: 0 0 2px rgba(var(--text-color), 0);
  }

  .neumorphic-btn:focus {
    box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset 0 0 0 0 rgba(var(--shadow-color), 0), inset 0 0 0 0 rgba(var(--light-color), 0);
    text-shadow: 0 0 2px rgba(var(--text-color), 0);
  }

  .neumorphic-btn:active {
    box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset 4px 4px 8px 0 rgba(var(--shadow-color), .3), inset -4px -4px 8px 0 rgba(var(--light-color), 1) !important;
    border: 2px solid var(--border-active-color);
    text-shadow: 0 0 2px rgba(var(--text-color), .3);
  }

  .neumorphic-btn_primary {
    background: linear-gradient(135deg, var(--main-action-left), var(--main-action-right));
    color: #E0E0E0;
  }

  .neumorphic-btn_primary:active {
    box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset 4px 4px 20 0 rgba(0, 0, 0, .3) !important;
  }

  .neumorphic-btn_fab {
    width: 40;
    height: 40;
    padding: 0;
  }

  .neumorphic-card {
    background-color: #f4f6f8;
    /*width: max-content;*/
    display: flex;
    flex-direction: column;
    width: calc(100% - 40);
    padding: 5% 20;

    .d-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .neumorphic-card-black {
    background-color: #26282B;
    box-shadow: 0 0 6px 6px #26282B, 12px 12px 16px 8px rgba(2, 2, 2, 0.7), -12px -12px 16px 8px rgba(27, 27, 27, 0.7);
    padding: 25px;
    border-radius: 35px;
    width: max-content;

  }

  .neumorphic-text {
    color: var(--text-color);
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    padding: 2% 0;
  }

  .neumorphic-text_title {
    font-size: 20;
    color: var(--title-color);
  }

  .neumorphic-card__body {
    padding: 10% 0 0;
    position: relative;
    height: calc(81vh - 60);
  }

  .neumorphic-image-wrapper {
    width: 250;
    height: 250;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 10%;
    border: 5px solid var(--back-color);
    box-shadow: 7px 7px 15px 5px rgba(var(--shadow-color), .3), -4px -4px 5px 7px rgba(var(--light-color), 1);
  }


  .neumorphic-slider {
    width: 400;
    max-width: 100%;
    height: 30;
    position: relative;
  }

  .neumorphic-slider__back {
    height: 6px;
    width: 100%;
    border-radius: 3px;
    border: none;
    position: absolute;
    bottom: 10;
    cursor: pointer;
    box-shadow: inset 2px 2px 3px -2px rgba(var(--shadow-color), .3), inset -2px -2px 3px 0 rgba(var(--light-color), .5);
  }

  .neumorphic-slider__line {
    height: 6px;
    width: 40%;
    border-radius: 3px;
    left: 0;
    position: absolute;
    bottom: 9px;
    background: linear-gradient(90deg, var(--main-action-left), var(--main-action-right));
    cursor: pointer;
  }

  .neumorphic-slider__thumb {
    width: 30;
    height: 30;
    border-radius: 15px;
    margin-left: -15px;
    background-color: var(--back-color);
    position: absolute;
    bottom: -2.4px;
    left: 40%;
    z-index: 1;
    cursor: pointer;
    box-shadow: 4px 4px 5px -2px rgba(var(--shadow-color), .5), -4px -4px 5px 0 rgba(var(--light-color), .4);
  }

  .neumorphic-slider__thumb::after {
    content: '';
    display: block;
    background-color: var(--main-action-right);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 2px 2px 6px 0 rgba(var(--shadow-color), .3);
  }

  .neumorphic-slider_moving {
    cursor: pointer;
  }

  .neumorphic-slider_moving .neumorphic-slider__thumb {
  }

  .neumorphic-slider__text {
    color: var(--text-color);
    font-family: 'Rubik', sans-serif;
    font-size: 10;
    font-weight: 600;
  }

  .neumorphic-slider__text_left {
    position: absolute;
    bottom: 30;
    left: 0;
  }

  .neumorphic-slider__text_right {
    position: absolute;
    bottom: 30;
    right: 0;
  }

  .player-controls {
    position: absolute;
    bottom: 0;
    width: calc(100vw - 40);
    left: 0;
    z-index: 3;

    .btn-group {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }

  .player-controls .btn {
    width: 70;
    height: 70;
    border-radius: 50%;
    font-size: 20;
    box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset -1px -1px 2px 0 rgba(var(--shadow-color), .3), inset 1px 1px 2px 0 rgba(var(--light-color), 1);
  }


  /*  RANGE-SLIDER  */
  .slider {
    grid-column: 3 / 4;
    grid-row: 5 / 6;
    align-self: center;
    display: flex;
    flex-direction: column;
  }

  .slider__box {
    width: 100%;
    height: 1rem;
    cursor: pointer;
    border-radius: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
  }

  .slider__btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #000;
    position: absolute;
    box-shadow: 0 0.1rem 0.3rem 0 #bec8e4;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slider__btn:hover ~ .slider__tooltip {
    opacity: 1;
  }

  .slider__btn::after {
    content: '';
    position: absolute;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    /*box-shadow: var(--inner-shadow);*/
  }

  .slider__color {
    height: 100%;
    width: 50%;
    position: absolute;
    left: 0;
    z-index: 100;
    border-radius: inherit;
    background: #6d5dfc;
    background: linear-gradient(-1deg, var(--primary-dark) 0%, #5b0eeb 50%, #8abdff 100%);
  }

  .slider__tooltip {
    position: absolute;
    top: 2.6rem;
    height: 2.5rem;
    width: 3rem;
    border-radius: .6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: #6d5dfc;
    /*box-shadow: var(--shadow);*/
    opacity: 0;
    transition: opacity .3s ease;
  }
</style>
