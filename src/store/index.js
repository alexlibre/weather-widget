import Vue from 'vue'
import Vuex from 'vuex'
import { weatherModule } from './weatherModule'
import { modalModule } from './modalModule'
import { newsModule } from './newsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  },
  modules: {
    weatherModule, modalModule, newsModule
  }
})
