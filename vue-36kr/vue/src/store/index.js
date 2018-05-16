import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function sleep () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

const store = new Vuex.Store({
  strict: true,
  state: {
    index_list: [],
    detail_data: {},
    cur_page: 0,
    detail_id: '',
    loading: false
  },
  mutations: {
    loadMorePageList (state, arg) {
      state.index_list = state.index_list.concat(arg)
    },
    loadDetail (state, arg) {
      state.detail_data = arg
    },
    addPage (state) {
      state.cur_page++
    },
    startLoadMore (state) {
      state.loading = true
    },
    endLoadMore (state) {
      state.loading = false
    }
  },
  actions: {
    async loadMorePageList ({commit, state}) {
      commit('startLoadMore')
      await sleep()
      let data = await (await fetch(`http://localhost:8090/list?page=${state.cur_page}`)).json()
      commit('loadMorePageList', data)
      console.log(state.index_list)
      commit('endLoadMore')
      commit('addPage')
    },
    async loadDetail ({commit, state}, arg) {
      let data = await (await fetch(`http://localhost:8090/detail?id=${arg}`)).json()
      commit('loadDetail', data)
    }
  },
  getters: {
    index_list (state) {
      if (state.cur_page === 0) {
        store.dispatch('loadMorePageList')
      }
      return state.index_list
    }
  }
})

export default store
