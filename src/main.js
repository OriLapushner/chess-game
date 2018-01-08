// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index.js'
import myStore from './store/store.js'
import VueSocketio from 'vue-socket.io';

//activate to use server:
// Vue.use(VueSocketio, 'http://localhost:3003');

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store: myStore,
  // sockets: {
    
  //   }
})
