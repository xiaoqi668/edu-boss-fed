import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用于登陆成功后保存用户信息(初始值尝试读取本地存储)
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    //存储用户数据
    setUser (state,payload){
      //将payload数据转换成对象再进行存储
      state.user = JSON.parse(payload)
      //将payload的数据添加到本地存储中(本地存储存储为json数据)
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
