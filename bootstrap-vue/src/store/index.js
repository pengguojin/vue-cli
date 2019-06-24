import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    loading: false
  },
  mutations: {
    loadings (state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async loadings ({commit}) {
      commit('loadings')
    }
  }
})

export default store
