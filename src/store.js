import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    avatar: '/avatar.png',
    incompleteTasks: [],
    completeTasks: []
  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    getAvatar: state => state.avatar,
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
    // fetchAvatar: async ({ commit, state }) => {
    //   try {
    //     let userId = state.user._id;
    //     console.log(userId)
    //     const response = await axios.get(`users/${userId}/avatar`)
    //     console.log(response.data)
    //     if (response.status === 404) {
    //       commit('setAvatar', '/avatar.png')
    //     } else {
    //       commit('setAvatar', response.data)
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    fetchIncompleteTasks: async ({ commit }, page = 0) => {
      try {
        let skip = page * 100;
        const response = await axios.get(`tasks?completed=false&limit=100&skip=${skip}`)
        commit('setIncompleteTasks', response.data)
      } catch (err) {
        console.log(err)
      }
    },
    fetchCompleteTasks: async ({ commit }, page = 0) => {
      try {
        let skip = page * 100;
        const response = await axios.get(`tasks?completed=true&limit=100&skip=${skip}`)
        let reverse = (response.data).reverse()
        commit('setCompleteTasks', reverse)
      } catch (err) {
        console.log(err)
      }
    },
    deleteTask: async ({ commit, state }, taskId) => {
      await axios.delete(`tasks/${taskId}`);
      let tasks = state.incompleteTasks;
      tasks.filter(task => {
        return task.id !== taskId
      });
      commit('deleteTask', tasks);
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setToken: (state, token) => {
      state.token = token
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar
    },
    setIncompleteTasks: (state, tasks) => {
      state.incompleteTasks = tasks
    },
    setCompleteTasks: (state, tasks) => {
      state.completeTasks = tasks
    },
    deleteTask: (state, tasks) => {
      state.incompleteTasks = tasks
    }
  }
})