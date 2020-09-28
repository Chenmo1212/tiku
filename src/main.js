// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/icons' // svg 图标

//引入vuex中的store
import store from './store/store'

Vue.config.productionTip = false;

// 调整主题模式
if (typeof (localStorage.themeMode) !== 'undefined') {
  let type = JSON.parse(localStorage.themeMode);
  window.document.documentElement.setAttribute("data-theme", type);
  // this.setThemeMode({type: type});
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
