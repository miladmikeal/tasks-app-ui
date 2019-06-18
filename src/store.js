import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    incompleteTasks: [],
    completeTasks: []
  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    getIncompleteTasks: state => state.incompleteTasks,
    getCompleteTasks: state => state.completeTasks
  },
  actions: {
    setUser: async ({ commit }, user) => {
      commit('setUser', user)
    },
    setToken: async ({ commit }, token) => {
      commit('setToken', token)
    },
    fetchIncompleteTasks: async ({ commit }, page = 0) => {
      try {
        let skip = page * 10;
        const response = await axios.get(`tasks?completed=false&limit=10&skip=${skip}`)
        commit('setIncompleteTasks', response.data)
      } catch (err) {
        console.log(err)
      }
    },
    fetchCompleteTasks: async ({ commit }, page = 0) => {
      try {
        let skip = page * 10;
        const response = await axios.get(`tasks?completed=true&limit=10&skip=${skip}`)
        commit('setCompleteTasks', response.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setToken: (state, token) => {
      state.token = token
    },
    setIncompleteTasks: (state, tasks) => {
      state.incompleteTasks = tasks
    },
    setCompleteTasks: (state, tasks) => {
      state.completeTasks = tasks
    }
  }
})