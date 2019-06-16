import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    tasks: []
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getTasks: (state) => state.tasks
  },
  actions: {
    setUser: async ({ commit }, user) => {
      commit('setUser', user)
    },
    setToken: async ({ commit }, token) => {
      commit('setToken', token)
    },
    fetchTasks: async ({ commit }) => {
      const response = await axios.get('tasks');
      commit('setTasks', response.data)
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setToken: (state, token) => {
      state.token = token
    },
    setTasks: (state, tasks) => {
      state.tasks = tasks
    }
  }
})