import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // async loadDetail ({commit, state}, arg) {
    //   let data = await (await fetch(`http://localhost:8090/detail?id=${arg}`)).json()
    //   commit('loadDetail', data)
    // }
  },
  getters: {
  }
})

export default store
