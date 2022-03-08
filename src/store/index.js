import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存放用户相关的信息
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY)) || null
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser: (state, payLoad) => {
      state.user = payLoad
      // 存入本地保存让数据更持久
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
