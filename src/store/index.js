// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null // 存放登录用户信息
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = null
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('setUser', user)
    },
    logout ({ commit }) {
      commit('clearUser')
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  }
})
