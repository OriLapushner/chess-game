import gameModule from './modules/gameModule.js'
import userModule from './modules/userModule.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      user : userModule,
      game : gameModule
    },
    strict : true
  })