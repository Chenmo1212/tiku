<template>
  <div class="chip">
    <div class="chip__icon">
      <i class="fa fa-bell-o" aria-hidden="true"/>
    </div>
    <p>{{ alertMsg }}</p>
    <div class="chip__close" @click="setAlertHide">
      <i class="fa fa-close"/>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "alert",
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'musicStatus',
      'themeMode',
      'warning',
      'isAlert',
      'isModal',
      'showAppLoading',
      'modalType',
      'totalData',
      'showAppModal',
      'alertMsg',
    ]),
  },
  methods: {
    ...mapActions([
      'setAlertHide',
    ]),
  }
}
</script>

<style scoped lang="scss">
@import "../../font/css/font-awesome.min.css";
@import "../../scss/_handle";

/*  CHIP  */
.alert {
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 999;

  .chip {
    width: 100%;
    /*background-color: #fff;*/
    @include background("app_bg_color1");
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*<!--box-shadow: 5px 5px 6px #d1d3db, -5px -5px 6px #f4f4f6;-->*/
    @include app_box_shadow(app_shadow_color1, app_shadow_color2)
  }

  .chip__icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 1rem;
    margin: 0 0 0 .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @include font_color("app_font_color1");
  }

  .chip p {
    font-size: .9rem;
    color: #9baacf;
  }

  .chip__close {
    width: 40px;
    height: 40px;
    line-height: 40px;
    /*margin: 0 .5rem;*/
    /*display: flex;*/
    color: #bec8e4;
    cursor: pointer;
  }
}
</style>
